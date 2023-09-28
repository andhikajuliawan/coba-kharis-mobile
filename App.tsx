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

import {AuthProvider} from './src/Context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <NativeBaseProvider>
        <Navigation />
      </NativeBaseProvider>
    </AuthProvider>
  )
};

export default App;
