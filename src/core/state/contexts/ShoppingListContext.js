// External imports
import React, { createContext, useState, useEffect, useCallback, useMemo } from "react";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Local imports
import ListData from "../../storage/realm/ListData";
import { stopTrackingGeofences } from "../../../features/location/GeofencingService";

// Storage keys
const STORAGE_KEYS = {
    SELECTED_LIST: 'smart_reminder_list',
    SELECTED_CHAINS: 'smart_reminder_chains',
    ENABLED: 'smart_reminder_enabled'
};

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
    const calcAndSetMaxItemsVal = useCallback((lists) => {
        if (!lists || lists.length === 0) {
            setMaxItemsVal(0);
            return;
        }
        
        const max = Math.max(...lists.map(list => 
            list.items ? list.items.length : 0
        ));
        
        setMaxItemsVal(max);
    }, []);

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

        setLists((prevLists) => {     
            const updatedLists = prevLists.map((list) => 
                list.key !== listKey ? list : { ...list, name: listName, updateTime }
            );

            // Update local state
            calcAndSetMaxItemsVal(updatedLists);

            return updatedLists;
        });

        // Update database
        ListData.editListName(listKey, listName, updateTime);
    }, []);
    
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

        setLists((prevLists) => {
            const updatedLists = [...prevLists, newList];
                    
            // Update local state
            calcAndSetMaxItemsVal(updatedLists);
            return updatedLists;
        });

        // Update database
        ListData.createShoppingList(newList);
    }, []);

    /**
     * Remove shopping list
     * Updates both local state and database
     */
    const removeList = useCallback((listKey) => {
        // First check if this list has active reminders
        const checkAndDisableReminders = async () => {
            try {
                const reminderListKey = await AsyncStorage.getItem(STORAGE_KEYS.SELECTED_LIST);
                const reminderEnabled = await AsyncStorage.getItem(STORAGE_KEYS.ENABLED);
                
                // If this is the active reminder list and reminders are enabled
                if (reminderEnabled === 'true' && reminderListKey === listKey) {
                    console.log('Disabling reminders for deleted list');
                    
                    // Disable reminders in storage
                    await AsyncStorage.setItem('reminder_enabled', 'false');
                    
                    // Stop geofence tracking
                    stopTrackingGeofences();
                }
            } catch (error) {
                console.error('Error handling reminders during list removal:', error);
            }
        };
        
        // Check and disable reminders, then continue with removal
        checkAndDisableReminders();
        
        // Update state (this doesn't need to wait for the async operations)
        setLists((prevLists) => {
            const updatedLists = prevLists.filter((list) => list.key !== listKey);
            
            // Update local state
            calcAndSetMaxItemsVal(updatedLists);
            return updatedLists;
        });

        // Update database
        ListData.removeShoppingList(listKey);
    }, []);

    /**
     * Add or update item in shopping list
     * Updates both local state and database
     */
    const addItem = useCallback((listKey, itemKey, amount) => {
        const updateTime = Date.now();

        setLists((prevLists) => {
            const updatedLists = prevLists.map((list) => {
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
            calcAndSetMaxItemsVal(updatedLists);
            return updatedLists;
        });

        // Update database
        ListData.addShopItem(listKey, itemKey, amount, updateTime);
    }, []);

    /**
     * Remove item from shopping list
     * Updates both local state and database
     */
    const removeItem = useCallback((listKey, itemKey) => {
        const updateTime = Date.now();

        setLists((prevLists) => {
            const updatedLists = prevLists.map((list) => {
                if(list.key !== listKey) return list;

                const updatedItems = list.items.filter(item => item.key !== itemKey);
                return { ...list, items: updatedItems, updateTime };
            });
            
            // Update local state
            calcAndSetMaxItemsVal(updatedLists);
            return updatedLists;
        });
        
        // Update database
        ListData.removeShopItem(listKey, itemKey, updateTime);
    }, []);

    /**
     * Set specific amount for an item
     * Updates both local state and database
     */
    const setItemAmount = useCallback((listKey, itemKey, amount) => {
        const updateTime = Date.now();
        
        // Use function updater pattern to get the LATEST lists state
        setLists(prevLists => {
            const updatedLists = prevLists.map((list) => {
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
            calcAndSetMaxItemsVal(updatedLists);
            return updatedLists;
        });

        // Update database
        ListData.setShopItemAmount(listKey, itemKey, amount, updateTime);
    }, []); // Remove lists from dependency array

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
    
    const contextValue = useMemo(() => ({
        lists,
        maxItemsVal,
        addList,
        removeList,
        editName,
        addItem,
        removeItem,
        setItemAmount,
        getItemAmount,
    }), [lists, maxItemsVal, addList, removeList, editName, addItem, removeItem, setItemAmount, getItemAmount]);

    return (
        <ShoppingListContext.Provider value={contextValue}>
            {children}
        </ShoppingListContext.Provider>
    );
};
