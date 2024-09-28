import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  FlatList
} from 'react-native';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color } from '../../utils';
import { MYAPP, apiURL, api_token, getData, storeData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import axios from 'axios';
import moment from 'moment';
import { useToast } from 'react-native-toast-notifications';
import MyLoading from '../../components/MyLoading';
import MyCarouser from '../../components/MyCarouser';
import { Icon } from 'react-native-elements';


import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useIsFocused } from '@react-navigation/native';


const MyMenu = ({ onPress, img, label, backgroundColor, desc }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} style={{

    }}>
      <View>
        <View style={{
          width: windowWidth / 4,
          height: windowWidth / 4,
          borderWidth: 1,
          borderRadius: 12,
          borderColor: Color.blueGray[300],
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image source={img} style={{
            width: windowWidth / 6,
            height: windowWidth / 6,
          }} />
        </View>
        <Text style={{
          textAlign: 'center',
          marginTop: 4,
          ...fonts.subheadline4,
          color: colors.primary
        }}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default function Home({ navigation, route }) {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [today, setToday] = useState([]);
  LocaleConfig.locales['id'] = {
    monthNames: [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember'
    ],
    monthNamesShort: ['Jan.', 'Feb.', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul.', 'Agu', 'Sept.', 'Okt.', 'Nov.', 'Des.'],
    dayNames: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
    dayNamesShort: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
    today: "Hari ini"
  };
  LocaleConfig.defaultLocale = 'id';
  const __getUser = () => {
    getData('user').then(u => {
      setUser(u)
    });

    axios.post(apiURL + 'program').then(res => {

      let OBJ = {};
      res.data.map(i => {

        OBJ[i.tanggal] = { selected: true }
      });


      setTanggal(OBJ);
      setData(res.data)
    });


  }

  const [tanggal, setTanggal] = useState({})
  const isFocused = useIsFocused();
  useEffect(() => {


    if (isFocused) {
      __GetToday();
      __getUser();
    }
  }, [isFocused]);

  const __GetToday = () => {
    axios.post(apiURL + 'program_today').then(res => {
      console.log(res.data);
      setToday(res.data);
      if (res.data.length > 0) {
        getData('today').then(td => {
          console.log('today', td)
          if (td !== moment().format('YYYY-MM-DD') || !td) {
            setModalVisible(true);
          }
        })
      }
    })
  }

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.background
    }}>
      {/* header */}

      {/* banner */}

      {/* body */}
      <View style={{
        flex: 1,
      }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{
        }}>
          <View style={{
            height: 100,
            backgroundColor: colors.white,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
          }}>
            <View style={{
              flex: 1,
            }}>
              <Text style={{ ...fonts.headline3 }}>CERIA</Text>
              <Text style={{ ...fonts.subheadline3 }}>Cegah Risiko Anak Stunting</Text>
            </View>
            <Image style={{
              width: 100,
              height: 40,
              resizeMode: 'contain'
            }} source={require('../../assets/logo.png')} />
          </View>
          {user.level == 'Petugas' &&

            <>

              <Text style={{
                ...fonts.headline3, marginBottom: 8,
                marginHorizontal: 16
              }}>Halo {user.level} !</Text>
              <Image style={{
                width: '100%',
                height: 180,
                resizeMode: 'contain'
              }} source={require('../../assets/slider.png')} />
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 10,
              }}>

                <MyMenu onPress={() => navigation.navigate('Catatan')} label="Pencatatan" img={require('../../assets/a1.png')} />
                <MyMenu onPress={() => navigation.navigate('Program')} label="Program" img={require('../../assets/a2.png')} />
                <MyMenu onPress={() => navigation.navigate('Informasi')} label="Berita & Info" img={require('../../assets/a3.png')} />
              </View>
            </>
          }

          <View style={{
            padding: 16
          }}>
            <Calendar
              scrollable

              disableAllTouchEventsForDisabledDays={true}
              theme={{
                backgroundColor: colors.background,
                calendarBackground: colors.background,
                textDayHeaderFontFamily: fonts.body3.fontFamily,
                textMonthFontFamily: fonts.headline4.fontFamily,
                textDayFontFamily: fonts.headline5.fontFamily,
                textDayFontSize: 14,
                arrowColor: Color.primary[900],
                selectedDayBackgroundColor: colors.primary,
                todayTextColor: colors.secondary

              }}
              onDayPress={x => {
                console.log(x);

              }}
              markedDates={tanggal}

            />
            {user.level !== 'Petugas' &&
              <TouchableOpacity onPress={() => navigation.navigate('Program')} style={{
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}>
                <Text style={{
                  ...fonts.headline4,
                  color: colors.secondary,
                  right: 5,
                }}>Lihat Daftar Program</Text>
                <Icon type='ionicon' name='chevron-forward' size={20} />
              </TouchableOpacity>
            }

            {user.level !== 'Petugas' &&
              <View>
                <TouchableOpacity onPress={() => navigation.navigate('Anak')} style={{

                }}>
                  <Image source={require('../../assets/ibu1.png')} style={{
                    width: windowWidth - 50,
                    height: 120,
                    borderRadius: 10,
                    resizeMode: 'contain',
                    alignSelf: 'center'
                  }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Informasi')} style={{

                }}>
                  <Image source={require('../../assets/ibu2.png')} style={{
                    width: windowWidth - 50,
                    height: 120,
                    borderRadius: 10,
                    resizeMode: 'contain',
                    alignSelf: 'center'
                  }} />
                </TouchableOpacity>
              </View>
            }

            {user.level == 'Petugas' &&

              <FlatList data={data} renderItem={({ item, index }) => {
                return (

                  <View style={{
                    marginBottom: 10,
                    padding: 10,
                    backgroundColor: colors.primary,
                    borderRadius: 12,
                  }}>
                    <Text style={{ ...fonts.headline4, color: colors.white }}>{item.tugas}</Text>
                    <Text style={{ ...fonts.subheadline4, color: colors.white }}>{item.penanggung_jawab}</Text>
                    <Text style={{ ...fonts.subheadline4, color: colors.white }}>{item.waktu}</Text>
                    <Text style={{ textAlign: 'right', ...fonts.subheadline4, color: colors.white }}>{moment(item.tanggal).format('DD MMMM YYYY')}</Text>


                  </View>
                )
              }} />
            }
          </View>

        </ScrollView>
      </View>


      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          storeData('today', moment().format('YYYY-MM-DD'))
        }}>
        <View style={{
          flex: 1,
          backgroundColor: '#00000080',
          justifyContent: 'center',
        }}>

          <View style={{
            margin: 20,
            backgroundColor: colors.white,
            // height: windowHeight / 1.5,
            borderRadius: 10,
            position: 'relative'
          }}>
            <TouchableOpacity onPress={() => {
              setModalVisible(false);
              storeData('today', moment().format('YYYY-MM-DD'));
            }} style={{
              zIndex: 99,
              top: -20,
              right: 0,
              width: 60,
              height: 60,
              borderRadius: 60,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              backgroundColor: colors.tertiary
            }}>
              <Icon type='ionicon' name='close' color={colors.white} size={40} />
            </TouchableOpacity>
            <View style={{
              padding: 10,
              backgroundColor: user.level == 'Petugas' ? colors.primary : colors.secondary,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}>
              <Text style={{
                textAlign: 'center',
                ...fonts.headline3,
                color: colors.white
              }}>Informasi Penting</Text>
            </View>

            <View style={{
              padding: 10,
            }}>
              <FlatList data={today} renderItem={({ item, index }) => {
                return (
                  <View style={{
                    marginVertical: 10,
                    padding: 10,
                    backgroundColor: colors.background,
                    borderRadius: 10,
                  }}>
                    <Text style={{
                      textAlign: 'center',
                      ...fonts.headline3,
                      color: user.level == 'Petugas' ? colors.primary : colors.secondary
                    }}>{item.tugas}</Text>
                    <View style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}>
                      <Icon color={Color.blueGray[400]} type='ionicon' name='calendar' size={20} />
                      <Text style={{
                        left: 10,
                        ...fonts.body3
                      }}>{moment(item.taggal).format('dddd, DD MMMM YYYY')}</Text>
                    </View>
                    <View style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}>
                      <Icon color={Color.blueGray[400]} type='ionicon' name='time' size={20} />
                      <Text style={{
                        left: 10,
                        ...fonts.body3
                      }}>{item.waktu}</Text>
                    </View>
                    <View style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}>
                      <Icon color={Color.blueGray[400]} type='ionicon' name='person' size={20} />
                      <Text style={{
                        left: 10,
                        ...fonts.body3
                      }}>{item.penanggung_jawab}</Text>
                    </View>
                  </View>
                )
              }} />
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})