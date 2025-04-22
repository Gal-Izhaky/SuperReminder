// External imports
import React, { useState, useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';

// Core imports
import { ShoppingListContext } from '../../../../../core/state/contexts/ShoppingListContext';

// Components
import { AddButton } from '../../../../../ui/components/button';
import Confirmation from "../../../../../ui/components/dialogs/confirmation/confirmationWindow/Confirmation";

/**
 * AddListButton Component
 * Handles add list button and confirmation dialog
 */
const AddListButton = () => {
    // Access context for adding lists
    const { addList } = useContext(ShoppingListContext);
    
    // Local state for confirmation dialog
    const [visible, setVisible] = useState(false);
    
    // Translation hook
    const { t } = useTranslation();

    // Show confirmation dialog
    const confirmAdd = useCallback(() => {
        setVisible(true);
    }, []);

    // Handle add list confirmation
    const handleAdd = useCallback((name) => {
        if (!visible) return;
        setVisible(false);
        addList(name);
    }, [visible, addList]);

    // Handle cancellation
    const handleCancel = useCallback(() => {
        setVisible(false);
    }, []);

    return (
        <>
            {/* Add new list button */}
            <AddButton
                onPress={confirmAdd}
                text={t('shoppingLists.addList')}
            />
            
            {/* Add list confirmation modal */}
            <Confirmation
                visible={visible}
                onConfirm={handleAdd}
                onCancel={handleCancel}
                title={t('shoppingLists.newList')}
                type="add"
            />
        </>
    );
};

export default AddListButton;