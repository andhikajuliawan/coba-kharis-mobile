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
  Spinner,
  Select,
  Pressable
} from 'native-base';

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";

import React, {useContext, useState} from 'react';
import {AuthContext} from '../../Context/AuthContext';
// import Spinner from 'react-native-loading-spinner-overlay';
import { ScaledSheet } from 'react-native-size-matters';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";

import Username from '../../../assets/icons/SignIn/user-regular.svg';
import Password from '../../../assets/icons/SignIn/key-outline.svg';
import Email from '../../../assets/icons/SignIn/email.svg';
import Calendar from '../../../assets/icons/SignIn/calendar.svg';
import Gender from '../../../assets/icons/SignIn/gender.svg';
import Job from '../../../assets/icons/SignIn/job.svg';
import Phone from '../../../assets/icons/SignIn/phone.svg';
import Location from '../../../assets/icons/SignIn/pin.svg';

import {useNavigation} from '@react-navigation/native';

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [alamat, setAlamat] = useState('');
  const [telp, setTelp] = useState('');
  const [job, setJob] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');

  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const startDate = "1879/06/01";
  const [selectedStartDate, setSelectedStartDate] = useState("Date of Birth");
  const [startedDate, setStartedDate] = useState("17/07/1879");

  const {isLoading, isLoadingGoogle, register, signIn} = useContext(AuthContext);

  const navigation = useNavigation();

  const onGooglePressed = () => {
    console.log(password);
  };
 

  const onSubmitPressed = () => {
    // console.log(username, name, email, alamat, telp, job, gender, selectedStartDate, password);
    navigation.navigate('SignIn');
  };

  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
  }

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
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
                        Sign up to continue
                    </Text>
                </VStack>
            </Center>

            {/* Input */}
            <Box alignItems="center">
                <Input
                    value={name}
                    onChangeText={text => setName(text)}
                    variant="outline"
                    placeholder="Full Name"
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
                    value={username}
                    onChangeText={text => setUsername(text)}
                    variant="outline"
                    placeholder="Username"
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
                    value={email}
                    onChangeText={text => setEmail(text)}
                    variant="outline"
                    placeholder="Email"
                    my={1}
                    py={3}
                    w="90%"
                    size="md"
                    type="text"
                    fontFamily="Poppins-Regular"
                    InputLeftElement={
                        <Email width={scale(18)} height={scale(18)} style={{marginLeft: 10}}/>
                    }
                />
            </Box>

            <Box alignItems="center">
                <Input
                    value={telp}
                    onChangeText={text => setTelp(text)}
                    variant="outline"
                    placeholder="No. Telphone"
                    my={1}
                    py={3}
                    w="90%"
                    size="md"
                    type="text"
                    keyboardType='numeric'
                    fontFamily="Poppins-Regular"
                    InputLeftElement={
                        <Phone width={scale(18)} height={scale(18)} style={{marginLeft: 10}}/>
                    }
                />
            </Box>

            <Box alignItems="center">
                <Input
                    value={alamat}
                    onChangeText={text => setAlamat(text)}
                    variant="outline"
                    placeholder="Address"
                    my={1}
                    py={3}
                    w="90%"
                    size="md"
                    type="text"
                    fontFamily="Poppins-Regular"
                    InputLeftElement={
                        <Location width={scale(18)} height={scale(18)} style={{marginLeft: 10}}/>
                    }
                />
            </Box>

            <Box alignItems="center">
                <Box 
                    mt={1}
                    my={1}
                    w="90%"
                >
                    <Pressable 
                        onPress={handleOnPressStartDate} 
                        py={4}
                        rounded="5" 
                        overflow="hidden" 
                        borderWidth="1" 
                        borderColor="coolGray.300" 
                        bg="coolGray.100" 
                    >
                        <HStack>
                            <Calendar width={scale(18)} height={scale(18)} style={{marginLeft: 10, marginRight: 10}}/>
                            <Text style={{color: "#9098B1"}}>{selectedStartDate}</Text>
                        </HStack>
                    </Pressable>
                </Box>

                {/* Create modal for date picker */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={openStartDatePicker}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <DatePicker
                        mode="calendar"
                        minimumDate={startDate}
                        selected={startedDate}
                        onDateChanged={handleChangeStartDate}
                        onSelectedChange={(date) => setSelectedStartDate(date)}
                        options={{
                            backgroundColor: "#080516",
                            textHeaderColor: "#469ab6",
                            textDefaultColor: "#FFFFFF",
                            selectedTextColor: "#FFF",
                            mainColor: "#469ab6",
                            textSecondaryColor: "#FFFFFF",
                            borderColor: "rgba(122, 146, 165, 0.1)",
                        }}
                        />

                        <TouchableOpacity onPress={handleOnPressStartDate}>
                        <Text style={{ color: "white" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </Modal>
            </Box>

            <Box alignItems="center">
                <Select 
                    selectedValue={gender} 
                    accessibilityLabel="Choose One" 
                    placeholder="Choose One" 
                    mt={1} 
                    variant="outline"
                    my={1}
                    py={3}
                    w="90%"
                    size="md"
                    fontFamily="Poppins-Regular"
                    onValueChange={text => setGender(text)}
                    InputLeftElement={
                        <Gender width={scale(18)} height={scale(18)} style={{marginLeft: 10}}/>
                    }
                >
                    <Select.Item label="Laki - Laki" value="Laki - Laki" />
                    <Select.Item label="Perempuan" value="Perempuan" />
                </Select>
            </Box>

            <Box alignItems="center">
                <Input
                    value={job}
                    onChangeText={text => setJob(text)}
                    variant="outline"
                    placeholder="Job Title"
                    my={1}
                    py={3}
                    w="90%"
                    size="md"
                    type="text"
                    fontFamily="Poppins-Regular"
                    InputLeftElement={
                        <Job width={scale(18)} height={scale(18)} style={{marginLeft: 10}}/>
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
                    onPress={() => { register(username, name, email, alamat, telp, job, gender, selectedStartDate, password); }}
                    variant="outline"
                    width="90%"
                    backgroundColor="#3EADE2">
                    <Text
                        color="white"
                        fontSize={14}
                        marginY={2}
                        fontFamily="Poppins-Bold">
                        {isLoading ? <Spinner color="#fff" /> : "Sign Up"}
                    </Text>
                </Button>
                <HStack marginTop={2}>
                    <Text fontFamily="Poppins-Regular" fontSize={14} color="#9098B1">
                        Already have an account ? 
                    </Text>
                    <Text
                        onPress={onSubmitPressed}
                        color="#3EADE2"
                        fontFamily="Poppins-Bold"
                        fontSize={14}
                        marginLeft={2}>
                        Sign In
                    </Text>
                </HStack>
            </Center>

            {/* Divider */}
            <Box flexDirection="row" alignItems="center" marginY={4}>
                <Box width="5%"></Box>
                <Box flex={1} height={0.4} backgroundColor="#9098B1" />
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
                <Box flex={1} height={0.4} backgroundColor="#9098B1" />
                <Box width="5%"></Box>
            </Box>

            {/* Sosial Media Button */}
            <Center marginBottom={2}>
                <Button
                    onPress={() => { signIn(); }}
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
                            {isLoadingGoogle ? <Spinner color="#9098B1" /> : "Login with Google"}
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#080516",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default SignInScreen;