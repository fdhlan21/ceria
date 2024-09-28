import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { windowWidth, fonts, MyDimensi } from '../../utils/fonts';
import { getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { Color, colors } from '../../utils/colors';
import { MyButton, MyGap, MyHeader } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { ScrollView } from 'react-native';

export default function ({ navigation, route }) {
    const [user, setUser] = useState({});
    const [com, setCom] = useState({});
    const isFocused = useIsFocused();
    const [wa, setWA] = useState('');
    const [open, setOpen] = useState(false);



    useEffect(() => {


        if (isFocused) {
            getData('user').then(res => {
                console.log(res)
                if (res.level !== 'Ibu') {
                    setOpen(true);
                    setUser(res);
                } else {
                    btnKeluar()
                }


            });
        }




    }, [isFocused]);



    const btnKeluar = () => {
        Alert.alert(MYAPP, 'Apakah kamu yakin akan keluar ?', [
            {
                text: 'Batal',
                style: "cancel"
            },
            {
                text: 'Keluar',
                onPress: () => {
                    storeData('user', null);

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Splash' }],
                    });
                }
            }
        ])
    };

    const MyList = ({ label, value }) => {
        return (
            <View
                style={{
                    marginVertical: 2,
                    padding: 5,
                    paddingHorizontal: 10,
                    backgroundColor: Color.blueGray[50],
                    borderRadius: 5,
                }}>
                <Text
                    style={{
                        ...fonts.headline5,
                        color: colors.primary,
                    }}>
                    {label}
                </Text>
                <Text
                    style={{
                        ...fonts.body3,
                        color: colors.tertiary,
                    }}>
                    {value}
                </Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.background
        }}>


            <MyHeader title="Profil" onPress={() => navigation.goBack()} />
            {!open && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>}
            {open &&

                <View style={{
                    margin: 5,
                    flex: 1,
                    padding: 10,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>

                        <View style={{
                            width: 100,
                            height: 100,
                            borderWidth: 1,
                            borderColor: Color.blueGray[100],
                            overflow: 'hidden',
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>

                            <Image source={{
                                uri: user.foto_user
                            }} style={{
                                width: 100,
                                height: 100,

                            }} />

                        </View>
                        <View style={{
                            paddingLeft: 10,
                            flex: 1,
                        }}>
                            <Text style={{ ...fonts.headline4, color: colors.primary }}>Nama Petugas</Text>
                            <Text style={{ ...fonts.body3, color: colors.tertiary }}>{user.nama_lengkap}</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('AccountEdit', user)} style={{
                                width: 80,
                                backgroundColor: colors.primary,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                                padding: 5,

                            }}>
                                <Text style={{ ...fonts.subheadline3, color: colors.white }}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={{
                            marginTop: 10,
                            ...fonts.headline3,
                            color: colors.secondary
                        }}>Profil Posyandu</Text>
                        <MyList label="Nama Posyandu" value={user.nama_posyandu} />

                        <MyList label="Telepon Posyandu" value={user.nama_posyandu} />
                        <MyList label="Alamat Posyandu" value={user.alamat_posyandu} />
                        <Text style={{
                            marginTop: 10,
                            ...fonts.headline3,
                            color: colors.secondary
                        }}>Hubungi Kami</Text>
                        <MyList label="Nomor Telepon" value={user.hubungi_kami} />


                    </View>
                    {/* data detail */}
                </View>

            }
            <View style={{
                padding: 20,
            }}>

                <MyGap jarak={10} />
                <MyButton onPress={btnKeluar} warna={colors.tertiary} title="Log Out" Icons="log-out-outline" iconColor={colors.white} colorText={colors.white} />
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({});
