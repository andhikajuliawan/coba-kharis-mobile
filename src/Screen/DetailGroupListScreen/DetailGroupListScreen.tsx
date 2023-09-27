import axios from 'axios';
import { Spinner, Text, Flex, Box, Image, ScrollView, Center, Input } from 'native-base';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../config';
import { Dimensions, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import Header from '../../Component/DetailGroupList/Header';

const DetailGroupListScreen = ({ route }) => {
  const navigation = useNavigation();
  const [listEvent, setListEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputPencarian, setInputPencarian] = useState('');
  const [eventByPencarian, setEventByPencarian] = useState([]);

  useEffect(() => {
    getGroupList();
  }, []);

  const getGroupList = () => {
    axios
      .get(`${BASE_URL}/api/event/group/${route.params.group}`)
      .then(response => response.data)
      .then(data => setListEvent(data.data))
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const onPressDetailEvent = (id) => {
    navigation.navigate('DetailEvent', { id: id })
  }

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
  }

  // Mendapatkan luas layar
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <ScrollView>
      <Header />

      <Text mx={5} fontSize={18} fontWeight="bold">Group {route.params.group}</Text>
      <Input
        placeholder={'Cari ' + route.params.group + ' ...'}
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
            if (pencarian.event_media.length != 0) {
              if (pencarian.event_media[0].jenis == 'image') {
                var image = (
                  <Image
                    source={{
                      uri: `${BASE_URL}/storage/files/event-media/${pencarian.event_media[0].file}`,
                    }}
                    width="100%"
                    alt="image"
                    height={windowHeight * (15 / 100)}
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
                    height={windowHeight * (15 / 100)}
                    borderRadius={10}
                    resizeMode="contain"
                  />
                );
              }
            } else {
              var image = (
                <Box
                  width="100%"
                  height={windowHeight * (15 / 100)}
                  borderRadius={10}>
                  <Center>no Image</Center>
                </Box>
              );
            }
            let dateStart = new Date(pencarian.tanggal_mulai);
            let dateEnd = new Date(pencarian.tanggal_selesai);
            let formatDateStart = format(dateStart, 'dd');
            let formatDateEnd = format(dateEnd, 'dd MMMM yyyy');
            let displayDate = `${formatDateStart} - ${formatDateEnd}`;
            return (
              <Box width="45%" m={2} key={index}>
                <TouchableOpacity
                  onPress={() => onPressDetailEvent(pencarian.id)}>
                  {image}
                  <Text color="#A6ADB5" my={2}>
                    {pencarian.tanggal_mulai}
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
      <Flex direction="row" flexWrap="wrap" px={5} mt={5}>
        {isLoading ? (
          <Spinner />
        ) : (
          listEvent.map((event, index) => {

            if (event.event_media.length != 0) {
              if (event.event_media[0].jenis == 'image') {
                var image = (
                  <Image
                    source={{
                      uri: `${BASE_URL}/storage/files/event-media/${event.event_media[0].file}`,
                    }}
                    width="100%"
                    alt="image"
                    height={windowHeight * (15 / 100)}
                    borderRadius={10}
                    resizeMode="contain"
                  />
                );
              } else {
                var image = (
                  <Image
                    source={{ uri: `${event.event_media[0].thumbnail}` }}
                    width="100%"
                    alt="image"
                    height={windowHeight * (15 / 100)}
                    borderRadius={10}
                    resizeMode="contain"
                  />
                );
              }
            } else {
              var image = (
                <Box
                  width="100%"
                  height={windowHeight * (15 / 100)}
                  borderRadius={10}>
                  <Center>no Image</Center>
                </Box>
              );
            }
            let dateStart = new Date(event.tanggal_mulai);
            let dateEnd = new Date(event.tanggal_selesai);
            let formatDateStart = format(dateStart, 'dd');
            let formatDateEnd = format(dateEnd, 'dd MMMM yyyy');
            let displayDate = `${formatDateStart} - ${formatDateEnd}`;
            return (
              <Box width="45%" m={2} key={index}>
                <TouchableOpacity onPress={() => onPressDetailEvent(event.id)}>
                  {image}
                  <Text color="#A6ADB5" my={2}>
                    {displayDate}
                  </Text>
                  <Text fontWeight="bold" fontSize={16}>
                    {event.nama}
                  </Text>
                </TouchableOpacity>
              </Box>
            );
          })
        )}
      </Flex>
    </ScrollView>
  );
};

export default DetailGroupListScreen;
