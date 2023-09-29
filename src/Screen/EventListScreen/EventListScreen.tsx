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
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { AuthContext } from '../../Context/AuthContext';

const EventListScreen = ({ route }) => {
  // Navigation init
  const navigation = useNavigation();
  const [inputPencarian, setInputPencarian] = useState('');
  const [bannerOpen, setBannerOpen] = useState([]);
  const [listEvent, setListEvent] = useState([]);
  const [eventByOpen, setEventByOpen] = useState([]);
  const [eventByClose, setEventByClose] = useState([]);
  const [eventByPencarian, setEventByPencarian] = useState([]);
  const [isLoadingOpen, setIsLoadingOpen] = useState(true);
  const [isLoadingClose, setIsLoadingClose] = useState(true);
  const { userInfo } = useContext(AuthContext);


  const getListEvent = () => {
    axios
      .get(`${BASE_URL}/api/event/kategori/${route.params.kategori.id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      })
      .then(response => response.data)
      .then(data => {
        setListEvent(data.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsLoadingOpen(false));
  };

  const getListEventOpen = () => {
    axios
      .get(
        `${BASE_URL}/api/event/kategori/${route.params.kategori.id}/status/open`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
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
      .finally(() => {
        setIsLoadingOpen(false)
        // console.log(bannerOpen)
      });
  };
  const getListEventClose = () => {
    axios
      .get(
        `${BASE_URL}/api/event/kategori/${route.params.kategori.id}/status/close`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
      )
      .then(response => response.data)
      .then(data => {
        for (let index = 0; index < 4; index++) {
          if (data.data[index]) {
            let close = eventByClose.push(data.data[index]);
          }
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsLoadingClose(false));
  };

  useEffect(() => {
    getListEvent();
    getListEventOpen();
    getListEventClose();
  }, []);

  // Mendapatkan luas layar
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const InputPencarian = pencarian => {
    // Check if searched text is not blank
    if (pencarian) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = listEvent.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.nama ? item.nama.toUpperCase() : ''.toUpperCase();
        const textData = pencarian.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setEventByPencarian(newData);
      console.log(newData);
      setInputPencarian(pencarian);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setEventByPencarian([]);
      setInputPencarian(pencarian);
    }
  };

  const onPressJenisOpen = () => {
    navigation.navigate('DetailEventList', {
      id: route.params.kategori.id,
      status: 'open',
      kategori: 'upcoming',
    });
  };
  const onPressJenisClose = close => {
    console.log(close);
    navigation.navigate('DetailEventList', {
      id: route.params.kategori.id,
      status: 'close',
      kategori: 'last',
    });
  };

  const onPressDetailEvent = event => {
    navigation.navigate('DetailEvent', { id: event });
  };

  return (
    <ScrollView bgColor="#fff">
      <Header back={true} />

      <Input
        placeholder={'Cari ' + route.params.kategori.nama + ' ...'}
        fontSize={16}
        mt={5}
        mx={5}
        onChangeText={pencarian => InputPencarian(pencarian)}
        value={inputPencarian}
        borderRadius="xl"
      // InputRightElement={<SearchInput width={scale(25)} height={scale(25)} />}
      />
      <Box mx={5}>
        {setEventByPencarian != 0 ? (
          eventByPencarian.map((pencarian, index) => {
            if (pencarian.event_media[0].jenis == 'image') {
              var image = (
                <Image
                  source={{
                    uri: `${BASE_URL}/storage/files/event-media/${pencarian.event_media[0].file}`,
                  }}
                  width="100%"
                  alt="image"
                  height={windowHeight * (20 / 100)}
                  borderRadius={10}
                  resizeMode="contain"
                />
              );
            } else {
              var image = (
                <Image
                  source={{ uri: `${pencarian.event_media[0].thumbnail}` }}
                  width="100%"
                  alt="image"
                  height={windowHeight * (20 / 100)}
                  borderRadius={10}
                  resizeMode="contain"
                />
              );
            }
            let dateStart = new Date(pencarian.tanggal_mulai);
            let dateEnd = new Date(pencarian.tanggal_selesai);
            let formatDateStart = format(dateStart, "dd");
            let formatDateEnd = format(dateEnd, "dd MMMM yyyy");
            let displayDate = `${formatDateStart} - ${formatDateEnd}`
            return (
              <Box width="45%" m={2} key={index}>
                <TouchableOpacity
                  onPress={() => onPressDetailEvent(pencarian.id)}>
                  {image}
                  <Text color="#A6ADB5" my={2}>
                    {displayDate}
                  </Text>
                  <Text fontWeight="bold" fontSize={16}>
                    {pencarian.nama}
                  </Text>
                </TouchableOpacity>
              </Box>
            );
          })
        ) : (
          <></>
        )}
      </Box>
      {/* Upcoming Event */}
      <Box>
        <HStack p={5} alignItems="center" justifyContent="space-between">
          <Text fontSize={18} fontWeight="bold">
            Upcoming Event
          </Text>
          <TouchableOpacity onPress={() => onPressJenisOpen()}>
            <Text fontSize={14} fontWeight="bold" color="#002A47">
              View all
            </Text>
          </TouchableOpacity>
        </HStack>
        <Flex direction="row" flexWrap="wrap" px={5}>
          {isLoadingOpen ? (
            <Spinner color="indigo.500" flex={1} />
          ) : bannerOpen ? (
            <Box width="100%" m={2}>
              <TouchableOpacity
                onPress={() => onPressDetailEvent(bannerOpen.id)}>
                {bannerOpen.event_media ? (
                  bannerOpen.event_media[0].jenis == 'image' ? (
                    <Image
                      source={{
                        uri: `${BASE_URL}/storage/files/event-media/${bannerOpen.event_media[0].file}`,
                      }}
                      width="100%"
                      alt="image"
                      height={windowHeight * (25 / 100)}
                      borderRadius={10}
                      resizeMode="fill"
                    />
                  ) : (
                    <Image
                      source={{ uri: `${bannerOpen.event_media[0].thumbnail}` }}
                      width="100%"
                      alt="image"
                      height={windowHeight * (20 / 100)}
                      borderRadius={10}
                      resizeMode="contain"
                    />
                  )
                ) : (
                  <Box width="100%" height={windowHeight * (20 / 100)}>

                    <Center>no Image</Center>
                  </Box>
                )}
                {/* <Text color="#A6ADB5" my={2}> */}
                {/* {bannerOpen.tanggal_mulai} */}
                {/* </Text> */}
                <Text fontWeight="bold" fontSize={16} my={1}>
                  {bannerOpen.nama}
                </Text>
              </TouchableOpacity>
            </Box>
          ) : (
            <Box width="100%">
              <Text textAlign="center" color="#A6ADB5" my={3}>
                Event Tidak Ditemukan
              </Text>
            </Box>
          )}
          {isLoadingOpen ? (
            <Spinner color="indigo.500" flex={1} />
          ) : eventByOpen.length != 0 ? (
            eventByOpen.map(function (open, index) {
              // console.log(open.event_media[0].file)
              // let getImage = [];
              // for (let i = 0; i < open.event_media.length; i++) {
              //   if (open.event_media[i].utama == 1) {
              //     getImage.push(open.event_media[i]);
              //   }
              // }
              if (open.event_media.length != 0) {
                if (open.event_media[0].jenis == 'image') {
                  var image = (
                    <Image
                      source={{
                        uri: `${BASE_URL}/storage/files/event-media/${open.event_media[0].file}`,
                      }}
                      width="100%"
                      alt="image"
                      height={windowHeight * (20 / 100)}
                      borderRadius={10}
                      resizeMode="contain"
                    />
                  );
                } else {
                  var image = (
                    <Image
                      source={{ uri: `${open.event_media[0].thumbnail}` }}
                      width="100%"
                      alt="image"
                      height={windowHeight * (20 / 100)}
                      borderRadius={10}
                      resizeMode="contain"
                    />
                  );
                }
              } else {
                var image = (
                  <Box
                    width="100%"
                    height={windowHeight * (20 / 100)}
                    borderRadius={10}>
                    <Center>no Image</Center>
                  </Box>
                );
              }
              let dateStart = new Date(open.tanggal_mulai);
              let dateEnd = new Date(open.tanggal_selesai);
              let formatDateStart = format(dateStart, 'dd');
              let formatDateEnd = format(dateEnd, 'dd MMMM yyyy');
              let displayDate = `${formatDateStart} - ${formatDateEnd}`;

              return (
                <Box width="45%" m={2} key={index}>
                  <TouchableOpacity onPress={() => onPressDetailEvent(open.id)}>
                    {image}
                    <Text color="#A6ADB5" my={1} fontSize={12}>
                      {displayDate}
                    </Text>
                    <Text fontWeight="bold" fontSize={16}>
                      {open.nama}
                    </Text>
                  </TouchableOpacity>
                </Box>
              );
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

      {/* Last event */}
      < Box >
        <HStack p={5} alignItems="center" justifyContent="space-between">
          <Text fontSize={18} fontWeight="bold">
            Last Event
          </Text>
          <TouchableOpacity onPress={() => onPressJenisClose()}>
            <Text fontSize={14} fontWeight="bold" color="#002A47">
              View all
            </Text>
          </TouchableOpacity>
        </HStack>
        <Flex direction="row" flexWrap="wrap" px={5}>
          {isLoadingClose ? (
            <Spinner color="indigo.500" flex={1} />
          ) : eventByClose.length != 0 ? (
            eventByClose.map((close, index) => {
              let getImage = [];
              for (let i = 0; i < close.event_media.length; i++) {
                if (close.event_media[i].utama == 1) {
                  getImage.push(close.event_media[i]);
                }
              }
              if (getImage.length != 0) {
                if (getImage[0].jenis == 'image') {
                  var image = (
                    <Image
                      source={{
                        uri: `${BASE_URL}/storage/files/event-media/${getImage[0].file}`,
                      }}
                      width="100%"
                      alt="image"
                      height={windowHeight * (20 / 100)}
                      borderRadius={10}
                      resizeMode="contain"
                    />
                  );
                } else {
                  var image = (
                    <Image
                      source={{ uri: `${getImage[0].thumbnail}` }}
                      width="100%"
                      alt="image"
                      height={windowHeight * (20 / 100)}
                      borderRadius={10}
                      resizeMode="contain"
                    />
                  );
                }
              } else {
                var image = (
                  <Box
                    width="100%"
                    height={windowHeight * (20 / 100)}
                    borderRadius={10}>
                    <Center>no Image</Center>
                  </Box>
                );
              }
              let dateStart = new Date(close.tanggal_mulai);
              let dateEnd = new Date(close.tanggal_selesai);
              let formatDateStart = format(dateStart, 'dd');
              let formatDateEnd = format(dateEnd, 'dd MMMM yyyy');
              let displayDate = `${formatDateStart} - ${formatDateEnd}`;

              return (
                <Box width="45%" m={2} key={index}>
                  <TouchableOpacity
                    onPress={() => onPressDetailEvent(close.id)}>
                    {image}
                    <Text color="#A6ADB5" my={2}>
                      {displayDate}
                    </Text>
                    <Text fontWeight="bold" fontSize={16}>
                      {close.nama}
                    </Text>
                  </TouchableOpacity>
                </Box>
              );
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
