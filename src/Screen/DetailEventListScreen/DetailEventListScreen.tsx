import { Box, Flex, Image, ScrollView, Spinner, Text, Center } from "native-base";
import Header from "../../Component/DetailEventList/Header";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useContext, useEffect, useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { AuthContext } from "../../Context/AuthContext";

const DetailtEventListScreen = ({ route }) => {

    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [listEvent, setListEvent] = useState([]);
    const { userInfo } = useContext(AuthContext);


    const getListEvent = () => {
        axios
            .get(
                `${BASE_URL}/api/event/kategori/${route.params.id}/status/${route.params.status}`, {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            }
            )
            .then(response => response.data)
            .then(data => {
                setListEvent(data.data)

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
        <ScrollView bgColor="#fff">
            <Header />

            <Text m={5} fontSize={18} fontWeight="bold">Kategori : {route.params.kategori} event</Text>
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
                        if (getImage.length != 0) {
                            if (getImage[0].jenis == 'image') {
                                var image = <Image
                                    source={{ uri: `${BASE_URL}/storage/files/event-media/${getImage[0].file}` }}
                                    width="100%"
                                    alt='image'
                                    height={windowHeight * (20 / 100)}
                                    borderRadius={10}
                                    resizeMode="contain"
                                />
                            } else {
                                var image = <Image
                                    source={{ uri: `${getImage[0].thumbnail}` }}
                                    width="100%"
                                    alt='image'
                                    height={windowHeight * (20 / 100)}
                                    borderRadius={10}
                                    resizeMode="contain"
                                />
                            }
                        } else {
                            var image = <Box
                                width="100%"
                                height={windowHeight * (20 / 100)}
                                borderRadius={10}
                            >
                                <Center>no Image</Center></Box>
                        }

                        let dateStart = new Date(event.tanggal_mulai);
                        let dateEnd = new Date(event.tanggal_selesai);
                        let formatDateStart = format(dateStart, "dd");
                        let formatDateEnd = format(dateEnd, "dd MMMM yyyy");
                        let displayDate = `${formatDateStart} - ${formatDateEnd}`

                        const panjangText = event.nama.length > 30 ? event.nama.substring(0, 30) + '...' : event.nama;

                        return <Box width="45%" m={2} key={index}>
                            <TouchableOpacity onPress={() => onPressDetailEvent(event.id)}>
                                {image}
                                <Text color="#A6ADB5" mt={2} fontSize={12}>
                                    {displayDate}
                                </Text>
                                <Text fontWeight="bold" fontSize={16} lineHeight={20}>
                                    {panjangText}
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