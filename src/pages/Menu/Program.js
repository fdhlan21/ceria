import { Alert, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { apiURL, getData, MYAPP } from '../../utils/localStorage';
import { colors, fonts } from '../../utils';
import { MyGap, MyHeader } from '../../components';
import { Icon } from 'react-native-elements';
import moment from 'moment';


import { Calendar, LocaleConfig } from 'react-native-calendars';
import { showMessage } from 'react-native-flash-message';


export default function Program({ navigation, route }) {

    const [data, setData] = useState([]);
    const [user, setUser] = useState({});
    const [tanggal, setTanggal] = useState({})

    const isFocused = useIsFocused();

    const __getTransaction = () => {
        axios.post(apiURL + 'program').then(res => {

            let OBJ = {};
            res.data.map(i => {
                console.log(i.tanggal)
                OBJ[i.tanggal] = { selected: true }
            });

            console.log(OBJ)
            setTanggal(OBJ);
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
            backgroundColor: colors.background
        }}>
            <MyHeader title="Program" />
            <ScrollView>
                <View style={{
                    flex: 1,
                    padding: 12
                }}>
                    <Calendar
                        scrollable

                        disableAllTouchEventsForDisabledDays={true}
                        theme={{
                            backgroundColor: colors.background,
                            calendarBackground: colors.background,
                            textDayHeaderFontFamily: fonts.body3.fontFamily,
                            textMonthFontFamily: fonts.headline4.fontFamily,
                            textDayFontFamily: fonts.headline5.fontFamily,
                            textDayFontSize: 14,
                            arrowColor: colors.primary,
                            selectedDayBackgroundColor: colors.primary,
                            todayTextColor: colors.secondary

                        }}
                        onDayPress={x => {
                            console.log(x);

                        }}
                        markedDates={tanggal}

                    />
                    <MyGap jarak={20} />
                    <FlatList data={data} renderItem={({ item, index }) => {
                        return (

                            <View style={{
                                marginBottom: 10,
                                padding: 10,
                                backgroundColor: user.level == 'Petugas' ? colors.primary : colors.secondary,
                                borderRadius: 12,
                            }}>
                                <Text style={{ ...fonts.headline4, color: colors.white }}>{item.tugas}</Text>
                                <Text style={{ ...fonts.subheadline4, color: colors.white }}>{item.penanggung_jawab}</Text>
                                <Text style={{ ...fonts.subheadline4, color: colors.white }}>{item.waktu}</Text>
                                <Text style={{ textAlign: 'right', ...fonts.subheadline4, color: colors.white }}>{moment(item.tanggal).format('DD MMMM YYYY')}</Text>
                                {user.level == 'Petugas' &&

                                    <View style={{
                                        marginTop: 10,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}>
                                        <TouchableOpacity onPress={() => navigation.navigate('ProgramEdit', item)} style={{
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

                                                    axios.post(apiURL + 'delete_program', item).then(res => {
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
            {user.level == 'Petugas' && <TouchableOpacity onPress={() => navigation.navigate('ProgramAdd')} style={{
                width: 60,
                height: 60,
                position: 'absolute',
                top: 15,
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