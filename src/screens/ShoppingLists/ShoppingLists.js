// react imports
import { Text, TouchableOpacity, View, Pressable } from 'react-native';
import React, { useContext, useState } from 'react';

// core imports
import { ShoppingListContext } from '../../core/contexts/ShoppingListContext';
import { useSortAndFilter } from '../../core/hooks/useSortAndFilter';

import styles from "./ShoppingLists.styles"

// components

import ShopList from '../../components/Shoplist/ShopList';
import Header from '../../components/Header/Header';
import Confirmation from '../../components/Confirmation/ConfirmationWindow/Confirmation';
import SortAndFilter from '../../components/SortAndFilter/SortAndFilter/SortAndFilter';

const ShoppingLists = () => {
    const { addList } = useContext(ShoppingListContext)
    const [ visible, setVisible ] = useState(false)
    const [isDropdownVisible, setDropdownVisible] = useState(false); // Control dropdown visibility

    // add list confirmation
    const confirmAdd = () => setVisible(true);
    const handleAdd = (name) => { 
        if(!visible){
            return;
        }
        setVisible(false); 
        addList(name); 
    };
    const handleCancel = () => setVisible(false);

    // filter and sort hook
    const { sortOptions, getSortValues, setSortValues, sortLists, filterLists } = useSortAndFilter();

    // Hide dropdown if clicking outside of it
    const handleOutsidePress = () => {
        if (isDropdownVisible) setDropdownVisible(false);
    };

    // wrap in pressable to be able to hide dropdown when clicking on another thing
    return (
        <Pressable onPress={handleOutsidePress} style={styles.pressableBackground}>
            <Header title="רשימות"/>
            <View style={styles.top}>
                {/* header */}

                <SortAndFilter 
                    sortOptions={sortOptions} 
                    getSortValues={getSortValues} 
                    setSortValues={setSortValues} 
                    isDropdownVisible={isDropdownVisible} 
                    setDropdownVisible={setDropdownVisible} 
                />
                
                <ShopList sortLists={sortLists} filterLists={filterLists}/>
                
                <TouchableOpacity 
                    style={styles.button}
                    activeOpacity={1}
                    onPress={confirmAdd}>

                    <Text style={styles.buttonText}>
                        הוסף רשימה
                    </Text>
                </TouchableOpacity>

                <Confirmation
                    visible={visible}
                    onConfirm={handleAdd}
                    onCancel={handleCancel}
                    title={"רשימה חדשה"}
                    type="add"
                />
            </View>
        </Pressable>
    );
}

export default ShoppingLists
