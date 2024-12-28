// External imports
import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Image 
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

// Assets
const refreshImage = require("../../../../assets/images/refresh.png");

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
            >
                <Image style={styles.refreshIcon} source={refreshImage} />
            </TouchableOpacity>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    sliderContainer: {
        alignItems: "center",
        width: "100%"
    },
    sizesContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    sizeText: {
        width: 70,
        textAlign: "center",
        fontSize: 20,
    },
    insufficientSizesText: {
        fontSize: 18,
        marginTop: 5,
        textAlign: "center",
    },
    refreshIcon: {
        width: 23,
        height: 23,
    },
    refreshSize: {
        marginRight: 11,
        marginTop: 5,
        alignSelf: "flex-end",
    },
});

export default SizeMenu;