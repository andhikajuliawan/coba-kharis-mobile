import { Alert, Dimensions, ImageBackground, Linking, TouchableOpacity, useWindowDimensions } from "react-native"
import { Box, Center, Image, HStack, ScrollView, Spinner, Text } from "native-base"
import Dates from '../../../../assets/icons/EventDetail/calendar.svg'
import Location from '../../../../assets/icons/EventDetail/mappin.svg'
import Person from '../../../../assets/icons/EventDetail/person.svg'
import Money from '../../../../assets/icons/EventDetail/giftcard.svg'
import { scale } from 'react-native-size-matters';
import { format } from "date-fns"
import LinearGradient from "react-native-linear-gradient"



const InformasiEvent = ({ nama, dateStart, dateEnd, lokasi, peserta, harga }) => {

    // Date
    let getDateStart = new Date(dateStart);
    let getDateEnd = new Date(dateEnd);
    let formatDateStart = format(getDateStart, "dd");
    let formatDateEnd = format(getDateEnd, "dd MMMM yyyy");
    let displayDate = `${formatDateStart} - ${formatDateEnd}`

    // Harga
    let rupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(harga);


    return (

        <Box my={3} mt={-10} zIndex={1} >
            <LinearGradient colors={['#00000000', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff']}>
                {/* <ImageBackground source={require('../../../../assets/bg/gradientTitle.png')}> */}
                <Box px={5}>
                    <Text fontSize={20} fontWeight="bold" mb={5} mt={10} lineHeight={25}>{nama}</Text>
                    <HStack alignItems="center" >
                        <Dates width={scale(24)} height={scale(24)} />
                        <Text ml={1} fontSize={16} mb={1} >{displayDate}</Text>
                    </HStack>
                    <HStack alignItems="center" >
                        <Location width={scale(24)} height={scale(24)} />
                        <Text ml={1} fontSize={16} mb={1}>{lokasi}</Text>
                    </HStack>
                    <HStack justifyContent="space-between" >
                        <HStack>
                            <Person width={scale(24)} height={scale(24)} />
                            <Text ml={1} fontSize={16} >{peserta} Pasang</Text>
                        </HStack>
                        <HStack>
                            <Money width={scale(24)} height={scale(24)} />
                            <Text ml={1} fontSize={16}>{rupiah}</Text>
                        </HStack>
                    </HStack>
                </Box>
                {/* </ImageBackground> */}
            </LinearGradient>
        </Box >


    )
}
export default InformasiEvent;
