// External imports
import { FlatList } from "react-native";
import { useContext, useState } from "react";

// Internal components
import Confirmation from "../Confirmation/ConfirmationWindow/Confirmation.js";
import ItemView from "../ItemView/ItemView.js";

// Context and data
import { ShoppingListContext } from '../../core/contexts/ShoppingListContext.js';
import FirebaseData from "../../data/FirebaseData.js";

// Styles
import styles from "./ItemList.styles.js";

/**
 * ItemList Component
 * Renders a scrollable list of shopping items with delete confirmation
 *
 * @param {Object} list - The shopping list containing items
 * @param {boolean} isAutoHeight - Whether to use auto height styling
 */
const ItemList = ({ list, isAutoHeight }) => {
    // Context
    const { removeItem, setItemAmount } = useContext(ShoppingListContext);

    // State management
    const [visible, setVisible] = useState(false);
    const [currItem, setCurrItem] = useState(null);

    // Handlers
    const confirmDelete = (item) => {
        setVisible(true);
        setCurrItem(item);
    };

    const handleDelete = () => {
        setVisible(false);
        removeItem(list.key, currItem.key);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    // Transform list items with their full data from Firebase
    const itemsWithData = list.items.map(listItem => ({
        ...FirebaseData.getItemByKey(listItem.key),
        amount: listItem.amount
    }));

    // Render
    return (
        <>
            <FlatList
                data={itemsWithData}
                style={[
                    styles.container,
                    isAutoHeight ? styles.autoMinHeight : styles.normalHeight
                ]}
                renderItem={({ item }) => (
                    <ItemView
                        item={item}
                        addAmount={(amount) => setItemAmount(list.key, item.key, amount)}
                        handleDelete={() => confirmDelete(item)}
                    />
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
    );
};

export default ItemList;