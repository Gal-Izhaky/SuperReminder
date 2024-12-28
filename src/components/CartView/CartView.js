// External imports
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Styles and assets
import styles from "./CartView.styles";
const delete_image = require("../../assets/images/delete.png");

/**
 * CartView Component
 * Displays a single shopping list card with edit and delete functionality
 * 
 * @param {Object} list - The shopping list object to display
 * @param {Function} handleDelete - Callback for delete action
 * @param {Function} resetFilters - Callback to reset filters after navigation
 */
const CartView = ({ list, handleDelete, resetFilters }) => {
    const navigation = useNavigation();
    
    // Navigation handler
    const edit = () => {
        const params = {
            listKey: list.key,
        };
        navigation.navigate("עריכת רשימה", params);
        setTimeout(resetFilters, 250); // wait for transition animation to finish
    };

    // Utility functions
    const unixToDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = String(date.getDate());
        const month = String(date.getMonth() + 1);
        const year = String(date.getFullYear());
        return `${day}/${month}/${year}`;
    };

    // Dynamic text calculation
    const amount = list.items.length;
    const amountTxt = amount === 0 
        ? "רשימה ריקה" 
        : amount === 1 
            ? "מוצר אחד" 
            : `${amount} מוצרים`;

    // Render
    return (
        <TouchableOpacity 
            style={[styles.card, styles.shadow]} 
            onPress={edit}
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
                    נערך: {unixToDate(list.updateTime)}
                </Text>
                <Text style={[styles.right, styles.text]}>
                    {amountTxt}
                </Text>
            </View>

            {/* Delete button */}
            <TouchableOpacity 
                onPress={handleDelete}
                activeOpacity={1}
            >
                <Image
                    style={styles.delete}
                    source={delete_image}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export default CartView;