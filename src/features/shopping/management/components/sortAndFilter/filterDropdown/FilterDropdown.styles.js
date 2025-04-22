// React imports
import { StyleSheet } from 'react-native';

// Theme imports
import constants from '../../../../../../theme/constants';
import colors from '../../../../../../theme/colors';
import globalstyles from '../../../../../../theme/globalstyles';

const styles = StyleSheet.create({
    dropdown: {
        width: constants.layout.size.relative.twoThirds,
        marginVertical: constants.spacing.smaller,
        backgroundColor: colors.background,
        borderRadius: constants.layout.radius.medium,
        paddingVertical: constants.spacing.smaller,
        marginRight: constants.spacing.relative.small,
        marginLeft: constants.spacing.auto,
        ...globalstyles.shadow,
    },
    option: {
        display: constants.layout.display.flex,
        flexDirection: constants.layout.flex.direction.rowReverse,
        justifyContent: constants.layout.align.spaceBetween,
        alignItems: constants.layout.align.center,
        paddingVertical: constants.spacing.small,
        paddingHorizontal: constants.spacing.mediumSmall,
    },
    optionText: {
        fontSize: constants.typography.size.medium,
    },
    arrow: {
        width: constants.layout.size.absolute.tiny,
        height: constants.layout.size.absolute.tiny,
    },
}); 

export default styles;
