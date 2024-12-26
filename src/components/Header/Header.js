import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Or your preferred icon library
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";

import styles from "./Header.styles";

const Header = ({ title, noBack }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.background}>
            <View style={styles.top}>
                {/* Back Button */}
                {noBack ? 
                    <View style={styles.leftIcon} />
                    :
                    <TouchableOpacity style={styles.leftIcon} onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={38} color="black" />
                    </TouchableOpacity>
                }

                {/* Title */}
                <Text style={styles.title}>{title}</Text>

                {/* Hamburger Button */}
                <TouchableOpacity style={styles.rightIcon} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                    <Icon name="menu" size={38} color="black" />
                </TouchableOpacity>

                {/* Horizontal Rule */}
            </View>
            <View style={styles.horizontalRule} />
        </View>
    );
};

export default Header;
