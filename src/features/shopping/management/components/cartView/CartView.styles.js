// React imports
import { StyleSheet } from 'react-native';

// Theme imports
import constants from '../../../../../theme/constants';
import colors from '../../../../../theme/colors';
import globalstyles from '../../../../../theme/globalstyles';

const styles = StyleSheet.create({
    card: {
        ...globalstyles.card,
        borderRadius: constants.layout.radius.large,
        height: constants.layout.size.absolute.medium,
        paddingTop: constants.spacing.tiny,
        marginVertical: constants.spacing.small,
    },
    shadow: globalstyles.shadow,
    deleteIcon: {
        ...globalstyles.deleteIcon,
    },
    deleteButton: {
        marginTop: constants.spacing.tiny,
        width: constants.layout.size.absolute.xSmall,
        height: constants.layout.size.absolute.xSmall,
    },
    right: globalstyles.textRight,
    bold: {
        width: constants.layout.size.absolute.xlarge,
        fontWeight: constants.typography.weight.semiBold,
        fontSize: constants.typography.size.xl2,
    },
    text: {
        fontSize: constants.typography.size.xl,
        marginTop: constants.spacing.tinier - 1,
    }
});

export default styles;