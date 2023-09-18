/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useCallback} from 'react';
import type {PropsWithChildren} from 'react';

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
    Button
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';

// Component
import Header from '../../Component/Header';
import Search from '../../../assets/icons/Header/Search.svg';

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
};

type ThumbnailPodcastProps = {
  urlVideoPodcast : any;
  judulPodcast : any;
  pembicaraPodcast : any;
  durasiPodcast : any;
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

const OpenURLButton = ({url}: OpenURLButtonProps) => {
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

const OpenURLPodcastButton = ({url}: OpenURLButtonProps) => {
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

const ThumbnailVideo = ({urlVideo, title, pembicara}: ThumbnailVideoProps) => {
  // Ekstrak kode video dari URL
  const videoEventId = (urlVideo).split('v=')[1];
  const videoEventParams = videoEventId ? videoEventId.split('&')[0] : '';

  // Buat URL thumbnail dari kode video
  const thumbnailVideoUrl = `https://img.youtube.com/vi/${videoEventParams}/0.jpg`;

  return(
    <View style={{flexDirection: 'column', width: scale(156), marginBottom: scale(15)}}>
      <ImageBackground source={{ uri: thumbnailVideoUrl }} style={{ width: scale(156), aspectRatio: 16/9 }} imageStyle={{ borderRadius: 10}} resizeMode='cover' >

      </ImageBackground>
      <TouchableOpacity>
        <LimitText text={title} limit={40} custom={styles.textVideoTitle} />
      </TouchableOpacity>
      <LimitText text={pembicara} limit={29} custom={styles.textVideoPembicara} />
    </View>
  );
};

const ThumbnailNewVideoPodcast = ({urlVideoPodcast, judulPodcast, pembicaraPodcast, durasiPodcast} : ThumbnailPodcastProps) => {

  // Ekstrak kode video dari URL
  const videoPodcastId = (urlVideoPodcast).split('v=')[1];
  const videoPodcastParams = videoPodcastId ? videoPodcastId.split('&')[0] : '';

  // Buat URL thumbnail dari kode video
  const thumbnailPodcastUrl = `https://img.youtube.com/vi/${videoPodcastParams}/0.jpg`;

  return(
    <ImageBackground source={{ uri: thumbnailPodcastUrl }} style={{ width: '100%', aspectRatio: 16/9, }} imageStyle={{ borderRadius: 10}} resizeMode='cover' >
      <View style={{width: '100%', aspectRatio: 16/9, flexDirection: 'column', justifyContent: 'space-between',}}>
        <LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'transparent']} style={{borderTopLeftRadius: scale(10), borderTopRightRadius: scale(10)}} >
          <View style={{justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: scale(10), paddingTop: scale(10)}}>
            <View style={{minWidth: '70%'}}><Text>  </Text></View>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: scale(15), paddingVertical: scale(5), width: '20%', backgroundColor: '#BA181B', borderRadius: scale(20) }}>
              <Text style={{fontFamily: 'Geomanist-Medium', fontSize: scale(13), fontWeight: '600', color: 'white'}}>New</Text>
            </View>
          </View>
        </LinearGradient>
        <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', height: scale(80)}}>
          <OpenURLPodcastButton url={urlVideoPodcast}></OpenURLPodcastButton>
        </TouchableOpacity>
        <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.7)']} style={{borderBottomLeftRadius: scale(10), borderBottomRightRadius: scale(10)}} >
          <View style={{justifyContent: 'space-between', flexDirection: 'column', paddingHorizontal: scale(10), paddingBottom: scale(5)}}>
            <LimitText text={judulPodcast} limit={68} custom={{fontFamily: 'SF-Pro-Text-Bold', fontSize: scale(14), color: 'white', textAlign: 'justify'}} />
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
              <LimitText text={pembicaraPodcast} limit={40} custom={{fontFamily: 'ProximaNova-Semibold', fontSize: scale(11), color: 'white'}} />
              <Text style={{fontFamily: 'Geomanist-Medium', fontSize: scale(13), color: 'white'}}>{durasiPodcast}</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </ImageBackground>
  );
};

