import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { Color, colors } from '../../utils/colors';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import moment from 'moment';
import SweetAlert from 'react-native-sweet-alert';
import MyLoading from '../../components/MyLoading';

export default function InformasiAdd({ navigation, route }) {


    const [kirim, setKirim] = useState({
        tipe: 'Berita',
        gambar: 'https://zavalabs.com/nogambar.jpg',
        judul: '',
        tanggal: moment().format('YYYY-MM-DD'),
        keterangan: '',
        link_youtube: '',
    });
    const [loading, setLoading] = useState(false);
    const sendServer = () => {
        console.log(kirim);
        // setLoading(true);

        axios.post(apiURL + 'insert_informasi', kirim).then(res => {
            console.log(res.data)

            // setLoading(false);

            if (res.data.status == 200) {
                SweetAlert.showAlertWithOptions({
                    title: MYAPP,
                    subTitle: res.data.message,
                    style: 'success',
                    cancellable: true
                },
                    callback => {
                        // navigation.replace('MainApp');
                        navigation.goBack();
                    });


            }
        })
    }

    // useEffect(() => {
    //     setKirim({
    //         ...kirim,
    //         newfoto_user: null,
    //     })
    // }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.background,
        }}>
            <MyHeader title="Tambah Berita & Info" onPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false} style={{
                paddingHorizontal: 20,
            }}>

                <View style={{
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity onPress={() => {


                        launchImageLibrary({
                            includeBase64: true,
                            quality: 1,
                            mediaType: "photo",
                            maxWidth: 1000,
                            maxHeight: 1000
                        }, response => {
                            // console.log('All Response = ', response.assets[0].base64);

                            setKirim({
                                ...kirim,
                                gambar: `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
                            });
                        });



                    }} style={{
                        backgroundColor: colors.white,
                        width: windowWidth - 50,
                        height: 220,
                        borderWidth: 1,
                        borderColor: colors.primary,
                        overflow: 'hidden',
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image style={{
                            width: windowWidth - 50,
                            height: 220,
                            resizeMode: 'contain'
                        }} source={{
                            uri: kirim.gambar,
                        }} />
                    </TouchableOpacity>
                </View>



                <MyPicker label="Jenis" iconname="options" onValueChange={x => setKirim({ ...kirim, tipe: x })} data={[
                    { label: 'Berita', value: 'Berita' },
                    { label: 'Info Kesehatan', value: 'Info Kesehatan' }
                ]} />
                <MyGap jarak={10} />
                <MyInput label="Judul" placeholder="Masukan judul" iconname="list-outline" value={kirim.judul} onChangeText={x => setKirim({ ...kirim, judul: x })} />
                <MyGap jarak={10} />
                <MyInput tinggi={100} label="Deskripsi" placeholder="Masukan deskripsi" height multiline iconname="create-outline" value={kirim.keterangan} onChangeText={x => setKirim({ ...kirim, keterangan: x })} />
                <MyGap jarak={10} />
                <MyInput label="Link Video" placeholder="Masukan link video" iconname="logo-youtube" value={kirim.link_youtube} onChangeText={x => setKirim({ ...kirim, link_youtube: x })} />
                <MyGap jarak={10} />




                {loading && <MyLoading />}
                {!loading && <MyButton warna={colors.secondary} colorText={colors.white} iconColor={colors.white} onPress={sendServer} title="Simpan Perubahan" Icons="download-outline" />}
                <MyGap jarak={20} />
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})