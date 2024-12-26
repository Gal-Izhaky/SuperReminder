import React, { useRef, useEffect, useState } from "react";
import { View, Text, Modal, Animated, TextInput } from "react-native";
import ConfirmButtons from "../ConfirmationButtons/ConfirmationButtons";

import styles from "./Confirmation.styles";

const BTN_TEXTS = {
    del: "מחק",
    add: "הוסף",
};

const Confirmation = ({ visible, onConfirm, onCancel, title, type }) => {
    const slideAnim = useRef(new Animated.Value(-300)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const [internalVisible, setInternalVisible] = useState(visible);
    const [name, setName] = useState("");

    const animateIn = () => {
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const animateOut = () => {
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 300,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setInternalVisible(false);
            slideAnim.setValue(-300);
        });
    };

    useEffect(() => {
        setName("");
        if (visible !== false) {
            setInternalVisible(true);
            animateIn();
        } else {
            animateOut();
        }
    }, [visible]);

    const confirm = () => {
        if (type === "del") {
            onConfirm();
            return;
        }

        if (name === "") {
            return;
        }
        onConfirm(name);
    };

    return (
        <Modal
            transparent
            visible={internalVisible}
            animationType="none"
            onRequestClose={onCancel}>
            <Animated.View style={[styles.center, styles.grayBG, {opacity: opacityAnim}]}>
                <Animated.View
                    style={[styles.content, { transform: [{ translateY: slideAnim}], opacity: opacityAnim }]}>
                    <Text style={styles.title}>{title}</Text>
                    {type === "add" &&
                    <View style={styles.inputContainer}>
                        <TextInput  
                            style={styles.input} 
                            placeholder="שם הרשימה"
                            maxLength={15}
                            onChangeText={(val) => {setName(val)}} 
                            keyboardType="visible-password"
                            underlineColorAndroid="transparent"/>

                        <Text style={styles.charIndicator}>{name.length}/15</Text>
                    </View> 
}
                    <ConfirmButtons 
                        onConfirm={confirm} 
                        onCancel={onCancel} 
                        text={BTN_TEXTS[type]}/>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
};

export default Confirmation;
