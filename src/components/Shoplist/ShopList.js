// External imports
import { FlatList } from "react-native";
import { useContext, useState } from "react";

// Internal components
import CartView from "../CartView/CartView";
import Confirmation from "../Confirmation/ConfirmationWindow/Confirmation.js";

// Contexts and styles
import { ShoppingListContext } from '../../core/contexts/ShoppingListContext.js';
import styles from "./ShopList.styles.js";

/**
 * ShopList Component
 * Displays a scrollable list of shopping lists with delete functionality
 *
 * @param {Function} sortLists - Function to sort the lists
 * @param {Function} filterLists - Function to filter the lists
 * @param {Function} resetFilters - Function to reset applied filters
 */
const ShopList = ({ sortLists, filterLists, resetFilters }) => {
    // Context
    const { lists, removeList } = useContext(ShoppingListContext);

    // State management
    const [visible, setVisible] = useState(false);
    const [currList, setCurrList] = useState(null);

    // Handlers
    const confirmDelete = (item) => {
        setVisible(true);
        setCurrList(item);
    };
    
    const handleDelete = () => {
        if (!visible) return;
        
        handleCancel();
        removeList(currList.key);
    };

    const handleCancel = () => {
        if (!visible) return;

        setVisible(false);
        setCurrList({
            name: currList.name,
        });
        setTimeout(() => setCurrList(null), 400);
    };

    // Render
    return (
        <>
            <FlatList
                data={sortLists(filterLists(lists))}
                style={styles.container}
                renderItem={({ item }) => (
                    <CartView 
                        resetFilters={resetFilters} 
                        list={item} 
                        handleDelete={() => confirmDelete(item)}
                    />
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
    );
};

export default ShopList;