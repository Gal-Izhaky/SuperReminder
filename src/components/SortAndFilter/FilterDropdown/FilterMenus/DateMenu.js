import { Image, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker from "react-native-ui-datepicker";

const refreshImage = require("../../../../assets/images/refresh.png")

const DateMenu = (startDate, endDate, setDates) => {
    return <>
        <DateTimePicker
            height={250}
            mode="range"
            startDate={startDate}
            endDate={endDate}
            locale="he-IL"
            onChange={setDates}
        />
        <TouchableOpacity
            activeOpacity={1}
            style={styles.refreshDate}
            onPress={() => {setDates({})}}>
                
            <Image 
                style={styles.refreshIcon}
                source={refreshImage} 
            />
        </TouchableOpacity>
    </>
}

const styles = StyleSheet.create({
    refreshIcon: {
        width:20,
        height:20,
    },
    refreshDate: {
        position: "absolute",
        bottom: 10,
        right: 10,
    },
})

export default DateMenu;