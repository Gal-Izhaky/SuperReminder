import { View, TouchableOpacity, Text } from "react-native"
import styles from "./ConfirmationButtons.styles"

const ConfirmButtons = ( { onCancel, onConfirm, text }) => {
    return <View style={styles.container}>
        <TouchableOpacity
            style={styles.button}
            onPress={onConfirm}
            activeOpacity={1}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={onCancel}
            activeOpacity={1}
        >
            <Text style={styles.buttonText}>בטל</Text>
        </TouchableOpacity>
    </View>
}

export default ConfirmButtons