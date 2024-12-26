// imports
import React, { createContext, useState, useEffect } from "react";
import ListData from "../../data/ListData";

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

// creating the context
export const ShoppingListContext = createContext();

// creating the provider
export const ShoppingListProvider = ({ children }) => {
    const [lists, setLists] = useState([]);

    // get all the lists data from the database
    const fetchData = () => {
        const data = ListData.getShoppingLists();
        setLists(data);
    };

    useEffect(fetchData, []);

    // function to remove an item with key of itemKey from a list with key of listKey
    const removeItem = (listKey, itemKey) => {
        const updateTime = Date.now()

        const updatedLists = lists.map((list) => {
            if(list.key !== listKey) return list

            const updatedItems = list.items.filter(item => item.key !== itemKey)
            return { ...list, items: updatedItems, updateTime:  updateTime}; // Update the key here
        })
        
        // Update local state
        setLists(updatedLists)

        // Update the database
        ListData.removeShopItem(listKey, itemKey, updateTime)
    }

    // function to edit the name of a list with key of listKey
    const editName = (listKey, listName) => {
        const updateTime = Date.now()

        const updatedLists = lists.map((list) => {
            if(list.key !== listKey) return list
            
            return { ...list, name: listName, updateTime: updateTime }; // Update the key here
        })
                
        // Update local state
        setLists(updatedLists)  

        // Update the database
        ListData.editListName(listKey, listName, updateTime)
    }
    
    // function to create a new shopping list with a name of listName
    const addList = (listName) => {
        const newList = {
            name: listName,
            key: uuidv4(),
            updateTime: Date.now(),
            items: []
        }

        const updatedLists = [...lists, newList];

        // Update local state
        setLists(updatedLists);

        // Update the database
        ListData.createShoppingList(newList)
    };

    // function to remove a shopping list with a key of listKey
    const removeList = (listKey) => {
        const updatedLists = lists.filter((list) => list.key !== listKey);

        // Update local state
        setLists(updatedLists);

        // Update the database
        ListData.removeShoppingList(listKey)
    };

    return (
        <ShoppingListContext.Provider value={{ lists, addList, removeList, editName, removeItem }}>
            {children}
        </ShoppingListContext.Provider>
    );
};
