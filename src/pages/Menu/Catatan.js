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


export default function Catatan({ navigation, route }) {

    const [data, setData] = useState([]);
    const [user, setUser] = useState({});

    const isFocused = useIsFocused();

    const __getTransaction = () => {
        axios.post(apiURL + 'program').then(res => {

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
            <MyHeader title="Pencatatan" />

            <View style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: 16,
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('Ortu')} style={{
                    marginBottom: 20,
                }}>
                    <Image source={require('../../assets/ortu.png')} style={{
                        // height: 80,
                        width: windowWidth - 32,
                        height: 100,
                        resizeMode: 'contain'
                    }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Anak')} style={{
                    marginBottom: 20,
                }}>
                    <Image source={require('../../assets/anak.png')} style={{
                        // height: 80,
                        width: windowWidth - 32,
                        height: 100,
                        resizeMode: 'contain'
                    }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Laporan')} style={{
                    marginBottom: 20,
                }}>
                    <Image source={require('../../assets/laporan.png')} style={{
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