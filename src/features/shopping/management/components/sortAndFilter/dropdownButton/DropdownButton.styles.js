// React imports
import { StyleSheet } from 'react-native';

// Theme imports
import constants from '../../../../../../theme/constants';
import colors from '../../../../../../theme/colors';
import globalStyles from "../../../../../../theme/globalstyles";

const styles = StyleSheet.create({
    container: {
        width: constants.layout.size.relative.almostHalf,
        marginTop: constants.spacing.mediumSmall,
        alignItems: constants.layout.align.center,
    },
    button: {
        height: constants.layout.size.absolute.xSmall,
        backgroundColor: colors.transparent,
    },
    icon: {
        width: constants.layout.size.absolute.xSmall,
        height: constants.layout.size.absolute.xSmall,
    },
    buttonContainer: globalStyles.flexRow,
    text: {
        height: constants.layout.size.relative.full,
        fontSize: constants.typography.size.xl2,
        color: colors.faintGray,
        marginLeft: constants.spacing.small
    }
}); 

export default styles;
