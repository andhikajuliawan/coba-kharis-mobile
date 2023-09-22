/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
    View, Text, TouchableOpacity, ImageBackground
} from 'react-native';

// SVG
import Back from '../../../assets/icons/Header/BackBlue.svg';
import Search from '../../../../assets/icons/EvenList/Header/Search.svg';
import Notification from '../../../../assets/icons/EvenList/Header/Notification.svg';
import Setting from '../../../../assets/icons/EvenList/Header/Setting.svg';

import { ScaledSheet } from 'react-native-size-matters';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';



const Header = () => {
    const navigation = useNavigation();


    return (
        <View style={styles.container}>
            <View style={styles.space1}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Back width={scale(28)} height={scale(28)} />
                </TouchableOpacity>

            </View>

            <View style={styles.space2}>
                {/* <Search width={scale(28)} height={scale(28) />
                    <Notification width={scale(28)} height={scale(28)} />
                    <Setting width={scale(28)} height={scale(28)} /> */}
            </View>
        </View>


    );
};

const styles = ScaledSheet.create({
    space1: {
        flexDirection: 'row',

    },

    space2: {
        flexDirection: 'row',
        width: scale(110),
        justifyContent: 'space-between',
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

export default Header;
