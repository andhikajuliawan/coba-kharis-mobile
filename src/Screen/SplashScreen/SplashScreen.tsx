/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    Image,
    View,
    ActivityIndicator,
    ImageBackground,
} from 'react-native';

import { ScaledSheet } from 'react-native-size-matters';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const SplashScreen = () => {

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/bg/Splash.png')} resizeMode="cover" style={styles.image}>
        <Image 
          source={require('../../../assets/logo/logoSplash.png')}
          resizeMode="contain"
          style={styles.logo}
        />
        <ActivityIndicator size="large" color="#ffffff" style={styles.loading} />
      </ImageBackground>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#170A43',
  },
  image: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center', 
  },
  logo: {
    width: scale(210),
    height: scale(168),
  },
  loading: {
    top: scale(160),
  },
});

export default SplashScreen;
