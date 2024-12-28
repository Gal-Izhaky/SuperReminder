// External imports
import React, { createContext, useState, useEffect, useCallback } from "react";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

// Local imports
import ListData from "../../data/ListData";

// Context creation
export const ShoppingListContext = createContext();

/**
 * ShoppingListProvider Component
 * Manages shopping lists state and operations
 * 
 * @param {Object} children - Child components to be wrapped
 */
export const ShoppingListProvider = ({ children }) => {
    // State management
    const [lists, setLists] = useState([]);
    const [maxItemsVal, setMaxItemsVal] = useState(0);

    /**
     * Calculate and update maximum items value across all lists
     */
    const calcAndSetMaxItemsVal = (lists) => {
        setMaxItemsVal(Math.max(...lists.map(list => list.items.length)));
    };

    /**
     * Fetch initial shopping lists data
     * Updates both lists and maxItemsVal
     */
    const fetchData = useCallback(() => {
        const data = ListData.getShoppingLists();

        // Update local state
        setLists(data);
        calcAndSetMaxItemsVal(data);
    }, []);

    // Initial data fetch
    useEffect(fetchData, []);

    /**
     * Edit list name
     * Updates both local state and database
     */
    const editName = useCallback((listKey, listName) => {
        const updateTime = Date.now();
        const updatedLists = lists.map((list) => 
            list.key !== listKey ? list : { ...list, name: listName, updateTime }
        );
                
        // Update local state
        setLists(updatedLists);
        calcAndSetMaxItemsVal(updatedLists);

        // Update database
        ListData.editListName(listKey, listName, updateTime);
    }, [lists]);
    
    /**
     * Create new shopping list
     * Updates both local state and database
     */
    const addList = useCallback((listName) => {
        const newList = {
            name: listName,
            key: uuidv4(),
            updateTime: Date.now(),
            items: []
        };

        const updatedLists = [...lists, newList];

        // Update local state
        setLists(updatedLists);
        calcAndSetMaxItemsVal(updatedLists);

        // Update database
        ListData.createShoppingList(newList);
    }, [lists]);

    /**
     * Remove shopping list
     * Updates both local state and database
     */
    const removeList = useCallback((listKey) => {
        const updatedLists = lists.filter((list) => list.key !== listKey);

        // Update local state
        setLists(updatedLists);
        calcAndSetMaxItemsVal(updatedLists);

        // Update database
        ListData.removeShoppingList(listKey);
    }, [lists]);

    /**
     * Add or update item in shopping list
     * Updates both local state and database
     */
    const addItem = useCallback((listKey, itemKey, amount) => {
        const updateTime = Date.now();
        const updatedLists = lists.map((list) => {
            if(list.key !== listKey) return list;

            const existingItemIndex = list.items.findIndex(item => item.key === itemKey);
            const updatedItems = [...list.items];

            if (existingItemIndex >= 0) {
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    amount: updatedItems[existingItemIndex].amount + amount
                };
            } else {
                updatedItems.push({ key: itemKey, amount: amount });
            }

            return { ...list, items: updatedItems, updateTime };
        });

        // Update local state
        setLists(updatedLists);
        calcAndSetMaxItemsVal(updatedLists);

        // Update database
        ListData.addShopItem(listKey, itemKey, amount, updateTime);
    }, [lists]);

    /**
     * Remove item from shopping list
     * Updates both local state and database
     */
    const removeItem = useCallback((listKey, itemKey) => {
        const updateTime = Date.now();
        const updatedLists = lists.map((list) => {
            if(list.key !== listKey) return list;

            const updatedItems = list.items.filter(item => item.key !== itemKey);
            return { ...list, items: updatedItems, updateTime };
        });
        
        // Update local state
        setLists(updatedLists);
        calcAndSetMaxItemsVal(updatedLists);

        // Update database
        ListData.removeShopItem(listKey, itemKey, updateTime);
    }, [lists]);

    /**
     * Set specific amount for an item
     * Updates both local state and database
     */
    const setItemAmount = useCallback((listKey, itemKey, amount) => {
        const updateTime = Date.now();
        const updatedLists = lists.map((list) => {
            if(list.key !== listKey) return list;

            const existingItemIndex = list.items.findIndex(item => item.key === itemKey);
            const updatedItems = [...list.items];

            if (existingItemIndex >= 0) {
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    amount
                };
            }

            return { ...list, items: updatedItems, updateTime };
        });
        
        // Update local state
        setLists(updatedLists);
        calcAndSetMaxItemsVal(updatedLists);

        // Update database
        ListData.setShopItemAmount(listKey, itemKey, amount, updateTime);
    }, [lists]);

    /**
     * Get the amount of an item in a list
     * if the item isn't present, return 0
     */
    const getItemAmount = useCallback((listKey, itemKey) => {
        for(const list of lists){
            if(list.key !== listKey){
                continue
            }

            return list.items.find((item) => item.key === itemKey)?.amount || 0;
        }

        return 0;
    }, [lists])
    
    return (
        <ShoppingListContext.Provider value={{ 
            lists, 
            maxItemsVal, 
            addList, 
            removeList, 
            editName, 
            addItem, 
            removeItem, 
            setItemAmount,
            getItemAmount,
        }}>
            {children}
        </ShoppingListContext.Provider>
    );
};
