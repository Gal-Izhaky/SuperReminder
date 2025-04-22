// External imports
import { Text, TouchableOpacity, View, Image } from 'react-native';

// Styles
import styles from "./SortDropdown.styles";

/**
 * SortDropdown Component
 * Renders a dropdown menu for sorting options with directional arrows
 * 
 * @param {Array} options - Array of sorting options with key and value properties
 * @param {string} sortKey - Currently selected sort key
 * @param {boolean} isAscending - Sort direction flag
 * @param {Function} setValues - Callback to update sort values
 */
const SortDropdown = ({ options, sortKey, isAscending, setValues }) => {
    // Helper function to determine which arrow icon to display
    const getArrow = () => {
        return isAscending ? 
            require("../../../../../../assets/images/upArrow.png") : 
            require("../../../../../../assets/images/downArrow.png");
    };

    return (
        <View style={styles.dropdown}>
            {options.map((option) => (
                <TouchableOpacity 
                    key={option.value} 
                    style={styles.option}
                    onPress={() => setValues(option.value)}
                    onPressIn={(e) => e.currentTarget.setNativeProps({ style: { transform: [{ scale: 0.98 }] } })}
                    onPressOut={(e) => e.currentTarget.setNativeProps({ style: { transform: [{ scale: 1 }] } })}
                    activeOpacity={1}
                >
                    {/* Option text */}
                    <Text style={styles.optionText}>
                        {option.key}
                    </Text>

                    {/* Show arrow icon if option is selected */}
                    {sortKey === option.value && (
                        <Image 
                            style={styles.arrow}
                            source={getArrow()} 
                        />
                    )}
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default SortDropdown;