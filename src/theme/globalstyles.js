// React imports
import { StyleSheet } from "react-native";

// Theme imports
import constants from "./constants";
import colors from "./colors";

const globalstyles = StyleSheet.create({
    // reusable styles
    shadow: {
        shadowColor: colors.shadow,
        shadowOffset: {
            width: 0,
            height: constants.spacing.small,
        },
        shadowOpacity: 0.3,
        shadowRadius: constants.spacing.small,
        elevation: constants.spacing.small,
    },
    // Shadow variants
    smallShadow: {
        shadowColor: colors.shadow,
        shadowOffset: {
            width: 0,
            height: constants.spacing.tiny,
        },
        shadowOpacity: 0.2,
        shadowRadius: constants.spacing.tiny,
        elevation: constants.spacing.tiny,
    },
    mediumShadow: {
        shadowColor: colors.shadow,
        shadowOffset: {
            width: 0,
            height: constants.spacing.smaller,
        },
        shadowOpacity: 0.25,
        shadowRadius: constants.spacing.smaller,
        elevation: constants.spacing.smaller,
    },
    card: {
        width: constants.layout.size.relative.almostFull,
        marginHorizontal: constants.spacing.relative.mediumSmall,
        marginVertical: constants.spacing.mediumSmall,
        backgroundColor: colors.background,
        paddingRight: constants.spacing.mediumSmall,
        display: constants.layout.display.flex,
        flexDirection: constants.layout.flex.direction.rowReverse,
        justifyContent: constants.layout.align.spaceBetween,
        borderWidth: constants.layout.border.medium,
        borderColor: colors.input.border,
    },
    deleteIcon: {
        width: constants.layout.size.absolute.xSmall,
        height: constants.layout.size.absolute.xSmall,
        resizeMode: 'stretch',
        marginLeft: constants.spacing.smaller,
    },
    textRight: {
        textAlign: constants.layout.align.right
    },
    flexRow: {
        display: constants.layout.display.flex,
        flexDirection: constants.layout.flex.direction.row,
        alignItems: constants.layout.align.center,
    },
    charIndicator: {
        position: constants.layout.position.absolute,
        bottom: 0,
        left: constants.spacing.small,
        textAlign: constants.layout.align.left,
        fontSize: constants.typography.size.medium,
    },
    input: {
        marginHorizontal: constants.spacing.auto,
        textAlign: constants.layout.align.right,
        borderRadius: constants.layout.radius.medium,
        borderWidth: constants.layout.border.medium,
        borderColor: colors.input.border,
    },
    semiTransparentBG: {
        backgroundColor: colors.modal.overlay
    },
    // reusable values - these should be replaced by direct imports where used
    contentWidth: constants.layout.size.relative.almostFull,
    boldText: constants.typography.weight.bold,
    semiBoldText: constants.typography.weight.semiBold,
})

export default globalstyles;