// External imports
import { realm } from './Schemas';

/**
 * Database operations for shopping lists
 * Contains CRUD operations for lists and list items
 */

// List Operations
/**
 * Retrieves all shopping lists from the database
 * @returns {Array} Array of shopping lists
 */
const getShoppingLists = () => {
    const lists = realm.objects('ShoppingList');
    return Array.from(lists);
};

/**
 * Creates a new shopping list
 * @param {Object} newList - The shopping list object to create
 */
const createShoppingList = (newList) => {
    try {
        realm.write(() => {
            realm.create('ShoppingList', newList);
        });
    } catch (error) {
        console.error('Error saving shopping list:', error);
    }
};

/**
 * Updates a shopping list's name
 * @param {string} key - List identifier
 * @param {string} newName - New name for the list
 * @param {number} updateTime - Timestamp of the update
 */
const editListName = (key, newName, updateTime) => {
    try {
        realm.write(() => {
            const shoppingList = realm.objectForPrimaryKey('ShoppingList', key);
            if (!shoppingList) {
                console.log(`No shopping list found with key ${key}.`);
                return;
            }
            shoppingList.name = newName;
            shoppingList.updateTime = updateTime;
        });
    } catch (error) {
        console.error('Error editing shopping list name:', error);
    }
};

/**
 * Removes a shopping list
 * @param {string} listKey - List identifier to remove
 */
const removeShoppingList = (listKey) => {
    try {
        realm.write(() => {
            const shoppingListToDelete = realm.objectForPrimaryKey('ShoppingList', listKey);
            if (!shoppingListToDelete) {
                console.log(`No shopping list found with key ${listKey}.`);
                return;
            }
            realm.delete(shoppingListToDelete);
        });
    } catch (error) {
        console.error('Error removing shopping list:', error);
    }
};

// Item Operations
/**
 * Adds or updates an item in a shopping list
 * @param {string} key - List identifier
 * @param {string} itemKey - Item identifier
 * @param {number} amount - Quantity of the item
 * @param {number} updateTime - Timestamp of the update
 */
const addShopItem = (key, itemKey, amount, updateTime) => {
    try {
        realm.write(() => {
            const shoppingList = realm.objectForPrimaryKey('ShoppingList', key);
            if (!shoppingList) {
                console.log(`No shopping list found with key ${key}.`);
                return;
            }

            const itemInList = shoppingList.items.find(item => item.key === itemKey);
            if (itemInList) {
                itemInList.amount += amount;
            } else {
                const newItem = realm.create('ListItem', { key: itemKey, amount: amount });
                shoppingList.items.push(newItem);
            }

            shoppingList.updateTime = updateTime;
        });
    } catch (error) {
        console.error('Error adding item to shopping list:', error);
    }
};

/**
 * Removes an item from a shopping list
 * @param {string} key - List identifier
 * @param {string} itemCode - Item identifier to remove
 * @param {number} updateTime - Timestamp of the update
 */
const removeShopItem = (key, itemCode, updateTime) => {
    try {
        realm.write(() => {
            // Find the shopping list
            const shoppingList = realm.objectForPrimaryKey('ShoppingList', key);
            if (!shoppingList) {
                console.log(`No shopping list found with key ${key}.`);
                return;
            }

            // Find item index
            const itemIndex = shoppingList.items.findIndex(
                item => item.key === itemCode
            );

            // Validate item exists
            if (itemIndex === -1) {
                console.log(
                    `REMOVESHOPITEM: No item found with code ${itemCode} in shopping list: ${shoppingList.name}.`
                );
                return;
            }
                
            // Remove item and update timestamp
            shoppingList.items.splice(itemIndex, 1);
            shoppingList.updateTime = updateTime;
        });
    } catch (error) {
        console.error('Error removing item from shopping list:', error);
    }
};

/**
 * Updates the amount of an item in a shopping list
 * @param {string} key - List identifier
 * @param {string} itemCode - Item identifier
 * @param {number} amount - New amount to set
 * @param {number} updateTime - Timestamp of the update
 */
const setShopItemAmount = (key, itemCode, amount, updateTime) => {
    try {
        realm.write(() => {
            // Find the shopping list
            const shoppingList = realm.objectForPrimaryKey('ShoppingList', key);
            if (!shoppingList) {
                console.log(`No shopping list found with key ${key}.`);
                return;
            }

            // Find and update the item
            const item = shoppingList.items.find(item => item.key === itemCode);
            if (!item) {
                console.log(`SHOPITEMAMOUNT: No item found with code ${itemCode} in shopping list: ${shoppingList.name}.`);
                return;
            }

            // Update amount and timestamp
            item.amount = amount;
            shoppingList.updateTime = updateTime;
        });
    } catch (error) {
        console.error('Error updating item amount in shopping list:', error);
    }
};

// Export database operations
const ListData = {
    getShoppingLists,
    createShoppingList,
    removeShoppingList,
    editListName,
    addShopItem,
    removeShopItem,
    setShopItemAmount,
};

export default ListData;