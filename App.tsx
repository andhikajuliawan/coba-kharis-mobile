/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

// Navigation
import Navigation from './src/Navigation/index';
import { NativeBaseProvider } from 'native-base';

const App = () => {
  return (<NativeBaseProvider>
    <Navigation />
  </NativeBaseProvider>)



};

export default App;
