/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback } from 'react';
import type { PropsWithChildren } from 'react';

import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';

import { ScaledSheet } from 'react-native-size-matters';
import { scale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import { format } from 'date-fns';

type YoutubeThumbnailProps = PropsWithChildren<{
  tumbInfo: any;
}>;

// type SectionProps = PropsWithChildren<{
//   text: string;
//   limit: number;
//   custom: any;
// }>;

// type OpenURLButtonProps = {
//   url: string;
// };

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
  //     await Linking.openURL(`https://youtu.be/${item.file}`);
  //   } else {
  //     Alert.alert(`Don't know how to open this URL: ${url}`);
  //   }
  // }, [url]);

  return (
    <TouchableOpacity onPress={() => Linking.openURL(`https://youtu.be/${url}`)}>
      <Image
        source={require("../../../../assets/icons/Thumnail/logoYoutube.png")}
        resizeMode='contain'
        style={{
          maxHeight: scale(48),
          maxWidth: scale(72),
        }}
      />
    </TouchableOpacity>
  );
};

const Thumbnail = ({ tumbInfo }: YoutubeThumbnailProps) => {

  // Ekstrak kode video dari URL
  // const videoId = (tumbInfo.link).split('v=')[1];
  // const videoParams = videoId ? videoId.split('&')[0] : '';

  // Buat URL thumbnail dari kode video
  // const thumbnailUrl = `https://img.youtube.com/vi/${videoParams}/0.jpg`;
  let dateStart = new Date(tumbInfo.event.tanggal_mulai);
  let formatDateStart = format(dateStart, 'dd MMMM yyyy');

  return (
    <ImageBackground source={{ uri: `${tumbInfo.thumbnail}` }} style={{ width: '100%', aspectRatio: 16 / 9 }} resizeMode='cover' >
      <View style={styles.insideThumbnail}>
        <LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'transparent']} >
          <View style={[{ paddingHorizontal: scale(15), paddingTop: scale(10) }, styles.header]}>
            <View style={styles.live}>
              <Text style={styles.textLive}>Live Now !</Text>
            </View>
            {/* <Image
              source={require('../../../../assets/logo/youtube.png')}
              resizeMode='contain'
              style={{
                maxHeight: scale(52),
                maxWidth: scale(52),
              }}
            /> */}
          </View>
        </LinearGradient>
        <View style={{ justifyContent: 'center', alignItems: 'center', height: scale(48), width: 'auto' }}>
          <OpenURLButton url={tumbInfo.file}></OpenURLButton>
        </View>
        <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.7)']} >
          <View style={[{ paddingHorizontal: scale(15), paddingBottom: scale(10) }, styles.judulThumbnail]}>
            <View>
              <LimitText text={tumbInfo.judul} limit={85} custom={styles.textTitle} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {/* <LimitText text={tumbInfo.pembicara} limit={40} custom={styles.textSubTitle} /> */}
              <Text></Text>
              <Text style={styles.textSubTitle}>{formatDateStart}</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </ImageBackground>
  );
};

const styles = ScaledSheet.create({
  insideThumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  live: {
    borderRadius: scale(20),
    paddingHorizontal: scale(10),
    paddingVertical: scale(8),
    backgroundColor: '#38B000',
    width: 'auto',
  },

  textLive: {
    fontFamily: 'Geomanist-Regular',
    fontSize: scale(12),
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  judulThumbnail: {
    justifyContent: 'space-between',
  },

  textTitle: {
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: scale(14),
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'justify',
  },

  textSubTitle: {
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: scale(11),
    color: '#FFFFFF',
  },
});

export default Thumbnail;
