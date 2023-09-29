/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useCallback, useEffect, useContext } from 'react';
import type { PropsWithChildren } from 'react';

import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
  TextInput,
  Button,
  Dimensions
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';

// Component
import Header from '../../Component/Header';
import Search from '../../../assets/icons/Header/Search.svg';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { Box, Center, Spinner } from 'native-base';
import { AuthContext } from '../../Context/AuthContext';
import { format } from 'date-fns';

type SectionProps = PropsWithChildren<{
  text: string;
  limit: number;
  custom: any;
}>;

type OpenURLButtonProps = {
  url: string;
};

type ThumbnailVideoProps = {
  urlVideo: any;
  title: any;
  pembicara: any;
  linkUrl: string;
};

type ThumbnailPodcastProps = {
  urlVideoPodcast: any;
  judulPodcast: any;
  pembicaraPodcast: any;
  durasiPodcast: any;
};

type PodcastProps = {
  imgPodcast: any;
  titlePodcast: any;
  pembicaraPodcast: any;
  durasiPodcast: any;
};

const LimitText = ({ text, limit, custom }: SectionProps) => {

  const panjangText = text.length > limit ? text.substring(0, limit) + '...' : text;

  return (
    <Text style={custom}>{panjangText}</Text>
  );

};

const OpenURLButton = ({ url }: OpenURLButtonProps) => {
  // const handlePress = useCallback(async () => {

  //   const supported = await Linking.canOpenURL(url);

  //   if (supported) {
  //     await Linking.openURL(`https://youtu.be/${url}`);
  //   } else {
  //     Alert.alert(`Don't know how to open this URL: ${url}`);
  //   }
  // }, [url]);

  return (
    <TouchableOpacity onPress={() => Linking.openURL(`https://youtu.be/${url}`)}>
      <Image
        source={require("../../../assets/icons/Thumnail/logoYoutube.png")}
        resizeMode='contain'
        style={{
          maxHeight: scale(48),
          maxWidth: scale(72),
        }}
      />
    </TouchableOpacity>
  );
};

const OpenURLPodcastButton = ({ url }: OpenURLButtonProps) => {
  const handlePress = useCallback(async () => {

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image
        source={require("../../../assets/icons/Streaming/Button/Play.png")}
        resizeMode='contain'
        style={{
          maxHeight: scale(75),
          maxWidth: scale(75),
        }}
      />
    </TouchableOpacity>
  );
};

const ThumbnailVideo = ({ urlVideo, title, pembicara, linkUrl }: ThumbnailVideoProps) => {
  // Ekstrak kode video dari URL
  // const videoEventId = (urlVideo).split('v=')[1];
  // const videoEventParams = videoEventId ? videoEventId.split('&')[0] : '';

  // Buat URL thumbnail dari kode video
  // const thumbnailVideoUrl = `https://img.youtube.com/vi/${videoEventParams}/0.jpg`;


  return (
    <View style={{ flexDirection: 'column', width: scale(156), marginBottom: scale(15) }}>
      <TouchableOpacity onPress={() => { Linking.openURL(`https://youtu.be/${linkUrl}`) }}>
        <ImageBackground source={{ uri: urlVideo }} style={{ width: scale(156), aspectRatio: 16 / 9 }} imageStyle={{ borderRadius: 10 }} resizeMode='cover' >
        </ImageBackground>
        <LimitText text={title} limit={40} custom={styles.textVideoTitle} />
        <LimitText text={pembicara} limit={29} custom={styles.textVideoPembicara} />
      </TouchableOpacity>

    </View>
  );
};

const ThumbnailNewVideoPodcast = ({ urlVideoPodcast, judulPodcast, pembicaraPodcast, durasiPodcast }: ThumbnailPodcastProps) => {

  // Ekstrak kode video dari URL
  const videoPodcastId = (urlVideoPodcast).split('v=')[1];
  const videoPodcastParams = videoPodcastId ? videoPodcastId.split('&')[0] : '';

  // Buat URL thumbnail dari kode video
  const thumbnailPodcastUrl = `https://img.youtube.com/vi/${videoPodcastParams}/0.jpg`;

  return (
    <ImageBackground source={{ uri: thumbnailPodcastUrl }} style={{ width: '100%', aspectRatio: 16 / 9, }} imageStyle={{ borderRadius: 10 }} resizeMode='cover' >
      <View style={{ width: '100%', aspectRatio: 16 / 9, flexDirection: 'column', justifyContent: 'space-between', }}>
        <LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'transparent']} style={{ borderTopLeftRadius: scale(10), borderTopRightRadius: scale(10) }} >
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: scale(10), paddingTop: scale(10) }}>
            <View style={{ minWidth: '70%' }}><Text>  </Text></View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: scale(15), paddingVertical: scale(5), width: '20%', backgroundColor: '#BA181B', borderRadius: scale(20) }}>
              <Text style={{ fontFamily: 'Geomanist-Medium', fontSize: scale(13), fontWeight: '600', color: 'white' }}>New</Text>
            </View>
          </View>
        </LinearGradient>
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: scale(80) }}>
          <OpenURLPodcastButton url={urlVideoPodcast}></OpenURLPodcastButton>
        </TouchableOpacity>
        <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.7)']} style={{ borderBottomLeftRadius: scale(10), borderBottomRightRadius: scale(10) }} >
          <View style={{ justifyContent: 'space-between', flexDirection: 'column', paddingHorizontal: scale(10), paddingBottom: scale(5) }}>
            <LimitText text={judulPodcast} limit={68} custom={{ fontFamily: 'SF-Pro-Text-Bold', fontSize: scale(14), color: 'white', textAlign: 'justify' }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
              <LimitText text={pembicaraPodcast} limit={40} custom={{ fontFamily: 'ProximaNova-Semibold', fontSize: scale(11), color: 'white' }} />
              <Text style={{ fontFamily: 'Geomanist-Medium', fontSize: scale(13), color: 'white' }}>{durasiPodcast}</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </ImageBackground>
  );
};

