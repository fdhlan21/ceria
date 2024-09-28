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

export default function AccountEdit({ navigation, route }) {


    const [kirim, setKirim] = useState(route.params);
    const [loading, setLoading] = useState(false);
    const sendServer = () => {
        console.log(kirim);
        setLoading(true);

        axios.post(apiURL + 'update_profile', kirim).then(res => {
            console.log(res.data)

            setLoading(false);

            if (res.data.status == 200) {
                SweetAlert.showAlertWithOptions({
                    title: MYAPP,
                    subTitle: res.data.message,
                    style: 'success',
                    cancellable: true
                },
                    callback => {
                        storeData('user', res.data.data);
                        navigation.replace('MainApp');
                    });


            }
        })
    }

    useEffect(() => {
        setKirim({
            ...kirim,
            newfoto_user: null,
        })
    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.background,
        }}>
            <MyHeader title="Edit Profile" onPress={() => navigation.goBack()} />
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
                            maxWidth: 200,
                            maxHeight: 200
                        }, response => {
                            // console.log('All Response = ', response.assets[0].base64);

                            setKirim({
                                ...kirim,
                                newfoto_user: `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
                            });
                        });



                    }} style={{
                        width: 100,
                        height: 100,
                        borderWidth: 1,
                        borderColor: Color.blueGray[100],
                        overflow: 'hidden',
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image style={{
                            width: 100,
                            height: 100,
                        }} source={{
                            uri: kirim.newfoto_user !== null ? kirim.newfoto_user : kirim.foto_user,
                        }} />
                    </TouchableOpacity>
                </View>




                <MyInput label="Nama Petugas" iconname="person-outline" value={kirim.nama_lengkap} onChangeText={x => setKirim({ ...kirim, nama_lengkap: x })} />
                <MyGap jarak={20} />
                <MyInput label="Username" iconname="at-outline" value={kirim.username} onChangeText={x => setKirim({ ...kirim, username: x })} />
                <MyGap jarak={20} />
                <MyInput label="Password" iconname="lock-closed-outline" secureTextEntry={true} onChangeText={x => setKirim({ ...kirim, newpassword: x })} placeholder="Kosongkan jika tidak diubah" />
                <MyGap jarak={20} />


                <Text style={{
                    marginBottom: 10,
                    ...fonts.headline2,
                    color: colors.secondary
                }}>Profil Posyandu</Text>
                <MyInput label="Nama Posyandu" iconname="home-outline" placeholder="Masukan nama posyandu" value={kirim.nama_posyandu} onChangeText={x => setKirim({ ...kirim, nama_posyandu: x })} />
                <MyGap jarak={20} />
                <MyInput keyboardType='phone-pad' label="Telepon Posyandu" placeholder="Masukan telepon posyandu" iconname="call-outline" value={kirim.telepon_posyandu} onChangeText={x => setKirim({ ...kirim, telepon_posyandu: x })} />
                <MyGap jarak={20} />
                <MyInput label="Alamat Posyandu" placeholder="Masukan alamat posyandu" multiline iconname="location-outline" value={kirim.alamat_posyandu} onChangeText={x => setKirim({ ...kirim, alamat_posyandu: x })} />
                <MyGap jarak={20} />
                <Text style={{
                    marginBottom: 10,
                    ...fonts.headline2,
                    color: colors.secondary
                }}>Hubungi Kami</Text>

                <MyInput placeholder="Masukan nomor telepon" keyboardType='phone-pad' label="Nomor Telepon" iconname="call-outline" value={kirim.hubungi_kami} onChangeText={x => setKirim({ ...kirim, hubungi_kami: x })} />
                <MyGap jarak={20} />
                {loading && <MyLoading />}
                {!loading && <MyButton warna={colors.secondary} colorText={colors.white} iconColor={colors.white} onPress={sendServer} title="Simpan Perubahan" Icons="download-outline" />}
                <MyGap jarak={20} />
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})