import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Image,
    Animated,
    ImageBackground,
    TouchableWithoutFeedback,
    TouchableOpacity,
    SafeAreaView,
    ScrollView
} from 'react-native';
import { MyButton, MyCalendar, MyFileUploader, MyGap, MyHeader, MyInput, MyInputLogin, MyPicker, MyRadio } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color } from '../../utils';
import { apiURL, getData } from '../../utils/localStorage';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import Pdf from 'react-native-pdf';
import { Icon } from 'react-native-elements';
export default function TentangKami() {

    const [buka, setBuka] = useState(false);
    const [user, setUser] = useState({});
    const [kirim, setKirim] = useState({});
    const isFocused = useIsFocused();
    const [dataPDF, setDataPDF] = useState({})

    useEffect(() => {
        if (isFocused) {
            __getTransaction()
        }
    }, [isFocused]);

    const __getTransaction = () => {
        getData('user').then(u => {
            setUser(u);
            axios.post(apiURL + 'get_petunjuk', {
                level: u.level
            }).then(res => {
                console.log(res.data[0]);
                setDataPDF(res.data[0]);
            })
        })

    }

    const MyList = ({ label, value }) => {
        return (
            <View style={{
                marginTop: 4,
                marginHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'flex-start'
            }}>
                <Text style={{
                    flex: 0.5,
                    ...fonts.body3,
                    color: colors.primary
                }}>{label}</Text>
                <Text style={{
                    flex: 0.1,
                    ...fonts.body3,
                    color: colors.primary
                }}>:</Text>
                <Text style={{
                    flex: 1,
                    ...fonts.body3,
                    color: colors.primary
                }}>{value}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader title="Petunjuk Penggunaan" />
            <Pdf
                trustAllCerts={false}
                // source={{ uri: webURL + data.foto_pdf, cache: true }}
                source={{
                    uri: dataPDF.pdf, cache: true
                }}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={{
                    flex: 1,

                }} />

            {user.level == 'Petugas' && buka && <View style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
                margin: 10,
                borderColor: Color.blueGray[300]
            }}>
                <TouchableOpacity onPress={() => setBuka(false)} style={{
                    width: 50,
                    height: 50,
                    backgroundColor: colors.tertiary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 25,
                    position: 'absolute',
                    right: 0,
                    top: -25,
                }}>
                    <Icon type='ionicon' name='close' color={colors.white} />
                </TouchableOpacity>
                <MyFileUploader label="Upload PDF Petunjuk Penggunaan" onFileChange={x => {
                    console.log(x)
                    setKirim(x)
                }} />
                <MyGap jarak={10} />
                <MyButton title="Simpan" onPress={() => {
                    console.log(kirim);
                    const sendData = new FormData();
                    sendData.append('gambar', {
                        name: kirim.name,
                        type: kirim.type,
                        uri: kirim.uri,
                    })
                    axios.post(apiURL + 'update_petunjuk', sendData).then(res => {
                        console.log(res.data);
                        if (res.data == 200) {
                            showMessage({ type: 'success', message: 'Update petunjuk penggunaan berhasil !' });
                            // navigation.goBack();
                        }
                    })




                }} />
            </View>}

            {/* {user.level == 'Petugas' && !buka && <TouchableOpacity onPress={() => setBuka(true)} style={{
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
                <Icon type='ionicon' name='cloud-upload' color={colors.white} />
            </TouchableOpacity>
            } */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})