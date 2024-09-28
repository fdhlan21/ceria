import { View, Text, SafeAreaView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { colors, fonts } from '../../utils'
import { MyButton, MyGap, MyHeader, MyRadio } from '../../components'
import { ScrollView } from 'react-native'
import { apiURL, getData } from '../../utils/localStorage'
import axios from 'axios'

export default function PenilaianNyeri({ navigation }) {

    // State untuk melacak pilihan radio
    const [selectedValue, setSelectedValue] = useState({
        EkspresiWajah: null,
        Tangisan: null,
        PolaNafas: null,
        Tungkai: null,
        Kesadaran: null


    });
    // State untuk melacak total score
    const [totalScore, setTotalScore] = useState(0);
    // State untuk melacak halaman saat ini
    const [currentPage, setCurrentPage] = useState(1);
    // State untuk menampilkan hasil score dan penjelasan
    const [showResult, setShowResult] = useState(false);
    const [explanation, setExplanation] = useState('');

    // Fungsi untuk menangani klik tombol "Selanjutnya"
    const handleNext = () => {
        // Validasi apakah pilihan radio sudah dipilih di setiap halaman
        if (currentPage === 1 && !selectedValue.EkspresiWajah) {
            Alert.alert('Error', 'Silakan pilih ekspresi wajah sebelum melanjutkan.');
        } else if (currentPage === 2 && !selectedValue.Tangisan) {
            Alert.alert('Error', 'Silakan pilih tangisan sebelum melanjutkan.');
        } else if (currentPage === 3 && !selectedValue.PolaNafas) {
            Alert.alert('Error', 'Silakan pilih Pola Nafas sebelum melanjutkan.');
        } else if (currentPage === 4 && !selectedValue.Tungkai) {
            Alert.alert('Error', 'Silakan pilih Tungkai sebelum melanjutkan.');
        } else if (currentPage === 5 && !selectedValue.Kesadaran) {
            Alert.alert('Error', 'Silakan pilih Kesadaran sebelum melanjutkan.');
        } else {
            if (currentPage < 5) {
                setCurrentPage(currentPage + 1); // Pindah ke halaman selanjutnya
            } else if (currentPage === 5) {
                showScore(); // Tampilkan hasil score saat di halaman terakhir
            }
        }

    };

    const [param, setParam] = useState({
        EkspresiWajah: 0,
        Tangisan: 0,
        PolaNafas: 0,
        Tungkai: 0,
        Kesadaran: 0,
    })

    // Fungsi untuk menangani klik tombol "Kembali"
    const handleBack = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1); // Kembali ke halaman sebelumnya
        }
    };
    // Fungsi untuk menangani pilihan radio dan menambah score
    const handleSelect = (question, score, value) => {
        setSelectedValue({
            ...selectedValue,
            [question]: value,

        });
        setParam({
            ...param,
            [question]: score
        })
        // Update score
        setTotalScore(totalScore + score);
    };

    // Fungsi untuk menampilkan hasil score
    const showScore = () => {
        setShowResult(true); // Menampilkan hasil score

        // Menentukan penjelasan berdasarkan total score
        let explanationText = "";
        if (totalScore <= 2) {
            explanationText = "";
        } else if (totalScore <= 4) {
            explanationText = "";
        } else {
            explanationText = "";
        }

        setExplanation(explanationText); // Set explanation based on score
        setCurrentPage(6); // Pindah ke halaman hasil
    };


    const getImageForScore = () => {
        if (totalScore >= 0 && totalScore <= 2) {
            return {
                image: require('../../assets/skor_1-2.png'), // Gambar untuk score 1-2
                width: 276,  // Ukuran untuk score 1-2
                height: 390
            };
        } else if (totalScore >= 3 && totalScore <= 4) {
            return {
                image: require('../../assets/skor_3-4.png'), // Gambar untuk score 3-4
                width: 315,  // Ukuran untuk score 3-4
                height: 380
            };
        } else {
            return {
                image: require('../../assets/skor_lebih4.png'), // Gambar untuk score >4
                width: 315,  // Ukuran untuk score >4
                height: 416
            };
        }
    };


    // Mendapatkan image dan ukurannya berdasarkan score
    const { image, width, height } = getImageForScore();

    // Fungsi untuk mengarahkan ke halaman rekomendasi
    const goToRecommendation = () => {



        // navigation.navigate('Rekomendasi', { totalScore: totalScore });
        //  Navigasi ke halaman rekomendasi
    };


    const sendServer = (x) => {

        console.log(param)
        let nilai = 0;
        let keterangan = '';

        if (x >= 0 && x <= 2) {

            nilai = x;
            keterangan = 'Nyeri ringan tidak nyeri'

        } else if (x >= 3 && x <= 4) {

            nilai = x;
            keterangan = 'Nyeri sedang (Intervensi tanpa obat/non farmakologis, dievaluasi selama 30 menit)'
        } else {

            nilai = x;
            keterangan = 'Nyeri kuat/hebat (intervensi nyeri farmakologis/diberikan analgesik dan dievaluasi selama 30 menit)'
        }

        getData('user').then(u => {
            axios.post(apiURL + 'add_nilai', {
                fid_user: u.id,
                eksperesi_wajah: param.EkspresiWajah,
                tangisan: param.Tangisan,
                pola_nafas: param.PolaNafas,
                tungkai: param.Tungkai,
                kesadaran: param.Kesadaran,
                nilai: nilai,
                keterangan: keterangan,
            }).then(res => {
                console.log(res.data);
                if (nilai >= 0 && nilai <= 2) {
                    navigation.replace('MainApp')
                } else if (nilai >= 3) {
                    navigation.navigate('Rekomendasi', { totalScore: nilai })
                }
            })
        })


    }



    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader onPress={handleBack} title="Penilaian Nyeri pada Bayi (0-6 Bulan)" />
            <ScrollView>
                <View style={{ padding: 20 }}>
                    {/* Halaman 1: Ekspresi Wajah */}
                    {currentPage === 1 && (
                        <>
                            <View>
                                <Text style={{
                                    fontFamily: fonts.primary[600],
                                    fontSize: 18,
                                    color: colors.primary,
                                    textAlign: "center"
                                }}>
                                    Ekspresi Wajah
                                </Text>
                                <Image style={{
                                    width: 305,
                                    height: 288,
                                    alignSelf: 'center'
                                }} source={require('../../assets/ekspresiwajah.png')} />
                            </View>

                            <View>
                                <MyRadio
                                    label="Wajah tenang & ekspresi netral"
                                    selected={selectedValue["EkspresiWajah"] === 'Wajah tenang & ekspresi netral'}
                                    onPress={() => handleSelect('EkspresiWajah', 0, 'Wajah tenang & ekspresi netral')} // Score 1
                                />

                                <MyRadio
                                    label="Otot wajah tegang, alis berkerut, dagu, dan rahang tegang (Ekspresi wajah negatif, hidung, mulut, dan alis berkerut)"
                                    selected={selectedValue["EkspresiWajah"] === 'Otot wajah tegang'}
                                    onPress={() => handleSelect('EkspresiWajah', 1, 'Otot wajah tegang')} // Score 2
                                />


                            </View>
                        </>
                    )}

                    {/* Halaman 2: Setelah klik "Selanjutnya" */}
                    {currentPage === 2 && (
                        <View>
                            <View style={{
                                padding: 10
                            }}>
                                <Text style={{
                                    fontFamily: fonts.primary[600],
                                    fontSize: 18,
                                    color: colors.primary,
                                    textAlign: "center"
                                }}>
                                    Tangisan
                                </Text>
                                <Image style={{
                                    width: 274,
                                    height: 257,
                                    alignSelf: 'center'

                                }} source={require('../../assets/icon_tangisan.png')} />
                            </View>

                            <View>
                                <MyRadio
                                    label="Tenang & tidak menangis"
                                    selected={selectedValue["Tangisan"] === 'Tenang & tidak menangis'}
                                    onPress={() => handleSelect('Tangisan', 0, 'Tenang & tidak menangis')} // Score 2

                                />

                                <MyRadio
                                    label="Merengek ringan, kadang-kadang"
                                    selected={selectedValue["Tangisan"] === 'Merengek ringan, kadang-kadang'}
                                    onPress={() => handleSelect('Tangisan', 1, 'Merengek ringan, kadang-kadang')} // Score 2

                                />


                                <MyRadio
                                    label="Berteriak kencang, menarik, melengking terus-terusan"
                                    selected={selectedValue["Tangisan"] === 'Berteriak kencang, menarik, melengking terus-terusan'}
                                    onPress={() => handleSelect('Tangisan', 2, 'Berteriak kencang, menarik, melengking terus-terusan')} // Score 2
                                />


                                <View style={{
                                    padding: 10,
                                    alignItems: 'center'
                                }}>
                                    <Image style={{
                                        width: 307,
                                        height: 94,
                                    }} source={require('../../assets/catatan.png')} />
                                </View>
                            </View>

                        </View>
                    )}


                    {/* Halaman 3: Setelah klik "Selanjutnya" */}
                    {currentPage === 3 && (
                        <View>
                            <View style={{
                                padding: 10
                            }}>
                                <Text style={{
                                    fontFamily: fonts.primary[600],
                                    fontSize: 18,
                                    color: colors.primary,
                                    textAlign: "center"
                                }}>
                                    Pola Nafas
                                </Text>
                                <Image style={{
                                    width: 223,
                                    height: 223,
                                    alignSelf: 'center'

                                }} source={require('../../assets/pola_nafas.png')} />
                            </View>

                            <View>
                                <MyRadio
                                    label="Pola pernapasan bayi normal, RR:30-60x/menit"
                                    selected={selectedValue["PolaNafas"] === 'Pola pernapasan bayi normal, RR:30-60x/menit'}
                                    onPress={() => handleSelect('PolaNafas', 0, 'Pola pernapasan bayi normal, RR:30-60x/menit')} // Score 2
                                />

                                <MyRadio
                                    label="Tidak teratur, lebih cepat/lebih lambat dari biasanya, tersedak, napas tertahan"
                                    selected={selectedValue["PolaNafas"] === 'Tidak teratur, lebih cepat/lebih lambat dari biasanya, tersedak, napas tertahan'}
                                    onPress={() => handleSelect('PolaNafas', 1, 'Tidak teratur, lebih cepat/lebih lambat dari biasanya, tersedak, napas tertahan')} // Score 2
                                />



                            </View>

                        </View>
                    )}



                    {/* Halaman 4: Setelah klik "Selanjutnya" */}
                    {currentPage === 4 && (
                        <View>
                            <View style={{
                                padding: 10
                            }}>
                                <Text style={{
                                    fontFamily: fonts.primary[600],
                                    fontSize: 18,
                                    color: colors.primary,
                                    textAlign: "center"
                                }}>
                                    Tungkai (Lengan/Kaki)
                                </Text>
                                <Image style={{
                                    width: 232,
                                    height: 232,
                                    alignSelf: 'center'

                                }} source={require('../../assets/tungkai.png')} />
                            </View>

                            <View>
                                <MyRadio
                                    label="Tidak ada kekuatan otot, gerakan tangan dan kaki acak sekali-kali"
                                    selected={selectedValue["Tungkai"] === 'Tidak ada kekuatan otot, gerakan tangan dan kaki acak sekali-kali'}
                                    onPress={() => handleSelect('Tungkai', 0, 'Tidak ada kekuatan otot, gerakan tangan dan kaki acak sekali-kali')} // Score 2
                                />

                                <MyRadio
                                    label="Tegang, lengan dan kaki kondisi lurus, kaku, dan/atau ekstensi, cepat ekstensi, fleksi"
                                    selected={selectedValue["Tungkai"] === 'Tegang, lengan dan kaki kondisi lurus, kaku, dan/atau ekstensi, cepat ekstensi, fleksi'}
                                    onPress={() => handleSelect('Tungkai', 1, 'Tegang, lengan dan kaki kondisi lurus, kaku, dan/atau ekstensi, cepat ekstensi, fleksi')} // Score 2
                                />



                            </View>

                        </View>
                    )}


                    {/* Halaman 5: Setelah klik "Selanjutnya" */}
                    {currentPage === 5 && (
                        <View>
                            <View style={{
                                padding: 10
                            }}>
                                <Text style={{
                                    fontFamily: fonts.primary[600],
                                    fontSize: 18,
                                    color: colors.primary,
                                    textAlign: "center"
                                }}>
                                    Kesadaran
                                </Text>
                                <Image style={{
                                    width: 223,
                                    height: 223,
                                    alignSelf: 'center'

                                }} source={require('../../assets/kesadaran.png')} />
                            </View>

                            <View>
                                <MyRadio
                                    label="Tenang, bangun/tidur damai atau gerakan kaki acak yang terjaga"
                                    selected={selectedValue["Kesadaran"] === 'Tenang, bangun/tidur damai atau gerakan kaki acak yang terjaga'}
                                    onPress={() => handleSelect('Kesadaran', 0, 'Tenang, bangun/tidur damai atau gerakan kaki acak yang terjaga')} // Score 2
                                />

                                <MyRadio
                                    label="Terjaga, gelisah, dan meronta-ronta"
                                    selected={selectedValue["Kesadaran"] === 'Terjaga, gelisah, dan meronta-ronta'}
                                    onPress={() => handleSelect('Kesadaran', 1, 'Terjaga, gelisah, dan meronta-ronta')} // Score 2
                                />



                            </View>

                        </View>
                    )}

                    {/* Menampilkan hasil score di halaman yang sama setelah "Selesai" */}
                    {currentPage === 6 && (
                        <View style={{ marginTop: 0, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 10 }}>
                            <Text style={{
                                fontFamily: fonts.primary[600],
                                fontSize: 20,
                                color: colors.primary,
                                textAlign: 'center'
                            }}>
                                Hasil Interpretasi : {'\n'}
                                SKOR {totalScore}
                            </Text>


                            {/* Menampilkan gambar berdasarkan score */}
                            <View style={{
                                marginTop: 10
                            }}>
                                <Image
                                    source={image}
                                    style={{ width: width, height: height, alignSelf: 'center', marginVertical: 20 }}
                                />


                                {/* Conditional Rendering untuk Tombol berdasarkan Score */}
                                {totalScore <= 2 && (
                                    <MyButton
                                        title="Selesai"
                                        colorText={colors.white}
                                        onPress={() => sendServer(totalScore)} // Kembali ke halaman utama
                                    />
                                )}

                                {(totalScore > 2) && (
                                    <MyButton
                                        title="Rekomendasi"
                                        colorText={colors.white}
                                        onPress={() => sendServer(totalScore)} // Navigasi ke halaman rekomendasi
                                    />
                                )}
                            </View>
                        </View>
                    )}
                </View>


                {currentPage !== 6 && ( // Hide buttons on result page
                    <View style={{ padding: 20, marginTop: 10 }}>
                        <View style={{}}>

                            <MyButton
                                title={currentPage === 5 ? "Selesai" : "Selanjutnya"}
                                colorText={colors.white}
                                onPress={handleNext}
                            />

                            {currentPage > 1 && (
                                <MyButton
                                    title="Kembali"
                                    colorText={colors.white}
                                    onPress={handleBack}
                                />
                            )}
                        </View>
                    </View>
                )}
            </ScrollView>


        </SafeAreaView>
    );
}
