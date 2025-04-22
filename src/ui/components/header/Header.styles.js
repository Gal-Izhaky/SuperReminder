// React imports
import { StyleSheet } from "react-native";

// Theme imports
import constants from "../../../theme/constants";
import colors from "../../../theme/colors";

const styles = StyleSheet.create({
    background: {
        backgroundColor: colors.background,
        alignItems: constants.layout.align.center,
        display: constants.layout.display.flex,
        flexDirection: constants.layout.flex.direction.column,
        height: constants.layout.size.absolute.mediumSmall,
    },
    top: {
        flexDirection: constants.layout.flex.direction.row,
        alignItems: constants.layout.align.center,
        justifyContent: constants.layout.align.spaceBetween,
        width: constants.layout.size.relative.almostFull,
        marginTop: constants.spacing.larger,
    },
    title: {
        fontSize: constants.typography.size.xxxxl,
        fontWeight: constants.typography.weight.semiBold,
        textAlign: constants.layout.align.center,
    },
    leftIcon: {
        width: constants.layout.size.absolute.verySmall,
        alignItems: constants.layout.align.left,
        marginTop: constants.spacing.smaller,
    },
    rightIcon: {
        width: constants.layout.size.absolute.verySmall,
        alignItems: constants.layout.align.right,
        marginTop: constants.spacing.smaller,
    },
    horizontalRule: {
        marginTop: constants.spacing.smaller,
        width: constants.layout.size.relative.almostFull,
        height: constants.layout.size.absolute.divider,
        backgroundColor: colors.textSecondary,
        alignSelf: constants.layout.align.center,
    },
});

export default styles;
