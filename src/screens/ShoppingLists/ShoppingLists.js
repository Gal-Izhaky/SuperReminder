// External imports
import React, { useCallback, useContext, useState } from 'react';
import { Text, TouchableOpacity, View, Pressable } from 'react-native';

// Core imports
import { ShoppingListContext } from '../../core/contexts/ShoppingListContext';
import { useSortAndFilter } from '../../core/hooks/useSortAndFilter';
import styles from "./ShoppingLists.styles";

// Component imports
import ShopList from '../../components/Shoplist/ShopList';
import Header from '../../components/Header/Header';
import Confirmation from '../../components/Confirmation/ConfirmationWindow/Confirmation';
import SortAndFilter from '../../components/SortAndFilter/SortAndFilter/SortAndFilter';

/**
 * ShoppingLists Component
 * Main screen for displaying and managing shopping lists
 * Includes sorting, filtering, and list creation functionality
 */
const ShoppingLists = () => {
    // Context and state management
    const { addList } = useContext(ShoppingListContext);
    const [visible, setVisible] = useState(false);
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    // List management handlers
    const confirmAdd = () => setVisible(true);
    const handleAdd = (name) => {
        if (!visible) return;
        setVisible(false);
        addList(name);
    };
    const handleCancel = () => setVisible(false);

    // Sort and filter functionality
    const {
        options,
        getSortValues,
        setSortValues,
        getFilterValues,
        setFilterValues,
        resetFilters,
        sortLists,
        filterLists
    } = useSortAndFilter();

    // Dropdown visibility handler
    const handleOutsidePress = useCallback(() => {
        if (isDropdownVisible) setDropdownVisible(false);
    }, [isDropdownVisible]);

    return (
        <Pressable onPress={handleOutsidePress} style={styles.pressableBackground}>
            <Header title="רשימות" />
            <View style={styles.top}>
                {/* Sort and filter controls */}
                <SortAndFilter
                    options={options}
                    getSortValues={getSortValues}
                    setSortValues={setSortValues}
                    getFilterValues={getFilterValues}
                    setFilterValues={setFilterValues}
                    isDropdownVisible={isDropdownVisible}
                    setDropdownVisible={setDropdownVisible}
                />

                {/* Shopping lists display */}
                <ShopList
                    resetFilters={resetFilters}
                    sortLists={sortLists}
                    filterLists={filterLists}
                />

                {/* Add new list button */}
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={1}
                    onPress={confirmAdd}
                >
                    <Text style={styles.buttonText}>
                        הוסף רשימה
                    </Text>
                </TouchableOpacity>

                {/* Add list confirmation modal */}
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
};

export default ShoppingLists;
