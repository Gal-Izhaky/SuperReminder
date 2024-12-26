import { StyleSheet } from "react-native";
import colors from "../../theme/colors";
import globalstyles from "../../theme/globalstyles";

const ITEM_HEIGHT = 40;
const MAX_ITEMS_IN_LIST = 4;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        marginTop: 0,
        height: "auto",
        padding: 16,
    },
    searchInput: {
        width: "95%",
        padding:15,
        fontSize: 22,

        ...globalstyles.input
    },
    itemList: {
        width: "95%",
        marginHorizontal: "auto",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.lightGray,
        backgroundColor: colors.background,
        minHeight: "0%", // Adjust to content height
        maxHeight: ITEM_HEIGHT * MAX_ITEMS_IN_LIST, // Limit height to 40% of the screen
    },
    itemText: {
        height: ITEM_HEIGHT,
        fontSize: 16,
        padding: 8,
        // textAlign: "left",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
});

export default styles;
