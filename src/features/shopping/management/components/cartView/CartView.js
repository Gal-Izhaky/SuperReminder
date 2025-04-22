// External imports
import { memo, useCallback } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { unixToDate } from '../../../../../utils/DateFunctions';

// Styles and assets
import styles from "./CartView.styles";
import { useTranslation } from 'react-i18next';
import { DeleteButton } from '../../../../../ui/components/button';

/**
 * CartView Component
 * Displays a single shopping list card with edit and delete functionality
 * 
 * @param {Object} list - The shopping list object to display
 * @param {Function} handleDelete - Callback for delete action
 */
const CartView = ({ list, handleDelete }) => {
    const navigation = useNavigation();
    
    // Translation hook
    const { t } = useTranslation();

    // Navigation handler
    const edit = () => {
        const params = {
            listKey: list.key,
        };
        navigation.navigate("editList", params);
    };

    // Utils
    const getDateFormatted = () => {
        const formatted = unixToDate(list.updateTime);

        if (/\d/.test(formatted)) {
            return t(`shoppingLists.lastEdited`, {date: formatted});
        } else {
            return t(`shoppingLists.${formatted}`);
        }
    }

    // Dynamic text calculation
    const amount = list.items.length;
    const amountTxt = amount === 0 
        ? t('shoppingLists.emptyList')
        : amount === 1 
            ? t('shoppingLists.oneItem') 
            : t('shoppingLists.itemCount', { count: amount });
    
    // Render
    return (
        <TouchableOpacity 
            style={[styles.card, styles.shadow]} 
            onPress={edit}
            onPressIn={(e) => e.currentTarget.setNativeProps({ style: { transform: [{ scale: 0.99 }] } })}
            onPressOut={(e) => e.currentTarget.setNativeProps({ style: { transform: [{ scale: 1 }] } })}
            activeOpacity={1}
        >
            {/* List details */}
            <View>
                <Text 
                    style={[styles.right, styles.bold]}
                    numberOfLines={1}
                    adjustsFontSizeToFit={true}
                >
                    {list.name}
                </Text>
                <Text style={[styles.right, styles.text]}>
                    {getDateFormatted()}
                </Text>
                <Text style={[styles.right, styles.text]}>
                    {amountTxt}
                </Text>
            </View>

            {/* Delete button */}
            <DeleteButton onPress={handleDelete} style={{width: 35, height: 35, marginTop: 7}}/>
        </TouchableOpacity>
    );
};

export default memo(CartView, (prevProps, nextProps) => {
    return prevProps.list === nextProps.list;
});