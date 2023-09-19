import { StyleSheet, Text, View } from "react-native";
import Header from "../../Component/EventList/Header";

const EventListScreen = ({ route }) => {


    return (
        <View>
            <Header />
            <Text>EventListScreen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
});

export default EventListScreen;