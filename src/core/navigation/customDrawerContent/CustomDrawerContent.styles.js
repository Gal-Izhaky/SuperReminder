// React imports
import { StyleSheet } from "react-native";

// Theme imports
import constants from "../../../theme/constants";
import colors from "../../../theme/colors"

const styles = StyleSheet.create({
    appName: {
        fontSize: constants.typography.size.xxxl,
        fontWeight: constants.typography.weight.bold,
        textAlign: constants.layout.align.center,
        color: colors.primary,
        marginBottom: constants.spacing.medium,
    },
    drawerStyle: {
        width: constants.layout.size.relative.twoThirds,
        backgroundColor: colors.background,
    },
    drawerBackground: colors.primaryLight,
    drawerTint: colors.drawer.tint,
})

export default styles;  