import { StyleSheet } from 'react-native';
import constants from '../../../../theme/constants';
import colors from '../../../../theme/colors';
import globalstyles from '../../../../theme/globalstyles';

const styles = StyleSheet.create({
    container: {
        flex: constants.layout.flex.value.one,
    },
    content: {
        padding: constants.spacing.medium,
        paddingBottom: constants.spacing.xxxlarge * 2,
    },
    formTitle: {
        fontSize: constants.typography.size.xl2,
        fontWeight: constants.typography.weight.semiBold,
        color: colors.text,
        textAlign: constants.layout.align.center,
        marginBottom: constants.spacing.medium,
    },
    formSection: {
        backgroundColor: colors.backgroundVariant,
        borderRadius: constants.layout.radius.medium,
        padding: constants.spacing.medium,
    }
});

export default styles;