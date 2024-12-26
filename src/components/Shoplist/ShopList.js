import { FlatList } from "react-native"

import CartView from "../CartView/CartView"
import styles from "./ShopList.styles.js"
import { ShoppingListContext } from '../../core/contexts/ShoppingListContext.js';
import { useContext, useState } from "react";
import Confirmation from "../Confirmation/ConfirmationWindow/Confirmation.js";

const ShopList = ( { sortLists, filterLists }) => {
    const { removeList } = useContext(ShoppingListContext)
    const [visible, setVisible] = useState(false);
    const [currList, setCurrList] = useState(null);
    const { lists } = useContext(ShoppingListContext);

    const confirmDelete = (item) => {
        setVisible(true)
        setCurrList(item)
    }
    
    const handleDelete = () => {
        if(!visible){
            return;
        }
        handleCancel();
        removeList(currList.key);
    }

    const handleCancel = () => {
        if(!visible){
            return;
        }
        setVisible(false)
        setCurrList({
            name: currList.name,
        })
        setTimeout(() => setCurrList(null), 400);
    }

    return <>
        <FlatList
            data={sortLists(lists)}
            style={styles.container}
            renderItem={({ item }) => (
                <CartView list={item} handleDelete={() => {confirmDelete(item)}}/>
            )}
        />

        <Confirmation
            visible={visible}
            onConfirm={handleDelete}
            onCancel={handleCancel}
            title={currList ? `האם אתה בטוח שאתה רוצה למחוק את ${currList.name}?` : null}
            type="del"
        />
        
    </>
}

export default ShopList