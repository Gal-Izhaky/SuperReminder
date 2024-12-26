import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from "./CartView.styles"

const delete_image  = require("../../assets/images/delete.png") 

const CartView = ({ list, handleDelete }) => {
    const navigation = useNavigation();

    const edit = () => {
        params = {
            list: list
        }
        navigation.navigate("עריכת רשימה", params)
    }

    const unixToDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = String(date.getDate()); // Get day and pad with zero if needed
        const month = String(date.getMonth() + 1); // Get month (0-indexed) and pad
        const year = String(date.getFullYear()); // Get last two digits of the year
        return `${day}/${month}/${year}`; // Return formatted date
    }

    const amount = list.items.length
    const amountTxt =  amount === 0 ? "רשימה ריקה" : amount === 1 ? "מוצר אחד" : `${amount} מוצרים`

    return <TouchableOpacity 
        style={[styles.card, styles.shadow]} 
        onPress={edit}
        activeOpacity={1}>
            
        <View>
            <Text style={[styles.right, styles.bold]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                >
                
                {list.name}
            </Text>
            <Text style={[styles.right, styles.text]}>נערך: {unixToDate(list.updateTime)}</Text>
            <Text style={[styles.right, styles.text]}>{amountTxt}</Text>
        </View>
        <TouchableOpacity 
            onPress={handleDelete}
            activeOpacity={1}>
                
            <Image
                style={styles.delete}
                source={delete_image}
            />
        </TouchableOpacity>
    </TouchableOpacity>
}

export default CartView