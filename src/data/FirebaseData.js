// External imports
import { realm } from "./Schemas";

// Constants
const SEARCH_RESULTS_AMOUNT = 10;

/**
 * Firebase Data Service
 * Provides methods for searching, retrieving and writing data to Realm database
 */

/**
 * Searches for items matching the given query
 * @param {string} query - Search query string
 * @returns {Array} Array of matched items, limited by SEARCH_RESULTS_AMOUNT
 */
const searchItem = (query) => {
    if (!query || query.trim() === "") {
        return [];
    }

    const normalizedQuery = query.trim().toLowerCase();
    const allMatches = realm
        .objects("Item")
        .filtered("name CONTAINS[c] $0", normalizedQuery);

    // Categorize matches by relevance
    const exactMatches = [];
    const startsWithMatches = [];
    const containsMatches = [];

    // Sort matches into categories
    for (const item of allMatches) {
        const normalizedName = item.name.toLowerCase();
        if (normalizedName === normalizedQuery) {
            exactMatches.push(item);
        } else if (normalizedName.startsWith(normalizedQuery)) {
            startsWithMatches.push(item);
        } else {
            containsMatches.push(item);
        }
    }

    // Process and sort each category
    const sortedExactMatches = exactMatches.slice(0, SEARCH_RESULTS_AMOUNT);
    
    const sortedStartsWithMatches = startsWithMatches
        .slice(0, SEARCH_RESULTS_AMOUNT)
        .sort((a, b) => a.name.localeCompare(b.name));
    
    const sortedContainsMatches = containsMatches
        .slice(0, SEARCH_RESULTS_AMOUNT)
        .sort((a, b) => a.name.localeCompare(b.name));

    // Combine results in order of relevance
    return [...sortedExactMatches, ...sortedStartsWithMatches, ...sortedContainsMatches]
        .slice(0, SEARCH_RESULTS_AMOUNT);
};

/**
 * Retrieves an item by its primary key
 * @param {string} key - Primary key of the item
 * @returns {Object} Item object if found
 */
const getItemByKey = (key) => {
    return realm.objectForPrimaryKey('Item', key);
};

/**
 * Gets the current update time from metadata
 * @returns {number|undefined} Update timestamp if exists
 */
const getCurrentUpdateTime = () => {
    const metadata = realm.objects("Metadata")[0];
    return metadata?.updateTime || undefined;
};

/**
 * Writes parsed data to the Realm database
 * @param {Object} parsedData - Object containing metadata, supermarkets, and items
 */
const writeData = (parsedData) => {
    realm.write(() => {
        const { metadata, supermarkets, items } = parsedData;

        // Update metadata
        realm.create("Metadata", metadata, "modified");

        // Replace all supermarkets
        realm.delete(realm.objects("Supermarket"));
        supermarkets.forEach((supermarket) =>
            realm.create("Supermarket", supermarket)
        );

        // Handle prices with deduplication
        const uniquePrices = {};
        items.forEach((item) => {
            item.prices = item.prices.map((price) => {
                const id = price.id;
                if (!uniquePrices[id]) {
                    let existingPrice = realm.objectForPrimaryKey("Price", id);
                    if (!existingPrice) {
                        existingPrice = realm.create("Price", price);
                    }
                    uniquePrices[id] = existingPrice;
                }
                return uniquePrices[id];
            });
        });

        // Replace all items
        realm.delete(realm.objects("Item"));
        items.forEach((item) => realm.create("Item", item));
    });
};

// Export service object
const FirebaseData = {
    getCurrentUpdateTime,
    writeData,
    searchItem,
    getItemByKey,
};

export default FirebaseData;
