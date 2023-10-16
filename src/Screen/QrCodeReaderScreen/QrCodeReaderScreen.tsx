import { Box, Divider, ScrollView, Text } from "native-base";

import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from "react-native";

const QrCodeReaderScreen = () => {
    const navigation = useNavigation();

    const Header = () => {
        return (
            <>
                <Box bgColor="#fff" px={5} py={5}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text>Back</Text>
                    </TouchableOpacity>
                </Box>
                <Divider />
            </>


        )
    }

    return (
        <ScrollView>
            <Header />
            <Text>Halaman QrCodeReaderScreen</Text>
        </ScrollView>
    )

}
export default QrCodeReaderScreen;