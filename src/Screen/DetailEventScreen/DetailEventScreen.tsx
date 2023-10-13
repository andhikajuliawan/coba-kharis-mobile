import { Box, Center, Image, HStack, ScrollView, Spinner, Text, Toast, Input, Checkbox, Button, AlertDialog, Alert, IconButton, VStack } from "native-base"
import Header from "../../Component/DetailEvent/Header";
import { Dimensions, ImageBackground, Linking, TouchableOpacity, useWindowDimensions } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { scale } from 'react-native-size-matters';
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import RenderHTML from "react-native-render-html";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

// SVG
import Dates from '../../../assets/icons/EventDetail/calendar.svg'
import Location from '../../../assets/icons/EventDetail/mappin.svg'
import Person from '../../../assets/icons/EventDetail/person.svg'
import Money from '../../../assets/icons/EventDetail/giftcard.svg'
import { format } from "date-fns";
import InformasiEvent from "../../Component/DetailEvent/InformasiEvent";
import { AuthContext } from "../../Context/AuthContext";



const DetailtEventScreen = ({ route }: { route: any }) => {
    const [eventDetail, setEventDetail] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [date, setDate] = useState('');
    const [message, setMessage] = useState('');
    const [noteMessage, setNoteMessage] = useState('');
    const [infoDaftar, setInfoDaftar] = useState('');
    const [isLoadingInfoDaftar, setIsLoadingInfoDaftar] = useState(true);
    const [isLoadingDaftarEvent, setIsLoadingDaftarEvent] = useState(false);
    const { userInfo } = useContext(AuthContext);
    const navigation = useNavigation();
    const [listDaftarKeluarga, setListDaftarKeluarga] = useState([]);
    const [mendaftarKeluarga, setMendaftarKeluarga] = useState(false);

    // Alert Dialog
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);


    const getDetailEvent = () => {
        axios
            .get(
                `${BASE_URL}/api/event-detail/${route.params.id}`, {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            }
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
                setIsLoading(false);
            })
    };

    const daftarEvent = () => {
        setIsLoadingDaftarEvent(true)

        axios
            .post(
                `${BASE_URL}/api/daftar-event`, {
                event_id: route.params.id,
                user_id: userInfo.user.id,
                created_by: userInfo.user.id
            }, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                // Toast.show({
                //     description: `${response.data.message}`
                // });
                setMessage(response.data);
                setIsOpen(!isOpen);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsLoadingDaftarEvent(false)
            })
    };

    const daftarEventKeluarga = () => {
        console.log(listDaftarKeluarga);
        setIsLoadingDaftarEvent(true)
        for (let index = 0; index < listDaftarKeluarga.length; index++) {
            var tgl1 = new Date(listDaftarKeluarga[index].tanggal_lahir);
            var tgl2 = new Date();
            var timeDiff = Math.abs(tgl2.getTime() - tgl1.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            var umur = Math.round(diffDays / 365);

            axios
                .post(
                    `${BASE_URL}/api/daftar-event`, {
                    event_id: eventDetail.id,
                    user_id: listDaftarKeluarga[index],
                    umur: umur,
                    created_by: userInfo.user.id
                }, {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => {
                    // console.log(response.data.message),
                    Toast.show({
                        description: `${response.data.message}`
                    })
                })
                .catch(err => {
                    console.log(err);
                }).finally(() => {
                    setIsLoadingDaftarEvent(false)
                })
        }
    };
    const getInformasiDaftar = () => {
        axios
            .get(
                `${BASE_URL}/api/check-event/event/${route.params.id}/user/${userInfo.user.id}`, {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            })
            .then(response => {
                setInfoDaftar(response.data.data);
                setNoteMessage(response.data.message);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsLoadingInfoDaftar(false);

            })
    };

    useEffect(() => {
        getDetailEvent();
        getInformasiDaftar();
    }, [])

    const description = {
        html: `${eventDetail.deskripsi}`
    };
    const ketentuan = {
        html: `${eventDetail.ketentuan}`
    };

    const { width } = useWindowDimensions();
    // Mendapatkan luas layar
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    if (eventDetail.tanggal_mulai != null) {
        let date_start = new Date(eventDetail.tanggal_mulai);
        var formattedDate = format(date_start, "dd MMMM yyyy");
    }

    const tagsStyles = {
        body: {
            whiteSpace: 'normal',
            color: '#555F65',
            textAlign: 'justify'
        },
    };

    const ButtonDaftarKeluarga = () => {
        if (userInfo.user.ayah_id == null && userInfo.user.ibu_id == null) {
            return (
                <>
                    <Box mt={5} mx={5} >
                        <Text fontSize={16} mb={2} fontWeight="bold">Daftar List Keluarga</Text>
                        <Checkbox.Group onChange={setListDaftarKeluarga} value={listDaftarKeluarga}>
                            {userInfo.user.pasangan != null ?
                                <Checkbox value={userInfo.user.pasangan.id}>{userInfo.user.pasangan.name}</Checkbox> : <></>
                            }
                            {userInfo.anak.length != 0 ? userInfo.anak.map((anak, index) => {
                                return <Checkbox value={anak.id}>{anak.name}</Checkbox>
                            }) : <></>}
                        </Checkbox.Group>
                    </Box>
                    <TouchableOpacity onPress={() => daftarEventKeluarga()}>
                        <Box bgColor="#032844" borderRadius={50} py={3} mx={5} mt={5} >
                            <Text color="#fff" textAlign="center" fontWeight="bold" fontSize={16} >Daftar Sekarang</Text>
                        </Box>
                    </TouchableOpacity>
                </>
            )
        } else {
            return (<>
                <Box mt={5} mx={5}>
                    <Text fontSize={16} mb={2} fontWeight="bold">Daftar List Keluarga</Text>
                    <Checkbox.Group onChange={setListDaftarKeluarga} value={listDaftarKeluarga}>
                        {userInfo.eyang.length != 0 ? userInfo.eyang.map((eyang, index) => {
                            return <Checkbox value={eyang.id}>{eyang.name}</Checkbox>
                        }) : <></>}
                        {userInfo.orangtua.length != 0 ? userInfo.orangtua.map((orangTua, index) => {
                            return <Checkbox value={orangTua.id}>{orangTua.name}</Checkbox>
                        }) : <></>}
                        {userInfo.saudara.length != 0 ? userInfo.saudara.map((saudara, index) => {
                            return <Checkbox value={saudara.id}>{saudara.name}</Checkbox>
                        }) : <></>}
                    </Checkbox.Group>
                </Box >
                <TouchableOpacity onPress={() => daftarEventKeluarga()}>
                    <Box bgColor="#032844" borderRadius={50} py={3} mx={5} mt={5}>
                        <Text color="#fff" textAlign="center" fontWeight="bold" fontSize={16} >Daftar Sekarang</Text>
                    </Box>
                </TouchableOpacity >
            </>)
        }

    }
    return (
        <ScrollView bgColor="#fff">
            <>
                <Box zIndex={2} >
                    <Header />
                </Box>
                {isLoading ? <Spinner /> :
                    eventDetail.event_media.length != 0 ?
                        eventDetail.event_media[0].jenis == 'image' ?
                            <ImageBackground
                                source={{ uri: `${BASE_URL}/storage/files/event-media/${eventDetail.event_media[0].file}` }}
                                resizeMode="cover"
                                style={styles.image} /> :
                            <ImageBackground
                                source={{ uri: `${eventDetail.event_media[0].thumbnail}` }}
                                resizeMode="cover"
                                style={styles.image}
                            /> : <></>}

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
                                            alt="Alternate Text" width={windowWidth * (30 / 100)} height={windowWidth * (30 / 100)} borderRadius={5} mr={2} key={index} />

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
                        tagsStyles={tagsStyles}

                    />
                    <Box mt={5}>
                        {isLoading ? <Spinner /> :
                            <TouchableOpacity onPress={() => { Linking.openURL(`geo:0.05,0.05?q=${eventDetail.lat},${eventDetail.lng}`) }}>
                                <MapView
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
                                </MapView></TouchableOpacity>
                        }

                    </Box>

                </Box>

                {isLoadingInfoDaftar ? <Spinner /> : infoDaftar == 'true' ? <Text mx={5} mt={5} color="#91989F" textAlign="justify" fontSize={12}>note : {noteMessage}</Text> : <></>}
                {eventDetail.status == 'finish' ?
                    <Box bgColor="#999" borderRadius={50} py={3} mx={5} mt={10}>
                        <Text color="#fff" textAlign="center" fontWeight="bold" fontSize={16} >Tutup</Text>
                    </Box>
                    : eventDetail.status == 'canceled' ? <Box bgColor="#999" borderRadius={50} py={3} mx={5} mt={10}>
                        <Text color="#fff" textAlign="center" fontWeight="bold" fontSize={16} >Tutup</Text>
                    </Box>
                        :
                        isLoadingDaftarEvent ?
                            <Spinner />
                            :
                            eventDetail.tipe_peserta == 2 ? <>
                                {/* <ButtonDaftarKeluarga /> */}
                                {mendaftarKeluarga ? <><ButtonDaftarKeluarga /><TouchableOpacity onPress={() => setMendaftarKeluarga(false)}>
                                    <Box bgColor="#032844" borderRadius={50} py={3} mx={5} mt={5} mb={10}>
                                        <Text color="#fff" textAlign="center" fontWeight="bold" fontSize={16} >Batal Daftar</Text>
                                    </Box>
                                </TouchableOpacity></> : <TouchableOpacity onPress={() => setMendaftarKeluarga(true)}>
                                    <Box bgColor="#032844" borderRadius={50} py={3} mx={5} mt={5} mb={10}>
                                        <Text color="#fff" textAlign="center" fontWeight="bold" fontSize={16} >Daftar keluarga</Text>
                                    </Box>
                                </TouchableOpacity>}
                            </>
                                :
                                <TouchableOpacity onPress={() => daftarEvent()}>
                                    <Box bgColor="#032844" borderRadius={50} py={3} mx={5} mt={2} mb={10}>
                                        <Text color="#fff" textAlign="center" fontWeight="bold" fontSize={16} >Daftar Sekarang </Text>
                                    </Box>
                                </TouchableOpacity>}

                <Box mx={5} mb={20}>
                    <Text fontWeight="bold" color="#555F65" fontSize={16} >Ketentuan Peserta</Text>
                    <RenderHTML
                        contentWidth={width}
                        source={ketentuan}
                        tagsStyles={tagsStyles}
                    />
                </Box>
                <Center>
                    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                        <AlertDialog.Content>
                            <AlertDialog.CloseButton />
                            <AlertDialog.Header><Text></Text></AlertDialog.Header>
                            <AlertDialog.Body>
                                <Text>
                                    {message.message}
                                </Text>
                            </AlertDialog.Body>
                            <AlertDialog.Footer >
                                <Box width="100%">
                                    <TouchableOpacity >

                                        <Button bgColor="#003459" onPress={() => navigation.navigate('CartList')}>
                                            <Text color="#fff">CheckOut</Text>
                                        </Button>
                                    </TouchableOpacity>
                                </Box>
                            </AlertDialog.Footer>
                        </AlertDialog.Content>
                    </AlertDialog>
                </Center>
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