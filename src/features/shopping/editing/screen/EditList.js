// External imports
import { View } from "react-native";
import { useContext } from "react";

// Context imports
import { ShoppingListContext } from "../../../../core/state/contexts/ShoppingListContext";

// Component imports
import ItemList from "../components/itemList/ItemList";
import Header from "../../../../ui/components/header/Header";
import ListActions from "../components/listActions/ListActions";

// Styles
import styles from "./EditList.styles";
import { useTranslation } from "react-i18next";
import ListNameInput from "../components/listNameInput/ListNameInput";

/**
 * EditList Component
 * Allows users to edit shopping list details and manage items
 *
 * @param {Object} route - Navigation route object containing listKey
 */
const EditList = ({ route }) => {
    // Context and route params
    const { lists, editName, addItem, getItemAmount } =
        useContext(ShoppingListContext);
    const { listKey } = route.params;
    const list = lists.find((list) => list.key === listKey || listKey == "");

    // Translation hook
    const { t } = useTranslation();

    // Render
    return (
        <View style={styles.background}>
            {/* Header */}
            <Header title={t("screens.editList")} />

            {/* Main content */}
            <View style={styles.top}>
                {/* List name input */}
                <ListNameInput
                    list={list}
                    onEdit={(name) => editName(list.key, name)}
                />

                {/* Items list */}
                <ItemList list={list} />
            </View>

            {/* Confirmation, price table, buttons */}
            <ListActions
                list={list}
                addItem={addItem}
                getItemAmount={getItemAmount}
            />
        </View>
    );
};

export default EditList;
