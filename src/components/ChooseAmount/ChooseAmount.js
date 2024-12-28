// External imports
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Keyboard,
    Image,
} from "react-native";

// Styles and assets
import styles from "./ChooseAmount.styles";
const plusIcon = require("../../assets/images/plus.png");
const minusIcon = require("../../assets/images/minus.png");

/**
 * ChooseAmount Component
 * Allows users to select an amount with increment/decrement buttons
 *
 * @param {Function} onAmountChange - Callback when amount changes
 * @param {Object} item - Item containing amount and measurement details
 * @param {boolean} displayReset - Whether to show reset button
 * @param {boolean} small - Whether to use small styling
 */
const ChooseAmount = ({ onAmountChange, item, unitCalcResults, displayReset = true, small = false }) => {
    const { step, maxAmount, finalUnit, weighted } = unitCalcResults;

    // State management
    const [isEditing, setIsEditing] = useState(false);
    const [amount, setAmount] = useState(item.amount || step);

    const [editAmount, setEditAmount] = useState(amount.toString());
    const [amountText, setAmountText] = useState(amount.toString());
    const [unitText, setUnitText] = useState(finalUnit);

    // Handlers
    const handleIncrement = () => {
        const newAmount = amount + step;
        setAmount(Math.max(step, Math.min(maxAmount, newAmount)));
    };

    const handleDecrement = () => {
        if (amount > step) {
            const newAmount = amount - step;
            setAmount(Math.max(step, Math.min(maxAmount, newAmount)));
        }
    };

    const handleReset = () => {
        setAmount(item.amount || step);
        Keyboard.dismiss();
    };

    const changeEditAmount = (text) => {
        const numericValue = text.replace(/[^0-9]/g, "");
        setEditAmount(numericValue);
        const newAmount = Math.max(
            step,
            Math.min(maxAmount, parseInt(numericValue) || step)
        );
        setAmount(newAmount);
    };

    // Effects
    useEffect(() => {
        setAmount(item.amount || step);
    }, [item]);

    useEffect(() => {
        // Update display text based on weight units
        if (weighted && amount >= 1000) {
            setAmountText((amount / 1000).toString());
            setUnitText(finalUnit.replace("גרם", 'ק"ג').replace('מ"ל', "ליטר"));
        } else {
            setAmountText(amount.toString());
            setUnitText(finalUnit);
        }

        // Sync edit amount when not editing
        if (!isEditing) {
            setEditAmount(amount.toString());
        }

        // Notify parent of changes
        if (amount !== item.amount) {
            onAmountChange(amount);
        }
    }, [amount, isEditing]);

    // Render
    return (
        <View style={styles.container}>
            <View style={styles.amountContainer}>
                {/* Decrement button */}
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={[
                        small ? styles.buttonSmall : styles.button,
                        !isEditing && amount === step
                            ? styles.disabledButton
                            : null,
                    ]}
                    onPress={handleDecrement}
                >
                    <Image
                        style={[
                            styles.plusMinusIcon,
                            small ? styles.plusMinusIconSmall : null,
                        ]}
                        source={minusIcon}
                    />
                </TouchableOpacity>

                {/* Amount display/input */}
                {isEditing ? (
                    <TextInput
                        style={[
                            small ? styles.inputSmall : styles.input,
                            styles.amountText,
                            small ? styles.amountTextSmall : null,
                        ]}
                        keyboardType="number-pad"
                        value={editAmount}
                        onChangeText={changeEditAmount}
                        onBlur={() => setIsEditing(false)}
                        autoFocus
                    />
                ) : (
                    <TouchableOpacity onPress={() => setIsEditing(true)}>
                        <Text
                            adjustsFontSizeToFit={true}
                            style={[
                                styles.amountText,
                                small ? styles.amountTextSmall : null,
                            ]}
                        >
                            {`${amountText} ${unitText}`}
                        </Text>
                    </TouchableOpacity>
                )}

                {/* Increment button */}
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={[
                        small ? styles.buttonSmall : styles.button,
                        !isEditing && amount === 100000
                            ? styles.disabledButton
                            : null,
                    ]}
                    onPress={handleIncrement}
                >
                    <Image
                        style={[
                            styles.plusMinusIcon,
                            small ? styles.plusMinusIconSmall : null,
                        ]}
                        source={plusIcon}
                    />
                </TouchableOpacity>
            </View>

            {/* Reset button */}
            {displayReset && (
                <TouchableOpacity
                    onPress={handleReset}
                    style={styles.resetButton}
                >
                    <Text style={styles.resetText}>Reset</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default ChooseAmount;
