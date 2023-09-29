/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Box, Center, Text } from 'native-base';
import React from 'react';
import type { PropsWithChildren } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,

  useColorScheme,
  View,
} from 'react-native';

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

const PelayananScreen = () => {


  return (
    <Box flex={1} bgColor="#fff" justifyContent="center">
      <Center >
        Halaman Pelayanan Belum Tersedia
      </Center>
    </Box>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default PelayananScreen;
