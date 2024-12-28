// External imports
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useContext, useState } from "react";

// Context imports
import { ShoppingListContext } from "../../core/contexts/ShoppingListContext";

// Component imports
import ItemList from "../../components/ItemList/ItemList";
import Header from "../../components/Header/Header";
import Confirmation from "../../components/Confirmation/ConfirmationWindow/Confirmation";

// Styles
import styles from "./EditList.styles";

/**
 * EditList Component
 * Allows users to edit shopping list details and manage items
 *
 * @param {Object} route - Navigation route object containing listKey
 */
const EditList = ({ route }) => {
    // Context and route params
    const { lists, editName, addItem, getItemAmount } = useContext(ShoppingListContext);
    const { listKey } = route.params;
    const list = lists.find((list) => list.key === listKey);

    // State management
    const [visible, setVisible] = useState(false);

    // Event handlers
    const handleEdit = (val) => {
        editName(list.key, val);
    };

    const confirmAdd = () => setVisible(true);

    const handleAdd = (itemKey, amount) => {
        addItem(list.key, itemKey, amount);
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    // Render
    return (
        <View style={styles.background}>
            {/* Header */}
            <Header title={"עריכת רשימה"} />

            {/* Main content */}
            <View style={styles.top}>
                <View>
                    {/* List name input */}
                    <View style={[styles.row, styles.marginTop]}>
                        <Text style={styles.txt}>שם הרשימה:</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                defaultValue={list.name}
                                style={styles.name}
                                placeholder="שם הרשימה"
                                maxLength={15}
                                onChangeText={handleEdit}
                                keyboardType="visible-password"
                                underlineColorAndroid="transparent"
                            />
                            <Text style={styles.charIndicator}>
                                {list.name.length}/15
                            </Text>
                        </View>
                    </View>

                    {/* Items list or empty state */}
                    {!list.items?.length ? (
                        <Text style={[styles.txt, styles.marginTop, styles.center]}>
                            רשימה ריקה
                        </Text>
                    ) : (
                        <>
                            <Text style={[styles.txt, styles.marginTop]}>
                                מוצרים:{" "}
                            </Text>
                            <ItemList list={list} isAutoHeight={false} />
                        </>
                    )}
                </View>
            </View>

            {/* Add item button */}
            <TouchableOpacity 
                style={styles.button} 
                activeOpacity={1} 
                onPress={confirmAdd}
            >
                <Text style={styles.buttonText}>הוסף מוצר</Text>
            </TouchableOpacity>

            {/* Add item confirmation dialog */}
            <Confirmation
                visible={visible}
                onConfirm={handleAdd}
                itemAmount={(itemKey) => getItemAmount(list.key, itemKey)}
                onCancel={handleCancel}
                title={"הוסף מוצר לרשימה"}
                type="addItem"
            />
        </View>
    );
};

export default EditList;
