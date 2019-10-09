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
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });

    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const { data: stars } = await api.get(`/users/${user.login}/starred`);

    this.setState({ stars, loading: false });
  }

  render() {
    const { navigation } = this.props;
    const { stars, loading } = this.state;
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
