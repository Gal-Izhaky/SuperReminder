// External imports
import React, { useContext, useState, useCallback, memo, useMemo } from "react";
import { FlatList, Text } from "react-native";

// Internal components
import Confirmation from "../../../../../ui/components/dialogs/confirmation/confirmationWindow/Confirmation";
import ItemView from "../itemView/ItemView.js";

// Context and data
import { ShoppingListContext } from "../../../../../core/state/contexts/ShoppingListContext";
import FirebaseData from "../../../../../core/storage/firebase/FirebaseData.js";

// Styles
import styles from "./ItemList.styles.js";
import { useTranslation } from "react-i18next";
import i18n from "../../../../../i18n/i18next";

/**
 * ItemList Component
 * Renders a scrollable list of shopping items with delete confirmation
 *
 * @param {Object} list - The shopping list containing items
 */
const ItemList = ({ list }) => {
    // Translation hook
    const { t } = useTranslation();

    // Context
    const { removeItem, setItemAmount } = useContext(ShoppingListContext);

    // State management
    const [visible, setVisible] = useState(false);
    const [currItem, setCurrItem] = useState(null);

    // Handlers
    const confirmDelete = useCallback((item) => {
        setVisible(true);
        setCurrItem(item);
    }, []);

    const handleDelete = useCallback(() => {
        setVisible(false);
        removeItem(list.key, currItem.key);
    }, [list.key, currItem, removeItem]);

    const handleCancel = useCallback(() => {
        setVisible(false);
    }, []);

    // Transform list items with their full data from Firebase
    const itemsWithData = useMemo(() => {
        return list.items.map((listItem) => {
            return {
                ...FirebaseData.getItemByKey(listItem.key),
                amount: listItem.amount,
            };
        });
    }, [list.items]);

    itemsWithData.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });

    const renderListItem = useCallback(
        ({ item }) => {
            const handleAddAmount = (amount) =>
                setItemAmount(list.key, item.key, amount);
            const handleDeleteItem = () => confirmDelete(item);

            return (
                <ItemView
                    item={item}
                    addAmount={handleAddAmount}
                    handleDelete={handleDeleteItem}
                />
            );
        },
        [list, setItemAmount, confirmDelete]
    );

    // Render
    return !list.items?.length ? (
        <Text style={[styles.txt, styles.marginTop, styles.center]}>
            {t("shoppingLists.emptyList")}
        </Text>
    ) : (
        <>
            <Text
                style={[
                    styles.txt,
                    styles.marginTop,
                    i18n.language === "he"
                        ? { marginRight: "5%" }
                        : { marginLeft: "5%" },
                ]}
            >
                {t("editList.itemsGuide")}
            </Text>

            <FlatList
                data={itemsWithData}
                style={[styles.container, styles.normalHeight]}
                renderItem={renderListItem}
                keyExtractor={(item) => item.key}
                windowSize={10}
                maxToRenderPerBatch={10}
                removeClippedSubviews={true}
            />
            <Confirmation
                visible={visible}
                onConfirm={handleDelete}
                onCancel={handleCancel}
                title={
                    currItem
                        ? t(`confirmations.deleteItem`, { name: currItem.name })
                        : null
                }
                type="del"
            />
        </>
    );
};

export default memo(ItemList, (prevProps, nextProps) => {
    return prevProps.list === nextProps.list;
});
