import { Text, TouchableOpacity, View, Image } from "react-native";
import styles from "./DropdownButton.styles";

const DropdownButton = ({ config }) => {
    const { text, icon, toggleFunction } = config;

    return (
        <TouchableOpacity
            style={[styles.container, styles.button]}
            onPress={toggleFunction}
            activeOpacity={1}>
                
            <View style={styles.buttonContainer}>
                <Image style={styles.icon} source={icon} />

                <Text style={styles.text}> {text} </Text>
            </View>
        </TouchableOpacity>
    );
};

export default DropdownButton;
