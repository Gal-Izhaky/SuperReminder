// React imports
import { StyleSheet } from 'react-native';

// Theme imports
import constants from '../../../../../../theme/constants';
import colors from '../../../../../../theme/colors';
import globalstyles from '../../../../../../theme/globalstyles';

const styles = StyleSheet.create({
    container: {
        zIndex: constants.layout.zIndex.high,
        position: constants.layout.position.absolute,
        width: constants.layout.size.relative.almostFull,
    },
    rowContainer: {
        ...globalstyles.flexRow,
        justifyContent: constants.layout.align.spaceBetween,
        width: constants.layout.size.relative.full,
    },
    divider: {
        width: constants.layout.size.absolute.dividerSmall,
        height: constants.layout.size.relative.divider,
        backgroundColor: colors.input.border,
        marginTop: constants.spacing.mediumSmall,
        marginHorizontal: constants.spacing.mediumSmall,
    },
    button: { 
        flexGrow: constants.layout.flex.grow.normal,
    },
    absPos: {
        position: constants.layout.position.absolute,
    }
}); 

export default styles;
