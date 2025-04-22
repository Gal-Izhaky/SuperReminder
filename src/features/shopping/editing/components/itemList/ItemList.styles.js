// React imports
import { StyleSheet } from "react-native";

// Theme imports
import constants from "../../../../../theme/constants";
import colors from "../../../../../theme/colors";

const styles = StyleSheet.create({
    container: {
        width: constants.layout.size.relative.full,
        backgroundColor: colors.background,
    },
    normalHeight: {
        height: 380,
    },
    marginTop: {
        marginTop: constants.spacing.mediumLarge,
    },
    center: {
        textAlign: constants.layout.align.center,
    },
    txt: {
        fontSize: constants.typography.size.xxl,
    },
});

export default styles;