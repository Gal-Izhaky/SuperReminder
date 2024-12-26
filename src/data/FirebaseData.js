// imports
import { realm } from "./Schemas";

const SEARCH_RESULTS_AMOUNT = 10;

const searchItem = (query) => {
    if (!query || query.trim() === "") {
        return []; // Return an empty array for empty queries
    }

    // Normalize query for consistency
    const normalizedQuery = query.trim().toLowerCase();

    console.log("fetching data")

    // Fetch all items matching the query
    const allMatches = realm
        .objects("Item")
        .filtered("name CONTAINS[c] $0", normalizedQuery);


    console.log("All matches length", allMatches.length)

    // Rank results based on relevance
    const exactMatches = [];
    const startsWithMatches = [];
    const containsMatches = [];

    for(const item of allMatches){
        const normalizedName = item.name.toLowerCase();

        // Assign scores based on relevance criteria
        if (normalizedName === normalizedQuery) {
            exactMatches.push(item)
        } else if (normalizedName.startsWith(normalizedQuery)) {
            startsWithMatches.push(item)
        } else {
            containsMatches.push(item)
        }
    };
    const sortedExactMatches = exactMatches.slice(0, SEARCH_RESULTS_AMOUNT)
    console.log("EXACT: ", sortedExactMatches)
        
    const sortedStartsWithMatches = startsWithMatches.slice(0, SEARCH_RESULTS_AMOUNT)
    console.log("STARTS WITH: ", sortedStartsWithMatches)
    sortedStartsWithMatches.sort((a, b) => a.name.localeCompare(b.name));

    const sortedContainsMatches = containsMatches.slice(0, SEARCH_RESULTS_AMOUNT)
    console.log("CONTAINS: ", sortedContainsMatches)
    sortedContainsMatches.sort((a, b) => a.name.localeCompare(b.name));

    // Sort results by relevance score and other criteria (e.g., alphabetical order for ties)
    const sortedResults = [
        ...sortedExactMatches,
        ...sortedStartsWithMatches,
        ...sortedContainsMatches,
    ];

    // Return top 15 results
    return sortedResults.slice(0, SEARCH_RESULTS_AMOUNT);
};

const getItemByKey = (key) => {
    const Item = realm.objectForPrimaryKey('Item', key);
    return Item;
}

const getCurrentUpdateTime = () => {
    const metadata = realm.objects("Metadata")[0];
    return metadata?.updateTime || undefined;
};

const writeData = (parsedData) => {
    realm.write(() => {
        const { metadata, supermarkets, items } = parsedData;

        // Update Metadata
        realm.create("Metadata", metadata, "modified");

        // Replace supermarkets
        realm.delete(realm.objects("Supermarket"));
        supermarkets.forEach((supermarket) =>
            realm.create("Supermarket", supermarket)
        );

        // avoid price object duplicates
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
                return uniquePrices[id]; // reuse
            });
        });

        // Replace items
        realm.delete(realm.objects("Item"));
        items.forEach((item) => realm.create("Item", item));
    });
};

const FirebaseData = {
    getCurrentUpdateTime,
    writeData,
    searchItem,
    getItemByKey,
};

export default FirebaseData;
