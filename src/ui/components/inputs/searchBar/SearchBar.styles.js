// React imports
import { StyleSheet } from "react-native";

// Theme imports
import constants from "../../../../theme/constants";
import colors from "../../../../theme/colors";
import globalstyles from "../../../../theme/globalstyles";

// Component constants

const styles = StyleSheet.create({
    container: {
        width: constants.layout.size.relative.full,
        backgroundColor: colors.background,
        marginTop: 0,
        height: constants.spacing.auto,
        paddingHorizontal: constants.spacing.medium,
    },
    searchInput: {
        width: constants.layout.size.relative.full,
        padding: constants.layout.size.absolute.tiny,
        fontSize: 22,
        ...globalstyles.input
    },
    itemList: {
        width: constants.layout.size.relative.full,
        borderRadius: constants.layout.radius.medium,
        borderWidth: 2,
        borderColor: colors.input.border,
        backgroundColor: colors.background,
        minHeight: "0%", // Adjust to content height
        maxHeight: constants.layout.size.absolute.mediumLarge,
    },
    itemText: {
        height: constants.layout.size.absolute.verySmall,
        fontSize: constants.typography.size.medium,
        padding: constants.spacing.small,
        borderBottomWidth: constants.layout.border.small,
        borderBottomColor: "#eee",
    },
    searchQuery: {
        width: constants.layout.size.absolute.medium,
        height: constants.layout.size.absolute.small,
        backgroundColor: "yellow",
    }
});

export default styles;
