import React from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import globalstyles from "../../../../theme/globalstyles";

const refreshImage = require("../../../../assets/images/refresh.png");

const NameMenu = ({ name, setName }) => {
    return (
        <>
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
            <TouchableOpacity
                activeOpacity={1}
                style={styles.refreshName}
                onPress={() => setName("")}>
                    
                <Image style={styles.refreshIcon} source={refreshImage} />
            </TouchableOpacity>
        </>
    );
};

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
