import { Text, View, Image, TouchableOpacity } from 'react-native';

import styles from "./ItemView.styles"

const delete_image  = require("../../assets/images/delete.png") 

const ItemView = ({ item, handleDelete }) => {
    return <View 
        style={[styles.card, styles.shadow]} >
            
        <Text 
            style={[styles.right, styles.text]}
            numberOfLines={2}
            adjustsFontSizeToFit={true}>
                
            {item.name}
        </Text>
        <TouchableOpacity 
            onPress={handleDelete}
            activeOpacity={1}>
                
            <Image
                style={styles.delete}
                source={delete_image}
            />
        </TouchableOpacity>
    </View>
}

export default ItemView