// External imports
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Internal imports
import Header from "../../components/Header/Header";
import styles from "./HomeScreen.styles";

/**
 * HomeScreen Component
 * Main navigation hub for the application
 * Displays main menu options including shopping lists and product scanning
 */
const HomeScreen = () => {
    // Navigation setup
    const navigation = useNavigation();

    /**
     * Navigation handler
     * @param {string} destination - Screen name to navigate to
     * @returns {Function} Navigation function
     */
    const navigate = (destination) => () => {
        navigation.navigate(destination);
    };

    // Render
    return (
        <>
            {/* Header Section */}
            <Header title={"מסך הבית"} noBack={true} />

            {/* Main Content */}
            <View style={styles.container}>
                {/* App Title */}
                <Text style={styles.appName}>Super Reminder</Text>

                {/* Navigation Buttons */}
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
