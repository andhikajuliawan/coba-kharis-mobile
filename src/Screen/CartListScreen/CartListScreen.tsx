import {
  AspectRatio,
  Box,
  HStack,
  ScrollView,
  Text,
  VStack,
  View,
  Image,
  Spinner,
} from 'native-base';
import axios from 'axios';
import Header from '../../Component/Cart/Header';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { BASE_URL } from '../../config';
import { format } from 'date-fns';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CartListScreen = () => {
  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const [listCart, setListCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCartList();
  }, []);

  const getCartList = () => {
    axios
      .get(`${BASE_URL}/api/cart-list/user/${userInfo.user.id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      })
      .then(response => response.data)
      .then(data => setListCart(data.data))
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <View bgColor="#fff" flex={1}>
      <Header />
      <ScrollView>
        {isLoading ? <Spinner /> :
          listCart.map((cart, index) => {
            let dateStart = new Date(cart.event.tanggal_mulai);
            let dateEnd = new Date(cart.event.tanggal_selesai);
            let formatDateStart = format(dateStart, 'dd');
            let checkDateEnd = format(dateEnd, 'dd');
            let formatDateEnd = format(dateEnd, 'dd MMMM yyyy');
            let displayDate = `${formatDateStart} - ${formatDateEnd}`;

            return (
              < Box mx={5} p={5} borderColor="coolGray.200" borderWidth="1" borderRadius={10} index={index} mb={4}>
                <AspectRatio
                  ratio={{
                    base: 16 / 9,
                  }}>
                  <Image
                    borderRadius={10}
                    resizeMode="cover"
                    source={{
                      uri: `${BASE_URL}/storage/files/featured-image/${cart.event.featured_image}`,
                    }}
                    alt="Picture of a Flower"
                  />
                </AspectRatio>

                <Box mx={2} mt={2}>
                  <Text fontSize={20} fontWeight="medium" color="#002A48" width="100%" mb={2}>{cart.event.nama}</Text>
                  <HStack justifyContent="space-between">
                    <VStack width="60%">
                      <Text>{displayDate}</Text>
                      <Text >{cart.event.lokasi}</Text>
                    </VStack>
                    <VStack>
                      <TouchableOpacity onPress={() => navigation.navigate('CartDetail', { event: cart.event.id })}>
                        <Box bgColor="#002A48" px={8} py={3} borderRadius={50}>
                          <Text color="#fff">Bayar</Text>
                        </Box>
                      </TouchableOpacity>
                    </VStack>
                  </HStack>
                </Box>
              </Box>
            )
          })
        }

      </ScrollView>
    </View >
  );
};
export default CartListScreen;
