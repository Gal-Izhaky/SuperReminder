// react imports
import { FlatList, View, Text, TextInput, TouchableOpacity, Keyboard, Dimensions } from "react-native";
import { useState, useMemo, useEffect } from "react";

// imports
import debounce from "lodash.debounce";
import FirebaseData from "../../data/FirebaseData.js";

// styles
import styles from "./SearchBar.styles.js";

const SEARCH_DEBOUNCE = 250;

const SearchBar = ({onSelect}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [areResultsVisible, setAreResultsVisible] = useState(false);

    const [fontSize, setFontSize] = useState(20);

    // Adjust font size based on the text length
    const adjustFontSize = (text) => {
        const maxWidth = Dimensions.get('window').width * 0.86; // Reduced width for safety
        const maxFontSize = 24;
        const minFontSize = 14;

        // Create temporary text measurement element
        const measureText = (text, fontSize) => {
            // Different multipliers for different character types
            return text.split('').reduce((width, char) => {
            // Hebrew characters (including final forms)
            if (/[\u0590-\u05FF\uFB1D-\uFB4F]/.test(char)) {
                return width + fontSize * 0.75; // Increased width for Hebrew
            }
            // English uppercase
            if (/[A-Z]/.test(char)) {
                return width + fontSize * 0.7;
            }
            // English lowercase
            if (/[a-z]/.test(char)) {
                return width + fontSize * 0.6;
            }
            // Numbers and other characters
            return width + fontSize * 0.5;
            }, 0);
        };

        // If text is short enough to fit at max size, use max size
        if (measureText(text, maxFontSize) <= maxWidth) {
            setFontSize(maxFontSize);
            return;
        }

        // Binary search to find the largest font size that fits
        let low = minFontSize;
        let high = maxFontSize;
        
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const width = measureText(text, mid);
            
            if (Math.abs(width - maxWidth) < 2) {
                setFontSize(mid);
                return;
            }
            
            if (width > maxWidth) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        
        setFontSize(high);
    };

    useEffect(() => {
        adjustFontSize(searchQuery);
    }, [searchQuery]);

    // Debounced search logic
    const debouncedSearch = useMemo(() => {
        return debounce((query) => {
            const time = Date.now();
            if (query.trim().length < 2) {
                setSearchResults([]);
                return;
            }

            const results = FirebaseData.searchItem(query);
            if (results !== searchResults) {
                setSearchResults(results);
            }
            console.log("SEARCHING TOOK: ", Date.now() - time, "ms");
        }, SEARCH_DEBOUNCE);
    }, []);

    const focusOnBar = () => {
        setAreResultsVisible(true);
        onSelect(null);
    }

    const selectItem = (item) => {
        setAreResultsVisible(false); 
        onSelect(item)
        setSearchQuery(item.name);
        debouncedSearch(item.name);
        Keyboard.dismiss();
    }

    const handleSearch = (text) => {
        setSearchQuery(text);
        debouncedSearch(text);
    };
    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.searchInput, { fontSize }]}
                onFocus={focusOnBar}
                placeholder="חפש מוצר..."
                onChangeText={handleSearch}
                value={searchQuery}
                keyboardType="visible-password"
                numberOfLines={1}/>
            {
                  searchQuery.length === 1 
                ? <Text style={styles.itemText}>חיפוש קצר מדי</Text>
                : searchQuery.length === 0 || searchResults.length === 0 ? "" 
                : areResultsVisible ? 
                <FlatList
                    data={searchResults}
                    keyExtractor={(item) => item.key}
                    style={styles.itemList}
                    keyboardShouldPersistTaps='handled'
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => selectItem(item)}>
                            <Text style={styles.itemText}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
                : ""
            }
        </View>
    );
};

export default SearchBar;
