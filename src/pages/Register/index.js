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
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyInputLogin, MyPicker, MyRadio } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color } from '../../utils';
import { MYAPP, apiURL, api_token, getData, storeData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import axios from 'axios';
import moment from 'moment';
import { useToast } from 'react-native-toast-notifications';
import MyLoading from '../../components/MyLoading';

export default function Register({ navigation, route }) {
    const [loading, setLoading] = useState(false)
    const img = new Animated.Value(0.8);
    const card = new Animated.Value(50);
    const toast = useToast();
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
    const [kirim, setKirim] = useState({
        api_token: api_token,
        nama_lengkap: '',
        username: '',
        jenis_kelamin: 'Laki-laki',
        password: '',
        repassword: '',

    });

    const simpan = () => {



        if (
            kirim.nama_lengkap.length === 0 &&
            kirim.username.length === 0 &&
            kirim.password.length === 0

        ) {
            toast.show('Formulir pendaftaran tidak boleh kosong', {
                type: 'warning'
            })
        } else if (kirim.nama_lengkap.length === 0) {
            toast.show('Silahkan masukan nama lengkap', {
                type: 'warning'
            })
        }

        else if (kirim.username.length === 0) {
            showMessage({
                message: 'Silahkan masukan username',
            });
        }
        else if (kirim.password.length === 0) {
            showMessage({
                message: 'Silahkan masukan kata sandi',
            });
        } else if (kirim.repassword.length === 0) {
            showMessage({
                message: 'Silahkan ulangi kata sandi',
            });
        } else {

            console.log(kirim);

            setLoading(true);
            axios
                .post(apiURL + 'register', kirim)
                .then(res => {
                    console.log(res.data);
                    setLoading(false);
                    if (res.data.status == 404) {
                        toast.show(res.data.message, {
                            type: 'danger'
                        })

                    } else {
                        toast.show(res.data.message, {
                            type: 'success'
                        });

                        navigation.replace('Login');

                    }


                });
        }
    };




    useEffect(() => {


        axios.post(apiURL + 'company').then(res => {
            setComp(res.data.data);
        })
    }, []);
    const [sama, setSama] = useState(true)

    const [usiaBayi, setUsiaBayi] = useState(0);


    // Fungsi untuk menghandle perubahan tanggal
    const handleTanggalLahirChange = (selectedDate) => {
        // Set tanggal lahir di state
        setKirim({ ...kirim, tanggal_lahir: selectedDate });

        // Hitung usia bayi berdasarkan tanggal yang dipilih
        const today = moment();
        const birthDate = moment(selectedDate);
        const usia = today.diff(birthDate, 'years');

        // Set usia bayi setelah tanggal dipilih
        setUsiaBayi(usia);
    };


    return (
        <SafeAreaView style={{
            flex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: colors.primary,
        }}>
            {/* <MyHeader title="Daftar Akun" /> */}
            <ScrollView showsVerticalScrollIndicator={false}>


                <View style={{
                    padding: 16,

                }}>





                    <View style={{
                        padding: 20,
                        borderRadius: 20,
                        backgroundColor: colors.white,


                    }}>
                        <Image source={require('../../assets/logo.png')} style={{
                            width: 250,
                            height: 100,
                            resizeMode: 'contain',
                            alignSelf: 'center'
                        }} />

                        <Text style={{
                            ...fonts.headline2,
                            textAlign: 'center',
                            color: colors.primary
                        }}>Daftar</Text>

                        {/* Nama Orang Tua/Wali */}
                        <MyInput iconname="person-outline" value={kirim.nama_lengkap} onChangeText={value => setKirim({ ...kirim, 'nama_lengkap': value })} label="Nama Lengkap" placeholder="Masukan nama lengkap" />

                        <MyGap jarak={20} />

                        {/* Nama Bayi*/}
                        <MyInput value={kirim.username} onChangeText={value => setKirim({ ...kirim, 'username': value })} label="Username" placeholder="Masukan username" iconname="at" />


                        <MyGap jarak={20} />


                        <MyPicker data={[
                            { label: 'Laki-laki', value: 'Laki-laki' },
                            { label: 'Perempuan', value: 'Perempuan' }
                        ]} label="Jenis Kelamin" iconname="male-female-outline" value={kirim.jenis_kelamin} onValueChange={x => setKirim({ ...kirim, jenis_kelamin: x })} />

                        <MyGap jarak={20} />
                        {/* Buat Password*/}
                        <MyInput onChangeText={value => setKirim({ ...kirim, 'password': value })} value={kirim.password} label="Kata Sandi" iconname="lock-closed-outline" placeholder="Masukan kata sandi" secureTextEntry='true' />

                        <MyGap jarak={20} />
                        {/* Konfimasi Password*/}
                        <MyInput onChangeText={value => setKirim({ ...kirim, 'repassword': value })} value={kirim.repassword} label="Ulangi Kata Sandi" iconname="lock-closed-outline" placeholder="Ulangi kata sandi" secureTextEntry='true' />


                        {!loading &&
                            <>
                                {/* Button */}
                                <MyGap jarak={20} />
                                <MyButton title="Daftar" onPress={simpan} />

                                {/* Button Daftar */}
                                <MyGap jarak={10} />
                                <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
                                    <View style={{ padding: 10 }}>
                                        <Text style={{
                                            fontFamily: fonts.primary[500],
                                            textAlign: "center",
                                            color: colors.primary,
                                            fontSize: 13

                                        }}>Sudah punya akun? Silakan <Text style={{
                                            fontWeight: 'bold'
                                        }}>masuk</Text></Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </>

                        }

                        {loading && <MyLoading />}
                    </View>





                </View>

            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({});
