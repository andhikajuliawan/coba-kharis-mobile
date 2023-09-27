import { useNavigation } from "@react-navigation/native";
import { Text, View } from "native-base"
import LinearGradient from "react-native-linear-gradient";
import { ScaledSheet, scale } from 'react-native-size-matters';

// SVG
import Back from '../../../assets/icons/Header/Back.svg';
import { TouchableOpacity } from "react-native";

const Header = () => {
    const navigation = useNavigation();

    return (<LinearGradient colors={['#3E3E3E', '#00000000']}>
        <View style={styles.container}>
            <View style={styles.space1}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Back width={scale(28)} height={scale(28)} />
                </TouchableOpacity>

            </View>
        </View>
    </ LinearGradient>)
}
const styles = ScaledSheet.create({
    space1: {
        flexDirection: 'row',

    },

    container: {
        // height: scale(68),
        marginVertical: scale(10),
        backgroundColor: 'transparent',
        alignItems: 'center',
        marginHorizontal: scale(15),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        color: '#002A47',
        fontWeight: 'bold',
        fontSize: 25,
        marginLeft: 10
    }
});
export default Header