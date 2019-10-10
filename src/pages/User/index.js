import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loading,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  constructor() {
    super().state = {
      stars: [],
      loading: true,
      page: 1,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.loadStarredRepos();
  }

  loadStarredRepos = async (page = 1) => {
    const { navigation } = this.props;
    const { stars } = this.state;
    const user = navigation.getParam('user');

    const { data } = await api.get(`/users/${user.login}/starred?page=${page}`);

    this.setState({
      stars: page >= 2 ? [...stars, ...data] : data,
      loading: false,
      page,
    });
  };

  loadMore = () => {
    const { page } = this.state;

    const nextPage = page + 1;

    this.loadStarredRepos(nextPage);
  };

  refreshList = async () => {
    this.setState({ refreshing: true });
    await this.loadStarredRepos(1);
    this.setState({ refreshing: false });
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading, refreshing } = this.state;
    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <Loading color="#456789" />
        ) : (
          <Stars
            data={stars}
            keyExtractor={repo => String(repo.id)}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            renderItem={({ item: repo }) => (
              <Starred>
                <OwnerAvatar source={{ uri: repo.owner.avatar_url }} />
                <Info>
                  <Title>{repo.name}</Title>
                  <Author>{repo.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
