// react imports
import { FlatList, View, Text, TextInput } from "react-native";
import { useState, useMemo } from "react";

// imports
import debounce from "lodash.debounce";
import FirebaseData from "../../data/FirebaseData.js";

// styles
import styles from "./SearchBar.styles.js";

const SEARCH_DEBOUNCE = 130;

const SearchBar = () => {
    const [searchQuery, setsearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    // Debounced search logic
    const debouncedSearch = useMemo(() => {
        return debounce((query) => {
            const time = Date.now();
            if (query.trim().length < 2) {
                setSearchResults([]);
                return;
            }
            console.log("QUERY", query);
            const results = FirebaseData.searchItem(query);
            console.log("RESULTS: \n", results);
            if (results !== searchResults) {
                setSearchResults(results);
            }
            console.log("SEARCHING TOOK: ", Date.now() - time, "ms");
        }, SEARCH_DEBOUNCE);
    }, []);

    const handleSearch = (text) => {
        console.log(text);
        setsearchQuery(text);
        debouncedSearch(text);
    };
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="חפש מוצר..."
                value={searchQuery}
                onChangeText={handleSearch}
            />
            {
                  searchQuery.length === 1 
                ? <Text style={styles.itemText}>חיפוש קצר מדי</Text>
                : searchQuery.length === 0 || searchResults.length === 0 
                ? "" 
                : <FlatList
                    data={searchResults}
                    keyExtractor={(item) => item.key}
                    style={styles.itemList}
                    renderItem={({ item }) => (
                        <Text style={styles.itemText}>{item.name}</Text>
                    )}
                />
            }
        </View>
    );
};

export default SearchBar;
