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
    TouchableOpacity,
} from 'react-native';
import { MyButton, MyGap, MyLoading } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { MYAPP, getData } from '../../utils/localStorage';

export default function Akses({ navigation }) {
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
                padding: 16,
            }}>

                <Text style={{
                    ...fonts.headline3,
                }}>Masuk sebagai :</Text>

                <View style={{
                    marginTop: '10%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Login', {
                            level: 'Ibu',
                            logo: require('../../assets/ibu.png')
                        })
                    }} style={{
                        marginHorizontal: 10,
                        width: 120,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image source={require('../../assets/ibu.png')} style={{
                            width: 100,
                            height: 100,
                        }} />

                        <Text style={{ ...fonts.headline3 }}>Ibu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Login', {
                            level: 'Petugas',
                            logo: require('../../assets/petugas.png')
                        })
                    }} style={{
                        marginHorizontal: 10,
                        width: 120,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image source={require('../../assets/petugas.png')} style={{
                            width: 100,
                            height: 100,
                        }} />

                        <Text style={{ ...fonts.headline3 }}>Petugas</Text>
                    </TouchableOpacity>
                </View>

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
