import React from "react";
import { TouchableOpacity, Text } from "react-native";

import styles from "./textButton.styles";
import globalstyles from "../../../../theme/globalstyles";

/**
 * Reusable Button Component
 * Text-only button with consistent styling
 *
 * @param {string} text - The button text
 * @param {function} onPress - Function to call when button is pressed
 * @param {Object} style - Optional custom styles for button container
 * @param {Object} textStyle - Optional custom styles for button text
 * @param {string} variant - Button color variant: 'primary', 'secondary' or 'tertiary'
 * @param {string} size - Button size: 'small', 'medium', or 'large'
 */
const TextButton = ({
    text,
    onPress,
    style,
    textStyle,
    variant = "tertiary",
    size = "medium",
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                globalstyles.shadow,
                styles[`${variant}Button`],
                styles[`${size}Button`],
                style, 
            ]}
            onPress={onPress}
            activeOpacity={0.9}
            onPressIn={(e) => e.currentTarget.setNativeProps({ style: { transform: [{ scale: 0.9 }] } })}
            onPressOut={(e) => e.currentTarget.setNativeProps({ style: { transform: [{ scale: 1 }] } })}
        >
            <Text style={[styles.text, styles[`${size}Text`], textStyle]}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};


export default TextButton;
