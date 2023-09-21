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
  const [eventByKategori, setEventByKategori] = useState([]);
  const [eventByOnline, setEventByOnline] = useState([]);
  const [eventByOnsite, setEventByOnsite] = useState([]);
  const [eventByHybrid, setEventByHybrid] = useState([]);
  const [isLoadingOnsite, setIsLoadingOnsite] = useState(true);
  const [isLoadingOnline, setIsLoadingOnline] = useState(true);
  const [isLoadingHybrid, setIsLoadingHybrid] = useState(true);

  // const getListEvent = () => {

  //   axios
  //     .get(
  //       `${BASE_URL}/event_kategori_by_jenis_kategori/${route.params.kategori.id}`,
  //     )
  //     .then(response => response.data)
  //     .then(data => {
  //       setEventByKategori(data.get_event_by_kategori);
  //       setEventByOnlineFull(data.get_event_by_online);
  //       setEventByOnsiteFull(data.get_event_by_onsite);
  //       setEventByHybridFull(data.get_event_by_hybrid);
  //       for (let index = 0; index < 4; index++) {
  //         if (data.get_event_by_online[index]) {
  //           let gi = eventByOnline.push(data.get_event_by_online[index]);
  //         }
  //         if (data.get_event_by_onsite[index]) {
  //           let gu = eventByOnsite.push(data.get_event_by_onsite[index]);
  //         }
  //         if (data.get_event_by_hybrid[index]) {
  //           let ge = eventByHybrid.push(data.get_event_by_hybrid[index]);
  //         }
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  //     .finally(() => setIsLoading(false));
  // };
  const getListEventOnsite = () => {
    axios
      .get(
        `${BASE_URL}/event/kategori/${route.params.kategori.id}/online/onsite`,
      )
      .then(response => response.data)
      .then(data => {
        for (let index = 0; index < 4; index++) {
          if (data.data[index]) {
            let onsite = eventByOnsite.push(data.data[index]);
          }
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsLoadingOnsite(false))
  };
  const getListEventOnline = () => {
    axios
      .get(
        `${BASE_URL}/event/kategori/${route.params.kategori.id}/online/online`,
      )
      .then(response => response.data)
      .then(data => {
        for (let index = 0; index < 4; index++) {
          if (data.data[index]) {
            let online = eventByOnline.push(data.data[index]);
          }
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsLoadingOnline(false))
  };
  const getListEventHybrid = () => {
    axios
      .get(
        `${BASE_URL}/event/kategori/${route.params.kategori.id}/online/hybrid`,
      )
      .then(response => response.data)
      .then(data => {
        // for (let index = 0; index < 4; index++) {
        //   if (data.data[index]) {
        //     let hybrid = eventByHybrid.push(data.data[index]);
        //   }
        // }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsLoadingHybrid(false))
  };

  useEffect(() => {
    getListEventOnsite();
    getListEventOnline();
    getListEventHybrid();
  }, []);

  // Mendapatkan luas layar
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const onPressJenisOnsite = () => {
    navigation.navigate('DetailEventList', {
      kategori: route.params.kategori.id,
      jenis: 'onsite'
    })
  };
  const onPressJenisOnline = () => {
    navigation.navigate('DetailEventList', {
      kategori: route.params.kategori.id,
      jenis: 'online'
    })
  };
  const onPressJenisHybrid = () => {
    navigation.navigate('DetailEventList', {
      kategori: route.params.kategori.id,
      jenis: 'hybrid'
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
            Onsite Event
          </Text>
          <TouchableOpacity onPress={() => onPressJenisOnsite()}>
            <Text fontSize={14} fontWeight="bold" color="#002A47">
              View all
            </Text>
          </TouchableOpacity>
        </HStack>
        <Flex direction="row" flexWrap="wrap" px={5}>
          {isLoadingOnsite ? (
            <Spinner color="indigo.500" flex={1} />
          ) : eventByOnsite.length != 0 ? (
            eventByOnsite.map(function (onsite, index) {
              let getImage = [];
              for (let i = 0; i < onsite.event_media.length; i++) {
                if (onsite.event_media[i].utama == 1) {
                  getImage.push(onsite.event_media[i])
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
                <TouchableOpacity onPress={() => onPressDetailEvent(onsite.id)}>
                  {image}
                  <Text color="#A6ADB5" my={2}>
                    {onsite.tanggal_mulai}
                  </Text>
                  <Text fontWeight="bold" fontSize={16}>
                    {onsite.nama}
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
      </Box>

      {/* Online event */}
      <Box>
        <HStack p={5} alignItems="center" justifyContent="space-between">
          <Text fontSize={18} fontWeight="bold">
            Online Event
          </Text>
          <TouchableOpacity onPress={() => onPressJenisOnline()}>
            <Text fontSize={14} fontWeight="bold" color="#002A47">
              View all
            </Text>
          </TouchableOpacity>
        </HStack>
        <Flex direction="row" flexWrap="wrap" px={5}>
          {isLoadingOnline ? (
            <Spinner color="indigo.500" flex={1} />
          ) : eventByOnline.length != 0 ? (
            eventByOnline.map((online, index) => {
              let getImage = [];
              for (let i = 0; i < online.event_media.length; i++) {
                if (online.event_media[i].utama == 1) {
                  getImage.push(online.event_media[i])
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
                <TouchableOpacity onPress={() => onPressDetailEvent(online.id)}>
                  {image}
                  <Text color="#A6ADB5" my={2}>
                    {online.tanggal_mulai}
                  </Text>
                  <Text fontWeight="bold" fontSize={16}>
                    {online.nama}
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
      </Box>

      {/* Hybrid event */}
      <Box>
        <HStack p={5} alignItems="center" justifyContent="space-between">
          <Text fontSize={18} fontWeight="bold">
            Hybrid Event
          </Text>
          <TouchableOpacity onPress={() => onPressJenisHybrid()}>
            <Text fontSize={14} fontWeight="bold" color="#002A47">
              View all
            </Text>
          </TouchableOpacity>
        </HStack>
        <Flex direction="row" flexWrap="wrap" px={5}>
          {isLoadingHybrid ? (
            <Spinner color="indigo.500" flex={1} />
          ) : eventByHybrid.length != 0 ? (
            eventByHybrid.map((hybrid, index) => {
              let getImage = [];
              for (let i = 0; i < hybrid.event_media.length; i++) {
                if (hybrid.event_media[i].utama == 1) {
                  getImage.push(hybrid.event_media[i])
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
                <TouchableOpacity onPress={() => onPressDetailEvent(hybrid.id)}>
                  {image}
                  <Text color="#A6ADB5" my={2}>
                    {hybrid.tanggal_mulai}
                  </Text>
                  <Text fontWeight="bold" fontSize={16}>
                    {hybrid.nama}
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
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default EventListScreen;
