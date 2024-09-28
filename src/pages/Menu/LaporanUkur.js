import { Alert, FlatList, Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { apiURL, getData, MYAPP, webURL } from '../../utils/localStorage';
import { Color, colors, fonts } from '../../utils';
import { MyButton, MyCalendar, MyGap, MyHeader, MyLoading, MyPicker } from '../../components';
import { Icon } from 'react-native-elements';
import moment from 'moment';


import { Calendar, LocaleConfig } from 'react-native-calendars';
import { showMessage } from 'react-native-flash-message';


export default function laporanUkur({ navigation, route }) {


    const anak = route.params;

    const [data, setData] = useState([]);
    const [tmp, setTemp] = useState([]);
    const [user, setUser] = useState({});
    const [key, setKey] = useState('');


    const isFocused = useIsFocused();

    const __getTransaction = () => {
        setLoading(true);
        axios.post(apiURL + 'laporan', kirim).then(res => {
            console.log(res.data);

            setData(res.data);
            setLoading(false);
        })

    }

    const [kirim, setKirim] = useState({
        status_gizi: 'Semua',
        awal: moment().format('YYYY-MM-DD'),
        akhir: moment().format('YYYY-MM-DD')
    })
    useEffect(() => {
        if (isFocused) {
            // __getTransaction();
        }
    }, [isFocused]);
    const [loading, setLoading] = useState(false);

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.background
        }}>
            <MyHeader title="Laporan Pengukuran" />
            <ScrollView>

                <View style={{
                    flex: 1,
                    padding: 10
                }}>
                    <View style={{
                        padding: 10,
                    }}>
                        <MyPicker iconname='options' label="Status Gizi" data={[
                            { label: 'Semua', value: 'Semua' },
                            { label: 'Gizi Buruk', value: 'Gizi Buruk' },
                            { label: 'Gizi Kurang', value: 'Gizi Kurang' },
                            { label: 'Gizi Baik', value: 'Gizi Baik' },
                            { label: 'Beresiko Gizi Berlebih', value: 'Beresiko Gizi Berlebih' },
                            { label: 'Gizi Berlebih', value: 'Gizi Berlebih' },

                        ]} onValueChange={x => setKirim({ ...kirim, status_gizi: x })} />

                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                flex: 1,
                                paddingRight: 10,
                            }}>
                                <MyCalendar onDateChange={x => setKirim({ ...kirim, awal: x })} value={kirim.awal} label="Dari" />
                            </View>
                            <View style={{
                                flex: 1,
                                paddingRight: 10,
                            }}>
                                <MyCalendar onDateChange={x => setKirim({ ...kirim, awal: x })} value={kirim.awal} label="Sampai" />
                            </View>
                        </View>
                        <MyGap jarak={10} />
                        <MyButton title="Filter" onPress={__getTransaction} />

                        <MyGap jarak={10} />
                        {loading && <MyLoading />}
                        {!loading &&

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
                                            <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 0.5, }}>Nama Anak</Text>
                                            <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 0.1, }}>:</Text>
                                            <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 1, }}>{item.nama_anak}</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row'
                                        }}>
                                            <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 0.5, }}>NIK</Text>
                                            <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 0.1, }}>:</Text>
                                            <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 1, }}>{item.nik}</Text>
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
                        }



                    </View>


                </View>
            </ScrollView>
            {
                data.length > 0 &&


                <TouchableOpacity onPress={() => {
                    let URL = webURL + `gizi?status_gizi=${kirim.status_gizi}&awal=${kirim.awal}&akhir=${kirim.akhir}`;
                    Linking.openURL(URL);
                }} style={{
                    width: 80,
                    height: 80,
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    backgroundColor: colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 50
                }}>
                    <Icon type='ionicon' name='download' color={colors.white} />
                    <Text style={{
                        ...fonts.body3,
                        color: colors.white
                    }}>Export</Text>
                </TouchableOpacity>
            }
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})