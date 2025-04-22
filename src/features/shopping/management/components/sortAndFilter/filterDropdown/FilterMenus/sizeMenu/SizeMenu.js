// External imports
import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Image 
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import styles from './SizeMenu.styles';



// Assets
const refreshImage = require("../../../../../../../../assets/images/refresh.png");

/**
 * SizeMenu Component
 * Displays a dual-slider for filtering items by size range
 * 
 * @param {Array} minMaxVals - Current min and max values [min, max]
 * @param {number} maxItemsVal - Maximum possible value for the slider
 * @param {Function} setMinMaxVals - Callback to update min/max values
 */
const SizeMenu = ({ minMaxVals, maxItemsVal, setMinMaxVals }) => {
    // Handlers
    const multiSliderValuesChange = (values) => {
        setMinMaxVals(values);
    };

    // Render empty state if no items
    if (maxItemsVal === 0) {
        return <Text style={styles.insufficientSizesText}>כל הרשימות ריקות</Text>;
    }
    
    // Main render
    return (
        <View style={styles.sliderContainer}>
            {/* Dual Slider */}
            <MultiSlider
                values={minMaxVals}
                min={0}
                max={maxItemsVal}
                step={1}
                onValuesChange={multiSliderValuesChange}
                markerStyle={{
                    height: 25,
                    width: 25,
                    borderWidth: 3,
                    borderRadius: 50,
                    backgroundColor: "white",
                    borderColor: "#e33c51",
                }}
                trackStyle={{
                    height: 10,
                    borderRadius: 25,
                    backgroundColor: "lightgray",
                }}
                selectedStyle={{
                    backgroundColor: "#e33c51",
                }}
                unselectedStyle={{
                    borderRadius: 2,
                }}
                snapped={true}
                allowOverlap={true}
                markerOffsetY={5}
                sliderLength={200}
            />

            {/* Size Values Display */}
            <View style={styles.sizesContainer}>
                <Text style={styles.sizeText}>{minMaxVals[0]}</Text>
                <Text style={styles.sizeText}>{minMaxVals[1]}</Text>
            </View>
            
            {/* Reset Button */}
            <TouchableOpacity
                activeOpacity={1}
                style={styles.refreshSize}
                onPress={() => multiSliderValuesChange([0, maxItemsVal])}
                onPressIn={(e) => e.currentTarget.setNativeProps({ style: { transform: [{ scale: 0.9 }] } })}
                onPressOut={(e) => e.currentTarget.setNativeProps({ style: { transform: [{ scale: 1 }] } })}
            >
                <Image 
                    style={styles.refreshIcon} 
                    source={refreshImage} 
                />
            </TouchableOpacity>
        </View>
    );
};

export default SizeMenu;