// External imports
import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

// Component imports
import { AddButton } from "../../../../../ui/components/button";
import Confirmation from "../../../../../ui/components/dialogs/confirmation/confirmationWindow/Confirmation";
import PriceTableModal from "../../components/priceTableModal/PriceTableModal";

// Styles
import styles from "./ListActions.styles";

/**
 * ListActions Component
 * Encapsulates all action buttons and related modals for list editing
 * 
 * @param {Object} props - Component props
 * @param {Object} props.list - The shopping list object
 * @param {Function} props.addItem - Function to add item to list
 * @param {Function} props.getItemAmount - Function to get item amount
 */
const ListActions = ({ list, addItem, getItemAmount }) => {
    // Translation hook
    const { t } = useTranslation();
    
    // Local state for dialogs
    const [addDialogVisible, setAddDialogVisible] = useState(false);
    const [priceModalVisible, setPriceModalVisible] = useState(false);
    
    // Handle add item
    const handleAddConfirm = useCallback((itemKey, amount) => {
        addItem(list.key, itemKey, amount);
        setAddDialogVisible(false);
    }, [list.key, addItem]);
    
    // Handle cancel
    const handleCancel = useCallback(() => {
        setAddDialogVisible(false);
    }, []);

    return (
        <>
            {/* Compare prices button */}
            <AddButton 
                text={t('editList.comparePrices')}
                onPress={() => setPriceModalVisible(true)}
                spacing={135}
                variant={"primary"}
                style={styles.button}
                textStyle={styles.buttonText}
                disabled={!list.items?.length} 
            />

            {/* Add item button */}
            <AddButton 
                text={t('editList.addItem')}
                onPress={() => setAddDialogVisible(true)}
                textStyle={styles.buttonText} 
            />
                
            {/* Add item confirmation dialog */}
            <Confirmation
                visible={addDialogVisible}
                onConfirm={handleAddConfirm}
                itemAmount={(itemKey) => getItemAmount(list.key, itemKey)}
                onCancel={handleCancel}
                title={t('editList.addItemGuide')}
                type="addItem"
            />
            
            {/* Price comparison modal */}
            <PriceTableModal
                visible={priceModalVisible}
                onClose={() => setPriceModalVisible(false)}
                list={list}
            />
        </>
    );
};

export default ListActions;