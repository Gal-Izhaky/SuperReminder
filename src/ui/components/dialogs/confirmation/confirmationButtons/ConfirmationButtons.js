import { View, TouchableOpacity, Text } from "react-native"
import styles from "./ConfirmationButtons.styles"
import { ModalButton } from "../../../button"

const ConfirmButtons = ( { onCancel, onConfirm, text, text2 }) => {

    return <View style={styles.container}>
        {/* <TouchableOpacity
            style={[styles.button]}            
            onPress={onConfirm}
            activeOpacity={1}
            onPressIn={(e) => e.currentTarget.setNativeProps({ style: { transform: [{ scale: 0.9 }] } })}
            onPressOut={(e) => e.currentTarget.setNativeProps({ style: { transform: [{ scale: 1 }] } })}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity> */}
        {/* Confirm button */}
        <ModalButton
            text={text}
            onPress={onConfirm}
            style={styles.button}
        />

        {/* Cancel button */}
        <ModalButton
            text={text2}
            onPress={onCancel}
            style={styles.button}
        />
    </View>
}

export default ConfirmButtons