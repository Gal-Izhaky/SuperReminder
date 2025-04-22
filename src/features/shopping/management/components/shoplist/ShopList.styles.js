// React imports
import { StyleSheet } from "react-native";

// Theme imports
import constants from "../../../../../theme/constants";
import colors from "../../../../../theme/colors";

const styles = StyleSheet.create({
    container: {
        marginTop: constants.layout.size.absolute.small,
        height: constants.layout.size.absolute.lists,
        flexGrow: constants.layout.flex.grow.none,
        width: constants.layout.size.relative.full,
        backgroundColor: colors.background,
    }
});

export default styles;