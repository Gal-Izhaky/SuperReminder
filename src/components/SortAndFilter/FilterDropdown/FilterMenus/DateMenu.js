// External imports
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker from "react-native-ui-datepicker";

// Assets
const refreshImage = require("../../../../assets/images/refresh.png");

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
            >
                <Image style={styles.refreshIcon} source={refreshImage} />
            </TouchableOpacity>
        </>
    );
};

// Styles
const styles = StyleSheet.create({
    refreshIcon: {
        width: 23,
        height: 23,
    },
    refreshDate: {
        position: "absolute",
        bottom: 10,
        right: 10,
    },
});

export default DateMenu;