import { Dimensions, Image, Linking, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/header";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import Input2Text from "../components/input2";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import * as Location from 'expo-location';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

const Dimension = Dimensions.get("window")

const ZInput = z.object({
    subjek: z.string().min(1, "Tidak boleh kosong"),
    nama_pengawas: z.string().min(1, "Tidak boleh kosong"),
    jabatan: z.string().min(1, "Tidak boleh kosong"),
    nomorSurat: z.string().min(1, "Tidak boleh kosong"),
    alamat: z.string().min(1, "Tidak boleh kosong"),
    bentuk: z.string().min(1, "Tidak boleh kosong"),
    tujuan: z.string().min(1, "Tidak boleh kosong"),
    sasaran: z.string().min(1, "Tidak boleh kosong"),
    waktu_tanggal: z.string().min(1, "Tidak boleh kosong"),
    uraian: z.string().min(1, "Tidak boleh kosong"),
})

type IInput = z.infer<typeof ZInput>

export default function Home() {
    const [image, setImage] = useState<string | null>(null)
    const [location, setLocation] = useState<Location.LocationObject | null>(null)

    const print = async (html : string) => {
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        await Print.printAsync({
            html,

        });
    };

    const pickImage = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location)
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);

        } else {
            setLocation(null)
        }
    };

    const { control, handleSubmit, reset } = useForm<IInput>({
        resolver: zodResolver(ZInput),
        defaultValues: {
            alamat: "",
            jabatan: "",
            nama_pengawas: "",
            nomorSurat: "",
            subjek: "",
            bentuk: "",
            sasaran: "",
            tujuan: "",
            waktu_tanggal: "",
            uraian: ""
        },
        mode: "onBlur"
    })

    const fetchImageData = async (uri : string) => { // fetch Base64 string of image data
        const data = await FileSystem.readAsStringAsync(uri, {
         encoding: FileSystem.EncodingType.Base64,
        });
        return 'data:image/png;base64,' + data;
       };

    async function submitData(data: IInput) {
        console.log(data)

        const tanggal = new Date()
        const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body>
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;text-align:center">
      Laporan Hasil Pengawasan Pemilu
    </h1>
    <h2 style="text-align:center;">
        ${data.nomorSurat}/LHP /PM.01.${tanggal.getDate()+1}/${tanggal.getMonth()+1}/${tanggal.getFullYear()}
    </h2>

    <h3>A. Data Pengawasan</h3>
    <div style="display:flex;gap:10px">
    <h4 style="font-weigh:bold">Tahapan Yang Diawasi : </h4>
    <h4>${data.subjek}</h4>
    </div>
    <div style="display:flex;gap:10px">
    <h4 style="font-weight:bold">Nama / Tim Pengawas : </h4>
    <h4>${data.nama_pengawas}</h4>
    </div>
    <div style="display:flex;gap:10px">
    <h4 style="font-weight:bold">Jabatan : </h4>
    <h4>${data.jabatan}</h4>
    </div>
    <div style="display:flex;gap:10px">
    <h4 style="font-weight:bold">Nomor Surat : </h4>
    <h4>${data.nomorSurat}</h4>
    </div>
    <div style="display:flex;gap:10px">
    <h4 style="font-weight:bold">Alamat : </h4>
    <h4>${data.alamat}</h4>
    </div>
    <h3>B. Kegiatan Pengawasan</h3>
    <div style="display:flex;gap:10px">
    <h4 style="font-weight:bold">Bentuk : </h4>
    <h4>${data.bentuk}</h4>
    </div>
    <div style="display:flex;gap:10px">
    <h4 style="font-weight:bold">Tujuan : </h4>
    <h4>${data.tujuan}</h4>
    </div>
    <div style="display:flex;gap:10px">
    <h4 style="font-weight:bold">Sasaran : </h4>
    <h4>${data.sasaran}</h4>
    </div>
    <div style="display:flex;gap:10px">
    <h4 style="font-weight:bold">Waktu dan Tanggal : </h4>
    <h4>${data.waktu_tanggal}</h4>
    </div>
    <h3>C. Uraian Singkat Hasil Pengawasan</h3>
    <div style="display:flex;gap:10px">
    <h4 style="font-weight:bold">Uraian : </h4>
    <h4>${data.uraian}</h4>
    </div>
    <img
      src="${await fetchImageData(image || "")}"
      style="width: 90vw;height:300px;object-fit:cover" />
  </body>
</html>
`;

        print(html)
    }

    async function simpanData(data : IInput) {
        reset()
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: "#EEC811"
        }}>
            <Header />
            <ScrollView>
                <View style={
                    {
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: Dimension.height * 0.1
                    }
                }>
                    {
                        image != null &&
                        <Image style={{
                            width: "80%",
                            height: Dimension.height * 0.2,
                            objectFit: "contain"
                        }} source={{
                            uri: image
                        }} />
                    }
                    <TouchableOpacity onPress={() => {
                        pickImage()
                    }} style={{
                        width: "60%",
                        marginTop: 20,
                        backgroundColor: "#F44A14",
                        borderRadius: 500,
                        height: Dimension.height * 0.08,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Text style={{
                            color: "white",
                            fontSize: 15,
                            fontWeight: "bold"
                        }}>Pilih Gambar</Text>
                    </TouchableOpacity>
                    {
                        location != null &&
                        <TouchableOpacity onPress={() => {
                            Linking.openURL(`https://maps.google.com/?q=${location.coords.latitude},${location.coords.longitude}`)
                        }}>
                            <Text>Link Lokasi</Text>
                        </TouchableOpacity>
                    }

                </View>
                <View style={{
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                    backgroundColor: "white",
                    marginHorizontal: 20,
                    borderRadius: 10,
                    borderColor: "black",
                    borderWidth: 1,
                    marginVertical: 20
                }}>
                    <Text style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        textDecorationLine: "underline"
                    }}>FORM A</Text>
                    <Text style={{
                        textAlign: "center",
                        fontWeight: "bold",

                    }}>Laporan Hasil Pengawasan Pemilu</Text>
                    <Text style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: Dimension.fontScale * 12
                    }}>Nomor : /LHP /PM.01.02/10/2023</Text>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: Dimension.fontScale * 15,
                        marginTop: 30
                    }}>
                        A. Data Pengawasan
                    </Text>
                    <Controller name="subjek" control={control} render={({ field: { value, onChange, onBlur, }, fieldState: { error } }) =>
                        <Input2Text value={value}
                            error={error != null ? error.message : undefined}
                            onChange={onChange} label="Tahapan Yang Diawasi" onBlur={onBlur} placeholder="" containerStyle={{


                            }} containerStyle2={{
                                marginTop: 30
                            }} />} />
                    <Controller name="nama_pengawas" control={control} render={({ field: { value, onChange, onBlur, }, fieldState: { error } }) =>
                        <Input2Text value={value}
                            error={error != null ? error.message : undefined}
                            onChange={onChange} label="Nama/Tim Pengawas" onBlur={onBlur} placeholder="" containerStyle={{


                            }} />} />
                    <Controller name="jabatan" control={control} render={({ field: { value, onChange, onBlur, }, fieldState: { error } }) =>
                        <Input2Text value={value}
                            error={error != null ? error.message : undefined}
                            onChange={onChange} label="Jabatan" onBlur={onBlur} placeholder="" containerStyle={{


                            }} />} />
                    <Controller name="nomorSurat" control={control} render={({ field: { value, onChange, onBlur, }, fieldState: { error } }) =>
                        <Input2Text value={value}
                            error={error != null ? error.message : undefined}
                            onChange={onChange} label="Nomor Surat" onBlur={onBlur} placeholder="" containerStyle={{


                            }} />} />
                    <Controller name="alamat" control={control} render={({ field: { value, onChange, onBlur, }, fieldState: { error } }) =>
                        <Input2Text lines={10} value={value}
                            error={error != null ? error.message : undefined}
                            onChange={onChange} label="Alamat" onBlur={onBlur} placeholder="" containerStyle={{


                            }} />} />
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: Dimension.fontScale * 15,
                        marginTop: 30
                    }}>

                        B. Kegiatan Pengawasan
                    </Text>
                    <Controller name="bentuk" control={control} render={({ field: { value, onChange, onBlur, }, fieldState: { error } }) =>
                        <Input2Text value={value}
                            error={error != null ? error.message : undefined}
                            onChange={onChange} label="Bentuk" onBlur={onBlur} placeholder="" containerStyle={{


                            }} />} />
                    <Controller name="tujuan" control={control} render={({ field: { value, onChange, onBlur, }, fieldState: { error } }) =>
                        <Input2Text value={value}
                            error={error != null ? error.message : undefined}
                            onChange={onChange} label="Tujuan" onBlur={onBlur} placeholder="" containerStyle={{


                            }} />} />
                    <Controller name="sasaran" control={control} render={({ field: { value, onChange, onBlur, }, fieldState: { error } }) =>
                        <Input2Text value={value}
                            error={error != null ? error.message : undefined}
                            onChange={onChange} label="Sasaran" onBlur={onBlur} placeholder="" containerStyle={{


                            }} />} />
                    <Controller name="waktu_tanggal" control={control} render={({ field: { value, onChange, onBlur, }, fieldState: { error } }) =>
                        <Input2Text value={value}
                            error={error != null ? error.message : undefined}
                            onChange={onChange} label="Waktu Dan Tanggal" onBlur={onBlur} placeholder="" containerStyle={{


                            }} />} />
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: Dimension.fontScale * 15,
                        marginTop: 30
                    }}>
                        C. Uraian Singkat Hasil Pengawasan
                    </Text>
                    <Controller name="uraian" control={control} render={({ field: { value, onChange, onBlur, }, fieldState: { error } }) =>
                        <Input2Text lines={10} value={value}
                            error={error != null ? error.message : undefined}
                            onChange={onChange} label="Uraian" onBlur={onBlur} placeholder="" containerStyle={{


                            }} />} />

                </View>
                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 20
                }}>
                    <TouchableOpacity onPress={handleSubmit(submitData)} style={{
                        width: "60%",
                        marginTop: 20,
                        backgroundColor: "#F44A14",
                        borderRadius: 500,
                        height: Dimension.height * 0.08,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }} >
                        <Text style={{
                            color: "white",
                            fontSize: 15,
                            fontWeight: "bold"
                        }}>Preview</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSubmit(simpanData)} style={{
                        width: "60%",
                        marginTop: 20,
                        backgroundColor: "#F44A14",
                        borderRadius: 500,
                        height: Dimension.height * 0.08,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }} >
                        <Text style={{
                            color: "white",
                            fontSize: 15,
                            fontWeight: "bold"
                        }}>Kirim</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}