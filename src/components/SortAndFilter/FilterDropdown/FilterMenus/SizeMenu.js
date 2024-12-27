import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const SizeMenu = (minMaxVals, maxItemsVal, setMinMaxVals) => {
    console.log(minMaxVals)
    const multiSliderValuesChange = (values) => {
        console.log(values)
        setMinMaxVals(values);
    };
    
    return maxItemsVal === 0 ? <Text style={styles.insufficientSizesText}>כל הרשימות ריקות</Text> :
    (
        <View style={styles.sliderContainer}>
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
                    borderRadius: 2
                }}
                snapped={true}
                allowOverlap={true}
                markerOffsetY={5}
                sliderLength={200}
            />
            <View style={styles.sizesContainer}>
                <Text style={styles.sizeText}>{minMaxVals[0]}</Text>
                <Text style={styles.sizeText}>{minMaxVals[1]}</Text>
            </View>
        </View>
    );
}

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
        width: 80,
        textAlign: "center",

        fontSize: 20,
    },
    insufficientSizesText: {
        fontSize: 18,
        marginTop: 5,
        textAlign: "center",
    }
});

export default SizeMenu;