// React imports
import { StyleSheet } from 'react-native';

// Theme imports
import constants from '../../../../../theme/constants';
import colors from '../../../../../theme/colors';
import globalstyles from '../../../../../theme/globalstyles';

const styles = StyleSheet.create({
    card: {
        ...globalstyles.card,
        borderRadius: constants.layout.radius.medium,
        height: constants.layout.size.absolute.smallPlusPlus,
        alignItems: constants.layout.align.center,
    }, 
    shadow: globalstyles.shadow,
    right: globalstyles.textRight,
    text: {
        fontWeight: constants.typography.weight.semiBold,
        maxWidth: constants.layout.size.absolute.larger,
        textAlign: constants.layout.align.right,
        fontSize: constants.typography.size.xl2,
    },
    alignLeft: {
        display: constants.layout.display.flex,
        flexDirection: constants.layout.flex.direction.rowReverse,
        alignContent: constants.layout.align.center,
        alignItems: constants.layout.align.center,
        justifyContent: constants.layout.flex.self.start
    }
});

export default styles;