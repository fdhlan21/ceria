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
  ScrollView
} from 'react-native';
import { MyButton, MyGap, MyInput, MyInputLogin } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color } from '../../utils';
import { MYAPP, apiURL, api_token, getData, storeData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import axios from 'axios';
import MyLoading from '../../components/MyLoading';
import { useToast } from 'react-native-toast-notifications';

export default function Login({ navigation, route }) {
  const item = route.params;
  const [loading, setLoading] = useState(false)
  const img = new Animated.Value(0.8);
  const card = new Animated.Value(50);
  const toast = useToast();
  const masuk = () => {
    if (kirim.username.length == 0 && kirim.length == 0) {
      toast.show('username dan kata sandi tidak boleh kosong', { type: 'warning' })

    } else if (kirim.username.length == 0) {
      toast.show('Username tidak boleh kosong', { type: 'warning' })
    } else if (kirim.password.length == 0) {
      toast.show('Kata sandi tidak boleh kosong', { type: 'warning' })
    } else {
      setLoading(true);
      console.log(kirim);
      if (item.level == 'Ibu') {
        axios.post(apiURL + 'login_ibu', kirim)
          .then(res => {
            setLoading(false);
            console.log(res.data);
            if (res.data.status == 404) {
              toast.show(res.data.message, { type: 'danger' })
            } else {
              storeData('user', res.data.data);
              navigation.replace('MainApp')
            }
          });
      } else {

        axios.post(apiURL + 'login', kirim)
          .then(res => {
            setLoading(false);
            console.log(res.data);
            if (res.data.status == 404) {
              toast.show(res.data.message, { type: 'danger' })
            } else {
              storeData('user', res.data.data);
              navigation.replace('MainApp')
            }
          });

      }
    }
  }

  const [kirim, setKirim] = useState({
    api_token: api_token,
    username: '',
    password: '',
  })

  const [comp, setComp] = useState({})

  useEffect(() => {

    Animated.timing(img, {
      toValue: 1,
      duration: 750,
      useNativeDriver: true,
    }).start();
    Animated.timing(card, {
      toValue: 1,
      duration: 750,
      useNativeDriver: true,
    }).start();
    axios.post(apiURL + 'company').then(res => {
      setComp(res.data.data);
    })
  }, []);

  return (
    <SafeAreaView style={{
      flex: 1,
      width: '100%',
      height: '100%',
      padding: 0,
      margin: 0

    }}
    >

      <ImageBackground style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>

        <ScrollView>

          <View style={{
            padding: 16,
            justifyContent: 'center',
          }}>



            <View style={{
              padding: 30,
              backgroundColor: colors.background,
              borderRadius: 20,
            }}>
              {/* FORM VIEW */}
              <Image source={require('../../assets/logo.png')} style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
                alignSelf: 'center',
                marginBottom: 10
              }} />
              <Text style={{ textAlign: 'center', ...fonts.headline0, color: colors.secondary, }}>CERIA</Text>
              <Text style={{ textAlign: 'center', ...fonts.headline3, color: colors.primary, marginBottom: 10, }}>Cegah Risiko Anak Stunting</Text>

              <Image source={item.logo} style={{
                width: 250,
                height: 100,
                resizeMode: 'contain',
                alignSelf: 'center'
              }} />


              <Text style={{
                ...fonts.headline2,
                textAlign: 'center',
                color: item.level == 'Ibu' ? colors.secondary : colors.primary
              }}>{item.level}</Text>

              {/* username */}
              <MyInput textColor={item.level == 'Ibu' ? colors.secondary : colors.primary} label={item.level == 'Ibu' ? 'NIK Ibu' : 'Username'} iconname={item.level == 'Ibu' ? 'card' : 'at'} placeholder={item.level == 'Ibu' ? 'NIK Ibu' : 'Username'} onChangeText={x => setKirim({ ...kirim, username: x })} />

              <MyGap jarak={20} />
              {/* Pasword */}
              <MyInput textColor={item.level == 'Ibu' ? colors.secondary : colors.primary} iconname="lock-closed-outline" label="Password" secureTextEntry={true} placeholder="Password" onChangeText={x => setKirim({ ...kirim, password: x })} />

              {/* Button */}
              <MyGap jarak={20} />
              {!loading && <MyButton warna={item.level == 'Ibu' ? colors.secondary : colors.primary} title="Masuk" onPress={masuk} />}

              {/* Button Daftar */}
              {loading && <MyLoading />}


            </View>

            {!loading &&
              <>
                <MyGap jarak={20} />
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
                  <View style={{ padding: 10 }}>
                    <Text style={{
                      fontFamily: fonts.primary[500],
                      textAlign: "center",
                      color: colors.white,
                      fontSize: 13

                    }}>Belum memiliki akun? Silakan <Text style={{
                      fontWeight: 'bold'
                    }}>daftar</Text></Text>
                  </View>
                </TouchableWithoutFeedback>
              </>

            }



          </View>

        </ScrollView>


      </ImageBackground>

    </ SafeAreaView>
  );
}

const styles = StyleSheet.create({});
