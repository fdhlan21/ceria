import { Alert, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { apiURL, getData, MYAPP } from '../../utils/localStorage';
import { colors, fonts, windowWidth } from '../../utils';
import { MyGap, MyHeader } from '../../components';
import RenderHtml from 'react-native-render-html';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import YoutubePlayer from "react-native-youtube-iframe";

export default function InformasiDetail({ navigation, route }) {

    const [user, setUser] = useState({})
    useEffect(() => {
        getData('user').then(u => {
            setUser(u);
        })
    }, [])
    const item = route.params;
    const systemFonts = [fonts.body3.fontFamily, fonts.headline4.fontFamily];
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader title={item.judul} />
            <ScrollView style={{
                padding: 16
            }}>
                <Image source={{
                    uri: item.gambar
                }} style={{
                    borderRadius: 10,
                    width: '100%',
                    height: 250,
                }} />
                <Text style={{
                    marginTop: 10,
                    ...fonts.subheadline3,
                    color: colors.black,
                }}>{moment(item.tanggal).format('DD MMMM YYYY')}</Text>
                <Text style={{
                    marginTop: 10,
                    ...fonts.headline3,
                    color: item.tipe == 'Berita' ? colors.primary : colors.secondary,
                }}>{item.tipe}</Text>

                <RenderHtml
                    tagsStyles={{
                        p: {
                            fontFamily: fonts.body3.fontFamily,
                            textAlign: 'justify',
                            lineHeight: 26,
                        },
                    }}
                    systemFonts={systemFonts}
                    contentWidth={windowWidth}
                    source={{
                        html: item.keterangan
                    }}
                />
                <MyGap jarak={10} />
                {item.link_youtube.length > 0 &&

                    <YoutubePlayer
                        height={windowWidth}
                        videoId={item.link_youtube}

                    />
                }

            </ScrollView>
            {user.level == 'Petugas' && <TouchableOpacity onPress={() => Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
                { text: 'Tidak' },
                {
                    text: 'Ya, Hapus',
                    onPress: () => {

                        axios.post(apiURL + 'delete_informasi', item).then(res => {
                            if (res.data.status == 200) {
                                showMessage({
                                    type: 'success',
                                    icon: 'success',
                                    message: res.data.message
                                });
                                navigation.goBack();
                            }
                        })
                    }
                }
            ])} style={{
                width: 60,
                height: 60,
                position: 'absolute',
                bottom: 10,
                right: 10,
                backgroundColor: colors.danger,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50
            }}>
                <Icon type='ionicon' name='trash' color={colors.white} />
            </TouchableOpacity>
            }
            {user.level == 'Petugas' && <TouchableOpacity onPress={() => navigation.navigate('InformasiEdit', item)} style={{
                width: 60,
                height: 60,
                position: 'absolute',
                bottom: 10,
                left: 10,
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50
            }}>
                <Icon type='ionicon' name='create' color={colors.white} />
            </TouchableOpacity>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})