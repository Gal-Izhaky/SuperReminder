// React imports
import { StyleSheet } from "react-native";

// Theme imports
import constants from "../../../../../theme/constants";
import colors from "../../../../../theme/colors";
import globalstyles from "../../../../../theme/globalstyles";

const styles = StyleSheet.create({
    container: {
        margin: constants.spacing.auto,
        width: constants.layout.size.relative.almostFull,
        marginTop: constants.spacing.mediumLarge,
        flexDirection: constants.layout.flex.direction.rowReverse,
        justifyContent: constants.layout.align.spaceBetween,
    },
    button: {
        width: constants.layout.size.relative.almostHalf,
    },
    buttonText: {
        textAlign: constants.layout.align.center,
        color: colors.button.text,
        fontWeight: constants.typography.weight.semiBold,
        fontSize: constants.typography.size.xxl,
    },
});

export default styles;