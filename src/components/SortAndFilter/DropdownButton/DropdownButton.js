// External imports
import { Text, TouchableOpacity, View, Image } from "react-native";

// Styles
import styles from "./DropdownButton.styles";

/**
 * DropdownButton Component
 * Renders a button with an icon and text that triggers a dropdown action
 *
 * @param {Object} config - Configuration object containing:
 * @param {string} config.text - Text to display in the button
 * @param {ImageSourcePropType} config.icon - Icon to display in the button
 * @param {Function} config.toggleFunction - Callback function when button is pressed
 */
const DropdownButton = ({ config }) => {
    const { text, icon, toggleFunction } = config;

    return (
        <TouchableOpacity
            style={[styles.container, styles.button]}
            onPress={toggleFunction}
            activeOpacity={1}
        >
            <View style={styles.buttonContainer}>
                <Image style={styles.icon} source={icon} />
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default DropdownButton;
