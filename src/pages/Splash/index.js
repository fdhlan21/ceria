import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { MyButton, MyGap, MyLoading } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { MYAPP, getData, storeData } from '../../utils/localStorage';
import moment from 'moment';

export default function Splash({ navigation }) {
  const img = new Animated.Value(0.5);
  const textScale = new Animated.Value(0.5);
  const textOpacity = new Animated.Value(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(img, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      }),
      Animated.timing(textScale, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      })
    ]).start();


    setTimeout(() => {
      getData('user').then(res => {
        if (!res) {
          navigation.replace('Akses')
        } else {
          storeData('today', moment().add(-1, 'day').format('YYYY-MM-DD'))
          navigation.replace('MainApp')
        }
      })
    }, 1200);
  }, []);

  return (
    <SafeAreaView style={{
      flex: 1,
      padding: 0,
      backgroundColor: colors.background,
      justifyContent: 'center',
      position: 'relative'
    }}>

      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>

        <Animated.Image
          source={require('../../assets/logo.png')}
          resizeMode="contain"
          style={{
            transform: [{ scale: img }],
            width: windowWidth / 1.5,
            height: windowWidth / 1.5,


          }}
        />

        <MyLoading flex={0} />


      </View>
      <Text style={{
        margin: 10,
        textAlign: 'center',
        ...fonts.body3,
      }}>© 2024</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
