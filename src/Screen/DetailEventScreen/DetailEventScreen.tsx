import { Box, Center, Image, HStack, ScrollView, Spinner, Text } from "native-base"
import Header from "../../Component/DetailEvent/Header";
import { Alert, Dimensions, ImageBackground, Linking, TouchableOpacity, useWindowDimensions } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { scale } from 'react-native-size-matters';
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import RenderHTML from "react-native-render-html";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

// SVG
import Date from '../../../assets/icons/EventDetail/calendar.svg'
import Location from '../../../assets/icons/EventDetail/mappin.svg'
import Person from '../../../assets/icons/EventDetail/person.svg'
import Money from '../../../assets/icons/EventDetail/giftcard.svg'



const DetailtEventScreen = ({ route }) => {
    const [eventList, setEventList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);


    const getDetailEvent = () => {
        axios
            .get(
                `${BASE_URL}/event-detail/${route.params.id}`,
            )
            .then(response => response.data)
            .then(data => {
                setEventList(data.event_detail);
                // console.log(data.event_detail);

            })
            .then(() => {
                setLatitude(parseFloat(eventList.lat));
                setLongitude(parseFloat(eventList.lng));
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false)
            })
    };

    useEffect(() => {
        getDetailEvent();
    }, [])

    const description = {
        html: `
      ${eventList.deskripsi}`
    };
    const { width } = useWindowDimensions();
    // Mendapatkan luas layar
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    // $date = eventList.split('-', '', $date);
    // console.log(date('Y-m-d', strtotime($date)));

    return (
        <ScrollView bgColor="#fff">
            <>
                <Box zIndex={2} >
                    <Header />
                </Box>
                {isLoading ? <Spinner /> : eventList.event_media[0].jenis == 'image' ?
                    <ImageBackground
                        source={{ uri: `http://192.168.1.11:8000/storage/files/event-media/${eventList.event_media[0].file}` }}
                        resizeMode="cover"
                        style={styles.image} /> :
                    <ImageBackground
                        source={{ uri: `${eventList.event_media[0].thumbnail}` }}
                        resizeMode="cover"
                        style={styles.image}
                    />}
                <ImageBackground source={require('../../../assets/bg/gradientTitle.png')}
                    resizeMode="cover" >
                    <Box mx={5} my={3} >
                        <Text fontSize={24} fontWeight="bold" mb={1}>{eventList.nama}</Text>

                        <HStack alignItems="center" >
                            <Date width={scale(24)} height={scale(24)} />
                            <Text ml={1} fontSize={16} mb={1} >{eventList.tanggal_mulai}</Text>
                        </HStack>
                        <HStack alignItems="center" >
                            <Location width={scale(24)} height={scale(24)} />
                            <Text ml={1} fontSize={16} mb={1}>The southern hotel, surabaya, jawa timur</Text>
                        </HStack>
                        <HStack justifyContent="space-between" >
                            <HStack>
                                <Person width={scale(24)} height={scale(24)} />
                                <Text ml={1} fontSize={16} >{eventList.maksimal_peserta} Pasang</Text>
                            </HStack>
                            <HStack>
                                <Money width={scale(24)} height={scale(24)} />
                                <Text ml={1} fontSize={16}>Rp.{eventList.harga}</Text>
                            </HStack>

                        </HStack>
                    </Box>
                </ImageBackground>
                <Box>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} ml={5}>
                        <HStack my={3}>
                            {isLoading ?
                                <Spinner /> :
                                eventList.event_media.map((item, index) =>
                                (
                                    item.jenis == 'image' ?
                                        <Image source={{ uri: `http://192.168.1.11:8000/storage/files/event-media/${item.file}` }}
                                            alt="Alternate Text" size="xl" borderRadius={5} mr={2} />

                                        : item.jenis == 'youtube' ?
                                            <TouchableOpacity onPress={() => { Linking.openURL(`https://youtu.be/${item.file}`) }}>
                                                <ImageBackground source={{ uri: `${item.thumbnail}` }} alt="youtube" width={windowWidth * (50 / 100)} height={windowWidth * (30 / 100)}
                                                    borderRadius={5} mr={2} >
                                                    <Center width={windowWidth * (50 / 100)} height={windowWidth * (30 / 100)}>
                                                        <Image source={require('../../../assets/logo/youtube.png')} width={windowWidth * (10 / 100)} height={windowWidth * (7 / 100)} alt="youtube" />
                                                    </Center></ImageBackground>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity onPress={() => { Linking.openURL(`https://open.spotify.com/episode/${item.file}`) }}>
                                                <ImageBackground source={{ uri: `${item.thumbnail}` }} alt="Alternate Text" width={windowWidth * (30 / 100)} height={windowWidth * (30 / 100)} borderRadius={5} mr={2}>
                                                    <Center width={windowWidth * (30 / 100)} height={windowWidth * (30 / 100)}>
                                                        <Image source={require('../../../assets/logo/spotify.png')} width={windowWidth * (7 / 100)} height={windowWidth * (7 / 100)} alt="spotify" />
                                                    </Center>
                                                </ImageBackground>
                                            </TouchableOpacity>
                                ))}
                        </HStack>
                    </ScrollView>
                </Box>
                <Box mx={5} flex={1}>
                    <Text fontWeight="bold" color="#555F65" fontSize={16}>Description</Text>
                    <RenderHTML
                        contentWidth={width}
                        source={description}
                    />
                    <Box mt={5}>
                        {isLoading ? <Spinner /> : <MapView
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={{ width: '100%', height: 250, borderRadius: 50 }}
                            initialRegion={{
                                latitude: parseFloat(eventList.lat),
                                longitude: parseFloat(eventList.lng),
                                latitudeDelta: 0.009,
                                longitudeDelta: 0.009,
                            }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: parseFloat(eventList.lat),
                                    longitude: parseFloat(eventList.lng),
                                }}
                                title="lokasi acara"
                            />
                        </MapView>}

                    </Box>

                </Box>
                <TouchableOpacity>
                    <Box bgColor="#032844" borderRadius={50} py={3} mx={5} mt={10}>
                        <Text color="#fff" textAlign="center" fontWeight="bold" fontSize={16} >Daftar Sekarang</Text>
                    </Box>
                </TouchableOpacity>
                <Box m={5}>
                    <Text fontWeight="bold" color="#555F65" fontSize={16} > Ketentuan Peserta</Text>
                    <Text color="#555F65" fontSize={16}>{eventList.ketentuan}</Text>

                </Box>
            </>
        </ScrollView >

    )

}
const styles = ScaledSheet.create({
    image: {
        height: scale(224),
        marginTop: -60
    },
})
export default DetailtEventScreen