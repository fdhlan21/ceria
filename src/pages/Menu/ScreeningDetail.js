import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import { Color, colors, fonts } from '../../utils';
import { MyHeader, MyRadio } from '../../components';
import { Icon } from 'react-native-elements';
import moment from 'moment';

export default function ScreeningDetail({ navigation, route }) {

    const items = route.params;
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

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader title="Pengisian Identitas Responden" />
            <ScrollView style={{
                padding: 10,
            }}>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        flex: 0.7,
                        ...fonts.subheadline3,
                    }}>Tanggal Screening</Text>
                    <Text style={{
                        flex: 0.1,
                        ...fonts.subheadline3,
                    }}>:</Text>
                    <Text style={{
                        flex: 1,
                        ...fonts.subheadline3,
                    }}>{moment(items.tanggal).format('dddd, DD MMMM YYYY')}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        flex: 0.7,
                        ...fonts.subheadline3,
                    }}>Hasil Screening</Text>
                    <Text style={{
                        flex: 0.1,
                        ...fonts.subheadline3,
                    }}>:</Text>
                    <Text style={{
                        flex: 1,
                        ...fonts.subheadline3,
                        color: items.hasil == 'Beresiko' ? colors.primary : colors.success
                    }}>{items.hasil}</Text>

                </View>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        flex: 0.7,
                        ...fonts.subheadline3,
                    }}>Informasi</Text>
                    <Text style={{
                        flex: 0.1,
                        ...fonts.subheadline3,
                    }}>:</Text>
                    <Text style={{
                        flex: 1,
                        ...fonts.subheadline3,
                        color: items.hasil == 'Beresiko' ? colors.primary : colors.success
                    }}>{items.info}</Text>
                </View>

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
                                        color: colors.black,
                                    }}>{item.soal}</Text>

                                    <Text style={{

                                        ...fonts.headline3,
                                        color: colors.primary,
                                    }}>{items['a' + (index + 1)] == 1 ? 'Ya' : 'Tidak'}</Text>

                                </View>
                            </View>

                        </View>

                    )
                }} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})