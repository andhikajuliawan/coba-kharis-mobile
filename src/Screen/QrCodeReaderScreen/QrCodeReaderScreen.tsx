import axios from 'axios';
import { AlertDialog, Box, Button, Center, ScrollView, Text, Toast, View } from 'native-base';
import React, { useContext, useState } from 'react';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../Context/AuthContext';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

const QrCodeReaderScreen = () => {
  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  // Alert Dialog
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);
  const [message, setMessage] = useState('');

  const Header = () => {
    return (
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>
            Back
          </Text>
        </TouchableOpacity>

      </View>
    )
  }

  const AbsensiQrCode = (data: any) => {
    setIsLoading(true);
    axios
      .post(
        `${BASE_URL}/api/create-peserta-presensi/`,
        {
          qrcode: data,
          token: userInfo.token,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        // Toast.show({
        //   description: `${response.data.message}`
        // });

        setMessage(response.data);
        setIsOpen(!isOpen);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <Header />
      <QRCodeScanner
        onRead={({ data }) => AbsensiQrCode(data)}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        reactivate={true}
        reactivateTimeout={5000}
      />
      <Center>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>
              <Text></Text>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <Text>{message.message}</Text>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Box width="100%">
                <TouchableOpacity>
                  <Button
                    bgColor="#003459"
                    onPress={() => navigation.goBack()}>
                    <Text color="#fff">kembali</Text>
                  </Button>
                </TouchableOpacity>
              </Box>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>
    </>

  );
};
export default QrCodeReaderScreen;
