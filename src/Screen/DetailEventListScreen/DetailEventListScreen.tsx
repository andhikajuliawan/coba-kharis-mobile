import { Box, Flex, Image, ScrollView, Spinner, Text } from "native-base";
import Header from "../../Component/EventList/Header";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useEffect, useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const DetailtEventListScreen = ({ route }) => {

    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [listEvent, setListEvent] = useState([]);

    const getListEvent = () => {
        axios
            .get(
                `${BASE_URL}/event/kategori/${route.params.kategori}/online/${route.params.jenis}`,
            )
            .then(response => response.data)
            .then(data => {
                if (route.params.jenis == 'onsite') {
                    setListEvent(data.data)
                } if (route.params.jenis == 'online') {
                    setListEvent(data.data)
                } if (route.params.jenis == 'hybrid') {
                    setListEvent(data.data)
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false)
            })
    };

    useEffect(() => {
        getListEvent();
    }, []);

    // Mendapatkan luas layar
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const onPressDetailEvent = (event) => {
        navigation.navigate('DetailEvent', { id: event })
    }

    return (
        <ScrollView>
            <Header />

            <Text m={5} fontSize={18} fontWeight="bold">Kategori : {route.params.jenis}</Text>
            <Flex direction="row" flexWrap="wrap" px={5}>
                {isLoading ? (
                    <Spinner color="indigo.500" flex={1} />
                ) : listEvent.length != 0 ? (
                    listEvent.map((event, index) => {
                        let getImage = [];
                        for (let i = 0; i < event.event_media.length; i++) {
                            if (event.event_media[i].utama == 1) {
                                getImage.push(event.event_media[i])
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
                            <TouchableOpacity onPress={() => onPressDetailEvent(event.id)}>
                                {image}
                                <Text color="#A6ADB5" my={2}>
                                    {event.tanggal_mulai}
                                </Text>
                                <Text fontWeight="bold" fontSize={16}>
                                    {event.nama}
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
        </ScrollView >
    )
};
export default DetailtEventListScreen;