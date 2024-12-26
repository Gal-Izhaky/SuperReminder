import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

// styles
import styles from "./HomeScreen.styles";
import Header from "../../components/Header/Header";

const HomeScreen = () => {
    const navigation = useNavigation();

    const navigate = (destination) => () => {
        console.log(destination);
        navigation.navigate(destination);
    };

    return (
        <>
            <Header title={"מסך הבית"} noBack={true} />
            <View style={styles.container}>
                <Text style={styles.appName}>Super Reminder</Text>

                <TouchableOpacity
                    style={[styles.button, styles.shoppingListButton]}
                    activeOpacity={0.9}
                    onPress={navigate("הרשימות שלך")}
                >
                    <Text style={styles.buttonText}>רשימות</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.scanButton]}
                    activeOpacity={0.9}
                    onPress={navigate("סריקת מוצר")}
                >
                    <Text style={styles.buttonText}>לסריקת מוצר</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default HomeScreen;
