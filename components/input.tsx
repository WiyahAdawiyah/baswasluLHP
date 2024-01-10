import { useRef, useState } from "react";
import { Pressable, StyleProp, Text, TextInput, TextStyle, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { Feather } from '@expo/vector-icons';

export default function InputText({ value, containerStyle,error, onBlur,onChange, placeholder, inputStyle, trailIcon, headerIcon, containerStyle2, isPassword }: {
    inputStyle?: StyleProp<TextStyle>, onChange?: any,
    value: string,  containerStyle2?: StyleProp<ViewStyle>,containerStyle?: StyleProp<ViewStyle>, label?: string,
    placeholder: string, onBlur? : any,isPassword?: boolean, trailIcon?: any, headerIcon?: any, error? : string
}) {
    const [showPassword, setShowPassword] = useState(isPassword != null ? true : false)
    const inputRef = useRef<TextInput>(null)
    return (
        <View style={{
            alignItems: "center",
            //@ts-ignore
            ...containerStyle2
        }}>
            <Pressable style={{
                backgroundColor: "white",
                borderRadius: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderColor : "red",
                borderWidth :error != null ?  2 : 0,
               
                //@ts-ignore
                ...containerStyle,
            }} onPress={() =>{
                inputRef.current?.focus()
            }} >
                <TextInput ref={inputRef} placeholder={placeholder} style={{
                    paddingVertical: 10,
                    marginHorizontal: 10,
                    maxWidth :"75%",
                    minWidth : "75%",

                    //@ts-ignore
                    ...inputStyle
                }} value={value} onBlur={onBlur} secureTextEntry={showPassword} onChangeText={onChange} />
                {
                    isPassword != null ? <TouchableOpacity style={{
                        alignItems :"center",
                        justifyContent :"center",
                        width :"20%",
                    }} onPress={() => {
                        setShowPassword(el => !el)
                    }}>
                        {
                            showPassword ? <Feather name="eye-off" size={24} color="black" /> :  <Feather name="eye" size={24} color="black" />
                        }
                        
                    </TouchableOpacity> : <View style={{
                        alignItems :"center",
                        justifyContent :"center",
                        width :"20%",
                    }}>
                    {
                        trailIcon 
                    }
                    </View>
                }
               
            </Pressable>
            {
                error != null && <Text style={{
                    color :"red"
                }}>{error}</Text>
            }
            
        </View>
    )
}