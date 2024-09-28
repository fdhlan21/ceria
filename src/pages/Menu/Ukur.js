import { Alert, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { apiURL, getData, MYAPP } from '../../utils/localStorage';
import { Color, colors, fonts } from '../../utils';
import { MyGap, MyHeader } from '../../components';
import { Icon } from 'react-native-elements';
import moment from 'moment';


import { Calendar, LocaleConfig } from 'react-native-calendars';
import { showMessage } from 'react-native-flash-message';


export default function Ukur({ navigation, route }) {


    const anak = route.params;

    const [data, setData] = useState([]);
    const [tmp, setTemp] = useState([]);
    const [user, setUser] = useState({});
    const [key, setKey] = useState('');


    const isFocused = useIsFocused();

    const __getTransaction = (key = key) => {
        axios.post(apiURL + 'gizi', {
            id_anak: anak.id_anak
        }).then(res => {
            console.log(res.data);
            setData(res.data);
        })

        getData('user').then(u => {
            setUser(u);
        })
    }

    useEffect(() => {
        if (isFocused) {
            __getTransaction();
        }
    }, [isFocused])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.background
        }}>
            <MyHeader title="Data Pengukuran" />
            <ScrollView>

                <View style={{
                    flex: 1,
                    padding: 10
                }}>

                    <FlatList data={data} renderItem={({ item, index }) => {
                        return (

                            <View style={{
                                marginBottom: 10,
                                padding: 10,
                                backgroundColor: colors.white,
                                borderWidth: 1,
                                borderColor: Color.blueGray[300],
                                borderRadius: 12,
                            }}>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 0.5, }}>Tanggal</Text>
                                    <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 0.1, }}>:</Text>
                                    <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 1, }}>{moment(item.tanggal).format('DD MMMM YYYY')}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 0.5, }}>Berat Badan</Text>
                                    <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 0.1, }}>:</Text>
                                    <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 1, }}>{item.berat_badan} kg</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 0.5, }}>Tinggi Badan</Text>
                                    <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 0.1, }}>:</Text>
                                    <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 1, }}>{item.tinggi_badan} cm</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 0.5, }}>Status Gizi</Text>
                                    <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 0.1, }}>:</Text>
                                    <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 1, }}>{item.status_gizi}</Text>
                                </View>



                                {user.level == 'Petugas' &&

                                    <View style={{
                                        marginTop: 10,
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start'
                                    }}>

                                        <TouchableOpacity onPress={() => navigation.navigate('UkurEdit', {
                                            anak: anak,
                                            item: item,
                                        })} style={{
                                            marginLeft: 10,
                                            width: 50,
                                            height: 50,
                                            backgroundColor: colors.secondary,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 50
                                        }}>
                                            <Icon type='ionicon' name='create' color={colors.white} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
                                            { text: 'Tidak' },
                                            {
                                                text: 'Ya, Hapus',
                                                onPress: () => {

                                                    axios.post(apiURL + 'delete_ukur', item).then(res => {
                                                        if (res.data.status == 200) {
                                                            showMessage({
                                                                type: 'success',
                                                                icon: 'success',
                                                                message: res.data.message
                                                            });
                                                            __getTransaction();
                                                        }
                                                    })
                                                }
                                            }
                                        ])} style={{
                                            marginLeft: 10,
                                            width: 50,
                                            height: 50,
                                            backgroundColor: colors.danger,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 50
                                        }}>
                                            <Icon type='ionicon' name='trash' color={colors.white} />
                                        </TouchableOpacity>
                                    </View>
                                }

                            </View>
                        )
                    }} />
                </View>
            </ScrollView>
            {user.level == 'Petugas' && <TouchableOpacity onPress={() => navigation.navigate('UkurAdd', anak)} style={{
                width: 60,
                height: 60,
                position: 'absolute',
                bottom: 10,
                right: 10,
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50
            }}>
                <Icon type='ionicon' name='add' color={colors.white} />
            </TouchableOpacity>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})