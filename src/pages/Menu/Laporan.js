import { Alert, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { apiURL, getData, MYAPP } from '../../utils/localStorage';
import { colors, fonts, windowWidth } from '../../utils';
import { MyGap, MyHeader } from '../../components';
import { Icon } from 'react-native-elements';
import moment from 'moment';


import { Calendar, LocaleConfig } from 'react-native-calendars';


export default function Laporan({ navigation, route }) {

    const [data, setData] = useState([]);
    const [user, setUser] = useState({});



    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.background
        }}>
            <MyHeader title="Laporan" />

            <View style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: 16,
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('LaporanUkur')} style={{
                    marginBottom: 20,
                }}>
                    <Image source={require('../../assets/lap1.png')} style={{
                        // height: 80,
                        width: windowWidth - 32,
                        height: 100,
                        resizeMode: 'contain'
                    }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('LaporanDatang')} style={{
                    marginBottom: 20,
                }}>
                    <Image source={require('../../assets/lap2.png')} style={{
                        // height: 80,
                        width: windowWidth - 32,
                        height: 100,
                        resizeMode: 'contain'
                    }} />
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})