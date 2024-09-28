import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import { Color, colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import { Icon } from 'react-native-elements';
import moment from 'moment';

export default function Screening({ navigation, route }) {

    const user = route.params;

    const [data, setData] = useState([]);

    const isFocused = useIsFocused();

    const __getTransaction = () => {
        axios.post(apiURL + 'screening', {
            fid_user: user.id
        }).then(res => {
            console.log(res.data);
            setData(res.data)
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
            <MyHeader title="Pengisian Screening HIV" />
            <View style={{
                flex: 1,
                padding: 12
            }}>
                <FlatList data={data} renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('ScreeningDetail', item)} style={{
                            marginVertical: 10,
                            borderWidth: 1,
                            borderRadius: 12,
                            borderColor: Color.blueGray[300],
                            position: 'relative',
                            overflow: 'hidden',
                            padding: 10,
                        }}>
                            <View>
                                <Text style={{

                                    ...fonts.subheadline3,
                                    color: colors.black,
                                }}>{moment(item.tanggal).format('dddd, DD MMMM YYYY')}</Text>
                            </View>

                            <View>
                                <Text style={{

                                    ...fonts.headline3,
                                    color: colors.black,
                                }}>Hasil Screening</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Image style={{
                                        resizeMode: 'contain',
                                        width: 30,
                                        height: 30,
                                    }} source={item.hasil == 'Beresiko' ? require('../../assets/bahaya.png') : require('../../assets/aman.png')} />
                                    <Text style={{
                                        left: 10,
                                        ...fonts.headline4,
                                        color: item.hasil == 'Beresiko' ? colors.primary : colors.success,
                                    }}>{item.hasil}</Text>
                                </View>
                            </View>

                        </TouchableOpacity>
                    )
                }} />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ScreeningCek', user)} style={{
                marginBottom: 10,
                marginRight: 10,
                alignSelf: 'flex-end',
                width: 60,
                height: 60,
                borderRadius: 40,
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Icon type='ionicon' name='add' color={colors.white} size={40} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})