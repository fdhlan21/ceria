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

export default function AnakEdit({ navigation, route }) {


    const [kirim, setKirim] = useState(route.params);
    const [loading, setLoading] = useState(false);
    const sendServer = () => {
        console.log(kirim);
        // setLoading(true);

        axios.post(apiURL + 'update_anak', kirim).then(res => {
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

    const [ortu, setOrtu] = useState([]);
    useEffect(() => {
        axios.post(apiURL + 'ortu').then(res => {
            setOrtu(res.data)
            // setKirim({
            //     ...kirim,
            //     fid_ortu: res.data[0].value
            // })
        })
    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.background,
        }}>
            <MyHeader title="Edit Data Anak" onPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false} style={{
                paddingHorizontal: 20,
            }}>




                <MyPicker label="Data Orang Tua" data={ortu} value={kirim.fid_ortu} onValueChange={x => setKirim({ ...kirim, fid_ortu: x })} iconname="options" />
                <MyGap jarak={10} />
                <MyInput label="Nama Anak" placeholder="Masukan Nama Anak" value={kirim.nama_anak} onChangeText={x => setKirim({ ...kirim, nama_anak: x })} iconname="person" />
                <MyGap jarak={10} />
                <MyInput label="NIK" placeholder="Masukan NIK" value={kirim.nik} onChangeText={x => setKirim({ ...kirim, nik: x })} iconname="card" />
                <MyGap jarak={10} />
                <MyPicker label="Jenis Kelamin" data={[
                    { label: 'Laki-laki', value: 'Laki-laki' },
                    { label: 'Perempuan', value: 'Perempuan' }
                ]} value={kirim.jenis_kelamin} onValueChange={x => setKirim({ ...kirim, jenis_kelamin: x })} iconname="male-female" />
                <MyGap jarak={10} />
                <MyCalendar label="Tanggal Lahir" onDateChange={x => setKirim({ ...kirim, tanggal_lahir: x })} value={kirim.tanggal_lahir} />
                <MyGap jarak={10} />
                <MyInput label="Anak ke" placeholder="Masukan Anak ke" value={kirim.anak_ke} onChangeText={x => setKirim({ ...kirim, anak_ke: x })} iconname="create" />
                <MyGap jarak={10} />
                <MyInput label="Inisiasi Menyusui Dini" placeholder="Masukan Inisiasi Menyusui Dini" value={kirim.menyusui_dini} onChangeText={x => setKirim({ ...kirim, menyusui_dini: x })} iconname="create" />
                <MyGap jarak={10} />

                <Text style={{
                    ...fonts.headline3,
                    color: colors.tertiary,
                }}>Data Lahir</Text>
                <MyGap jarak={10} />
                <MyInput label="Berat Badan (kg)" placeholder="Masukan Berat Badan" value={kirim.berat_badan} onChangeText={x => setKirim({ ...kirim, berat_badan: x })} iconname="create" />
                <MyGap jarak={10} />
                <MyInput label="Panjang Badan (cm)" placeholder="Masukan Panjang Badan" value={kirim.tinggi_badan} onChangeText={x => setKirim({ ...kirim, tinggi_badan: x })} iconname="create" />
                <MyGap jarak={10} />
                <MyInput label="Lingkar Kepala (cm)" placeholder="Masukan Lingkar Kepala" value={kirim.lingkar_kepala} onChangeText={x => setKirim({ ...kirim, lingkar_kepala: x })} iconname="create" />
                <MyGap jarak={10} />


                {loading && <MyLoading />}
                {!loading && <MyButton warna={colors.secondary} colorText={colors.white} iconColor={colors.white} onPress={sendServer} title="Simpan Perubahan" Icons="download-outline" />}
                <MyGap jarak={20} />
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})