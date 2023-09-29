import type { PropsWithChildren } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';
import { CSSAbsoluteLengthUnitsMultiplicators } from 'react-native-render-html';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

type AuthProps = PropsWithChildren<{
  children: any;
}>;

export const AuthContext = createContext();

export const AuthProvider = ({children}: AuthProps) => {
  const [userInfo, setUserInfo] = useState({});
  const [userGoogleInfo, setUserGoogleInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = (username: any, name: any, email: any, alamat: any, whatsapp: any, pekerjaan: any, jenis_kelamin: any, tanggal_lahir: any, password: any) => {
    console.log(username, name, email, alamat, whatsapp, pekerjaan, jenis_kelamin, tanggal_lahir, password);
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/api/register`, {
        username,
        name,
        email,
        alamat, 
        whatsapp, 
        pekerjaan, 
        jenis_kelamin, 
        tanggal_lahir, 
        password
      })
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        console.log(userInfo);
      })
      .catch(e => {
        console.log(`register error ${e}`);
        setIsLoading(false);
      });
  };

  const login = (username: any, password: any) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/api/login`, {
        username,
        password,
      })
      .then(res => {
        let user = res.data;
        console.log(user);
        setUserInfo(user);
        AsyncStorage.setItem('userInfo', JSON.stringify(user));
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  const logout = () => {
    // console.log(userInfo);
    setIsLoading(true);

    axios
      .get(`${BASE_URL}/api/logout`, {
        headers: {Authorization: `Bearer ${userInfo.token}`},
      })
      .then(res => {
        console.log(res.data);
        signOut();
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo || '{}');

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const usrInfo = await GoogleSignin.signIn();
      setUserGoogleInfo(usrInfo);
      console.log(usrInfo);

      let email = usrInfo.user.email;

      // Check user email and get token
      setIsLoadingGoogle(true);

      axios
        .post(`${BASE_URL}/api/checkGoogleLogin`, {
          email
        })
        .then(res => {
          let user = res.data;
          console.log(user);
          setUserInfo(user);
          AsyncStorage.setItem('userInfo', JSON.stringify(user));
          setIsLoadingGoogle(false);
        })
        .catch(e => {
          console.log(`checkGoogle error ${e}`);
          signOut();
          setIsLoadingGoogle(false);
        });

    } catch (error) {
      console.log('Message_____', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
          console.log('Sign In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.log('Play Services Not Available');
      } else {
          console.log('Some Other Error Happened');
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserGoogleInfo({});
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '939430381070-jov7k6iipo32m6v957j4pgc6l3e8lsja.apps.googleusercontent.com',
    });

    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLoadingGoogle,
        userInfo,
        splashLoading,
        register,
        login,
        logout,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};