// React imports
import { StyleSheet } from "react-native";

// Theme imports
import constants from "../../../../theme/constants";
import colors from "../../../../theme/colors";

const styles = StyleSheet.create({
    button: {
        borderRadius: constants.layout.radius.medium,
        paddingVertical: constants.spacing.mediumSmall,
        paddingHorizontal: constants.spacing.mediumLarge,
        justifyContent: constants.layout.align.center,
        alignItems: constants.layout.align.center,
    },
    // Variant styles
    primaryButton: {
        backgroundColor: colors.button.primary,
    },
    secondaryButton: {
        backgroundColor: colors.button.secondary,
    },
    tertiaryButton: {
        backgroundColor: colors.button.tertiary,
    },
    // Size styles
    smallButton: {
        paddingVertical: constants.spacing.small,
        paddingHorizontal: constants.spacing.mediumSmall,
    },
    mediumButton: {
        paddingVertical: constants.spacing.mediumSmall,
        paddingHorizontal: constants.spacing.mediumLarge,
    },
    largeButton: {
        paddingVertical: constants.spacing.mediumSmallPlus,
        paddingHorizontal: constants.spacing.large,
    },
    // Text styles
    text: {
        color: colors.button.text,
        fontWeight: constants.typography.weight.semiBold,
        textAlign: constants.layout.align.center,
    },
    smallText: {
        fontSize: constants.typography.size.medium,
    },
    mediumText: {
        fontSize: constants.typography.size.xl2,
    },
    largeText: {
        fontSize: constants.typography.size.xxxl,
    },
});

export default styles;