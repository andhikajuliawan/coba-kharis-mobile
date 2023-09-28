import {
  Box,
  Text,
  ScrollView,
  Center,
  VStack,
  HStack,
  Divider,
  Image,
  Input,
  Button,
  Spinner
} from 'native-base';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../../Context/AuthContext';
// import Spinner from 'react-native-loading-spinner-overlay';
import { ScaledSheet } from 'react-native-size-matters';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import Username from '../../../assets/icons/SignIn/user-regular.svg';
import Password from '../../../assets/icons/SignIn/key-outline.svg';

import {useNavigation} from '@react-navigation/native';

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {isLoading, login} = useContext(AuthContext);

  const navigation = useNavigation();

  const onGooglePressed = () => {
    console.log(password);
  };
 

  const onSubmitPressed = () => {
    navigation.navigate('SignUp');
  };

//   const onResetPasswordPressed = () => {
//     navigation.navigate('ResetPassword');
//   };

//   const onRegisterPressed = () => {
//     navigation.navigate('SignUp');
//   };

  return (
    <ScrollView>
        <Box marginY={10}>
            {/* Logo */}
            <Center>
                <VStack alignItems="center">
                    <Image
                        source={require('../../../assets/logo/logoKharis.png')}
                        alt="Alternate Text"
                        size="md"
                        marginY={5}
                        borderRadius={10}
                    />
                    <Text
                        fontSize={18}
                        fontFamily="Poppins-Bold"
                        color="#223263"
                        marginBottom={1}>
                        Welcome to Kharis Mobile
                    </Text>
                    <Text
                        fontSize={14}
                        fontFamily="Poppins-Regular"
                        color="#9098B1"
                        marginBottom={5}>
                        Sign in to continue
                    </Text>
                </VStack>
            </Center>

            {/* Input */}
            <Box alignItems="center">
                <Input
                    value={username}
                    onChangeText={text => setUsername(text)}
                    variant="outline"
                    placeholder="Email / Username"
                    my={1}
                    py={3}
                    w="90%"
                    size="md"
                    type="text"
                    fontFamily="Poppins-Regular"
                    InputLeftElement={
                        <Username width={scale(18)} height={scale(18)} style={{marginLeft: 10}}/>
                    }
                />
            </Box>

            <Box alignItems="center">
                <Input
                    value={password}
                    onChangeText={text => setPassword(text)}
                    variant="outline"
                    placeholder="Password"
                    my={1}
                    py={3}
                    w="90%"
                    size="md"
                    type="password"
                    fontFamily="Poppins-Regular"
                    InputLeftElement={
                        <Password width={scale(18)} height={scale(18)} style={{marginLeft: 10}}/>
                    }
                />
            </Box>

            <Box marginTop={4}></Box>

            {/* Button */}
            <Center>
                <Button
                    onPress={() => { login(username, password); }}
                    variant="outline"
                    width="90%"
                    backgroundColor="#3EADE2">
                    <Text
                        color="white"
                        fontSize={14}
                        marginY={2}
                        fontFamily="Poppins-Bold">
                        {isLoading ? <Spinner color="#fff" /> : "Sign In"}
                    </Text>
                </Button>
                <HStack marginTop={2}>
                    <Text fontFamily="Poppins-Regular" fontSize={14} color="#9098B1">
                        Don't have a account ? 
                    </Text>
                    <Text
                        onPress={onSubmitPressed}
                        color="#3EADE2"
                        fontFamily="Poppins-Bold"
                        fontSize={14}
                        marginLeft={2}>
                        Sign Up
                    </Text>
                </HStack>
            </Center>

            {/* Divider */}
            <Box flexDirection="row" alignItems="center" marginY={4}>
                <Box width="5%"></Box>
                <Box flex={1} height={0.3} backgroundColor="#9098B1" />
                <Box>
                    <Text
                    width={50}
                    textAlign="center"
                    fontFamily="Poppins-Bold"
                    fontSize={14}
                    color="#9098B1">
                    OR
                    </Text>
                </Box>
                <Box flex={1} height={0.3} backgroundColor="#9098B1" />
                <Box width="5%"></Box>
            </Box>

            {/* Sosial Media Button */}
            <Center marginBottom={2}>
                <Button
                    onPress={onGooglePressed}
                    variant="outline"
                    width="90%"
                    backgroundColor="#FFF">
                    <HStack
                        marginY={1.5}
                        alignItems="center"
                        justifyContent="space-around"
                        width="100%">
                        <Image
                        source={require('../../../assets/icons/SignIn/googleIcon.png')}
                        alt="googleIcon"
                        width={5}
                        height={5}
                        resizeMode="contain"
                        />
                        <Box textAlign="center">
                        <Center>
                            <Text
                            color="#9098B1"
                            fontSize={14}
                            fontFamily="Poppins-Bold">
                            Login with Google
                            </Text>
                        </Center>
                        </Box>
                        <Box width={5} height={5}></Box>
                    </HStack>
                </Button>
            </Center>

        </Box>
    </ScrollView>
  );
};

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
// });

export default SignInScreen;