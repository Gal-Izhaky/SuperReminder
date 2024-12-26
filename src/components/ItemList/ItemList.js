import { FlatList } from "react-native"

import styles from "./ItemList.styles.js"
import { ShoppingListContext } from '../../core/contexts/ShoppingListContext.js';
import { useContext, useState } from "react";
import Confirmation from "../Confirmation/ConfirmationWindow/Confirmation.js";
import ItemView from "../ItemView/ItemView.js";

const ItemList = ( { list, isAutoHeight } ) => {
    const { removeItem } = useContext(ShoppingListContext)
    const [visible, setVisible] = useState(false);
    const [currItem, setCurrItem] = useState(null);

    const confirmDelete = (item) => {
        setVisible(true)
        setCurrItem(item)
    }
    
    const handleDelete = () => {
        setVisible(false)
        removeItem(list.key, currItem.key)
    }

    const handleCancel = () => {
        setVisible(false)
    }


    return <>
        <FlatList
            data={list.items}
            style={[styles.container, isAutoHeight ? styles.autoMinHeight : styles.normalHeight]}
            renderItem={({ item }) => (
                <ItemView item={item} handleDelete={() => {confirmDelete(item)}}/>
            )}
        />

        <Confirmation
            visible={visible}
            onConfirm={handleDelete}
            onCancel={handleCancel}
            title={currItem ? `האם אתה בטוח שאתה רוצה למחוק את ${currItem.name}?` : null}
            type="del"
        />
        
    </>
}

export default ItemList