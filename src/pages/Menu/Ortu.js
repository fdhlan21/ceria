import { Alert, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { apiURL, getData, MYAPP } from '../../utils/localStorage';
import { Color, colors, fonts } from '../../utils';
import { MyGap, MyHeader, MyLoading } from '../../components';
import { Icon } from 'react-native-elements';
import moment from 'moment';


import { Calendar, LocaleConfig } from 'react-native-calendars';
import { showMessage } from 'react-native-flash-message';


export default function Ortu({ navigation, route }) {

    const [data, setData] = useState([]);
    const [tmp, setTemp] = useState([]);
    const [user, setUser] = useState({});
    const [key, setKey] = useState('');


    const isFocused = useIsFocused();

    const __getTransaction = (key = key) => {
        setLoading(true)


        getData('user').then(u => {
            setUser(u);
            axios.post(apiURL + 'ortu', {
                key: key
            }).then(res => {
                setLoading(false)
                console.log(res.data);
                setData(res.data);
            })
        })
    }

    useEffect(() => {
        if (isFocused) {
            __getTransaction();
        }
    }, [isFocused])
    const [loading, setLoading] = useState(false);
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.background
        }}>
            <MyHeader title="Data Orang Tua" />
            <ScrollView>
                <View style={{
                    marginHorizontal: 10,
                    marginTop: 10,
                    position: 'relative',
                }}>
                    <TextInput onChangeText={x => setKey(x)} onSubmitEditing={x => {
                        __getTransaction(x.nativeEvent.text);
                    }} placeholder='Cara data orang tua' style={{
                        paddingLeft: 10,
                        ...fonts.body3,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: Color.blueGray[300],
                        backgroundColor: colors.white,
                    }} />
                    <View style={{
                        position: 'absolute',
                        right: 10,
                        top: 12,
                    }}>
                        <Icon type='ionicon' name='search' color={Color.blueGray[300]} />
                    </View>
                </View>

                {loading && <MyLoading />}
                {!loading &&
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
                                        <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 0.5, }}>Nama Ayah</Text>
                                        <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 0.1, }}>:</Text>
                                        <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 1, }}>{item.nama_ayah}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row'
                                    }}>
                                        <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 0.5, }}>Nama Ibu</Text>
                                        <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 0.1, }}>:</Text>
                                        <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 1, }}>{item.nama_ibu}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row'
                                    }}>
                                        <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 0.5, }}>NIK Ibu</Text>
                                        <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 0.1, }}>:</Text>
                                        <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 1, }}>{item.nik_ibu}</Text>
                                    </View>



                                    {user.level == 'Petugas' &&

                                        <View style={{
                                            marginTop: 10,
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end'
                                        }}>
                                            <TouchableOpacity onPress={() => navigation.navigate('OrtuDetail', item)} style={{
                                                width: 50,
                                                height: 50,
                                                backgroundColor: colors.tertiary,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 50,

                                            }}>
                                                <Icon type='ionicon' name='search' color={colors.white} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => navigation.navigate('OrtuEdit', item)} style={{
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

                                                        axios.post(apiURL + 'delete_ortu', item).then(res => {
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
                }
            </ScrollView>
            {user.level == 'Petugas' && <TouchableOpacity onPress={() => navigation.navigate('OrtuAdd')} style={{
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