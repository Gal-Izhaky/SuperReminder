// React imports
import { StyleSheet } from "react-native";

// Theme imports
import constants from "../../../../../theme/constants";
import colors from "../../../../../theme/colors";
import globalstyles from "../../../../../theme/globalstyles";

const styles = StyleSheet.create({
    txt: {
        fontSize: constants.typography.size.xxl,
    },
    inputContainer: {
        ...globalstyles.input,
        padding: constants.spacing.mediumSmallPlus,
        marginLeft: constants.spacing.relative.mediumSmall,
        marginRight: constants.spacing.relative.medium,
        flexGrow: constants.layout.flex.grow.normal,
        flexShrink: constants.layout.flex.shrink.normal,
    },
    name: {
        textAlign: constants.layout.align.right,
        fontSize: constants.typography.size.xl2,
        textDecorationStyle: undefined,
    },
    row: {
        margin: constants.spacing.auto,
        width: constants.layout.size.relative.full,
        alignItems: constants.layout.align.center,
        flexDirection: constants.layout.flex.direction.rowReverse,
        justifyContent: constants.layout.align.spaceBetween,
    },
    marginTop: {
        marginTop: constants.spacing.mediumLarge,
    },
    charIndicator: globalstyles.charIndicator,
});

export default styles;