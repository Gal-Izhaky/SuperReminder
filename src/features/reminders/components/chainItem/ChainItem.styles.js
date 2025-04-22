import { StyleSheet } from 'react-native';
import constants from '../../../../theme/constants';
import colors from '../../../../theme/colors';

const styles = StyleSheet.create({
    container: {
        marginBottom: constants.spacing.small,
    },
    mainItem: {
        flexDirection: constants.layout.flex.direction.rowReverse,
        alignItems: constants.layout.align.center,
        paddingHorizontal: constants.spacing.medium,
        paddingVertical: constants.spacing.small,
    },
    checkbox: {
        width: constants.layout.size.absolute.xxSmall,
        height: constants.layout.size.absolute.xxSmall,
        borderWidth: constants.layout.border.small,
        borderColor: colors.input.border,
        borderRadius: constants.layout.radius.tiny,
        marginLeft: constants.spacing.small,
        alignItems: constants.layout.align.center,
        justifyContent: constants.layout.align.center,
    },
    checkboxSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    checkmark: {
        color: colors.background,
        fontSize: constants.typography.size.small,
        fontWeight: constants.typography.weight.bold,
        textAlign: constants.layout.align.center,
    },
    mainText: {
        fontSize: constants.typography.size.large,
        fontWeight: constants.typography.weight.semiBold,
        color: colors.text,
        textAlign: constants.layout.align.right,
    },
    subchains: {
        marginRight: constants.spacing.larger,
    },
    subItem: {
        flexDirection: constants.layout.flex.direction.rowReverse,
        alignItems: constants.layout.align.center,
        paddingHorizontal: constants.spacing.medium,
        paddingVertical: constants.spacing.tiny,
    },
    subText: {
        fontSize: constants.typography.size.medium,
        color: colors.text,
        textAlign: constants.layout.align.right,
    }
});

export default styles;