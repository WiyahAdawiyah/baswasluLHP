import { Dimensions, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Dimension = Dimensions.get("window")

export default function Header() {
    return(
        <SafeAreaView style={{
            minHeight: Dimension.height * 0.2,
            // paddingTop :Dimension.height * 0.1,
            backgroundColor: "#E3DC29",
            borderBottomLeftRadius: Dimension.width * 0.3,
            borderBottomRightRadius: Dimension.width * 0.3,
            elevation: 20,
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Image source={require("../assets/loginicon.png")} style={{
                width: "90%",
                height: Dimension.height * 0.2,
                objectFit: "contain"
            }} />
        </SafeAreaView>
    )
}