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

export default function AnakDetail({ navigation, route }) {

    const item = route.params;

    const MyList = ({ label, value }) => {
        return (
            <View
                style={{
                    marginVertical: 2,
                    padding: 5,
                    paddingHorizontal: 10,
                    backgroundColor: Color.blueGray[50],
                    borderRadius: 5,
                }}>
                <Text
                    style={{
                        ...fonts.headline5,
                        color: colors.primary,
                    }}>
                    {label}
                </Text>
                <Text
                    style={{
                        ...fonts.body3,
                        color: colors.tertiary,
                    }}>
                    {value}
                </Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.background,
        }}>
            <MyHeader title="Detail Anak" onPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false} style={{
                paddingHorizontal: 20,
            }}>
                <Text style={{
                    ...fonts.headline3,
                    color: colors.tertiary,
                }}>Identitas Anak</Text>
                <MyList label="Data Orang Tua" value={item.nama_ayah + ' / ' + item.nama_ibu} />
                <MyList label="Nama Anak" value={item.nama_anak} />
                <MyList label="NIK" value={item.nik} />
                <MyList label="Usia" value={moment().diff(item.tanggal_lahir, 'month') + ' Bulan'} />
                <MyList label="Tanggal Lahir" value={moment(item.tanggal_lahir).format('DD MMMM YYYY')} />
                <MyList label="Jenis Kelamin" value={item.jenis_kelamin} />
                <MyList label="Anak Ke" value={item.anak_ke} />
                <MyList label="Inisiasi Menyusui Dini" value={item.menyusui_dini} />

                <Text style={{
                    marginTop: 10,
                    ...fonts.headline3,
                    color: colors.tertiary,
                }}>Data Lahir</Text>

                <MyList label="Berat Badan" value={item.berat_badan + ' kg'} />
                <MyList label="Panjang Badan" value={item.tinggi_badan + ' cm'} />
                <MyList label="Lingkar Kepala" value={item.lingkar_kepala + ' cm'} />
                <MyGap jarak={20} />
                <MyButton title="Data Pengukuran" onPress={() => navigation.navigate("Ukur", item)} />
                <MyGap jarak={20} />
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})