import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import { colors, fonts } from '../../utils';
import { MyButton, MyHeader, MyRadio } from '../../components';
import { Icon } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import SweetAlert from 'react-native-sweet-alert';

export default function ScreeningCek({ navigation, route }) {
    const user = route.params;

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
                <Text style={{
                    ...fonts.headline3,
                    color: colors.primary,
                }}>Skrining</Text>
                <Text style={{
                    ...fonts.body3,
                    color: colors.primary,
                    textAlign: 'justify',
                    maxWidth: '90%'
                }}>HIV (Human Immunodeficiency Virus) adalah proses untuk mengetahui apakah seseorang terinfeksi HIV. Melalui konseling yang akan ditindaklanjuti dengan testing apabila memiliki faktor risiko.</Text>

                <Text style={{
                    marginTop: 10,
                    ...fonts.headline3,
                    color: colors.primary,
                }}>Konseling HIV</Text>
                <Text style={{
                    ...fonts.body3,
                    color: colors.primary,
                    textAlign: 'justify',
                    maxWidth: '90%'
                }}>Konseling HIV adalah layanan yang penting untuk mendukung orang-orang yang berisiko atau terinfeksi HIV. Ini dilakukan untuk memberikan informasi, dukungan emosional, dan panduan praktis terkait status HIV seseorang. </Text>
            </View>
            <View style={{
                padding: 10,
            }}>
                <MyButton title="Berikutnya" onPress={() => navigation.navigate('ScreeningAdd', user)} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})