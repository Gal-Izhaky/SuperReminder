// External imports
import React, { memo, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, DrawerActions, useNavigationState } from "@react-navigation/native";

// Styles
import styles from "./Header.styles";
import IconButton from "../button/iconButton/IconButton";
import { BackButton, MenuButton } from "../button";

/**
 * Header Component
 * Displays a navigation header with back button, title, and drawer menu
 *
 * @param {string} title - The title to display in the header
 */
const Header = ({ title }) => {
    // Hooks
    const navigation = useNavigation();
    
    // Subscribe to navigation state changes
    const navigationHistory = useNavigationState(state => state.history);
    const canGoBack = 
        navigationHistory.length > 1 && // Not only 1 screen
        navigationHistory[navigationHistory.length - 1].type !== "drawer"; // Not a drawer screen

     // Navigation handlers
    const handleBackPress = useCallback(() => {
        if (canGoBack) {
            navigation.goBack();
        } else {
            navigation.navigate("homeScreen");
        }
    }, [canGoBack, navigation]);

    const handleDrawerToggle = useCallback(() => {
        navigation.dispatch(DrawerActions.toggleDrawer())
    }, [navigation]);

    // Render
    return (
        <View style={styles.background}>
            <View style={styles.top}>
                {/* Back Button or empty space */}
                <BackButton onPress={handleBackPress} enabled={canGoBack} />

                {/* Header Title */}
                <Text style={styles.title}>{title}</Text>

                {/* Drawer Menu Button */}
                <MenuButton onPress={handleDrawerToggle} />
            </View>

            {/* Divider Line */}
            <View style={styles.horizontalRule} />
        </View>
    );
};

export default memo(Header);
