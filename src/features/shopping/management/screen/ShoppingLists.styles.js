// React imports
import { StyleSheet } from 'react-native';

// Theme imports
import constants from '../../../../theme/constants';
import colors from '../../../../theme/colors';
import globalstyles from "../../../../theme/globalstyles";

const styles = StyleSheet.create({
    top: {
        flex: constants.layout.flex.value.one,
        backgroundColor: colors.background,
        alignItems: constants.layout.align.center,
    },
    buttonText: {
        color: colors.button.text,
        fontSize: constants.typography.size.xxxxl,
        fontWeight: constants.typography.weight.semiBold,
    },
    pressableBackground: {
        position: constants.layout.position.absolute, 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
    },
    ShopListContainer: {
        height: constants.layout.size.relative.twoThirds
    }
}); 

export default styles;
