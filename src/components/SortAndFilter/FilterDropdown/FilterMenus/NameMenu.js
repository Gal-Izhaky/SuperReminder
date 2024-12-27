import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import globalstyles from '../../../../theme/globalstyles';

const NameMenu = (name, setName) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="שם הרשימה"
                maxLength={15}
                value={name}
                onChangeText={(val) => {
                    setName(val);
                }}
                keyboardType="visible-password"
                underlineColorAndroid="transparent"
            />

            <Text style={styles.charIndicator}>{name.length}/15</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        width: "92%",
        height: 50,
        marginTop: 15,
        padding:13,
        ...globalstyles.input
    },
    input: {
        textAlign: "right",
        fontSize: 18,
    },
    charIndicator: {
        ...globalstyles.charIndicator,
        fontSize: 14,
    },
});

export default NameMenu;