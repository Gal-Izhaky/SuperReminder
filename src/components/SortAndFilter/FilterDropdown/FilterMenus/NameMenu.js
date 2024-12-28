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
import globalstyles from "../../../../theme/globalstyles";
const refreshImage = require("../../../../assets/images/refresh.png");

/**
 * NameMenu Component
 * Provides an input field for list name with character limit and reset functionality
 *
 * @param {string} name - Current name value
 * @param {Function} setName - Callback to update name value
 */
const NameMenu = ({ name, setName }) => {
    return (
        <>
            {/* Name input container */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="שם הרשימה"
                    maxLength={15}
                    value={name}
                    onChangeText={setName}
                    keyboardType="visible-password"
                    underlineColorAndroid="transparent"
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
            >
                <Image style={styles.refreshIcon} source={refreshImage} />
            </TouchableOpacity>
        </>
    );
};

// Styles
const styles = StyleSheet.create({
    inputContainer: {
        width: "92%",
        height: 50,
        marginTop: 15,
        padding: 13,
        ...globalstyles.input,
    },
    input: {
        textAlign: "right",
        fontSize: 18,
    },
    charIndicator: {
        ...globalstyles.charIndicator,
        fontSize: 14,
    },
    refreshIcon: {
        width: 23,
        height: 23,
    },
    refreshName: {
        marginRight: 11,
        marginTop: 5,
        alignSelf: "flex-end",
    },
});

export default NameMenu;
