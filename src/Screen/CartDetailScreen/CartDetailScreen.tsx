import {
  AspectRatio,
  Box,
  ScrollView,
  Text,
  View,
  Image,
  HStack,
  VStack,
  Spinner,
} from 'native-base';
import Header from '../../Component/Cart/Header';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { BASE_URL } from '../../config';
import { format } from 'date-fns';
import { useNavigation } from "@react-navigation/native";
import { scale } from 'react-native-size-matters';


// SVG
import Dates from '../../../assets/icons/EventDetail/calendar.svg';
import Location from '../../../assets/icons/EventDetail/mappin.svg'


const CartDetailScreen = ({ route }) => {
  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();
  const [CartDetail, setCartDetail] = useState([]);
  const [listPeserta, setListPeserta] = useState([]);
  const [isLoadingPeserta, setIsLoadingPeserta] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subTotal, setSubtotal] = useState(0);
  const [subDiskon, setSubDiskon] = useState(0);
  const [biayaAdmin, setBiayaAdmin] = useState(0);
  const [totalPembayaran, setTotalPembayaran] = useState(0);

  useEffect(() => {
    getCartDetail();
  }, []);

  const getCartDetail = () => {
    axios
      .get(`${BASE_URL}/api/cart-list-detail/user/${userInfo.user.id}/event/${route.params.event}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      })
      .then(response => response.data)
      .then(data => {
        setCartDetail(data.data);
        setListPeserta(data.peserta);
      })
      .then(() => {
        setSubtotal(CartDetail.jumlah_bayar);
        setSubDiskon(0);
        setBiayaAdmin(4000);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const InformasiEvent = (information: any) => {
    let dateStart = new Date(information.information.event.tanggal_mulai);
    let dateEnd = new Date(information.information.event.tanggal_selesai);
    let formatDateStart = format(dateStart, 'dd');
    let checkDateEnd = format(dateEnd, 'dd');
    let formatDateEnd = format(dateEnd, 'dd MMMM yyyy');
    let displayDate = `${formatDateStart} - ${formatDateEnd}`;

    if (information.information.event.tipe_peserta == 1) {
      let rupiahFormat = information.information.event.harga_perevent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      var harga = (<Text fontWeight="medium" fontSize={17}>Rp. {rupiahFormat},- / Pasang</Text>)
    } else if (information.information.event.tipe_peserta == 2) {
      let rupiahFormat = information.information.event.harga_perevent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      var harga = (<Text fontWeight="medium" fontSize={17}> Rp. {rupiahFormat},- / Event</Text >)
    } else { var harga = <></> }
    return (
      <Box mx={2} mt={2}>
        <Text
          fontSize={20}
          fontWeight="medium"
          color="#002A48"
          width="100%">
          {information.information.event.nama}
        </Text>
        <HStack justifyContent="space-between">
          <VStack width="60%">
            <HStack>
              <Dates width={scale(20)} height={scale(20)} />
              <Text> {displayDate}</Text>
            </HStack>
            <HStack><Location width={scale(20)} height={scale(20)} />
              <Text>{information.information.event.lokasi}</Text></HStack>

            {harga}
          </VStack>
        </HStack>
      </Box>
    )
  }

  const InformasiPembayaran = ({ total, diskon, admin, pembayaran }: { total: number; diskon: number; admin: number; pembayaran: number }) => {

    let rupiahTotal = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    let rupiahDiskon = diskon.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    let rupiahAdmin = admin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    let rupiahPembayaran = pembayaran.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    setTotalPembayaran(pembayaran);

    return (
      <>
        <Box
          mx={5}
          mb={2}
          p={4}
          borderColor="coolGray.200"
          borderWidth="1"
          borderRadius={10}
        >
          <HStack justifyContent="space-between" mb={1}>
            <Text fontSize={14} color="#91989F" fontWeight="medium">Subtotal</Text>
            <Text fontSize={14} color="#91989F" fontWeight="medium">Rp. {rupiahTotal},-</Text>
          </HStack>
          <HStack justifyContent="space-between" mb={1}>
            <Text fontSize={14} color="#91989F" fontWeight="medium">Diskon</Text>
            <Text fontSize={14} color="#91989F" fontWeight="medium">Rp. {rupiahDiskon},-</Text>
          </HStack>
          <HStack justifyContent="space-between" mb={1}>
            <Text fontSize={14} color="#91989F" fontWeight="medium">Biaya Admin</Text>
            <Text fontSize={14} color="#91989F" fontWeight="medium">Rp. {rupiahAdmin},-</Text>
          </HStack>
          <HStack justifyContent="space-between" mt={2}>
            <Text fontSize={16} color="#002A48" fontWeight="bold">Total Pembayaran</Text>
            <Text fontSize={16} color="#002A48" fontWeight="bold">Rp. {rupiahPembayaran},-</Text>
          </HStack>
        </Box>
        <Text fontSize={12} mx={6} textAlign="justify" color="#91989F" mt={1}>*Pastikan seluruh data peserta yang dimasukkan telah benar. Perubahan data peserta, pengembalian dana atau hal-hal lainnya akan diproses maksimal 3 x 24 jam oleh admin.</Text>

        <Box mx={5} my={5} mb={5}>
          <Box mb={2}>
            <TouchableOpacity >
              <Box bgColor="#002A48" py={4} borderRadius={20}>
                <Text color="#fff" textAlign="center" fontSize={16} fontWeight="medium">Checkout</Text>
              </Box>
            </TouchableOpacity>
          </Box>
          <Box mb={10}>
            <TouchableOpacity onPress={() => navigation.goBack()} >
              <Box bgColor="#91989F" py={4} borderRadius={20}>
                <Text color="#fff" textAlign="center" fontSize={16} fontWeight="medium">Kembali</Text>
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>
      </>
    )
  };


  return (
    <View>
      <Header />
      <ScrollView>
        {/* Detail Event */}
        <Box
          mx={5}
          mb={2}
          p={4}
          borderColor="coolGray.200"
          borderWidth="1"
          borderRadius={10}>
          <AspectRatio
            ratio={{
              base: 16 / 9,
            }}>
            {isLoading ? <Spinner /> : <Image
              borderRadius={10}
              resizeMode="cover"
              source={{
                uri: `${BASE_URL}/storage/files/featured-image/${CartDetail.event.featured_image}`,
              }}
              alt="Image"
            />}

          </AspectRatio>
          {isLoading ? <Spinner /> : <InformasiEvent information={CartDetail} />}

        </Box>

        {/* Daftar Peserta */}
        <Box
          mx={5}
          mb={2}
          p={4}
          borderColor="coolGray.200"
          borderWidth="1"
          borderRadius={10}>
          <Text
            fontSize={20}
            fontWeight="medium"
            color="#002A48"
            width="100%">
            Daftar Peserta
          </Text>
          {isLoading ? <Spinner /> : CartDetail.event.tipe_peserta == 0 ?
            listPeserta.map((peserta, index) => {
              return (<Box mt={2}>
                <HStack justifyContent="space-between">
                  <VStack width="70%">
                    <Text fontSize={16}>{peserta.user.name}</Text>
                    <Text fontSize={14} color="#777">Dewasa</Text>
                  </VStack>

                  <Text fontSize={16} fontWeight="medium" color="#002A48">Rp.{peserta.harga}</Text>
                </HStack>
              </Box>)
            }) : CartDetail.event.tipe_peserta == 1 ?
              listPeserta.map((peserta, index) => {
                return (<Box mt={2}>
                  <HStack justifyContent="space-between">
                    <VStack width="70%">
                      <Text fontSize={16}>{peserta.user.name}</Text>
                      <Text fontSize={14} color="#777">Dewasa</Text>
                    </VStack>

                    <Text fontSize={16} fontWeight="medium" color="#002A48">Rp.0</Text>
                  </HStack>
                  <HStack justifyContent="space-between">
                    <VStack width="70%">
                      <Text fontSize={16}>{peserta.pasangan.name}</Text>
                      <Text fontSize={14} color="#777">Dewasa</Text>
                    </VStack>

                    <Text fontSize={16} fontWeight="medium" color="#002A48">Rp.0</Text>
                  </HStack>
                </Box>)
              }) : listPeserta.map((peserta, index) => {
                return (<Box mt={2}>
                  <HStack justifyContent="space-between">
                    <VStack width="70%">
                      <Text fontSize={16}>{peserta.user.name}</Text>
                      <Text fontSize={14} color="#777">Dewasa</Text>
                    </VStack>

                    <Text fontSize={16} fontWeight="medium" color="#002A48">Rp.0</Text>
                  </HStack>
                </Box>)
              })}

        </Box>

        {/* Total Biaya */}
        {isLoading ?
          <Spinner /> : <InformasiPembayaran
            total={CartDetail.jumlah_bayar}
            diskon={subDiskon}
            admin={biayaAdmin}
            pembayaran={CartDetail.jumlah_bayar + subDiskon + biayaAdmin}
          />}

        <Box my={10}></Box>

      </ScrollView>
    </View>
  );
};
export default CartDetailScreen;
