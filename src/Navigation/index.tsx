/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';

import {
  Text,
  View,
  Image,
} from 'react-native';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//SVG
import HomeActive from '../../assets/icons/BottomTab/Home_Active.svg';
import HomeInctive from '../../assets/icons/BottomTab/Home_Inactive.svg';
import KegiatanActive from '../../assets/icons/BottomTab/Kegiatan_Active.svg';
import KegiatanInctive from '../../assets/icons/BottomTab/Kegiatan_Inactive.svg';
import MitraKharisActive from '../../assets/icons/BottomTab/MitraKharis_Active.svg';
import MitraKharisInctive from '../../assets/icons/BottomTab/MitraKharis_Inactive.svg';
import PelayananActive from '../../assets/icons/BottomTab/Pelayanan_Active.svg';
import PelayananInctive from '../../assets/icons/BottomTab/Pelayanan_Inactive.svg';
import StreamingActive from '../../assets/icons/BottomTab/Streaming_Active.svg';
import StreamingInctive from '../../assets/icons/BottomTab/Streaming_Inactive.svg';

// Screen
import SplashScreen from '../Screen/SplashScreen';

import HomeScreen from '../Screen/HomeScreen';
import KegiatanScreen from '../Screen/KegiatanScreen';
import MitraKharisScreen from '../Screen/MitraKharisScreen';
import PelayananScreen from '../Screen/PelayananScreen';
import StreamingScreen from '../Screen/StreamingScreen';

import { ScaledSheet } from 'react-native-size-matters';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [HideSplash, setHideSplash] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHideSplash(true);
    }, 5000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {HideSplash ? (
          <Stack.Screen name="Home" component={Tabs} />
        ) : (
          <Stack.Screen name="Home" component={SplashScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = ScaledSheet.create({
  view_bottom: {
    alignItems: 'center',
    justifyContent: 'center',
    top: scale(5),
    bottom: scale(5),
  },

  text_active: {
    color: '#3A0CA3',
    fontSize: '12@s',
  },

  text_inactive: {
    color: '#A6A6A6',
    fontSize: '12@s',
  },
});

// export const COLORS = {
//   red: '#E90716',

// }

export default Navigation;

export function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: scale(20),
          borderTopRightRadius: scale(20),
          height: scale(60),
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.view_bottom}>
              {focused ? (
                <>
                  <HomeActive width={scale(32)} height={scale(32)} />
                  <Text style={styles.text_active}>Home</Text>
                </>
              ) : (
                <>
                  <HomeInctive width={scale(32)} height={scale(32)} />
                  <Text style={styles.text_inactive}>Home</Text>
                </>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Streaming"
        component={StreamingScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 5, bottom: 5 }}>
              {focused ? (
                <>
                  <StreamingActive width={scale(32)} height={scale(32)} />
                  <Text style={styles.text_active}>Streaming</Text>
                </>
              ) : (
                <>
                  <StreamingInctive width={scale(32)} height={scale(32)} />
                  <Text style={styles.text_inactive}>Streaming</Text>
                </>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Kegiatan"
        component={KegiatanScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 5, bottom: 5 }}>
              {focused ? (
                <>
                  <KegiatanActive width={scale(40)} height={scale(32)} />
                  <Text style={styles.text_active}>Kegiatan</Text>
                </>
              ) : (
                <>
                  <KegiatanInctive width={scale(40)} height={scale(32)} />
                  <Text style={styles.text_inactive}>Kegiatan</Text>
                </>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Pelayanan"
        component={PelayananScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 5, bottom: 5 }}>
              {focused ? (
                <>
                  <PelayananActive width={scale(32)} height={scale(32)} />
                  <Text style={styles.text_active}>Pelayanan</Text>
                </>
              ) : (
                <>
                  <PelayananInctive width={scale(32)} height={scale(32)} />
                  <Text style={styles.text_inactive}>Pelayanan</Text>
                </>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MitraKharis"
        component={MitraKharisScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 5, bottom: 5 }}>
              {focused ? (
                <>
                  <MitraKharisActive width={scale(32)} height={scale(32)} />
                  <Text style={styles.text_active}>Mitra Kharis</Text>
                </>
              ) : (
                <>
                  <MitraKharisInctive width={scale(32)} height={scale(32)} />
                  <Text style={styles.text_inactive}>Mitra Kharis</Text>
                </>
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
