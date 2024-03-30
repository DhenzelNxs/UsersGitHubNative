import React from 'react';
import {StatusBar} from 'react-native';
import Routes from './routes';

export default function App() {
  if (__DEV__) {
    import('../ReactotronConfig').then(() =>
      console.log('Reactotron Configured'),
    );
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes />
    </>
  );
}
