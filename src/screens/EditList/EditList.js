// react imports
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";

// core imports
import { ShoppingListContext } from "../../core/contexts/ShoppingListContext";

// components
import ItemList from "../../components/ItemList/ItemList";
import SearchBar from "../../components/SearchBar/SearchBar";
import Header from "../../components/Header/Header";

// styles
import styles from "./EditList.styles";
import Confirmation from "../../components/Confirmation/ConfirmationWindow/Confirmation";

const EditList = ({ route }) => {
    const navigation = useNavigation();
    const { editName, addItem } = useContext(ShoppingListContext);

    const { list } = route.params;

    const [visible, setVisible] = useState(false);

    const handleEdit = (val) => {
        editName(list.key, val);
    };

    const confirmAdd = () => setVisible(true);

    const handleAdd = (code, amount) => {
        addItem(list.key, code, amount)
        setVisible(false);
    }
    const handleCancel = () => {
        setVisible(false);
    }

    return (
        <View style={styles.background}>
            <Header title={"עריכת רשימה"} />
            <View style={styles.top}>
                <View>
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
                            ></TextInput>
                            <Text style={styles.charIndicator}>
                                {list.name.length}/15
                            </Text>
                        </View>
                    </View>
                    {!list.items?.length ? (
                        <Text
                            style={[
                                styles.txt,
                                styles.marginTop,
                                styles.center,
                            ]}
                        >
                            רשימה ריקה
                        </Text>
                    ) : (
                        <>
                            <Text style={[styles.txt, styles.marginTop]}>
                                מוצרים:{" "}
                            </Text>
                            <ItemList list={list} isAutoHeight={true} />
                        </>
                    )}
                </View>
            </View>
            <TouchableOpacity style={styles.button} activeOpacity={1} onPress={confirmAdd}>
                <Text style={styles.buttonText}>הוסף מוצר</Text>
            </TouchableOpacity>
                    
            <Confirmation
                visible={visible}
                onConfirm={handleAdd}
                onCancel={handleCancel}
                title={"הוסף מוצר לרשימה"}
                type="addItem"
            />

            {/* <SearchBar /> */}
        </View>
    );
};

export default EditList;
