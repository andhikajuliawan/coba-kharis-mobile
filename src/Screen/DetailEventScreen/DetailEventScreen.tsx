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
import Dates from '../../../assets/icons/EventDetail/calendar.svg'
import Location from '../../../assets/icons/EventDetail/mappin.svg'
import Person from '../../../assets/icons/EventDetail/person.svg'
import Money from '../../../assets/icons/EventDetail/giftcard.svg'
import { format } from "date-fns";
import InformasiEvent from "../../Component/DetailEvent/InformasiEvent";



const DetailtEventScreen = ({ route }) => {
    const [eventDetail, setEventDetail] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [date, setDate] = useState('');

    const getDetailEvent = () => {
        axios
            .get(
                `${BASE_URL}/api/event-detail/${route.params.id}`,
            )
            .then(response => response.data)
            .then(data => {
                setEventDetail(data.event_detail);
            })

            .then(() => {
                setLatitude(parseFloat(eventDetail.lat));
                setLongitude(parseFloat(eventDetail.lng));

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
          ${eventDetail.deskripsi}`
    };
    const ketentuan = {
        html: `
          ${eventDetail.ketentuan}`
    };

    const { width } = useWindowDimensions();
    // Mendapatkan luas layar
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    if (eventDetail.tanggal_mulai != null) {
        let date_start = new Date(eventDetail.tanggal_mulai);
        var formattedDate = format(date_start, "dd MMMM yyyy");
    }

    return (
        <ScrollView bgColor="#fff">
            <>
                <Box zIndex={2} >
                    <Header />
                </Box>
                {isLoading ? <Spinner /> : eventDetail.event_media[0].jenis == 'image' ?
                    <ImageBackground
                        source={{ uri: `${BASE_URL}/storage/files/event-media/${eventDetail.event_media[0].file}` }}
                        resizeMode="cover"
                        style={styles.image} /> :
                    <ImageBackground
                        source={{ uri: `${eventDetail.event_media[0].thumbnail}` }}
                        resizeMode="cover"
                        style={styles.image}
                    />}

                {isLoading ? <Spinner /> : <InformasiEvent
                    nama={eventDetail.nama}
                    dateStart={eventDetail.tanggal_mulai}
                    dateEnd={eventDetail.tanggal_selesai}
                    lokasi={eventDetail.lokasi}
                    peserta={eventDetail.maksimal_peserta}
                    harga={eventDetail.harga}
                />}

                <Box>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} ml={5}>
                        <HStack my={3}>
                            {isLoading ?
                                <Spinner /> :
                                eventDetail.event_media.map((item, index) =>
                                (
                                    item.jenis == 'image' ?
                                        <Image source={{ uri: `${BASE_URL}/storage/files/event-media/${item.file}` }}
                                            alt="Alternate Text" size="xl" borderRadius={5} mr={2} key={index} />

                                        : item.jenis == 'youtube' ?
                                            <TouchableOpacity onPress={() => { Linking.openURL(`https://youtu.be/${item.file}`) }}>
                                                <Box mr={3}>
                                                    <ImageBackground source={{ uri: `${item.thumbnail}` }} alt="youtube" width={windowWidth * (50 / 100)} height={windowWidth * (30 / 100)}
                                                        borderRadius={5} key={index}>
                                                        <Center width={windowWidth * (50 / 100)} height={windowWidth * (30 / 100)} mr={2}>
                                                            <Image source={require('../../../assets/logo/youtube.png')} width={windowWidth * (10 / 100)} height={windowWidth * (7 / 100)} alt="youtube" />
                                                        </Center>
                                                    </ImageBackground>
                                                </Box>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity onPress={() => { Linking.openURL(`https://open.spotify.com/episode/${item.file}`) }} >
                                                <Box mr={3}>
                                                    <ImageBackground source={{ uri: `${item.thumbnail}` }} alt="Alternate Text" width={windowWidth * (30 / 100)} height={windowWidth * (30 / 100)} borderRadius={5} key={index} >
                                                        <Center width={windowWidth * (30 / 100)} height={windowWidth * (30 / 100)} >
                                                            <Image source={require('../../../assets/logo/spotify.png')} width={windowWidth * (7 / 100)} height={windowWidth * (7 / 100)} alt="spotify" />
                                                        </Center>
                                                    </ImageBackground>
                                                </Box>

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
                                latitude: parseFloat(eventDetail.lat),
                                longitude: parseFloat(eventDetail.lng),
                                latitudeDelta: 0.009,
                                longitudeDelta: 0.009,
                            }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: parseFloat(eventDetail.lat),
                                    longitude: parseFloat(eventDetail.lng),
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
                    <Text fontWeight="bold" color="#555F65" fontSize={16} >Ketentuan Peserta</Text>
                    <RenderHTML
                        contentWidth={width}
                        source={ketentuan}
                    />
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