const Podcast = ({imgPodcast, titlePodcast, pembicaraPodcast, durasiPodcast} : PodcastProps) => {


  return(
    <View style={{flexDirection: 'row', width: '100%', marginBottom: scale(15), justifyContent: 'space-between'}}>
      <View style={{width: '20%', height: scale(56),}}>
        <Image 
          source={imgPodcast}
          resizeMode= 'contain'
          style={{
            maxHeight: scale(56),
            maxWidth: scale(56),
          }}
        />
      </View>
      <View style={{justifyContent: 'center', height: scale(56), marginHorizontal: scale(10), width: '63%',}}>
        <LimitText limit={22} text={titlePodcast} custom={{fontFamily: 'SF-Pro-Text-Regular', fontSize: scale(14), color: '#495057', fontWeight: '700'}}/>
        <View style={{flexDirection: 'row'}}>
          <LimitText limit={20} text={pembicaraPodcast} custom={{fontFamily: 'SF-Pro-Text-Regular', fontSize: scale(10), color: '#ADB5BD',}}/>
          <Text style={{fontFamily: 'SF-Pro-Text-Regular', fontSize: scale(10), color: '#ADB5BD',}}>• {durasiPodcast}</Text>
        </View>
      </View>
      <TouchableOpacity style={{height: scale(56), width: '10%', justifyContent: 'center', alignItems: 'center',}}>
        <Image 
          source={require("../../../assets/icons/Streaming/Button/More.png")}
          resizeMode= 'contain'
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

  // State untuk thumbnail Streaming (Harus di set 1 Inputan)
  const [nowLive, setNowLive] = useState({
    "id"        : 1,
    "link"      : 'https://www.youtube.com/watch?v=7WCdsrSKf3U&ab_channel=PerkumpulanKharis',
    "judul"     : 'MOVING FORWARD - Part 2: Melangkah Maju Bersama Tuhan',
    "pembicara" : 'dr. Nur Flora Nita TB Sinaga, Sp.OT',
    "tanggal"   : '30/08/2022 17:00',
    "event"     : {
                    "id"    : 2,
                    "logo"  : require("../../../assets/icons/Home/Menu/Menu_2.png"),
                    "title" : "Godly Family"
                  },
  })

  const [menu, setMenu] = useState([
    {
      "id"    : 2,
      "logo"  : require("../../../assets/icons/Home/Menu/Menu_2.png"),
      "title" : "Godly Family",
      "streaming" : true,
    },
    {
      "id"    : 3,
      "logo"  : require("../../../assets/icons/Home/Menu/Menu_3.png"),
      "title" : "Marriage Enrichment",
      "streaming" : false,
    },
    {
      "id"    : 4,
      "logo"  : require("../../../assets/icons/Home/Menu/Menu_4.png"),
      "title" : "Growing Couple",
      "streaming" : false,
    },
    {
      "id"    : 5,
      "logo"  : require("../../../assets/icons/Home/Menu/Menu_5.png"),
      "title" : "Marriage Spiritual Transformation Class",
      "streaming" : false,
    },
    {
      "id"    : 6,
      "logo"  : require("../../../assets/icons/Home/Menu/Menu_6.png"),
      "title" : "Pre Marital Class",
      "streaming" : false,
    },
    {
      "id"    : 7,
      "logo"  : require("../../../assets/icons/Home/Menu/Menu_7.png"),
      "title" : "Shining Generation Class",
      "streaming" : false,
    },
    {
      "id"    : 8,
      "logo"  : require("../../../assets/icons/Home/Menu/Menu_16.png"),
      "title" : "Wisdom For Family",
      "streaming" : true,
    },
  ])

  const [field, onChangeField] = useState('');

  const [status, setStatus] = useState('Godly Family')
  const setStatusFilter = (status: React.SetStateAction<string>) => {
    setStatus(status)
  }

  const [podcast, setPodcast] = useState([
    {
      "image"     : require("../../../assets/icons/Streaming/imgPodcast/List-1.png"),
      "judul"     : 'Kekerasan Dalam Rumah Tangga (KDRT)',
      "pembicara" : 'Ev. Ade  Widiantara',
      "durasi"    : '21:05',
    },
    {
      "image"     : require("../../../assets/icons/Streaming/imgPodcast/List-2.png"),
      "judul"     : 'Kekerasan Dalam Rumah Tangga (KDRT)',
      "pembicara" : 'Enny Dewi, SE., M. Th.',
      "durasi"    : '15:17',
    },
  ]);

  // Ekstrak kode video dari URL
  const videoId = (nowLive.link).split('v=')[1];
  const videoParams = videoId ? videoId.split('&')[0] : '';

  // Buat URL thumbnail dari kode video
  const thumbnailUrl = `https://img.youtube.com/vi/${videoParams}/0.jpg`;

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={{ uri: thumbnailUrl }} style={[{ width: '100%', aspectRatio: 16/9, justifyContent: 'space-between', flexDirection: 'column',}]} resizeMode='cover' >
        <LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'transparent']} >
          <Header />
        </LinearGradient>
        <View style={{ justifyContent: 'center', alignItems: 'center', height: scale(48), width: 'auto',}}>
          <OpenURLButton url={nowLive.link}></OpenURLButton>
        </View>
        <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.7)']} >
          <View style={{flexDirection:'column', justifyContent: 'space-between', marginHorizontal: scale(15),}}>
            <View style={styles.live}>
                <Text style={styles.textLive}>Live Now !</Text>
            </View>
            <View>
              <LimitText text={nowLive.judul} limit={85} custom={styles.textTitle} />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <LimitText text={nowLive.pembicara} limit={40} custom={styles.textSubTitle} />
                <Text style={[{paddingBottom: scale(25)},styles.textSubTitle]}>{nowLive.tanggal}</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.content}>
        {/* Search */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: scale(15), paddingHorizontal: scale(15),}}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeField}
            value={field}
            placeholder="Cari judul acara atau nama pembicara"
          />
          <TouchableOpacity style={{backgroundColor: '#3A0CA3', height: scale(40), width: scale(40), borderRadius: scale(5), alignItems: 'center', justifyContent: 'center'}}>
            <Search width={scale(30)} height={scale(30)} />
          </TouchableOpacity>
        </View>

        {/* Button */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between', maxWidth: '100%', flexWrap: 'wrap', paddingHorizontal: scale(15),}}>
          {menu.map((listMenu, index) => (
            (listMenu.streaming == true ? (
              <TouchableOpacity style={[styles.elevation, (status === listMenu.title) ? (styles.buttonMenuActive) : (styles.buttonMenuInactive)]} onPress={() => setStatusFilter((listMenu.title))}>
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
              source={ (status === 'Audio Podcast') ? (require("../../../assets/icons/Home/Menu/Menu_12_Putih.png")) : (require("../../../assets/icons/Home/Menu/Menu_12_Color.png")) }
              resizeMode='contain'
              style={{
                maxHeight: scale(42),
                maxWidth: scale(42),
              }}
            />
            <LimitText text={'Audio Podcast'} limit={18} custom={[(status === 'Audio Podcast') ? (styles.textMenuActive) : (styles.textMenuInactive)]} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.buttonMenuInactive, styles.elevation]}>
            <Image 
              source={require("../../../assets/icons/Home/Menu/Menu_17.png")}
              resizeMode='contain'
              style={{
                maxHeight: scale(42),
                maxWidth: scale(42),
              }}
            />
            <LimitText text={'Lainnya'} limit={18} custom={styles.textMenuInactive} />
          </TouchableOpacity>
        </View>

        {/* Upcoming Live Streaming */}
        {status === 'Audio Podcast' ? (
          <View>
            <View style={{justifyContent: 'flex-start', marginTop: scale(5), marginBottom: scale(15), paddingHorizontal: scale(15),}}>
              <Text style={styles.textSubMenu}>New Realease</Text>
            </View>
            <View style={{flexDirection: 'column', width: 'auto', marginBottom: scale(15), marginHorizontal: scale(15)}}>
              {/* New Video */}
              <ThumbnailNewVideoPodcast urlVideoPodcast={'https://www.youtube.com/watch?v=MLr54_HQavw&ab_channel=TheVillageChurch-FlowerMound'} judulPodcast={'Pemuridan dalam Keluarga / Keluarga yang Memuridkan'} pembicaraPodcast={'Pdt. Nyoman Widiantara'} durasiPodcast={'25:01'} />
            </View>
            <View style={{justifyContent: 'flex-start', marginTop: scale(5), marginBottom: scale(15), paddingHorizontal: scale(15),}}>
              <Text style={styles.textSubMenu}>New Realease</Text>
            </View>
            <View style={{flexDirection: 'column', width: 'auto', marginBottom: scale(15), marginHorizontal: scale(15)}}>
              {podcast.map((listPodcast, key)=>(
                <Podcast imgPodcast={listPodcast.image} titlePodcast={listPodcast.judul} pembicaraPodcast={listPodcast.pembicara} durasiPodcast={listPodcast.durasi} />
              ))}
            </View>
          </View>
        ) : (
          <View>
            <View style={{justifyContent: 'flex-start', marginTop: scale(5), marginBottom: scale(15), paddingHorizontal: scale(15),}}>
              <Text style={styles.textSubMenu}>Upcoming Live Streaming</Text>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{height:scale(310), flexDirection: 'row', paddingHorizontal: scale(15),}}>
              <View style={{justifyContent: 'space-between', flexDirection: 'column', marginRight:scale(15)}}>
                <Image 
                  source={require("../../../assets/bg/Feed/Magnificat.png")}
                  resizeMode='contain'
                  style={{
                    borderRadius: scale(10),
                    maxHeight: scale(180),
                    maxWidth: scale(180),
                  }}
                />
                <View>
                  <Text style={styles.textTanggal}>4 - 6 November 2023</Text>
                  <LimitText text={'Bantal Keluarga - Godly Family Kharis Godly Family Kharis Godly Family Kharis'} limit={56} custom={styles.textJudulStreaming} />
                  <LimitText text={'dr. Nur Flora Nita TB Sinaga, Sp.OT'} limit={36} custom={styles.textPembicara} />
                </View>
                <TouchableOpacity style={styles.buttonRememberInactive}>
                  <Text style={styles.textRememberInactive}>Ingatkan Saya</Text>
                </TouchableOpacity>
              </View>
              
              <View style={{justifyContent: 'space-between', flexDirection: 'column', marginRight:scale(15)}}>
                <Image 
                  source={require("../../../assets/bg/Feed/Magnificat.png")}
                  resizeMode='contain'
                  style={{
                    borderRadius: scale(10),
                    maxHeight: scale(180),
                    maxWidth: scale(180),
                  }}
                />
                <View>
                  <Text style={styles.textTanggal}>4 - 6 November 2023</Text>
                  <LimitText text={'Bantal Keluarga - Godly Family Kharis Godly Family Kharis Godly Family Kharis'} limit={56} custom={styles.textJudulStreaming} />
                  <LimitText text={'dr. Nur Flora Nita TB Sinaga, Sp.OT'} limit={36} custom={styles.textPembicara} />
                </View>
                <TouchableOpacity style={styles.buttonRememberInactive}>
                  <Text style={styles.textRememberInactive}>Ingatkan Saya</Text>
                </TouchableOpacity>
              </View>
              {/* View Padding */}
              <View style={{marginRight: scale(30)}}></View>
            </ScrollView>

            {/* Video Lainnya */}
            <View style={{justifyContent: 'flex-start', marginTop: scale(15), marginBottom: scale(15), paddingHorizontal: scale(15),}}>
              <Text style={styles.textSubMenu}>Video Lainnya</Text>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', maxWidth: '100%', flexWrap: 'wrap', paddingHorizontal: scale(15),}}>
              <ThumbnailVideo urlVideo={'https://www.youtube.com/watch?v=SQadcm_dwEM&list=RDEMXLzmvZ50xfMg8xJBCqOW2g&index=2&ab_channel=LiberaOfficial'} title={'MOVING FORWARD - Part 1: Bersua Tuhan Di Tengah Kedukaan'} pembicara={'dr. Nur Flora Nita TB Sinaga, Sp.OT'} />
              <ThumbnailVideo urlVideo={'https://www.youtube.com/watch?v=SQadcm_dwEM&list=RDEMXLzmvZ50xfMg8xJBCqOW2g&index=2&ab_channel=LiberaOfficial'} title={'MOVING FORWARD - Part 1: Bersua Tuhan Di Tengah Kedukaan'} pembicara={'dr. Nur Flora Nita TB Sinaga, Sp.OT'} />
              <ThumbnailVideo urlVideo={'https://www.youtube.com/watch?v=SQadcm_dwEM&list=RDEMXLzmvZ50xfMg8xJBCqOW2g&index=2&ab_channel=LiberaOfficial'} title={'MOVING FORWARD - Part 1: Bersua Tuhan Di Tengah Kedukaan'} pembicara={'dr. Nur Flora Nita TB Sinaga, Sp.OT'} />
            </View>
          </View>
        )}
        
      </View>
    </ScrollView>
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
  },

  elevation: {
    shadowColor: '#52006A',  
    elevation: 5, 
  },

  textMenuActive: {
    color:"white", 
    fontSize: scale(12), 
    fontFamily: 'SF-Pro-Text-Regular',
    width: '65%',
    marginLeft: scale(5),
  },

  textMenuInactive: {
    color:"#242B33", 
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

  textSubMenu:{
    fontFamily: 'Inter-SemiBold',
    fontSize: scale(15),
    color: '#000000',
    fontWeight: '700',
  },

  textTanggal:{
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: scale(10),
    color: '#FF564F',
    marginBottom: scale(3),
  },

  textJudulStreaming: {
    fontFamily: 'SF-Pro-Text-Bold',
    fontSize: scale(12),
    color: '#495057',
    marginBottom: scale(2),
    fontWeight: 'bold',
    width: scale(180),
    textAlign: 'justify',
  },

  textPembicara:{
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: scale(10),
    width: scale(180),
    color: '#ADB5BD',
  },

  buttonRememberInactive:{
    height: scale(35),
    borderColor: '#667479',
    borderWidth: 3,
    paddingVertical: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: scale(20),
  },

  textRememberInactive:{
    fontFamily: 'Geomanist-Medium',
    fontSize: scale(12),
    color: '#667479',
  },

  textVideoTitle:{
    fontFamily: 'SF-Pro-Text-Bold',
    fontSize: scale(12),
    color: '#495057',
    marginVertical: scale(3),
    fontWeight: 'bold',
    width: scale(180),
  },

  textVideoPembicara:{
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: scale(10),
    color: '#ADB5BD',
  },

});

export default StreamingScreen;
