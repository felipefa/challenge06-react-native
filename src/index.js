import React from 'react';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import Routes from './routes';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#456789" />
      <Routes />
    </>
  );
};

export default App;
