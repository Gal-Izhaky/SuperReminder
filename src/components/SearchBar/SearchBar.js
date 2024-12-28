// External imports
import { useState, useMemo, useEffect } from "react";
import {
    FlatList,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Dimensions,
} from "react-native";
import debounce from "lodash.debounce";

// Internal imports
import FirebaseData from "../../data/FirebaseData.js";
import styles from "./SearchBar.styles.js";

// Constants
const SEARCH_DEBOUNCE = 250;

/**
 * SearchBar Component
 * Provides a search interface with auto-complete functionality and dynamic font sizing
 *
 * @param {Function} onSelect - Callback when an item is selected
 */
const SearchBar = ({ onSelect }) => {
    // State management
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [areResultsVisible, setAreResultsVisible] = useState(false);
    const [fontSize, setFontSize] = useState(20);

    /**
     * Calculate text width based on character types
     * @param {string} text - Text to measure
     * @param {number} fontSize - Current font size
     * @returns {number} - Calculated width in pixels
     */
    const measureText = (text, fontSize) => {
        return text.split("").reduce((width, char) => {
            if (/[\u0590-\u05FF\uFB1D-\uFB4F]/.test(char)) return width + fontSize * 0.75;
            if (/[A-Z]/.test(char)) return width + fontSize * 0.7;
            if (/[a-z]/.test(char)) return width + fontSize * 0.6;
            return width + fontSize * 0.5;
        }, 0);
    };

    /**
     * Dynamically adjust font size based on text length using binary search
     * @param {string} text - Input text to adjust font size for
     */
    const adjustFontSize = (text) => {
        // Constants for font size constraints
        const maxWidth = Dimensions.get("window").width * 0.86;
        const maxFontSize = 24;
        const minFontSize = 14;

        // Quick check if max font size fits
        if (measureText(text, maxFontSize) <= maxWidth) {
            setFontSize(maxFontSize);
            return;
        }

        // Binary search for optimal font size
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

    // Event handlers
    /**
     * Handles search input changes
     * @param {string} text - Search query text
     */
    const handleSearch = (text) => {
        setSearchQuery(text);
        debouncedSearch(text);
    };

    /**
     * Handles focus on search bar
     */
    const focusOnBar = () => {
        setAreResultsVisible(true);
        onSelect(null);
    };

    /**
     * Handles item selection from search results
     * @param {Object} item - Selected item
     */
    const selectItem = (item) => {
        setAreResultsVisible(false);
        onSelect(item);
        setSearchQuery(item.name);
        debouncedSearch(item.name);
        Keyboard.dismiss();
    };
    // Memoized debounced search function
    const debouncedSearch = useMemo(() => {
        return debounce((query) => {
            // Skip search for very short queries
            if (query.trim().length < 2) {
                setSearchResults([]);
                return;
            }

            // Search items and update results if changed
            const results = FirebaseData.searchItem(query);
            if (results !== searchResults) {
                setSearchResults(results);
            }
        }, SEARCH_DEBOUNCE);
    }, []);

    // Effects
    useEffect(() => {
        // Update font size when search query changes
        adjustFontSize(searchQuery);
    }, [searchQuery]);

    // Render component
    return (
        <View style={styles.container}>
            {/* Search input field */}
            <TextInput
                style={[styles.searchInput, { fontSize }]}
                onFocus={focusOnBar}
                placeholder="חפש מוצר..."
                onChangeText={handleSearch}
                value={searchQuery}
                keyboardType="visible-password"
                numberOfLines={1}
            />

            {/* Search results display */}
            {searchQuery.length === 1 ? (
                // Show message for too short queries
                <Text style={styles.itemText}>חיפוש קצר מדי</Text>
            ) : searchQuery.length === 0 || searchResults.length === 0 ? (
                // Show nothing for empty query or no results
                ""
            ) : areResultsVisible ? (
                // Display search results list
                <FlatList
                    data={searchResults}
                    keyExtractor={(item) => item.key}
                    style={styles.itemList}
                    keyboardShouldPersistTaps="handled"
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => selectItem(item)}>
                            <Text style={styles.itemText}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            ) : (
                ""
            )}
        </View>
    );
};

export default SearchBar;
