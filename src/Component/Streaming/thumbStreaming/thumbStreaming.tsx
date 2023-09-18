/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback} from 'react';
import type {PropsWithChildren} from 'react';

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

type YoutubeThumbnailProps = PropsWithChildren<{
    tumbInfo: any;
}>;

type SectionProps = PropsWithChildren<{
  text: string;
  limit: number;
  custom: any;
}>;

type OpenURLButtonProps = {
  url: string;
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

const thumbStreaming = ({ tumbInfo }: YoutubeThumbnailProps) => {

  // Ekstrak kode video dari URL
  const videoId = (tumbInfo.link).split('v=')[1];
  const videoParams = videoId ? videoId.split('&')[0] : '';

  // Buat URL thumbnail dari kode video
  const thumbnailUrl = `https://img.youtube.com/vi/${videoParams}/0.jpg`;

  return (
    <ImageBackground source={{ uri: thumbnailUrl }} style={{ width: '100%', aspectRatio: 16/9 }} resizeMode='cover' >
        <View style={styles.insideThumbnail}>
            <View style={{ justifyContent: 'center', alignItems: 'center', height: scale(48), width: 'auto'}}>
              <OpenURLButton url={tumbInfo.link}></OpenURLButton>
            </View>
            <View style={styles.judulThumbnail}>
                <View>
                  <LimitText text={tumbInfo.judul} limit={85} custom={styles.textTitle} />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <LimitText text={tumbInfo.pembicara} limit={40} custom={styles.textSubTitle} />
                    <Text style={styles.textSubTitle}>{tumbInfo.tanggal}</Text>
                </View>
            </View>
        </View>
    </ImageBackground>
  );
};

const styles = ScaledSheet.create({
  insideThumbnail: {
    width: '100%', 
    aspectRatio: 16/9,
    paddingHorizontal: scale(15),
    paddingVertical: scale(10),
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
  },

  textSubTitle: {
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: scale(11),
    color: '#FFFFFF',
  },
});

export default thumbStreaming;
