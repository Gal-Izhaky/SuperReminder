import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Keyboard, Image } from 'react-native';
import styles from './ChooseAmount.styles';

const plusIcon = require('../../assets/images/plus.png');
const minusIcon = require('../../assets/images/minus.png');

const ChooseAmount = ({ initialAmount = 1, onAmountChange }) => {
    const [amount, setAmount] = useState(initialAmount);
    const [isEditing, setIsEditing] = useState(false);

    const handleIncrement = () => {
        setAmount(prev => prev + 1);
        onAmountChange(amount + 1);
    };

    const handleDecrement = () => {
        if (amount > 1) {
            setAmount(prev => prev - 1);
            onAmountChange(amount - 1);
        }
    };

    const handleReset = () => {
        setAmount(initialAmount);
        Keyboard.dismiss();
        onAmountChange(initialAmount);
    };

    const handleAmountInput = (text) => {
        const numericValue = text.replace(/[^0-9]/g, "");

        const newAmount = parseInt(numericValue) || 1;
        if (newAmount >= 1) {
            setAmount(newAmount);
            onAmountChange(newAmount);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.amountContainer}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={[styles.button, amount === 1 ? styles.disabledButton : null]}
                    onPress={handleDecrement}>
                                                
                    <Image style={[styles.plusMinusIcon, styles.minusIcon]} source={minusIcon}/>
                </TouchableOpacity>
                    {isEditing ? (
                        <TextInput
                            style={styles.input}
                            keyboardType="number-pad"

                            value={amount.toString()}
                            onChangeText={handleAmountInput}
                            onBlur={() => setIsEditing(false)}
                            autoFocus
                        />
                ) : (
                    <TouchableOpacity onPress={() => setIsEditing(true)}>
                        <Text style={styles.amountText}>{amount}</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.button}
                    onPress={handleIncrement}>
                                          
                    <Image style={styles.plusMinusIcon} source={plusIcon}/>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={handleReset}
                style={styles.resetButton}>
                    
                <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ChooseAmount;