const Podcast = ({ imgPodcast, titlePodcast, pembicaraPodcast, durasiPodcast }: PodcastProps) => {

  return (

    <View style={{ flexDirection: 'row', width: '100%', marginBottom: scale(15), justifyContent: 'space-between' }}>

      <View style={{ width: '20%', height: scale(56), }}>
        <Image
          source={{ uri: imgPodcast }}
          resizeMode='contain'
          style={{
            width: 60,
            height: 60
          }}
        />
      </View>
      <View style={{ justifyContent: 'center', height: scale(56), marginHorizontal: scale(10), width: '63%', }}>
        <LimitText limit={22} text={titlePodcast} custom={{ fontFamily: 'SF-Pro-Text-Regular', fontSize: scale(14), color: '#495057', fontWeight: '700' }} />
        <View style={{ flexDirection: 'row' }}>
          <LimitText limit={20} text={pembicaraPodcast} custom={{ fontFamily: 'SF-Pro-Text-Regular', fontSize: scale(10), color: '#ADB5BD', }} />
          <Text style={{ fontFamily: 'SF-Pro-Text-Regular', fontSize: scale(10), color: '#ADB5BD', }}>• {durasiPodcast}</Text>
        </View>
      </View>
      <TouchableOpacity style={{ height: scale(56), width: '10%', justifyContent: 'center', alignItems: 'center', }}>
        <Image
          source={require("../../../assets/icons/Streaming/Button/More.png")}
          resizeMode='contain'
          style={{
            maxHeight: scale(32),
            maxWidth: scale(32),
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const StreamingScreen = () => {

  const [contentYoutube, setContentYoutube] = useState([]);
  const [contentPodcast, setContentPodcast] = useState([]);
  const [contentYoutubeByCategory, setContentYoutubeByCategory] = useState([]);
  const [contentUpComingLiveStreaming, setContentUpComingLiveStreaming] = useState([]);
  const [eventByPencarian, setEventByPencarian] = useState([]);
  const [kategori, setKategori] = useState(3);
  const [listKategori, setListKategori] = useState([]);
  const [isLoadingYoutube, setIsLoadingYoutube] = useState(true);
  const [isLoadingContentYoutubeByCategory, setIsLoadingContentYoutubeByCategory] = useState(true);
  const [isLoadingContentUpComingLiveStreaming, setIsLoadingContentUpComingLiveStreaming] = useState(true);
  const [isLoadingListKategori, setIsLoadingListKategori] = useState(true);
  const [hideKategori, setHideKategori] = useState(true);
  const [inputPencarian, setInputPencarian] = useState('');
  const { userInfo } = useContext(AuthContext);

  // State untuk thumbnail Streaming (Harus di set 1 Inputan)
  const [nowLive, setNowLive] = useState({
    "id": 1,
    "link": 'https://www.youtube.com/watch?v=7WCdsrSKf3U&ab_channel=PerkumpulanKharis',
    "judul": 'MOVING FORWARD - Part 2: Melangkah Maju Bersama Tuhan',
    "pembicara": 'dr. Nur Flora Nita TB Sinaga, Sp.OT',
    "tanggal": '30/08/2022 17:00',
    "event": {
      "id": 2,
      "logo": require("../../../assets/icons/Home/Menu/Menu_2.png"),
      "title": "Godly Family"
    },
  })

  const [menu, setMenu] = useState([
    {
      "id": 3,
      "logo": require("../../../assets/icons/Home/Menu/Menu_2.png"),
      "title": "Godly Family",
      "streaming": true,
    },
    {
      "id": 4,
      "logo": require("../../../assets/icons/Home/Menu/Menu_3.png"),
      "title": "Marriage Enrichment",
      "streaming": false,
    },
    {
      "id": 5,
      "logo": require("../../../assets/icons/Home/Menu/Menu_4.png"),
      "title": "Growing Couple",
      "streaming": false,
    },
    {
      "id": 6,
      "logo": require("../../../assets/icons/Home/Menu/Menu_5.png"),
      "title": "Marriage Spiritual Transformation Class",
      "streaming": false,
    },
    {
      "id": 7,
      "logo": require("../../../assets/icons/Home/Menu/Menu_6.png"),
      "title": "Pre Marital Class",
      "streaming": false,
    },
    {
      "id": 8,
      "logo": require("../../../assets/icons/Home/Menu/Menu_7.png"),
      "title": "Shining Generation Class",
      "streaming": false,
    },
    {
      "id": 9,
      "logo": require("../../../assets/icons/Home/Menu/Menu_16.png"),
      "title": "Wisdom For Family",
      "streaming": true,
    },
  ])



  const [status, setStatus] = useState('Godly Family')
  const setStatusFilter = (status: React.SetStateAction<string>) => {
    setStatus(status)
  }

  const getContentYoutube = () => {
    axios.get(`${BASE_URL}/api/event/content/youtube/take/1`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
      .then((response) => response.data)
      .then((data => setContentYoutube(data.data)))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingYoutube(false)
      })
  };

  const getContentYoutubeByCategory = (kategori) => {
    setIsLoadingContentYoutubeByCategory(true)
    axios.get(`${BASE_URL}/api/event/streaming/${kategori}/content/youtube`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
      .then((response) => response.data)
      .then((data => {
        if (data.data.length) {
          for (let i = 0; i < data.data.length; i++) {
            for (let j = 0; j < data.data[i].event_media.length; j++) {
              let push = contentYoutubeByCategory.push(data.data[i].event_media[j])
            }
          }
        } else { }
      }))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingContentYoutubeByCategory(false)
      })
  }
  const getContentUpComingLiveStreaming = (kategori) => {
    setIsLoadingContentUpComingLiveStreaming(true)
    axios.get(`${BASE_URL}/api/event/upcoming/open/streaming/${kategori}/content/youtube`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
      .then((response) => response.data)
      .then((data => {
        if (data.data.length) {
          setContentUpComingLiveStreaming(data.data);
        } else { }
      }))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingContentUpComingLiveStreaming(false)
      })
  }

  const getCategory = () => {
    axios.get(`${BASE_URL}/api/event-categories`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
      .then((response) => response.data)
      .then((data => setListKategori(data.categories)))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingListKategori(false)
      })
  }

  const getContentPodcast = () => {
    axios.get(`${BASE_URL}/api/media/content/spotify`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
      .then((response) => response.data)
      .then((data =>
        setContentPodcast(data.data)
      ))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingListKategori(false)
      })
  }

  const changeCategory = (id) => {
    setKategori(id)
    setIsLoadingContentYoutubeByCategory(true)
    axios.get(`${BASE_URL}/api/event/streaming/${id}/content/youtube`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
      .then((response) => response.data)
      .then((data => {
        if (data.data.length) {
          let getYoutube = []
          for (let i = 0; i < data.data.length; i++) {
            for (let j = 0; j < data.data[i].event_media.length; j++) {
              let push = getYoutube.push(data.data[i].event_media[j])
            }
          }
          setContentYoutubeByCategory(getYoutube)
        } else { setContentYoutubeByCategory([]) }
      }))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingContentYoutubeByCategory(false)
        changeUpcomingLiveStreaming(id)
      })
  }

  const changeUpcomingLiveStreaming = (id) => {
    setIsLoadingContentUpComingLiveStreaming(true)
    axios.get(`${BASE_URL}/api/event/upcoming/open/streaming/${id}/content/youtube`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
      .then((response) => response.data)
      .then((data => {
        setContentUpComingLiveStreaming(data.data);
      }))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingContentUpComingLiveStreaming(false)
        console.log(contentUpComingLiveStreaming)
      })
  }

  const InputPencarian = pencarian => {
    // Check if searched text is not blank
    if (pencarian) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = contentUpComingLiveStreaming.filter(function (item) {
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

  useEffect(() => {
    getContentYoutube();
    getContentYoutubeByCategory(kategori);
    getContentUpComingLiveStreaming(kategori);
    getCategory();
    getContentPodcast();

  }, [])




  const [podcast, setPodcast] = useState([
    {
      "image": require("../../../assets/icons/Streaming/imgPodcast/List-1.png"),
      "judul": 'Kekerasan Dalam Rumah Tangga (KDRT)',
      "pembicara": 'Ev. Ade  Widiantara',
      "durasi": '21:05',
    },
    {
      "image": require("../../../assets/icons/Streaming/imgPodcast/List-2.png"),
      "judul": 'Kekerasan Dalam Rumah Tangga (KDRT)',
      "pembicara": 'Enny Dewi, SE., M. Th.',
      "durasi": '15:17',
    },
  ]);

  // Mendapatkan luas layar
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  // Ekstrak kode video dari URL
  const videoId = (nowLive.link).split('v=')[1];
  const videoParams = videoId ? videoId.split('&')[0] : '';

  // Buat URL thumbnail dari kode video
  const thumbnailUrl = `https://img.youtube.com/vi/${videoParams}/0.jpg`;

  return (
    <ScrollView style={styles.container}>
      {isLoadingYoutube ? <Spinner /> : contentYoutube.length != 0 ?
        <ImageBackground source={{ uri: contentYoutube[0].thumbnail }} style={[{ width: '100%', aspectRatio: 16 / 9, justifyContent: 'space-between', flexDirection: 'column', }]} resizeMode='cover' >
          <LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'transparent']} >
            <Header />
          </LinearGradient>

          <View style={{ justifyContent: 'center', alignItems: 'center', height: scale(48), width: 'auto', }}>
            <OpenURLButton url={contentYoutube[0].file}></OpenURLButton>
          </View>
          <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.7)']} >
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginHorizontal: scale(15), }}>
              <View style={styles.live}>
                <Text style={styles.textLive}>Live Now !</Text>
              </View>
              <View>
                <LimitText text={contentYoutube[0].judul} limit={85} custom={styles.textTitle} />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {/* <LimitText text={nowLive.pembicara} limit={40} custom={styles.textSubTitle} /> */}
                <Text></Text>
                <Text style={[{ paddingBottom: scale(25) }, styles.textSubTitle]}>{contentYoutube[0].event.tanggal_mulai}</Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground> : <></>}

      <View style={styles.content}>
        {/* Search */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: scale(15), paddingHorizontal: scale(15), }}>
          <TextInput
            style={styles.input}
            onChangeText={pencarian => InputPencarian(pencarian)}
            value={inputPencarian}
            placeholder="Cari judul acara atau nama pembicara"
          />
          <TouchableOpacity style={{ backgroundColor: '#3A0CA3', height: scale(40), width: scale(40), borderRadius: scale(5), alignItems: 'center', justifyContent: 'center' }}>
            <Search width={scale(30)} height={scale(30)} />
          </TouchableOpacity>
        </View>

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
                  height={windowHeight * (15 / 100)}
                  borderRadius={10}
                  resizeMode="cover"
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
            let dateStart = new Date(pencarian.tanggal_mulai);
            let dateEnd = new Date(pencarian.tanggal_selesai);
            let formatDateStart = format(dateStart, "dd");
            let formatDateEnd = format(dateEnd, "dd MMMM yyyy");
            let displayDate = `${formatDateStart} - ${formatDateEnd}`
            return (
              <Box width="45%" m={2} key={index} mx={5}>
                <TouchableOpacity
                // onPress={() => onPressDetailEvent(pencarian.id)}
                >
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

        {/* Button */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', maxWidth: '100%', flexWrap: 'wrap', paddingHorizontal: scale(15), }}>
          {/* {hideKategori ?
            listKategori.slice(0, 2).map((listMenu, index) => (
              <TouchableOpacity style={[styles.elevation, (kategori === listMenu.id) ? (styles.buttonMenuActive) : (styles.buttonMenuInactive)]}
                onPress={() => {
                  setStatusFilter(listMenu.title)
                  changeCategory(listMenu.id)

                }}>
                <Image
                  source={{
                    uri: `${BASE_URL}/storage/files/event-categorie/${listMenu.icon}`,
                  }}
                  resizeMode='contain'
                  style={{
                    width: windowWidth * (13 / 100),
                    height: windowHeight * (6 / 100)
                  }}
                />

                <LimitText text={listMenu.nama} limit={10} custom={[(kategori === listMenu.id) ? (styles.textMenuActive) : (styles.textMenuInactive)]} />
              </TouchableOpacity>
            )) : listKategori.map((listMenu, index) => (
              <TouchableOpacity style={[styles.elevation, (kategori === listMenu.id) ? (styles.buttonMenuActive) : (styles.buttonMenuInactive)]}
                onPress={() => {
                  setStatusFilter(listMenu.title)
                  changeCategory(listMenu.id)

                }}>
                <Image
                  source={{
                    uri: `${BASE_URL}/storage/files/event-categorie/${listMenu.icon}`,
                  }}
                  resizeMode='contain'
                  style={{
                    width: windowWidth * (13 / 100),
                    height: windowHeight * (6 / 100)
                  }}
                />
                <LimitText text={listMenu.nama} limit={10} custom={[(kategori === listMenu.id) ? (styles.textMenuActive) : (styles.textMenuInactive)]} />
              </TouchableOpacity>
            ))
          } */}
          {menu.map((listMenu, index) => (
            (listMenu.streaming == true ? (
              <TouchableOpacity style={[styles.elevation, (status === listMenu.title) ? (styles.buttonMenuActive) : (styles.buttonMenuInactive)]}
                onPress={() => {
                  setStatusFilter(listMenu.title)
                  changeCategory(listMenu.id)
                }}>
                <Image
                  source={listMenu.logo}
                  resizeMode='contain'
                  style={{
                    maxHeight: scale(42),
                    maxWidth: scale(42),
                  }}
                />
                <LimitText text={listMenu.title} limit={18} custom={[(status === listMenu.title) ? (styles.textMenuActive) : (styles.textMenuInactive)]} />
              </TouchableOpacity>
            ) : (
              null
            ))
          ))}

          {/* Statis */}
          <TouchableOpacity style={[styles.elevation, (status === 'Audio Podcast') ? (styles.buttonMenuActive) : (styles.buttonMenuInactive)]} onPress={() => setStatusFilter('Audio Podcast')}>
            <Image
              source={(status === 'Audio Podcast') ? (require("../../../assets/icons/Home/Menu/Menu_12_Putih.png")) : (require("../../../assets/icons/Home/Menu/Menu_12_Color.png"))}
              resizeMode='contain'
              style={{
                maxHeight: scale(42),
                maxWidth: scale(42),
              }}
            />
            <LimitText text={'Audio Podcast'} limit={18} custom={[(status === 'Audio Podcast') ? (styles.textMenuActive) : (styles.textMenuInactive)]} />
          </TouchableOpacity>

          {/* Tombol Lainnya */}
          {hideKategori ?
            // <TouchableOpacity style={[styles.buttonMenuInactive, styles.elevation]} onPress={() =>
            //   // setHideKategori(false)
            //   changeCategory(0)
            // }>
            <TouchableOpacity style={[styles.elevation, (status === 'lainnya') ? (styles.buttonMenuActive) : (styles.buttonMenuInactive)]}
              onPress={() => {
                setStatusFilter('lainnya')
                changeCategory(0)
              }}>
              <Image
                source={require("../../../assets/icons/Home/Menu/Menu_17.png")}
                resizeMode='contain'
                style={{
                  maxHeight: scale(42),
                  maxWidth: scale(42),
                }}
              />
              <LimitText text={'Lainnya'} limit={18} custom={[(status === 'lainnya') ? (styles.textMenuActive) : (styles.textMenuInactive)]} />
            </TouchableOpacity>
            :
            <TouchableOpacity style={[styles.buttonMenuInactive, styles.elevation]} onPress={() => setHideKategori(true)}>
              <Image
                source={require("../../../assets/icons/Home/Menu/Menu_17.png")}
                resizeMode='contain'
                style={{
                  maxHeight: scale(42),
                  maxWidth: scale(42),
                }}
              />
              <LimitText text={'hide'} limit={18} custom={styles.textMenuInactive} />
            </TouchableOpacity>
          }

        </View>

        {/* Upcoming Live Streaming */}
        {status === 'Audio Podcast' ? (
          <View>
            {/* <View style={{ justifyContent: 'flex-start', marginTop: scale(5), marginBottom: scale(15), paddingHorizontal: scale(15), }}> */}
            {/* <Text style={styles.textSubMenu}>New Realease</Text> */}
            {/* </View> */}
            {/* <View style={{ flexDirection: 'column', width: 'auto', marginBottom: scale(15), marginHorizontal: scale(15) }}> */}
            {/* New Video */}
            {/* <ThumbnailNewVideoPodcast urlVideoPodcast={'https://www.youtube.com/watch?v=MLr54_HQavw&ab_channel=TheVillageChurch-FlowerMound'} judulPodcast={'Pemuridan dalam Keluarga / Keluarga yang Memuridkan'} pembicaraPodcast={'Pdt. Nyoman Widiantara'} durasiPodcast={'25:01'} /> */}
            {/* </View> */}
            <View style={{ justifyContent: 'flex-start', marginTop: scale(5), marginBottom: scale(15), paddingHorizontal: scale(15), }}>
              <Text style={styles.textSubMenu}>New Realease</Text>
            </View>
            <View style={{ flexDirection: 'column', width: 'auto', marginBottom: scale(15), marginHorizontal: scale(15) }}>
              {contentPodcast.map((listPodcast, key) => (
                <TouchableOpacity onPress={() => Linking.openURL(`https://open.spotify.com/episode/${listPodcast.file}`)}>
                  <Podcast imgPodcast={listPodcast.thumbnail} titlePodcast={listPodcast.judul} pembicaraPodcast={''} durasiPodcast={''} />

                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <View>
            <View style={{ justifyContent: 'flex-start', marginTop: scale(5), marginBottom: scale(15), paddingHorizontal: scale(15), }}>
              <Text style={styles.textSubMenu}>Upcoming Live Streaming</Text>
            </View>
            {contentUpComingLiveStreaming.length == 0 ? <Center>belum ada</Center> : <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ height: scale(310), flexDirection: 'row', paddingHorizontal: scale(15), }}>
              {isLoadingContentUpComingLiveStreaming ? <Spinner /> : contentUpComingLiveStreaming.map((upcoming, index) => {
                if (upcoming.event_media.length != 0) {
                  if (upcoming.event_media[0].jenis == 'image') {
                    var image = (
                      <Image
                        source={{
                          uri: `${BASE_URL}/storage/files/event-media/${upcoming.event_media[0].file}`,
                        }}
                        alt="image"
                        resizeMode='contain'
                        height={windowHeight * (25 / 100)}
                        widtht={windowWidth * (25 / 100)}
                      // style={{
                      //   borderRadius: scale(10),
                      //   maxHeight: scale(180),
                      //   maxWidth: scale(180),
                      // }}
                      />
                    );
                  } else {
                    var image = (
                      <Image
                        source={{ uri: `${upcoming.event_media[0].thumbnail}` }}
                        alt="image"
                        resizeMode='contain'
                        style={{
                          borderRadius: scale(10),
                          maxHeight: scale(180),
                          maxWidth: scale(180),
                        }}
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
                let dateStart = new Date(upcoming.tanggal_mulai);
                let dateEnd = new Date(upcoming.tanggal_selesai);
                let formatDateStart = format(dateStart, "dd");
                let formatDateEnd = format(dateEnd, "dd MMMM yyyy");
                let displayDate = `${formatDateStart} - ${formatDateEnd}`
                return (
                  <View style={{ justifyContent: 'space-between', flexDirection: 'column', marginRight: scale(15) }}>
                    {image}
                    <View>
                      <Text style={styles.textTanggal}>{displayDate}</Text>
                      <LimitText text={upcoming.nama} limit={56} custom={styles.textJudulStreaming} />
                      {upcoming.event_pengisi_acara.length != 0 ?
                        <LimitText text={upcoming.event_pengisi_acara[0].nama} limit={36} custom={styles.textPembicara} /> : <></>

                      }
                    </View>
                    <TouchableOpacity style={styles.buttonRememberInactive}>
                      <Text style={styles.textRememberInactive}>Ingatkan Saya</Text>
                    </TouchableOpacity>
                  </View>)
              })}

              {/* View Padding */}
              <View style={{ marginRight: scale(30) }}></View>
            </ScrollView>}


            {/* Video Lainnya */}
            <View style={{ justifyContent: 'flex-start', marginTop: scale(15), marginBottom: scale(15), paddingHorizontal: scale(15), }}>
              <Text style={styles.textSubMenu}>Video Lainnya</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', maxWidth: '100%', flexWrap: 'wrap', paddingHorizontal: scale(15), }}>
              {isLoadingContentYoutubeByCategory ? <Spinner /> : contentYoutubeByCategory.map((youtube, index) => {
                return <ThumbnailVideo urlVideo={youtube.thumbnail} title={youtube.judul} pembicara={''} linkUrl={youtube.file} />
              }
              )}
            </View>
          </View>
        )}

      </View>
    </ScrollView >
  );
};

const styles = ScaledSheet.create({
  container: {
    backgroundColor: '#FDFDFD',
    marginBottom: scale(60),
  },

  live: {
    borderRadius: scale(20),
    paddingHorizontal: scale(10),
    paddingVertical: scale(3),
    backgroundColor: '#38B000',
    width: scale(100),
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: scale(2),
  },

  textLive: {
    fontFamily: 'Geomanist-Regular',
    fontSize: scale(12),
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: scale(2),
  },

  textTitle: {
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: scale(13),
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'justify',
  },

  textSubTitle: {
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: scale(10),
    color: '#FFFFFF',
  },

  content: {
    backgroundColor: '#FDFDFD',
    width: '100%',
    height: 'auto',
    top: scale(-15),
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    marginBottom: scale(-15),
    flex: 1,
    paddingVertical: scale(25),
  },

  input: {
    borderRadius: scale(5),
    height: scale(40),
    borderWidth: 2,
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderColor: '#99A2A5',
    width: '85%',
    fontSize: scale(12),
    fontFamily: 'SF-Pro-Text-Regular',
    color: "#000"
  },

  elevation: {
    shadowColor: '#52006A',
    elevation: 5,
  },

  textMenuActive: {
    color: "white",
    fontSize: scale(12),
    fontFamily: 'SF-Pro-Text-Regular',
    width: '65%',
    marginLeft: scale(5),
  },

  textMenuInactive: {
    color: "#242B33",
    fontSize: scale(12),
    fontFamily: 'SF-Pro-Text-Regular',
    width: '65%',
    marginLeft: scale(5),
  },

  buttonMenuInactive: {
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: scale(15),
    paddingHorizontal: scale(10),
    marginBottom: scale(10),
    paddingVertical: scale(5),
  },

  buttonMenuActive: {
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3A0CA3',
    borderRadius: scale(15),
    paddingHorizontal: scale(10),
    marginBottom: scale(10),
    paddingVertical: scale(5),
  },

  textSubMenu: {
    fontFamily: 'Inter-SemiBold',
    fontSize: scale(15),
    color: '#000000',
    fontWeight: '700',
  },

  textTanggal: {
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: scale(10),
    color: '#FF564F',
    marginBottom: scale(3),
  },

  textJudulStreaming: {
    fontFamily: 'SF-Pro-Text-Bold',
    fontSize: scale(14),
    color: '#495057',
    marginBottom: scale(2),
    fontWeight: 'bold',
    width: scale(180),
    textAlign: 'justify',
  },

  textPembicara: {
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: scale(10),
    width: scale(180),
    color: '#ADB5BD',
  },

  buttonRememberInactive: {
    height: scale(35),
    borderColor: '#667479',
    borderWidth: 3,
    paddingVertical: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: scale(20),
  },

  textRememberInactive: {
    fontFamily: 'Geomanist-Medium',
    fontSize: scale(12),
    color: '#667479',
  },

  textVideoTitle: {
    fontFamily: 'SF-Pro-Text-Bold',
    fontSize: scale(12),
    color: '#495057',
    marginVertical: scale(3),
    fontWeight: 'bold',
    width: scale(180),
  },

  textVideoPembicara: {
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: scale(10),
    color: '#ADB5BD',
  },

});

export default StreamingScreen;
