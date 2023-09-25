/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import type { PropsWithChildren } from 'react';

import {
  ScrollView,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { scale } from 'react-native-size-matters';

// SVG
import ArrowButton from '../../../assets/icons/Home/ArrowButton.svg';
import ArrowVButton from '../../../assets/icons/Home/ArrowVButton.svg';

// Component
import Header from '../../Component/Header';
import YoutubeThumbnail from '../../Component/Home/Thumbnail';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { useNavigation } from '@react-navigation/native';

type SectionProps = PropsWithChildren<{
  text: string;
  limit: number;
}>;

const LimitText = ({ text, limit }: SectionProps) => {
  const panjangText =
    text.length > limit ? text.substring(0, limit) + '...' : text;

  return <Text style={styles.menuTitle}>{panjangText}</Text>;
};

const HomeScreen = () => {
  // Navigation init
  const navigation = useNavigation();

  // State untuk informasi user
  const [userInfo] = useState({
    name: 'Pdt. Nyoman Widiantara',
  });
  // Menu dinamis diambil dari banyaknya event
  const [menu, setMenu] = useState([]);
  // const [menu, setMenu] = useState([
  //   {
  //     id: 2,
  //     logo: require('../../../assets/icons/Home/Menu/Menu_2.png'),
  //     title: 'Godly Family',
  //   },
  //   {
  //     id: 3,
  //     logo: require('../../../assets/icons/Home/Menu/Menu_3.png'),
  //     title: 'Marriage Enrichment',
  //   },
  //   {
  //     id: 4,
  //     logo: require('../../../assets/icons/Home/Menu/Menu_4.png'),
  //     title: 'Growing Couple',
  //   },
  //   {
  //     id: 5,
  //     logo: require('../../../assets/icons/Home/Menu/Menu_5.png'),
  //     title: 'Marriage Spiritual Transformation Class',
  //   },
  //   {
  //     id: 6,
  //     logo: require('../../../assets/icons/Home/Menu/Menu_6.png'),
  //     title: 'Pre Marital Class',
  //   },
  //   {
  //     id: 7,
  //     logo: require('../../../assets/icons/Home/Menu/Menu_7.png'),
  //     title: 'Shining Generation Class',
  //   },
  //   {
  //     id: 8,
  //     logo: require('../../../assets/icons/Home/Menu/Menu_16.png'),
  //     title: 'Wisdom For Family',
  //   }
  // ]);


  const jmlMenuDinamis = menu.length;
  const [jmlMenuStatis, setJmlMenuStatis] = useState<any | null>(null);

  // Menu statis yang memang disediakan dalam app
  const [menuStatis] = useState([
    {
      id: jmlMenuDinamis + 2,
      logo: require('../../../assets/icons/Home/Menu/Menu_8.png'),
      title: 'Family Gathering',
    },
    {
      id: jmlMenuDinamis + 3,
      logo: require('../../../assets/icons/Home/Menu/Menu_9.png'),
      title: 'Konseling',
    },
    {
      id: jmlMenuDinamis + 4,
      logo: require('../../../assets/icons/Home/Menu/Menu_11.png'),
      title: 'Persekutuan Doa',
    },
    {
      id: jmlMenuDinamis + 5,
      logo: require('../../../assets/icons/Home/Menu/Menu_12_Color.png'),
      title: 'Audio Podcast',
    },
    {
      id: jmlMenuDinamis + 6,
      logo: require('../../../assets/icons/Home/Menu/Menu_13.png'),
      title: 'Video Streaming',
    },
    {
      id: jmlMenuDinamis + 7,
      logo: require('../../../assets/icons/Home/Menu/Menu_14.png'),
      title: 'His Favor Today',
    },
    {
      id: jmlMenuDinamis + 8,
      logo: require('../../../assets/icons/Home/Menu/Menu_15.png'),
      title: 'Daily Devotion',
    },
  ]);

  const [] = useState([
    {
      id: 1,
      image: require('../../../assets/bg/Group/Family.png'),
      headerGrup: 'God’s Will in',
      Grup: 'FAMILY',
      deskripsi: 'Temukan visi Allah untuk membangun keluarga terang',
    },
    {
      id: 2,
      image: require('../../../assets/bg/Group/Marriage.png'),
      headerGrup: 'God’s Love in',
      Grup: 'MARRIAGE',
      deskripsi: 'Jelajahi keindahan pernikahan dengan kasih Allah',
    },
    {
      id: 3,
      image: require('../../../assets/bg/Group/Family.png'),
      headerGrup: 'God’s Vision Before',
      Grup: 'WEDDDING',
      deskripsi: 'Kenali visi Allah sebelum memasuki pernikahan kudus',
    },
    {
      id: 4,
      image: require('../../../assets/bg/Group/Family.png'),
      headerGrup: 'God’s Wisdom as',
      Grup: 'PARENTS',
      deskripsi: 'Terapkan hikmat dari Tuhan untuk mendidik generasi muda',
    },
    {
      id: 5,
      image: require('../../../assets/bg/Group/Family.png'),
      headerGrup: 'God’s Vigil in',
      Grup: 'YOUTH GEN',
      deskripsi: 'Pesan Tuhan bagi generasi muda dalam membangun hubungan',
    },
  ]);

  // State untuk fungsi show dan hide menu
  const [showMenu, setShowMenu] = useState(false);

  // State untuk thumbnail youtube
  const [liveYoutube] = useState([
    {
      id: 1,
      link: 'https://www.youtube.com/watch?v=7WCdsrSKf3U&ab_channel=PerkumpulanKharis',
      judul: 'MOVING FORWARD - Part 2: Melangkah Maju Bersama Tuhan',
      pembicara: 'dr. Nur Flora Nita TB Sinaga, Sp.OT',
      tanggal: '30/08/2022 17:00',
      event: {
        id: 2,
        logo: require('../../../assets/icons/Home/Menu/Menu_2.png'),
        title: 'Godly Family',
      },
    },
  ]);

  // State untuk recommended event
  const [recomEvent] = useState([
    {
      id: 1,
      image: require('../../../assets/bg/Feed/Marriage.png'),
    },
    {
      id: 2,
      image: require('../../../assets/bg/Feed/Keluarga.png'),
    },
    {
      id: 3,
      image: require('../../../assets/bg/Feed/TheAuthum.png'),
    },
    {
      id: 4,
      image: require('../../../assets/bg/Feed/MovingForward.png'),
    },
    {
      id: 5,
      image: require('../../../assets/bg/Feed/Bantal.png'),
    },
  ]);

  // Function
  const pressShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const getCategories = () => {
    axios.get(`${BASE_URL}/api/event-categories`)
      .then((response) => {
        let menu = response.data.categories;
        setMenu(menu)
      })
      .then(() => console.log(menu))
      .catch((err) => {
        console.log(err);
      })
  };

  // UseEffect
  useEffect(() => {
    if (jmlMenuDinamis <= 9) {
      const menuStatis = 10 - jmlMenuDinamis - 1;
      setJmlMenuStatis(menuStatis);
    } else {
      const menuStatis = 0;
      setJmlMenuStatis(menuStatis);
    }

    getCategories();
    return () => { };
  }, [jmlMenuDinamis]);

  // Mendapatkan luas layar
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const onPressKategori = (kategori) => {
    navigation.navigate('EventList', { kategori: kategori });
  }

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/bg/Header.png')}
        resizeMode="cover"
        style={styles.image}>
        <Header />
        <View style={styles.headerHome}>
          <Text style={styles.text_header_1}>Welcome Blessed Family of</Text>
          <Text style={styles.text_header_2}>{userInfo.name}</Text>
        </View>
      </ImageBackground>
      <View style={styles.content}>
        {/* Top */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            top: scale(-32),
            marginHorizontal: scale(15),
          }}>
          <View style={[styles.kotakHome, styles.elevation]}>
            <ImageBackground
              source={require('../../../assets/icons/Home/Kegiatanku.png')}
              resizeMode="cover"
              style={[styles.kotakHome, styles.elevation]}>
              <View style={styles.containerKotakHome}>
                <Text style={styles.KotakHomeTitle}>Kegiatanku</Text>
                <Text style={styles.KotakHomeContentBold}>
                  20<Text style={styles.KotakHomeContent}> / 25</Text>
                </Text>
              </View>
            </ImageBackground>
          </View>

          <View style={[styles.kotakHome, styles.elevation]}>
            <ImageBackground
              source={require('../../../assets/icons/Home/Pelayananku.png')}
              resizeMode="cover"
              style={[styles.kotakHome, styles.elevation]}>
              <View style={styles.containerKotakHome}>
                <Text style={styles.KotakHomeTitle}>Pelayananku</Text>
                <Text style={styles.KotakHomeContentBold}>
                  18<Text style={styles.KotakHomeContent}> / 20</Text>
                </Text>
              </View>
            </ImageBackground>
          </View>

          <View style={[styles.kotakHome, styles.elevation]}>
            <ImageBackground
              source={require('../../../assets/icons/Home/Bookmarkku.png')}
              resizeMode="cover"
              style={[styles.kotakHome, styles.elevation]}>
              <View style={styles.containerKotakHome}>
                <Text style={styles.KotakHomeTitle}>Bookmarkku</Text>
                <Text style={styles.KotakHomeContentBold}>12508</Text>
              </View>
            </ImageBackground>
          </View>
        </View>

        {/* Menu */}
        <View
          style={
            showMenu
              ? [
                { maxHeight: scale(90 * Math.ceil((jmlMenuDinamis + 8) / 5)) },
                styles.containerMenuShow,
              ]
              : styles.containerMenuHide
          }>
          {/* Menu 1 */}
          <TouchableOpacity
            style={{
              alignItems: 'center',
              width: scale(64),
              marginBottom: scale(10),
            }}>
            <Image
              source={require('../../../assets/icons/Home/Menu/Menu_1.png')}
              resizeMode="contain"
              style={{
                width: windowWidth * (20 / 100),
                height: windowHeight * (7 / 100)
              }}
            />
            <Text style={styles.menuTitle}>Tentang Kharis</Text>
          </TouchableOpacity>

          {/* Jika kondisi Show */}
          {showMenu ? (
            <>
              {/* Menu Dinamis */}
              {menu.map((kategori, index) => (
                <TouchableOpacity
                  onPress={() => onPressKategori(kategori)}
                  style={{
                    alignItems: 'center',
                    width: scale(64),
                    marginBottom: scale(10),
                  }}
                  key={index}>

                  {/* Percobaan Fetch */}
                  <Image
                    source={{
                      uri: `${BASE_URL}/storage/files/event-categorie/${kategori.icon}`,
                    }} resizeMode="contain"
                    style={{
                      width: windowWidth * (20 / 100),
                      height: windowHeight * (7 / 100)
                    }}
                  />
                  <LimitText text={kategori.nama} limit={19} />
                </TouchableOpacity>
              ))}

              {/* Menu Statis */}
              {menuStatis.map((imageStatis, index) => (
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    width: scale(64),
                    marginBottom: scale(10),
                  }}
                  key={index}>
                  <Image
                    source={imageStatis.logo}
                    resizeMode="contain"
                    style={{
                      width: windowWidth * (20 / 100),
                      height: windowHeight * (7 / 100)
                    }}
                  />
                  <LimitText text={imageStatis.title} limit={19} />
                </TouchableOpacity>
              ))}
            </>
          ) : (
            // Jika kondisi hide
            <>
              {/* Menu Dinamis */}
              {menu.slice(0, 9).map((image, index) => (
                <TouchableOpacity
                  onPress={() => onPressKategori(image)}

                  style={{
                    alignItems: 'center',
                    width: scale(64),
                    marginBottom: scale(10),
                  }}
                  key={index}>
                  <Image
                    source={{
                      uri: `${BASE_URL}/storage/files/event-categorie/${image.icon}`,
                    }}
                    resizeMode="contain"
                    style={{
                      width: windowWidth * (20 / 100),
                      height: windowHeight * (7 / 100)
                    }}
                  />
                  <LimitText text={image.nama} limit={19} />
                </TouchableOpacity>
              ))}

              {/* Menu Statis */}
              {menuStatis.slice(0, jmlMenuStatis).map((imageStatis, index) => (
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    width: scale(64),
                    marginBottom: scale(10),
                  }}
                  key={index}>
                  <Image
                    source={imageStatis.logo}
                    resizeMode="contain"
                    style={{
                      width: windowWidth * (20 / 100),
                      height: windowHeight * (7 / 100)
                    }}
                  />
                  <LimitText text={imageStatis.title} limit={19} />
                </TouchableOpacity>
              ))}
            </>
          )}
        </View>

        {/* Tombol Hide and Show */}
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: scale(1),
          }}
          onPress={pressShowMenu}>
          {showMenu ? (
            <Image
              source={require('../../../assets/icons/Home/Menu/hide.png')}
              resizeMode="contain"
              style={{
                maxHeight: scale(16),
                maxWidth: scale(48),
              }}
            />
          ) : (
            <Image
              source={require('../../../assets/icons/Home/Menu/show.png')}
              resizeMode="contain"
              style={{
                maxHeight: scale(16),
                maxWidth: scale(48),
              }}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* Thumbnail Youtube */}
      <View>
        {liveYoutube.map((thumb, index) => (
          <>
            <YoutubeThumbnail
              tumbInfo={thumb}
              key={index}
              logo={thumb.event.logo}
            />
          </>
        ))}
      </View>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: scale(15), paddingHorizontal: scale(15) }}>
        {/* FAMILY */}
        <View
          style={{ flexDirection: 'row', height: 'auto', marginRight: scale(5) }}>
          <View
            style={{
              height: scale(240),
              width: 'auto',
              borderRadius: scale(10),
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <Image
              source={require('../../../assets/bg/Group/Family.png')}
              resizeMode="contain"
              style={{
                borderRadius: scale(10),
                maxHeight: scale(112),
                maxWidth: scale(160),
              }}
            />
            <View
              style={{
                backgroundColor: '#FFF7F0',
                width: scale(192),
                height: scale(148),
                borderBottomLeftRadius: scale(10),
                borderBottomRightRadius: scale(10),
                top: scale(-20),
                paddingTop: scale(12),
                paddingBottom: scale(7),
                paddingHorizontal: scale(15),
              }}>
              <Text style={[{ color: '#502C0D' }, styles.headerGroup]}>
                God’s Will in
              </Text>
              <Text style={[{ color: '#502C0D' }, styles.group]}>FAMILY</Text>
              <Text style={styles.groupDetail}>
                Temukan visi Allah untuk membangun keluarga terang
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#502C0D',
                  borderRadius: scale(20),
                  paddingHorizontal: scale(25),
                  paddingVertical: scale(8),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.buttonGroup}>Lihat Lebih Lanjut</Text>
                <ArrowButton width={scale(15)} height={scale(15)} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* MARRIAGE */}
        <View
          style={{
            flexDirection: 'row',
            height: 'auto',
            marginRight: scale(5),
            marginLeft: scale(5),
          }}>
          <View
            style={{
              height: scale(240),
              width: 'auto',
              borderRadius: scale(10),
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <Image
              source={require('../../../assets/bg/Group/Marriage.png')}
              resizeMode="cover"
              style={{
                borderRadius: scale(10),
                maxHeight: scale(112),
                maxWidth: scale(192),
              }}
            />
            <View
              style={{
                backgroundColor: '#FFF6F7',
                width: scale(192),
                height: scale(148),
                borderBottomLeftRadius: scale(10),
                borderBottomRightRadius: scale(10),
                top: scale(-20),
                paddingTop: scale(12),
                paddingBottom: scale(7),
                paddingHorizontal: scale(15),
              }}>
              <Text style={[{ color: '#A4161A' }, styles.headerGroup]}>
                God’s Love in
              </Text>
              <Text style={[{ color: '#A4161A' }, styles.group]}>MARRIAGE</Text>
              <Text style={styles.groupDetail}>
                Jelajahi keindahan pernikahan dengan kasih Allah
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#A4161A',
                  borderRadius: scale(20),
                  paddingHorizontal: scale(25),
                  paddingVertical: scale(8),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.buttonGroup}>Lihat Lebih Lanjut</Text>
                <ArrowButton width={scale(15)} height={scale(15)} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* WEDDDING */}
        <View
          style={{
            flexDirection: 'row',
            height: 'auto',
            marginRight: scale(5),
            marginLeft: scale(5),
          }}>
          <View
            style={{
              height: scale(240),
              width: 'auto',
              borderRadius: scale(10),
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <Image
              source={require('../../../assets/bg/Group/Wedding.png')}
              resizeMode="cover"
              style={{
                borderRadius: scale(10),
                maxHeight: scale(112),
                maxWidth: scale(192),
              }}
            />
            <View
              style={{
                backgroundColor: '#E5F4FF',
                width: scale(192),
                height: scale(148),
                borderBottomLeftRadius: scale(10),
                borderBottomRightRadius: scale(10),
                top: scale(-20),
                paddingTop: scale(12),
                paddingBottom: scale(7),
                paddingHorizontal: scale(15),
              }}>
              <Text style={[{ color: '#00528C' }, styles.headerGroup]}>
                God’s Vision Before
              </Text>
              <Text style={[{ color: '#00528C' }, styles.group]}>WEDDDING</Text>
              <Text style={styles.groupDetail}>
                Kenali visi Allah sebelum memasuki pernikahan kudus
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#00528C',
                  borderRadius: scale(20),
                  paddingHorizontal: scale(25),
                  paddingVertical: scale(8),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.buttonGroup}>Lihat Lebih Lanjut</Text>
                <ArrowButton width={scale(15)} height={scale(15)} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* PARENTS */}
        <View
          style={{
            flexDirection: 'row',
            height: 'auto',
            marginRight: scale(5),
            marginLeft: scale(5),
          }}>
          <View
            style={{
              height: scale(240),
              width: 'auto',
              borderRadius: scale(10),
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <Image
              source={require('../../../assets/bg/Group/Parents.png')}
              resizeMode="contain"
              style={{
                borderRadius: scale(10),
                maxHeight: scale(112),
                maxWidth: scale(192),
              }}
            />
            <View
              style={{
                backgroundColor: '#F4FFF1',
                width: scale(192),
                height: scale(148),
                borderBottomLeftRadius: scale(10),
                borderBottomRightRadius: scale(10),
                top: scale(-20),
                paddingTop: scale(12),
                paddingBottom: scale(7),
                paddingHorizontal: scale(15),
              }}>
              <Text style={[{ color: '#347361' }, styles.headerGroup]}>
                God’s Wisdom as
              </Text>
              <Text style={[{ color: '#347361' }, styles.group]}>PARENTS</Text>
              <Text style={styles.groupDetail}>
                Terapkan hikmat dari Tuhan untuk mendidik generasi muda
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#347361',
                  borderRadius: scale(20),
                  paddingHorizontal: scale(25),
                  paddingVertical: scale(8),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.buttonGroup}>Lihat Lebih Lanjut</Text>
                <ArrowButton width={scale(15)} height={scale(15)} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* YOUTH GEN */}
        <View
          style={{
            flexDirection: 'row',
            height: 'auto',
            marginRight: scale(30),
            marginLeft: scale(5),
          }}>
          <View
            style={{
              height: scale(240),
              width: 'auto',
              borderRadius: scale(10),
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <Image
              source={require('../../../assets/bg/Group/YouthGen.png')}
              resizeMode="contain"
              style={{
                borderRadius: scale(10),
                maxHeight: scale(112),
                maxWidth: scale(160),
              }}
            />
            <View
              style={{
                backgroundColor: '#FFF7E9',
                width: scale(192),
                height: scale(148),
                borderBottomLeftRadius: scale(10),
                borderBottomRightRadius: scale(10),
                top: scale(-20),
                paddingTop: scale(12),
                paddingBottom: scale(7),
                paddingHorizontal: scale(15),
              }}>
              <Text style={[{ color: '#D97A07' }, styles.headerGroup]}>
                God’s Vigil in
              </Text>
              <Text style={[{ color: '#D97A07' }, styles.group]}>YOUTH GEN</Text>
              <Text style={styles.groupDetail}>
                Pesan Tuhan bagi generasi muda dalam membangun hubungan
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#D97A07',
                  borderRadius: scale(20),
                  paddingHorizontal: scale(25),
                  paddingVertical: scale(8),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.buttonGroup}>Lihat Lebih Lanjut</Text>
                <ArrowButton width={scale(15)} height={scale(15)} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: scale(15),
        }}>
        <Text style={styles.textEvent}>Recommended Event</Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.textEventButton}>View all</Text>
          <ArrowVButton height={scale(15)} width={scale(7)} />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: scale(15), paddingHorizontal: scale(15) }}>
        {recomEvent.map((imageEvent, index) => (
          <>
            <TouchableOpacity
              style={{
                borderRadius: scale(10),
                maxHeight: scale(160),
                maxWidth: scale(160),
                marginRight: scale(10),
              }}>
              <Image
                source={imageEvent.image}
                resizeMode="contain"
                style={{
                  borderRadius: scale(10),
                  maxHeight: scale(160),
                  maxWidth: scale(160),
                  marginRight: scale(10),
                }}
              />
            </TouchableOpacity>
          </>
        ))}
        <View style={{ marginRight: scale(15) }}></View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = ScaledSheet.create({
  container: {
    backgroundColor: '#FDFDFD',
    marginBottom: scale(60),
  },

  image: {
    height: scale(224),
  },

  text_header_1: {
    fontSize: '10@s',
    color: '#FDFDFD',
    fontFamily: 'SF-Pro-Text-Regular',
  },

  text_header_2: {
    fontSize: '20@s',
    color: '#FDFDFD',
    fontFamily: 'Gilroy-Bold',
  },

  content: {
    backgroundColor: '#FDFDFD',
    width: '100%',
    height: 'auto',
    top: scale(-65),
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    marginBottom: scale(-65),
    flex: 1,
  },

  headerHome: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(15),
  },

  kotakHome: {
    height: scale(64),
    width: scale(104),
    backgroundColor: '#FDFDFD',
    borderRadius: scale(10),
  },

  elevation: {
    shadowColor: '#52006A',
    elevation: 10,
  },

  containerKotakHome: {
    marginVertical: scale(10),
    marginHorizontal: scale(13),
  },

  KotakHomeTitle: {
    color: '#667479',
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: '10@s',
  },

  KotakHomeContentBold: {
    color: '#242B33',
    fontFamily: 'Gilroy-Bold',
    fontSize: '25@s',
    fontWeight: 'bold',
  },

  KotakHomeContent: {
    color: '#242B33',
    fontFamily: 'Gilroy-Bold',
    fontSize: '12@s',
  },

  menuTitle: {
    color: '#242B33',
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: '10@s',
    textAlign: 'center',
    marginTop: scale(3),
  },

  containerMenuShow: {
    flexDirection: 'row',
    maxWidth: '100%',
    flexWrap: 'wrap',
    paddingHorizontal: scale(13),
    // backgroundColor: 'yellow',
  },

  containerMenuHide: {
    flexDirection: 'row',
    maxWidth: '100%',
    maxHeight: scale(180),
    flexWrap: 'wrap',
    paddingHorizontal: scale(13),
    // backgroundColor: 'yellow',
  },

  headerGroup: {
    fontFamily: 'VisbyMedium',
    fontSize: scale(14),
    marginBottom: scale(1),
  },

  group: {
    fontFamily: 'VisbyHeavy',
    fontSize: scale(28),
    fontWeight: 'bold',
    marginBottom: scale(2),
  },

  groupDetail: {
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: scale(10),
    color: '#00171F',
    marginBottom: scale(10),
  },

  buttonGroup: {
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: scale(10),
    color: '#FFFFFF',
    fontWeight: '700',
  },

  textEvent: {
    fontFamily: 'Inter-SemiBold',
    fontSize: scale(15),
    color: '#000000',
    fontWeight: '700',
  },

  textEventButton: {
    fontFamily: 'Inter-SemiBold',
    fontSize: scale(13),
    color: '#3F37C9',
    fontWeight: '700',
    marginRight: scale(8),
  },
});

export default HomeScreen;
