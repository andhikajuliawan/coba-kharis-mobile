/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

// SVG
import Scan from '../../../assets/icons/Header/Scan.svg';
import Search from '../../../assets/icons/Header/Search.svg';
import Notification from '../../../assets/icons/Header/Notification.svg';
import Setting from '../../../assets/icons/Header/Setting.svg';

import { ScaledSheet } from 'react-native-size-matters';
import { scale } from 'react-native-size-matters';


const Header = () => {


  return (
    <View style={styles.container}>
      <View style={styles.space1}>
        <Scan width={scale(28)} height={scale(28)} />
      </View>
      <View style={styles.space2}>
        <Search width={scale(28)} height={scale(28)} />
        <Notification width={scale(28)} height={scale(28)} />
        <Setting width={scale(28)} height={scale(28)} />
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  space1: {
    flexDirection: 'row',
  },

  space2: {
    flexDirection: 'row',
    width: scale(110),
    justifyContent: 'space-between',
  },

  container: {
    // height: scale(68),
    marginTop: scale(20),
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginHorizontal: scale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Header;
