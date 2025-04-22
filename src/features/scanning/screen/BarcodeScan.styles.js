// React imports
import { StyleSheet } from "react-native";

// Theme imports
import constants from "../../../theme/constants";
import colors from "../../../theme/colors";
import globalstyles from "../../../theme/globalstyles";

const styles = StyleSheet.create({
    container: {
        flex: constants.layout.flex.value.one,
        justifyContent: constants.layout.align.center,
        alignItems: constants.layout.align.center,
        backgroundColor: colors.background,
        paddingHorizontal: constants.spacing.mediumLarge,
    },
    scanAgainButton: {
        paddingVertical: constants.spacing.mediumSmall,
        paddingHorizontal: constants.spacing.mediumLarge,
        backgroundColor: colors.primary,
        borderRadius: constants.layout.radius.medium,
        marginVertical: constants.spacing.mediumLarge,
        ...globalstyles.shadow,
    },
    scanAgainButtonText: {
        color: colors.background,
        fontSize: constants.typography.size.large,
        fontWeight: constants.typography.weight.medium,
    },
    resultContainer: {
        width: constants.layout.size.relative.full,
        padding: 15,
        borderRadius: 10,
        backgroundColor: colors.faintGray,
        marginTop: 20,
        ...globalstyles.shadow,
    },
    resultHeader: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.background,
        marginBottom: 10,
        textAlign: "center",
    },
    resultContent: {
        maxHeight: 200,
    },
});

export default styles;
