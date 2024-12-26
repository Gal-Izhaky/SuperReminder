// imports
import { realm } from './Schemas';

// database functions

// function to get all the current saved data
const getShoppingLists = () => {
    const lists = realm.objects('ShoppingList');
    return Array.from(lists); // Convert to an array if needed
};

// function to create a new shopping list
const createShoppingList = (newList) => {
    try {
        realm.write(() => {
            realm.create('ShoppingList', newList);
        });
    } catch (error) {
        console.error('Error saving shopping list:', error);
    }
};

// function to change a list's name
const editListName = (key, newName, updateTime) => {
    try {
        realm.write(() => {
            // Find the shopping list to delete
            const shoppingList = realm.objectForPrimaryKey('ShoppingList', key);

            if (!shoppingList) {
                console.log(`No shopping list found with key ${key}.`);
                return
            }
                
            // set the new name
            shoppingList.name = newName
            
            // Update key after changing the name
            shoppingList.updateTime = updateTime;
        });
    } catch (error) {
        console.error('Error editing shopping list name:', error);
    }
}

// function to remove a shopping list with a key of listKey
const removeShoppingList = (listKey) => {
    try {
        realm.write(() => {
            // Find the shopping list to delete
            const shoppingListToDelete = realm.objectForPrimaryKey('ShoppingList', listKey);

            if (!shoppingListToDelete) {
                console.log(`No shopping list found with key ${listKey}.`);
                return
            }
                
            realm.delete(shoppingListToDelete);
        });
    } catch (error) {
        console.error('Error removing shopping list:', error);
    }
};

// function to add an item to a list, with key as the key
const addShopItem = (key, newItem, updateTime) => {
    try {
        realm.write(() => {
            // Find the shopping list by its key value
            const shoppingList = realm.objectForPrimaryKey('ShoppingList', key);

            if (!shoppingList) {
                console.log(`No shopping list found with key ${key}.`);
                return
            }                
            
            // Create a new Item object with amount as 1
            const item = {...newItem, amount: 1};

            // Add the new item to the items list of the shopping list
            shoppingList.items.push(item);
            shoppingList.updateTime = updateTime;
        });
    } catch (error) {
        console.error('Error adding item to shopping list:', error);
    }
};

// function to remove an item with a code of itemCode, in a list with key as the key
const removeShopItem = (key, itemCode, updateTime) => {
    try {
        realm.write(() => {
            // Find the shopping list by its key value
            const shoppingList = realm.objectForPrimaryKey('ShoppingList', key);

            if (!shoppingList) {
                console.log(`No shopping list found with key ${key}.`);
                return
            }

            // Find the index of the item to delete
            const itemIndex = shoppingList.items.findIndex(item => item.key === itemCode);

            if (itemIndex === -1) {
                console.log(`No item found with code ${itemCode} in shopping list: ${shoppingList.name}.`);
                return
            }
                
            // Remove the item from the items list of the shopping list
            shoppingList.items.splice(itemIndex, 1);
            console.log(`Item with code ${itemCode} removed from shopping list: ${shoppingList.name}.`);

            // Update key after removing the item
            shoppingList.updateTime = updateTime;
        });
    } catch (error) {
        console.error('Error adding item to shopping list:', error);
    }
};

// Exporting as an object
const ListData = {
    getShoppingLists,
    createShoppingList,
    removeShoppingList,
    editListName,
    addShopItem,
    removeShopItem,
};

export default ListData