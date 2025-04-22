// External imports
import React, { useState, useEffect, useRef, useCallback, memo } from "react";
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
import { useTranslation } from "react-i18next";
const plusIcon = require("../../../../assets/images/plus.png");
const minusIcon = require("../../../../assets/images/minus.png");

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
    // Translation hook
    const { t } = useTranslation();
    
    // Extract calculation values
    const { step, maxAmount, finalUnit, weighted } = unitCalcResults;
    
    // State management
    const [amount, setAmount] = useState(item.amount || step);
    const [isEditing, setIsEditing] = useState(false);
    const [editAmount, setEditAmount] = useState(amount.toString());
    const [amountText, setAmountText] = useState(amount.toString());
    const [unitText, setUnitText] = useState(finalUnit);
    
    // Refs for tracking updates and timers
    const isMounted = useRef(true);
    const timerRef = useRef(null);
    const latestAmountRef = useRef(amount); // Track latest amount for sync purposes
    
    // Immediately update latestAmountRef whenever amount changes
    useEffect(() => {
        latestAmountRef.current = amount;
    }, [amount]);
    
    // Synchronize with parent item changes
    useEffect(() => {
        setAmount(item.amount || step);
    }, [item, step]);
    
    // Cleanup on unmount
    useEffect(() => {
        return () => {
            isMounted.current = false;
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);
    
    // Effect for syncing parent and updating display
    useEffect(() => {
        if (!isMounted.current) return;
        
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
        
        // Clear any pending timeouts
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        
        // Create a new timeout for the update
        timerRef.current = setTimeout(() => {
            if (isMounted.current && amount !== item.amount) {
                onAmountChange(amount);
            }
        }, 50);
        
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [amount, isEditing, item.amount, finalUnit, weighted, onAmountChange]);
    
    // Event Handlers
    const handleIncrement = useCallback(() => {
        setAmount(prev => Math.min(maxAmount, prev + step));
    }, [maxAmount, step]);
    
    const handleDecrement = useCallback(() => {
        setAmount(prev => Math.max(step, prev - step));
    }, [step]);
    
    const handleReset = useCallback(() => {
        // Cancel any pending updates
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        
        // Set amount to item.amount or step
        const resetValue = item.amount || step;
        setAmount(resetValue);
        
        // IMMEDIATELY notify parent to avoid race condition
        onAmountChange(resetValue);
        
        Keyboard.dismiss();
    }, [item.amount, step, onAmountChange]);
    
    const changeEditAmount = useCallback((text) => {
        const numericValue = text.replace(/[^0-9]/g, "");
        setEditAmount(numericValue);
        const newAmount = Math.max(
            step,
            Math.min(maxAmount, parseInt(numericValue) || step)
        );
        setAmount(newAmount);
    }, [step, maxAmount]);

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
                    onPressIn={(e) => e.currentTarget.setNativeProps({ style: { transform: [{ scale: 0.9 }] } })}
                    onPressOut={(e) => e.currentTarget.setNativeProps({ style: { transform: [{ scale: 1 }] } })}
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
                            {`${amountText} ${t(`units.${unitText}`)}`}
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
                    onPressIn={(e) => e.currentTarget.setNativeProps({ style: { transform: [{ scale: 0.9 }] } })}
                    onPressOut={(e) => e.currentTarget.setNativeProps({ style: { transform: [{ scale: 1 }] } })}
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

export default memo(ChooseAmount, (prev, next) => {
    // Only re-render if these props change
    return prev.item.amount === next.item.amount && 
           prev.item.key === next.item.key &&
           prev.unitCalcResults === next.unitCalcResults;
});
