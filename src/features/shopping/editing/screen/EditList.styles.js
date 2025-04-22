// React imports
import { StyleSheet } from "react-native";

// Theme imports
import constants from "../../../../theme/constants";
import colors from "../../../../theme/colors";
import globalstyles from "../../../../theme/globalstyles";

const styles = StyleSheet.create({
    background: {
        backgroundColor: colors.background,
        flexGrow: constants.layout.flex.grow.normal,
    },
    top: {
        alignItems: constants.layout.align.right,
        display: constants.layout.display.flex,
        flexDirection: constants.layout.flex.direction.column,
        justifyContent: constants.layout.align.spaceBetween,
    },
});

export default styles;