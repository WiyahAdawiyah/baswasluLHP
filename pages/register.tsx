import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import InputText from "../components/input";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from "@react-navigation/native"
import Header from "../components/header";



const Dimension = Dimensions.get("window")

const ZInput = z.object({
    nama: z.string().min(1, "Tidak Boleh Kosong"),
    email: z.string().email("Harus Email"),
    password: z.string().min(1, "Tidak Boleh Kosong").regex(/^\S*$/, "Tidak boleh ada spasi"),
    repassword: z.string().min(1, "Tidak Boleh Kosong").regex(/^\S*$/, "Tidak boleh ada spasi")
})


type IInput = z.infer<typeof ZInput>


export default function Register() {

    const { control, handleSubmit, setError } = useForm<IInput>({
        resolver: zodResolver(ZInput),
        defaultValues: {
            email: "",
            nama: "",
            password: "",
            repassword: ""
        },
        mode: "onBlur"
    })

    const nav = useNavigation()

    async function submitData(data: IInput) {
        console.log(data)
        if (data.repassword != data.password) {
            setError("repassword", { message: "Password Tidak Sama" })
            return
        }
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: "#EEC811"
        }}>
            <Header />

            <ScrollView style={
                {
                    marginBottom: 20
                }
            }>

                <Text style={{
                    color: "#F44A14",
                    fontSize: 30,
                    fontWeight: "bold",
                    textAlign: "center",
                    paddingTop: Dimension.height * .1
                }}>Register</Text>
                <View style={{
                    marginTop: 20,
                    gap: 20
                }}>
                    <Controller name="nama" control={control} render={({ field: { value, onChange, onBlur, }, fieldState: { error } }) =>
                        <InputText value={value}
                            error={error != null ? error.message : undefined}
                            onChange={onChange} label="" onBlur={onBlur} placeholder="Nama" trailIcon={
                                <MaterialCommunityIcons name="email-outline" size={24} color="black" />} containerStyle={{
                                    width: "70%"

                                }} />} />
                    <Controller name="email" control={control} render={({ field: { value, onChange, onBlur, }, fieldState: { error } }) =>
                        <InputText value={value}
                            error={error != null ? error.message : undefined}
                            onChange={onChange} label="" onBlur={onBlur} placeholder="Email" trailIcon={
                                <MaterialCommunityIcons name="email-outline" size={24} color="black" />} containerStyle={{
                                    width: "70%"

                                }} />} />
                    <Controller name="password" control={control} render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => <InputText onBlur={onBlur} value={value} onChange={onChange}
                        label="" error={error != null ? error.message : undefined} placeholder="Password" containerStyle={{
                            width: "70%"
                        }} isPassword />} />
                    <Controller name="repassword" control={control} render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => <InputText onBlur={onBlur} value={value} onChange={onChange}
                        label="" error={error != null ? error.message : undefined} placeholder="Confirm Password" containerStyle={{
                            width: "70%"
                        }} isPassword />} />


                    <TouchableOpacity style={{
                        backgroundColor: "#F44A14",
                        height: 50,
                        borderRadius: 100,
                        marginHorizontal: "20%",
                        marginTop: "5%",
                        justifyContent: "center",
                        alignItems: "center"
                    }} onPress={handleSubmit(submitData)}>
                        <Text style={{
                            color: "white",
                            fontWeight: "bold"
                        }}>Buat Akun</Text>
                    </TouchableOpacity>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center"
                    }}>
                        <Text style={{
                            color: "grey",
                            fontWeight: "bold"
                        }}>Sudah Mempunyai Akun? </Text>
                        <TouchableOpacity onPress={() => {
                            //@ts-ignore
                            nav.navigate("Login")
                        }}>
                            <Text style={{
                                color: "#F44A14",
                                fontWeight: "bold"
                            }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}