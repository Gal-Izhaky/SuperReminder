// React imports
import { StyleSheet } from "react-native";

// Theme imports
import constants from "../../../../theme/constants";
import colors from "../../../../theme/colors";
import globalstyles from "../../../../theme/globalstyles";

const styles = StyleSheet.create({
    camera: {
        width: constants.layout.size.relative.almostFull,
        aspectRatio: 1, // Maintain a square aspect ratio
        borderRadius: constants.layout.radius.medium,
        overflow: constants.layout.overflow.hidden,
        ...globalstyles.shadow,
        marginBottom: constants.spacing.mediumLarge,
    },
    instructionText: {
        fontSize: constants.typography.size.medium,
        color: colors.textSecondary,
        textAlign: constants.layout.align.center,
        marginBottom: constants.spacing.mediumLarge,
    },
});

export default styles;