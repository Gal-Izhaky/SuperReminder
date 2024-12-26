// react imports
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";

// core imports
import { ShoppingListContext } from "../../core/contexts/ShoppingListContext";

// components
import ItemList from "../../components/ItemList/ItemList";
import SearchBar from "../../components/SearchBar/SearchBar";
import Header from "../../components/Header/Header";

// styles
import styles from "./EditList.styles";

const EditList = ({ route }) => {
    const navigation = useNavigation();
    const { editName } = useContext(ShoppingListContext);

    const { list } = route.params;

    const handleBack = () => {
        navigation.navigate("הרשימות שלך");
    };

    const handleEdit = (val) => {
        editName(list.key, val);
    };

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
                            <Text style={styles.charIndicator}>{list.name.length}/15</Text>
                        </View> 

                    </View>
                    {
                        !list.items?.length 
                        ?                             
                        <Text style={[styles.txt, styles.marginTop, styles.center]}>רשימה ריקה</Text>
                        :  
                        <>
                            <Text style={[styles.txt, styles.marginTop]}>מוצרים: </Text>
                            <ItemList list={list} isAutoHeight={true} />
                        </>
                    }
                </View>
            </View>

            <SearchBar />
        </View>
    );
};

export default EditList;
