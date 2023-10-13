import React from "react"
import { HStack, ScrollView, Text, Box } from "native-base"
import { scale } from 'react-native-size-matters';

import Back from '../../../../assets/icons/Header/BackBlue.svg';
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


const Header = () => {
    const navigation = useNavigation();


    return (
        <Box mx={3} my={4}>
            <HStack alignItems="center" >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Back width={scale(20)} height={scale(20)} />
                </TouchableOpacity>
                <Text fontSize={20} fontWeight="medium" ml={3} color="#002A48">CheckOut</Text>
            </HStack>
        </Box>
    )
}
export default Header