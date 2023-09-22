import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Header from '../../Component/EventList/Header';
import {
  Box,
  HStack,
  Input,
  Text,
  Image,
  Flex,
  Center,
  ScrollView,
  Spinner,
} from 'native-base';

// SVG
import SearchInput from '../../../assets/icons/EvenList/Header/Search-Input.svg';

import { ScaledSheet } from 'react-native-size-matters';
import { scale } from 'react-native-size-matters';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { useNavigation } from '@react-navigation/native';

const EventListScreen = ({ route }) => {
  // Navigation init
  const navigation = useNavigation();
  const [inputPencarian, setInputPencarian] = useState('');
  const [bannerOpen, setBannerOpen] = useState([]);
  const [eventByOpen, setEventByOpen] = useState([]);
  const [bannerClose, setBannerClose] = useState([]);
  const [eventByClose, setEventByClose] = useState([]);
  const [isLoadingOpen, setIsLoadingOpen] = useState(true);
  const [isLoadingClose, setIsLoadingClose] = useState(true);


  const getListEventOpen = () => {
    axios
      .get(
        `${BASE_URL}/event/kategori/${route.params.kategori.id}/status/open`,
      )
      .then(response => response.data)
      .then(data => {
        for (let index = 1; index < 5; index++) {
          if (data.data[index]) {
            let open = eventByOpen.push(data.data[index]);
          }
        }
        setBannerOpen(data.data[0]);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsLoadingOpen(false))
  };
  const getListEventClose = () => {
    axios
      .get(
        `${BASE_URL}/event/kategori/${route.params.kategori.id}/status/close`,
      )
      .then(response => response.data)
      .then(data => {
        for (let index = 1; index < 5; index++) {
          if (data.data[index]) {
            let close = eventByClose.push(data.data[index]);
          }
        }
        setBannerClose(data.data[0]);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsLoadingClose(false))
  };


  useEffect(() => {
    getListEventOpen();
    getListEventClose();

  }, []);

  // Mendapatkan luas layar
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const onPressJenisOpen = () => {
    navigation.navigate('DetailEventList', {
      kategori: route.params.kategori.id,
      status: 'open'
    })
  };
  const onPressJenisClose = () => {
    navigation.navigate('DetailEventList', {
      kategori: route.params.kategori.id,
      status: 'close'
    })
  };

  const onPressDetailEvent = (event) => {
    navigation.navigate('DetailEvent', { id: event })
  }

  return (
    <ScrollView bgColor="#fff">
      <Header />

      <Input
        placeholder={'Cari ' + route.params.kategori.nama + ' ...'}
        fontSize={16}
        mt={5}
        mx={5}
        value={inputPencarian}
        borderRadius="xl"
        InputRightElement={<SearchInput width={scale(25)} height={scale(25)} />}
      />
      {/* Onsite Event */}
      <Box>
        <HStack p={5} alignItems="center" justifyContent="space-between">
          <Text fontSize={18} fontWeight="bold">
            Open Event
          </Text>
          <TouchableOpacity onPress={() => onPressJenisOpen()}>
            <Text fontSize={14} fontWeight="bold" color="#002A47">
              View all
            </Text>
          </TouchableOpacity>
        </HStack>
        <Flex direction="row" flexWrap="wrap" px={5}>
          {isLoadingOpen ?
            <Spinner color="indigo.500" flex={1} />
            : bannerOpen ?
              < Box
                width="100%"
                m={2}  >
                < TouchableOpacity onPress={() => onPressDetailEvent(bannerOpen.id)}>
                  {bannerOpen.event_media[0].jenis == 'image' ? <Image
                    source={{ uri: `http://192.168.1.4:8000/storage/files/event-media/${bannerOpen.event_media[0].file}` }}
                    width="100%"
                    alt='image'
                    height={windowHeight * (15 / 100)}
                    borderRadius={10}
                    resizeMode="contain"
                  /> : <Image
                    source={{ uri: `${bannerOpen.event_media[0].thumbnail}` }}
                    width="100%"
                    alt='image'
                    height={windowHeight * (20 / 100)}
                    borderRadius={10}
                    resizeMode="contain"
                  />}
                  <Text color="#A6ADB5" my={2}>
                    {bannerOpen.tanggal_mulai}
                  </Text>
                  <Text fontWeight="bold" fontSize={16}>
                    {bannerOpen.nama}
                  </Text>
                </TouchableOpacity>
              </Box> : <Box width="100%">
                <Text textAlign="center" color="#A6ADB5" my={3}>
                  Event Tidak Ditemukan
                </Text>
              </Box>}
          {isLoadingOpen ? (
            <Spinner color="indigo.500" flex={1} />
          ) : eventByOpen.length != 0 ? (
            eventByOpen.map(function (open, index) {
              let getImage = [];
              for (let i = 0; i < open.event_media.length; i++) {
                if (open.event_media[i].utama == 1) {
                  getImage.push(open.event_media[i])
                }
              }
              if (getImage[0].jenis == 'image') {
                var image = <Image
                  source={{ uri: `http://192.168.1.11:8000/storage/files/event-media/${getImage[0].file}` }}
                  width="100%"
                  alt='image'
                  height={windowHeight * (15 / 100)}
                  borderRadius={10}
                  resizeMode="contain"
                />
              } else {
                var image = <Image
                  source={{ uri: `${getImage[0].thumbnail}` }}
                  width="100%"
                  alt='image'
                  height={windowHeight * (15 / 100)}
                  borderRadius={10}
                  resizeMode="contain"
                />
              }

              return (< Box
                width="45%"
                m={2} key={index} >
                < TouchableOpacity onPress={() => onPressDetailEvent(open.id)}>
                  {image}
                  <Text color="#A6ADB5" my={2}>
                    {open.tanggal_mulai}
                  </Text>
                  <Text fontWeight="bold" fontSize={16}>
                    {open.nama}
                  </Text>
                </TouchableOpacity>
              </Box>
              )
            })
          ) : (
            <Box width="100%">
              <Text textAlign="center" color="#A6ADB5" my={3}>
                Event Tidak Ditemukan
              </Text>
            </Box>
          )}
        </Flex>
      </Box >

      {/* Online event */}
      < Box >
        <HStack p={5} alignItems="center" justifyContent="space-between">
          <Text fontSize={18} fontWeight="bold">
            Close Event
          </Text>
          <TouchableOpacity onPress={() => onPressJenisClose()}>
            <Text fontSize={14} fontWeight="bold" color="#002A47">
              View all
            </Text>
          </TouchableOpacity>
        </HStack>
        <Flex direction="row" flexWrap="wrap" px={5}>
          {isLoadingClose ?
            <Spinner color="indigo.500" flex={1} /> : bannerClose ?
              < Box
                width="100%"
                m={2}  >
                < TouchableOpacity onPress={() => onPressDetailEvent(bannerClose.id)}>
                  {bannerClose.event_media[0].jenis == 'image' ? <Image
                    source={{ uri: `http://192.168.1.4:8000/storage/files/event-media/${bannerClose.event_media[0].file}` }}
                    width="100%"
                    alt='image'
                    height={windowHeight * (15 / 100)}
                    borderRadius={10}
                    resizeMode="contain"
                  /> : <Image
                    source={{ uri: `${bannerClose.event_media[0].thumbnail}` }}
                    width="100%"
                    alt='image'
                    height={windowHeight * (20 / 100)}
                    borderRadius={10}
                    resizeMode="contain"
                  />}
                  <Text color="#A6ADB5" my={2}>
                    {bannerClose.tanggal_mulai}
                  </Text>
                  <Text fontWeight="bold" fontSize={16}>
                    {bannerClose.nama}
                  </Text>
                </TouchableOpacity>
              </Box> : <Box width="100%">
                <Text textAlign="center" color="#A6ADB5" my={3}>
                  Event Tidak Ditemukan
                </Text>
              </Box>}
          {isLoadingClose ? (
            <Spinner color="indigo.500" flex={1} />
          ) : eventByClose.length != 0 ? (
            eventByClose.map((close, index) => {
              let getImage = [];
              for (let i = 0; i < close.event_media.length; i++) {
                if (close.event_media[i].utama == 1) {
                  getImage.push(close.event_media[i])
                }
              }
              if (getImage[0].jenis == 'image') {
                var image = <Image
                  source={{ uri: `http://192.168.1.11:8000/storage/files/event-media/${getImage[0].file}` }}
                  width="100%"
                  alt='image'
                  height={windowHeight * (15 / 100)}
                  borderRadius={10}
                  resizeMode="contain"
                />
              } else {
                var image = <Image
                  source={{ uri: `${getImage[0].thumbnail}` }}
                  width="100%"
                  alt='image'
                  height={windowHeight * (15 / 100)}
                  borderRadius={10}
                  resizeMode="contain"
                />
              }
              return <Box width="45%" m={2} key={index}>
                <TouchableOpacity onPress={() => onPressDetailEvent(close.id)}>
                  {image}
                  <Text color="#A6ADB5" my={2}>
                    {close.tanggal_mulai}
                  </Text>
                  <Text fontWeight="bold" fontSize={16}>
                    {close.nama}
                  </Text>
                </TouchableOpacity>
              </Box>
            })
          ) : (
            <Box width="100%">
              <Text textAlign="center" color="#A6ADB5" my={3}>
                Event Tidak Ditemukan
              </Text>
            </Box>
          )}
        </Flex>
      </Box >


    </ScrollView >
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default EventListScreen;
