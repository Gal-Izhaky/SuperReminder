// External imports
import React, { useState, useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

// Components
import Header from '../../../../ui/components/header/Header';
import ShoppingListsContent from '../components/shoppingListsContent/ShoppingListsContent';
import AddListButton from '../components/addListButton/AddListButton';

// Styles
import styles from "./ShoppingLists.styles";

/**
 * ShoppingLists Component
 * Main screen for displaying and managing shopping lists
 * Acts as container for other components
 */
const ShoppingLists = () => {
    // State for dropdown visibility
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    
    // Translation hook
    const { t } = useTranslation();

    // Focus management
    const isFocused = useIsFocused();

    // Close dropdowns when clicking outside or when screen loses focus
    const closeDropdowns = useCallback(() => {
        if (isDropdownVisible) setDropdownVisible("");
    }, [isDropdownVisible]);

    // Effect to close dropdowns when the component unfocuses
    useFocusEffect(() => {
        if(!isFocused){
            return closeDropdowns;
        }
    });

    return (
        <Pressable onPress={closeDropdowns} 
            style={styles.pressableBackground}>
            <Header title={t('screens.shoppingLists')} />
            <View style={styles.top}>
                {/* Main content area with sort/filter and lists */}
                <ShoppingListsContent 
                    isDropdownVisible={isDropdownVisible}
                    setDropdownVisible={setDropdownVisible}
                />

                {/* Add new list button and confirmation */}
                <AddListButton />
            </View>
        </Pressable>
    );
};

export default ShoppingLists;
