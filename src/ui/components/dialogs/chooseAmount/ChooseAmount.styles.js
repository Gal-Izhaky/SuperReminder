// React imports
import { StyleSheet } from "react-native";

// Theme imports
import constants from "../../../../theme/constants";
import colors from "../../../../theme/colors";

const styles = StyleSheet.create({
    container: {
        alignItems: constants.layout.align.center,
    },
    amountContainer: {
        flexDirection: constants.layout.flex.direction.row,
        alignItems: constants.layout.align.center,
        marginVertical: constants.spacing.mediumSmall,
    },
    button: {
        width: constants.layout.size.absolute.xSmall,
        height: constants.layout.size.absolute.xSmall,
        backgroundColor: colors.primary,
        borderRadius: constants.layout.radius.circle,
        justifyContent: constants.layout.align.center,
        alignItems: constants.layout.align.center,
        marginHorizontal: constants.layout.size.absolute.tiny,
    },
    buttonSmall: {
        width: constants.layout.size.absolute.xSmallMinus,
        height: constants.layout.size.absolute.xSmallMinus,
        backgroundColor: colors.primary,
        borderRadius: constants.layout.radius.circle,
        justifyContent: constants.layout.align.center,
        alignItems: constants.layout.align.center,
        marginHorizontal: constants.spacing.smaller,
    },
    disabledButton: {
        backgroundColor: colors.primaryDark,
    },
    plusMinusIcon: {
        height: constants.layout.size.absolute.xxSmall - 2,
        width: constants.layout.size.absolute.xxSmall - 2,
        textAlign: constants.layout.align.center,
        color: colors.button.text,
        tintColor: colors.button.text,
        padding: 0,
        fontWeight: constants.typography.weight.bold,
    },
    plusMinusIconSmall: {
        height: constants.layout.size.absolute.tiny,
        width: constants.layout.size.absolute.tiny,
    },
    minusIcon: {
        height: constants.layout.size.absolute.xxSmall,
    },
    amountText: {
        fontSize: constants.typography.size.xxl,
        fontWeight: constants.typography.weight.bold,
        minWidth: constants.layout.size.absolute.verySmall,
        textAlign: constants.layout.align.center,
    },
    amountTextSmall: {
        fontSize: constants.typography.size.large,
        maxWidth: constants.layout.size.absolute.smallPlusPlusPlus,
    },  
    input: {
        borderBottomWidth: constants.layout.border.small,
        borderBottomColor: colors.primary,
        maxWidth: constants.layout.size.absolute.mediumLarge,
        height: constants.layout.size.absolute.small,
    },
    inputSmall: {
        maxWidth: constants.layout.size.absolute.smallPlusPlusPlus,
    },
    resetButton: {
        padding: constants.spacing.small,
    },
    resetText: {
        color: colors.primary,
        fontSize: constants.typography.size.small,
    },
});

export default styles;