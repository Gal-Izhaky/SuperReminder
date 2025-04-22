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
        justifyContent: constants.layout.align.center,
        alignItems: constants.layout.align.center,
        backgroundColor: colors.background,
        padding: constants.spacing.medium,
        borderRadius: constants.layout.radius.medium,
        borderWidth: constants.layout.border.small,
        borderColor: colors.input.border,
    },
    icon: {
        width: constants.layout.size.absolute.xSmall,
        height: constants.layout.size.absolute.xSmall,
        marginLeft: constants.spacing.small,
        tintColor: colors.primary,
    },
    selectedText: {
        flex: constants.layout.flex.value.one,
        fontSize: constants.typography.size.large,
        color: colors.text,
        textAlign: constants.layout.align.right,
    },
    arrow: {
        width: constants.layout.size.absolute.xxSmall,
        height: constants.layout.size.absolute.xxSmall,
        tintColor: colors.textSecondary,
        marginRight: constants.spacing.small,
    },
    arrowUp: {
        transform: [{ rotate: '180deg' }]
    },
    dropdown: {
        backgroundColor: colors.background,
        borderRadius: constants.layout.radius.medium,
        marginTop: constants.spacing.tiny,
        borderWidth: constants.layout.border.small,
        borderColor: colors.input.border, // Changed from colors.primary to match input border
        maxHeight: 200,
        ...globalstyles.mediumShadow,
    },
    scrollView: {
        maxHeight: 200,
    },
    item: {
        flexDirection: constants.layout.flex.direction.rowReverse,
        alignItems: constants.layout.align.center,
        paddingHorizontal: constants.spacing.medium,
        paddingVertical: constants.spacing.small,
        borderBottomWidth: constants.layout.border.xsmall,
        borderBottomColor: colors.input.borderLight,
    },
    // Selected item highlight - uses background color instead of checkbox
    selectedItem: {
        backgroundColor: colors.primary + '15', // Adding transparency to primary color
    },
    itemText: {
        fontSize: constants.typography.size.large,
        color: colors.text,
        textAlign: constants.layout.align.right,
    },
    selectedItemText: {
        fontWeight: constants.typography.weight.semiBold,
        color: colors.primary,
    },
    noListsText: {
        padding: constants.spacing.medium,
        textAlign: constants.layout.align.center,
        color: colors.textSecondary,
    }
});

export default styles;