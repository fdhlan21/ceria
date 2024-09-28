import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { apiURL, getData } from '../../utils/localStorage';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import { Icon } from 'react-native-elements';
import moment from 'moment';

export default function Informasi({ navigation, route }) {

    const [data, setData] = useState([]);
    const [user, setUser] = useState({});

    const isFocused = useIsFocused();

    const __getTransaction = () => {
        axios.post(apiURL + 'informasi').then(res => {
            console.log(res.data);
            setData(res.data)
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
            backgroundColor: colors.white
        }}>
            <MyHeader title="Berita & Info" />
            <View style={{
                flex: 1,
                padding: 12
            }}>
                <FlatList data={data} renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('InformasiDetail', item)} style={{
                            marginVertical: 10,
                            position: 'relative',
                            overflow: 'hidden'
                        }}>

                            <Image source={{
                                uri: item.gambar
                            }} style={{
                                borderRadius: 10,
                                width: '100%',
                                height: 250,
                            }} />
                            <View style={{
                                top: 10,
                                left: 10,
                                padding: 10,
                                position: 'absolute',
                                backgroundColor: item.tipe == 'Berita' ? colors.primary : colors.secondary,
                                borderRadius: 10,
                            }}>
                                <Text style={{

                                    ...fonts.headline4,
                                    color: colors.white,
                                }}>{item.tipe}</Text>
                            </View>
                            <View style={{
                                bottom: 0,
                                padding: 10,
                                width: '100%',
                                position: 'absolute',
                                backgroundColor: '#00000087',
                                borderBottomRightRadius: 10,
                                borderBottomLeftRadius: 10,
                            }}>
                                <Text style={{

                                    ...fonts.headline4,
                                    color: colors.white,
                                }}>{item.judul}</Text>
                                <Text style={{

                                    ...fonts.subheadline3,
                                    color: colors.white,
                                }}>{moment(item.tanggal).format('DD MMMM YYYY')}</Text>
                            </View>

                        </TouchableOpacity>
                    )
                }} />
            </View>
            {user.level == 'Petugas' && <TouchableOpacity onPress={() => navigation.navigate('InformasiAdd')} style={{
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