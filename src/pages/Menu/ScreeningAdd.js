import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import { colors, fonts } from '../../utils';
import { MyHeader, MyRadio } from '../../components';
import { Icon } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import SweetAlert from 'react-native-sweet-alert';
export default function ScreeningAdd({ navigation, route }) {

    const user = route.params;

    const [data, setData] = useState([]);

    const isFocused = useIsFocused();

    const __getTransaction = () => {
        axios.post(apiURL + 'soal').then(res => {
            console.log(res.data);
            setData(res.data)
        })
    }

    useEffect(() => {
        if (isFocused) {
            __getTransaction();
        }
    }, [isFocused]);

    const sendServer = () => {

        // cek apakah masih ada yg kasong ?

        const cekIsian = data.filter(i => i.cek !== 0 && i.cek !== 1);

        if (cekIsian.length == 0) {
            const filtered = data.filter(i => i.flag > 0 && i.cek > 0);
            const jumlah = filtered.length;
            let status = '';
            let info = '';
            let icon = '';
            if (jumlah > 0) {
                status = 'Beresiko';
                icon = 'warning';
                info = 'Direkomendasikan ke Fasilitas Pelayanan Kesehatan untuk melakukan Tes HIV';
            } else {
                status = 'Tidak Beresiko';
                icon = 'success';
                info = 'Pertahankan Perilaku dan Gaya Hidup Sehat Anda'
            }

            console.log({
                fid_user: user.id,
                status: status,
                info: info,
                soal: data
            })

            axios.post(apiURL + 'screening_add', {
                fid_user: user.id,
                status: status,
                info: info,
                soal: data
            }).then(res => {
                console.log(res.data)
                if (res.data.status == 200) {
                    SweetAlert.showAlertWithOptions({
                        title: status,
                        subTitle: info,
                        style: 'success',
                        cancellable: true
                    },
                        callback => {
                            navigation.pop(2);
                        });
                }
            })


        } else {
            showMessage({
                type: 'info',
                icon: 'info',
                message: 'Masih ada pertanyaan yang belum di isi !'
            })
        }



    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader title="Tambah Pengisian Screening HIV" />
            <View style={{
                flex: 1,
                padding: 12
            }}>
                <FlatList data={data} renderItem={({ item, index }) => {
                    return (

                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: colors.border,
                            padding: 10,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'flex-start'
                            }}>
                                <Text style={{
                                    ...fonts.body3,
                                    color: colors.primary,
                                    width: 30,
                                }}>{item.nomor}. </Text>
                                <View style={{
                                    flex: 1,
                                }}>
                                    <Text style={{

                                        ...fonts.body3,
                                        color: colors.primary,
                                    }}>{item.soal}</Text>
                                    <MyRadio onPress={() => {
                                        let tmp = [...data];
                                        tmp[index].cek = 1;
                                        setData(tmp)
                                    }} selected={item.cek == 1 && item.cek !== '' ? true : false} label="Ya" />
                                    <MyRadio onPress={() => {
                                        let tmp = [...data];
                                        tmp[index].cek = 0;
                                        setData(tmp)
                                    }} selected={item.cek == 0 && item.cek !== '' ? true : false} label="Tidak" />
                                </View>
                            </View>

                        </View>

                    )
                }} />
            </View>
            <TouchableOpacity onPress={sendServer} style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                alignSelf: 'flex-end',
                width: 60,
                height: 60,
                borderRadius: 40,
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Icon type='ionicon' name='checkmark' color={colors.white} size={40} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})