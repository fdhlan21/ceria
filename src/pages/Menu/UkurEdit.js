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

export default function UkurEdit({ navigation, route }) {

    const anak = route.params.anak;

    const [kirim, setKirim] = useState(route.params.item);
    const [loading, setLoading] = useState(false);
    const sendServer = () => {
        console.log(kirim);
        // setLoading(true);

        axios.post(apiURL + 'update_ukur', {
            ...kirim,
            jenis_kelamin: anak.jenis_kelamin,
            umur: moment().diff(anak.tanggal_lahir, 'month'),
        }).then(res => {
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
            <MyHeader title="Tambah Data Pengukuran" onPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false} style={{
                paddingHorizontal: 20,
            }}>





                <MyGap jarak={10} />

                <MyInput keyboardType='number-pad' label="Berat Badan (kg)" placeholder="Masukan berat badan" iconname="speedometer" onChangeText={x => setKirim({ ...kirim, berat_badan: x })} value={kirim.berat_badan} />
                <MyGap jarak={10} />
                <MyInput keyboardType='number-pad' label="Tinggi Badan (cm)" placeholder="Masukan tinggi badan" iconname="body" onChangeText={x => setKirim({ ...kirim, tinggi_badan: x })} value={kirim.tinggi_badan} />
                <MyGap jarak={20} />


                {loading && <MyLoading />}
                {!loading && <MyButton warna={colors.secondary} colorText={colors.white} iconColor={colors.white} onPress={sendServer} title="Simpan Perubahan" Icons="download-outline" />}
                <MyGap jarak={20} />
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})