import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure({ host: '10.10.1.66' })
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
