// React imports
import { StyleSheet } from "react-native";

// Theme imports
import constants from "../../../theme/constants";
import colors from "../../../theme/colors";
import globalstyles from "../../../theme/globalstyles";

const styles = StyleSheet.create({
    container: {
        flex: constants.layout.flex.value.one,
        alignItems: constants.layout.align.center,
        backgroundColor: colors.background,
        padding: constants.spacing.mediumLarge,
    },
    logo: {
        height: constants.layout.size.absolute.xxlarge,
        width: constants.layout.size.absolute.xxlarge,
        marginTop: -constants.spacing.medium,
    },
    button: {
        ...globalstyles.shadow,
        width: constants.layout.size.relative.mostlyFull,
        height: constants.layout.size.absolute.smallPlus,
        alignItems: constants.layout.align.center,
        justifyContent: constants.layout.align.center,
        borderRadius: constants.layout.radius.large,
        paddingVertical: constants.spacing.medium,
        marginBottom: constants.spacing.mediumLarge,
    },
    shoppingListButton: {
        backgroundColor: colors.button.primary,
    },
    remindersButton: {
        backgroundColor: colors.button.secondary,
    },
    scanButton: {
        backgroundColor: colors.button.tertiary,
    },
    buttonText: {
        fontSize: constants.typography.size.xl2,
        fontWeight: constants.typography.weight.semiBold,
        color: colors.background,
    },
});

export default styles;