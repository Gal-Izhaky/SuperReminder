// External imports
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import DateTimePicker from "react-native-ui-datepicker";

import styles from "./DateMenu.styles"

// Assets
const refreshImage = require("../../../../../../../../assets/images/refresh.png");

/**
 * DateMenu Component
 * Provides a date range picker with reset functionality
 *
 * @param {Date} startDate - Initial start date
 * @param {Date} endDate - Initial end date
 * @param {Function} setDates - Callback for date changes
 */
const DateMenu = ({ startDate, endDate, setDates }) => {
    // Render
    return (
        <>
            {/* Date Range Picker */}
            <DateTimePicker
                height={250}
                mode="range"
                startDate={startDate}
                endDate={endDate}
                locale="he-IL"
                onChange={setDates}
            />

            {/* Reset Button */}
            <TouchableOpacity
                activeOpacity={1}
                style={styles.refreshDate}
                onPress={() => setDates({})}
                onPressIn={(e) => e.currentTarget.setNativeProps({ style: { transform: [{ scale: 0.9 }] } })}
                onPressOut={(e) => e.currentTarget.setNativeProps({ style: { transform: [{ scale: 1 }] } })}
            >
                <Image 
                    style={styles.refreshIcon} 
                    source={refreshImage} 
                />
            </TouchableOpacity>
        </>
    );
};

export default DateMenu;