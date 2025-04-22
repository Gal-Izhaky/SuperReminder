import { StyleSheet } from 'react-native';
import constants from '../../../../theme/constants';
import colors from '../../../../theme/colors';
import globalstyles from '../../../../theme/globalstyles';

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        borderRadius: constants.layout.radius.medium,
        marginBottom: constants.spacing.small,
        padding: constants.spacing.medium,
        ...globalstyles.smallShadow,
    },
    header: {
        flexDirection: constants.layout.flex.direction.rowReverse,
        justifyContent: constants.layout.align.spaceBetween,
        alignItems: constants.layout.align.center,
    },
    listName: {
        fontSize: constants.typography.size.large,
        fontWeight: constants.typography.weight.semiBold,
        color: colors.text,
    },
    deleteButton: {
        padding: constants.spacing.tiny,
    },
    deleteIcon: {
        width: 20,
        height: 20,
        // tintColor: colors.danger,
    },
    details: {
        marginTop: constants.spacing.small,
    },
    storesLabel: {
        fontSize: constants.typography.size.medium,
        fontWeight: constants.typography.weight.medium,
        color: colors.text,
        textAlign: constants.layout.align.right,
    },
    storesText: {
        fontSize: constants.typography.size.small,
        color: colors.textSecondary,
        marginTop: constants.spacing.tiny,
        textAlign: constants.layout.align.right,
    },
    footer: {
        flexDirection: constants.layout.flex.direction.rowReverse,
        justifyContent: constants.layout.align.spaceBetween,
        alignItems: constants.layout.align.center,
        marginTop: constants.spacing.medium,
        paddingTop: constants.spacing.small,
        borderTopWidth: constants.layout.border.small,
        borderTopColor: colors.input.borderLight,
    },
    statusText: {
        fontSize: constants.typography.size.medium,
        color: colors.text,
    }
});

export default styles;