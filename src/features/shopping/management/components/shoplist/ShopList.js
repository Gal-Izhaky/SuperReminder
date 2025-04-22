// External imports
import { FlatList } from "react-native";
import { memo, useCallback, useContext, useState } from "react";

// Internal components
import CartView from "../cartView/CartView";
import Confirmation from "../../../../../ui/components/dialogs/confirmation/confirmationWindow/Confirmation";

// Contexts and styles
import { ShoppingListContext } from '../../../../../core/state/contexts/ShoppingListContext.js';
import styles from "./ShopList.styles.js";
import { useTranslation } from "react-i18next";

/**
 * ShopList Component
 * Displays a scrollable list of shopping lists with delete functionality
 *
 * @param {Function} sortLists - Function to sort the lists
 * @param {Function} filterLists - Function to filter the lists
 */
const ShopList = ({ sortLists, filterLists }) => {
    // Context
    const { lists, removeList } = useContext(ShoppingListContext);

    // State management
    const [visible, setVisible] = useState(false);
    const [currList, setCurrList] = useState(null);

    // Translation hook
    const { t } = useTranslation();

    // Handlers
    const confirmDelete = useCallback((item) => {
        setVisible(true);
        setCurrList(item);
    }, []);
    
    const handleCancel = useCallback(() => {
        if (!visible) return;

        setVisible(false);
        setCurrList({
            name: currList?.name,
        });
        setTimeout(() => setCurrList(null), 400);
    }, [visible, currList]);

    const handleDelete = useCallback(() => {
        if (!visible) return;
        
        handleCancel();
        removeList(currList?.key);
    }, [visible, currList, handleCancel, removeList]);

    // Render
    return (
        <>
            <FlatList
                data={sortLists(filterLists(lists))}
                style={styles.container}
                renderItem={({ item }) => (
                    <CartView 
                        list={item} 
                        handleDelete={() => confirmDelete(item)}
                    />
                )}
            />

            <Confirmation
                visible={visible}
                onConfirm={handleDelete}
                onCancel={handleCancel}
                title={currList ? t('confirmations.deleteList', {name: currList.name}) : null}
                type="del"
            />
        </>
    );
};

export default ShopList;