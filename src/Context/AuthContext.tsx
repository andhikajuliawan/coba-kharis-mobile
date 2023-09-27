import type { PropsWithChildren } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';
import { CSSAbsoluteLengthUnitsMultiplicators } from 'react-native-render-html';

type AuthProps = PropsWithChildren<{
  children: any;
}>;

export const AuthContext = createContext();

export const AuthProvider = ({children}: AuthProps) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

//   const register = (username, customer_name, customer_email, password) => {
//     setIsLoading(true);

//     axios
//       .post(`${BASE_URL}/register-customer`, {
//         username,
//         customer_name,
//         customer_email,
//         password,
//       })
//       .then(res => {
//         let userInfo = res.data;
//         setUserInfo(userInfo);
//         AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
//         setIsLoading(false);
//         console.log(userInfo);
//       })
//       .catch(e => {
//         console.log(`register error ${e}`);
//         setIsLoading(false);
//       });
//   };

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
    console.log(userInfo);
    setIsLoading(true);

    axios
      .get(`${BASE_URL}/api/logout`, {
        headers: {Authorization: `Bearer ${userInfo.token}`},
      })
      .then(res => {
        console.log(res.data);
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

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};