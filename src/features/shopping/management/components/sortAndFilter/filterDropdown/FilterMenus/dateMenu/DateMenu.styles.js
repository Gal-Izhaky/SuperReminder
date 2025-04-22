// React imports
import { StyleSheet } from 'react-native';

// Theme imports
import constants from "../../../../../../../../theme/constants";

const styles = StyleSheet.create({
    refreshIcon: {
        width: constants.layout.size.absolute.xxSmall,
        height: constants.layout.size.absolute.xxSmall,
    },
    refreshDate: {
        position: constants.layout.position.absolute,
        bottom: constants.spacing.tinier,
        right: constants.spacing.mediumSmall,
    },
});

export default styles;
