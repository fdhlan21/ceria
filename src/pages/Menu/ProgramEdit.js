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

export default function ProgramEdit({ navigation, route }) {

    console.log(route.params);

    const [kirim, setKirim] = useState(route.params);
    const [loading, setLoading] = useState(false);
    const sendServer = () => {
        console.log(kirim);
        // setLoading(true);

        axios.post(apiURL + 'update_program', kirim).then(res => {
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
            <MyHeader title="Edit Program" onPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false} style={{
                paddingHorizontal: 20,
            }}>




                <MyCalendar label="Tanggal" value={kirim.tanggal} onDateChange={x => setKirim({ ...kirim, tanggal: x })} />
                <MyGap jarak={10} />
                <MyInput label="Tugas" placeholder="Masukan tugas" iconname="list-outline" value={kirim.tugas} onChangeText={x => setKirim({ ...kirim, tugas: x })} />
                <MyGap jarak={10} />
                <MyInput label="Nama Penanggung Jawab" placeholder="Masukan nama penanggung jawab" iconname="person-outline" value={kirim.penanggung_jawab} onChangeText={x => setKirim({ ...kirim, penanggung_jawab: x })} />
                <MyGap jarak={10} />

                <MyInput label="Waktu" placeholder="Masukan waktu" iconname="time-outline" value={kirim.waktu} onChangeText={x => setKirim({ ...kirim, waktu: x })} />
                <MyGap jarak={10} />





                {loading && <MyLoading />}
                {!loading && <MyButton warna={colors.secondary} colorText={colors.white} iconColor={colors.white} onPress={sendServer} title="Simpan Perubahan" Icons="download-outline" />}
                <MyGap jarak={20} />
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})