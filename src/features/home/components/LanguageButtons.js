// React imports
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import i18n from "../../../i18n/i18next";

// Theme imports
import constants from '../../../theme/constants';
import colors from '../../../theme/colors';

const LanguageButtons = ({ t }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => {i18n.changeLanguage("he")}}>
                <Text style={styles.title}>עברית</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => {i18n.changeLanguage("en")}}>
                <Text style={styles.title}>English</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: constants.layout.flex.direction.row,
        justifyContent: constants.layout.align.center,
        alignItems: constants.layout.align.center,
        padding: constants.spacing.mediumSmall,
    },
    button: {
        marginHorizontal: constants.spacing.mediumSmall,
        marginTop: -constants.spacing.mediumSmall,
        padding: constants.spacing.small,
    },
    title: {
        fontSize: constants.typography.size.large,
        fontWeight: constants.typography.weight.bold,
        color: colors.text,
    }
});

export default LanguageButtons;
