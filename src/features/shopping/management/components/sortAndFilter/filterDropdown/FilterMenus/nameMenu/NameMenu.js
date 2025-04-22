// External imports
import React from "react";
import { 
    Image, 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View 
} from "react-native";

// Styles and assets
const refreshImage = require("../../../../../../../../assets/images/refresh.png");

import styles from "./NameMenu.styles"
import { useTranslation } from "react-i18next";

/**
 * NameMenu Component
 * Provides an input field for list name with character limit and reset functionality
 *
 * @param {string} name - Current name value
 * @param {Function} setName - Callback to update name value
 */
const NameMenu = ({ name, setName }) => {
    // Translation hook
    const { t } = useTranslation();
    
    return (
        <>
            {/* Name input container */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={t('shoppingLists.filterByNameSearchPlaceholder')}
                    maxLength={15}
                    value={name}
                    onChangeText={setName}
                    keyboardType="visible-password"
                    underlineColorAndroid="transparent"
                    numberOfLines={1}
                />
                
                {/* Character count indicator */}
                <Text style={styles.charIndicator}>
                    {name.length}/15
                </Text>
            </View>

            {/* Reset button */}
            <TouchableOpacity
                activeOpacity={1}
                style={styles.refreshName}
                onPress={() => setName("")}
                onPressIn={(e) => e.currentTarget.setNativeProps({ style: { transform: [{ scale: 0.9 }] } })}
                onPressOut={(e) => e.currentTarget.setNativeProps({ style: { transform: [{ scale: 1 }] } })}
            >
                <Image 
                    style={styles.refreshIcon} 
                    source={refreshImage} 
                />            
            </TouchableOpacity>
        </>
    );
};

export default NameMenu;
