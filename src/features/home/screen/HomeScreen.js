// External imports
import { View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Internal imports
import Header from "../../../ui/components/header/Header";
import styles from "./HomeScreen.styles";
import { useTranslation } from "react-i18next";
import { HomeNavButtons } from "../components/HomeNavButtons";
import LanguageButtons from "../components/LanguageButtons";

const logo = require("../../../assets/images/logo.png");

/**
 * HomeScreen Component
 * Main navigation hub for the application
 * Displays main menu options including shopping lists and product scanning
 */
const HomeScreen = () => {
    // Navigation hook
    const navigation = useNavigation();

    // Translation hook
    const {t} = useTranslation();

    // Render
    return (
        <>
            {/* Header Section */}
            <Header title={t('screens.homeScreen')} />

            {/* Main Content */}
            <View style={styles.container}>
                {/* Language Selection Buttons */}
                <LanguageButtons t={t} />


                {/* App Title */}
                <Image source={logo} style={styles.logo} />

                {/* Navigation Buttons */}
                <HomeNavButtons navigation={navigation} t={t}/>
            </View>
        </>
    );
};

export default HomeScreen;
