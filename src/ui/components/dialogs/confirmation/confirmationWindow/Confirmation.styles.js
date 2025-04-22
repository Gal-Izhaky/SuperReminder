// React imports
import { StyleSheet } from "react-native";

// Theme imports
import constants from "../../../../../theme/constants";
import colors from "../../../../../theme/colors";
import globalstyles from "../../../../../theme/globalstyles";

const styles = StyleSheet.create({
    center: {
        flex: constants.layout.flex.value.one,
        justifyContent: constants.layout.align.center,
        alignItems: constants.layout.align.center,
    },
    grayBG: globalstyles.semiTransparentBG,
    content: {
        marginTop: -constants.spacing.xxlarge,
        width: constants.layout.size.relative.nearlyAlmostFull,
        padding: constants.layout.size.absolute.tiny,
        flexDirection: constants.layout.flex.direction.column,
        justifyContent: constants.layout.align.spaceBetween,
        alignItems: constants.layout.align.center,
        backgroundColor: colors.background,
        borderRadius: constants.layout.radius.large,
        borderColor: colors.input.border,
        borderWidth: constants.layout.border.medium,
    },
    title:{
        fontSize: constants.typography.size.xxl,
        fontWeight: constants.typography.weight.semiBold,
    },
    inputContainer: {
        width: constants.layout.size.relative.almostFull,
        marginTop: constants.layout.size.absolute.tiny,
        padding: constants.spacing.mediumSmallPlus,
        ...globalstyles.input
    },
    input: {
        textAlign: constants.layout.align.right,
        fontSize: constants.typography.size.xxl,
    },
    charIndicator: globalstyles.charIndicator,
    itemPropertyText: {
        fontSize: constants.typography.size.large,
        color: colors.text,
        marginVertical: constants.spacing.mediumSmall,
        width: constants.layout.size.relative.almostFull,
    },
    notYetSelected: {
        textAlign: constants.layout.align.center,
        fontSize: constants.typography.size.large,
        color: colors.textSecondaryDarker,
        marginTop: constants.spacing.mediumSmall,
    }
});

export default styles;