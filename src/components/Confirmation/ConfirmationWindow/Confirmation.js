// External imports
import React, { useRef, useEffect, useState } from "react";
import { View, Text, Modal, Animated, TextInput } from "react-native";

// Internal components
import ConfirmButtons from "../ConfirmationButtons/ConfirmationButtons";
import SearchBar from "../../SearchBar/SearchBar";
import ChooseAmount from "../../ChooseAmount/ChooseAmount";

// Styles
import styles from "./Confirmation.styles";

// Constants
const BTN_TEXTS = {
    del: "מחק",
    add: "הוסף", 
    addItem: "הוסף",
};

const DEFAULT_UNIT = "יח'";
const WEIGHTED_UNITS = ["100 גרם", '100 מ"ל'];

/**
 * Confirmation Component
 * Modal window for confirming various actions with animation
 *
 * @param {boolean} visible - Controls modal visibility
 * @param {Function} onConfirm - Callback for confirmation
 * @param {Function} onCancel - Callback for cancellation
 * @param {string} title - Modal title
 * @param {string} type - Type of confirmation ('del', 'add', or 'addItem')
 */
const Confirmation = ({ visible, onConfirm, onCancel, title, type, itemAmount }) => {
    // State management
    const [internalVisible, setInternalVisible] = useState(visible);
    const [name, setName] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedAmount, setSelectedAmount] = useState(1);

    // Unit calculations if type is addItem
    const unitCalcResults = {
        step: 0,
        maxAmount: 0,
        finalUnit: "",
        weighted: false,
    }
    if(type === "addItem"){
        const unit = selectedItem?.measurementUnit.replace('ק"ג', "100 גרם").replace("ליטר", '100 מ"ל');
        const weighted = selectedItem?.weighted && WEIGHTED_UNITS.includes(unit);
        
        const finalUnit = weighted ? unit.replace("100 ", "") : DEFAULT_UNIT;

        unitCalcResults.step = weighted ? 100 : 1;
        unitCalcResults.maxAmount = finalUnit == "יח'" ? 10000 : 100000;
        unitCalcResults.finalUnit = finalUnit;
        unitCalcResults.weighted = weighted;
    }

    // Animation refs
    const slideAnim = useRef(new Animated.Value(-300)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    // Animation handlers
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

    // Effects
    useEffect(() => {
        if (visible !== false) {
            // Reset state and animate in
            setSelectedItem(null);
            setName("");
            setInternalVisible(true);
            animateIn();
        } else {
            // Animate out when hiding
            animateOut();
        }
    }, [visible]);

    // Event handlers
    const confirm = () => {
        // Handle different confirmation types
        if (type === "del") {
            onConfirm();
            return;
        }
        
        if (type === "addItem") {
            const finalAmount = Math.max(0, Math.min(selectedAmount, unitCalcResults.maxAmount - itemAmount(selectedItem.key)))

            onConfirm(selectedItem.key, finalAmount);
            return;
        }

        // Validate and confirm for add type
        if (name.trim() === "") return;
        onConfirm(name);
    };

    const itemSelected = (item) => {
        setSelectedItem(item);
    };

    // Render
    return (
        <Modal
            transparent
            visible={internalVisible}
            animationType="none"
            onRequestClose={onCancel}
        >
            <Animated.View
                style={[styles.center, styles.grayBG, { opacity: opacityAnim }]}
            >
                <Animated.View
                    style={[
                        styles.content,
                        {
                            transform: [{ translateY: slideAnim }],
                            opacity: opacityAnim,
                        },
                    ]}
                >
                    <Text style={styles.title}>{title}</Text>

                    {/* Conditional content based on type */}
                    {type === "add" ? (
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="שם הרשימה"
                                maxLength={15}
                                onChangeText={setName}
                                keyboardType="visible-password"
                                underlineColorAndroid="transparent"
                            />
                            <Text style={styles.charIndicator}>
                                {name.length}/15
                            </Text>
                        </View>
                    ) : type === "addItem" ? (
                        <>
                            <Text style={styles.itemPropertyText}>
                                שם המוצר
                            </Text>
                            <SearchBar onSelect={itemSelected} />
                            {selectedItem ? (
                                <>
                                    <Text style={styles.itemPropertyText}>
                                        כמות
                                    </Text>
                                    <ChooseAmount 
                                        unitCalcResults={unitCalcResults}
                                        item={selectedItem} 
                                        onAmountChange={setSelectedAmount}
                                    />
                                </>
                            ) : (
                                <Text style={styles.notYetSelected}>
                                    אנא בחר מוצר
                                </Text>
                            )}
                        </>
                    ) : null}

                    <ConfirmButtons
                        onConfirm={confirm}
                        onCancel={onCancel}
                        text={BTN_TEXTS[type]}
                    />
                </Animated.View>
            </Animated.View>
        </Modal>
    );
};

export default Confirmation;