import { StyleSheet } from 'react-native';
import constants from '../../../../theme/constants';
import colors from '../../../../theme/colors';
import globalstyles from '../../../../theme/globalstyles';

const styles = StyleSheet.create({
    container: {
        marginBottom: constants.spacing.medium,
    },
    label: {
        fontSize: constants.typography.size.xxl,
        fontWeight: constants.typography.weight.medium,
        color: colors.text,
        marginBottom: constants.spacing.small,
        textAlign: constants.layout.align.right,
    },
    selector: {
        flexDirection: constants.layout.flex.direction.rowReverse,
        justifyContent: constants.layout.align.spaceBetween,
        alignItems: constants.layout.align.center,
        backgroundColor: colors.background,
        padding: constants.spacing.medium,
        borderRadius: constants.layout.radius.medium,
        borderWidth: constants.layout.border.small,
        borderColor: colors.input.border,
    },
    selectedText: {
        fontSize: constants.typography.size.large,
        color: colors.text,
        textAlign: constants.layout.align.right,
    },
    arrow: {
        width: constants.layout.size.absolute.xxSmall,
        height: constants.layout.size.absolute.xxSmall,
        tintColor: colors.textSecondary,
    },
    arrowUp: {
        transform: [{ rotate: '180deg' }]
    },
    dropdown: {
        backgroundColor: colors.background,
        borderRadius: constants.layout.radius.medium,
        marginTop: constants.spacing.tiny,
        borderWidth: constants.layout.border.small,
        borderColor: colors.input.border,
        maxHeight: 250,
        ...globalstyles.smallShadow,
    },
    scrollView: {
        paddingVertical: constants.spacing.small,
    },
});

export default styles;