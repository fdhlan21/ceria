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

export default function OrtuAdd({ navigation, route }) {


    const [kirim, setKirim] = useState({

        nomor_kk: '',
        nama_ayah: '',
        nama_ibu: '',
        nik_ibu: '',
        telepon: '',
        alamat: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const sendServer = () => {
        console.log(kirim);
        // setLoading(true);

        axios.post(apiURL + 'insert_ortu', kirim).then(res => {
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
            <MyHeader title="Tambah Orang Tua" onPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false} style={{
                paddingHorizontal: 20,
            }}>





                <MyGap jarak={10} />

                <MyInput label="Nomor Kartu Keluarga" placeholder="Masukan Nomor Kartu Keluarga" iconname="card" onChangeText={x => setKirim({ ...kirim, nomor_kk: x })} value={kirim.nomor_kk} />
                <MyGap jarak={10} />
                <MyInput label="Nama Ayah" placeholder="Masukan Nama Ayah" iconname="person" onChangeText={x => setKirim({ ...kirim, nama_ayah: x })} value={kirim.nama_ayah} />
                <MyGap jarak={10} />
                <MyInput label="Nama Ibu" placeholder="Masukan Nama Ibu" iconname="person" onChangeText={x => setKirim({ ...kirim, nama_ibu: x })} value={kirim.nama_ibu} />
                <MyGap jarak={10} />
                <MyInput label="NIK Ibu" placeholder="Masukan NIK Ibu" iconname="card" onChangeText={x => setKirim({ ...kirim, nik_ibu: x })} value={kirim.nik_ibu} />
                <MyGap jarak={10} />
                <MyInput label="Nomor HP" placeholder="Masukan Nomor HP" iconname="call" onChangeText={x => setKirim({ ...kirim, telepon: x })} value={kirim.telepon} />
                <MyGap jarak={10} />
                <MyInput label="Alamat Rumah" placeholder="Masukan Alamat Rumah" iconname="home" onChangeText={x => setKirim({ ...kirim, alamat: x })} value={kirim.alamat} />
                <MyGap jarak={10} />
                <MyInput label="Password" placeholder="Masukan Password" iconname="lock-closed" onChangeText={x => setKirim({ ...kirim, password: x })} value={kirim.password} />
                <MyGap jarak={10} />


                {loading && <MyLoading />}
                {!loading && <MyButton warna={colors.secondary} colorText={colors.white} iconColor={colors.white} onPress={sendServer} title="Simpan Perubahan" Icons="download-outline" />}
                <MyGap jarak={20} />
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})