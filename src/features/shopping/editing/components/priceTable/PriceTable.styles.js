// React imports
import { StyleSheet } from 'react-native';

// Theme imports
import constants from '../../../../../theme/constants';
import colors from '../../../../../theme/colors';
import globalstyles from '../../../../../theme/globalstyles';

const styles = StyleSheet.create({
    container: {
        width: constants.layout.size.relative.full,
        marginVertical: constants.spacing.medium,
        alignItems: constants.layout.align.center,
    },
    verticalScroll: {
        maxHeight: 350, // Fixed height for approximately 6-7 rows
        width: '100%',
    },
    verticalScrollContent: {
        flexGrow: 0, // Don't allow content to expand
    },
    horizontalScrollContent: {
        // Ensure content doesn't grow unnecessarily
        flexGrow: 0,
    },
    table: {
        borderWidth: constants.layout.border.small,
        borderColor: colors.input.border,
        borderRadius: constants.layout.radius.small,
        overflow: constants.layout.overflow.hidden,
        direction: 'rtl', // Force RTL layout
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: colors.background.secondary,
        borderBottomWidth: 1,
        borderBottomColor: colors.input.border,
    },
    itemRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.input.border,
    },
    totalRow: {
        flexDirection: 'row',
        backgroundColor: colors.background.lightGray,
    },
    chainCell: {
        width: 80,
        paddingVertical: constants.spacing.small,
        paddingHorizontal: constants.spacing.small,
        justifyContent: constants.layout.align.center,
        alignItems: constants.layout.align.center,
        borderLeftColor: colors.input.border,
        borderRightWidth: 0.75,
    },
    amountCell: {
        width: 80,
        paddingVertical: constants.spacing.small,
        paddingHorizontal: constants.spacing.small,
        justifyContent: constants.layout.align.center,
        alignItems: constants.layout.align.center,
        borderLeftColor: colors.input.border,
        borderRightWidth: 0.75,
    },
    nameCell: {
        width: 110,
        paddingVertical: constants.spacing.small,
        paddingHorizontal: constants.spacing.mediumSmall,
        justifyContent: constants.layout.align.center,
        borderLeftColor: colors.input.border,
    },
    headerText: {
        fontSize: constants.typography.size.small,
        fontWeight: constants.typography.weight.bold,
        color: colors.text.primary,
        textAlign: constants.layout.align.center,
    },
    priceText: {
        fontSize: constants.typography.size.small,
        color: colors.text.primary,
        textAlign: constants.layout.align.center,
    },
    amountText: {
        fontSize: constants.typography.size.small,
        color: colors.text.primary,
        textAlign: constants.layout.align.center,
    },
    nameText: {
        fontSize: constants.typography.size.small,
        color: colors.text.secondary,
        textAlign: constants.layout.align.right,
    },
    totalText: {
        fontSize: constants.typography.size.medium,
        fontWeight: constants.typography.weight.bold,
        color: colors.text.primary,
        textAlign: constants.layout.align.right,
    },
    totalPriceText: {
        fontSize: constants.typography.size.medium,
        fontWeight: constants.typography.weight.bold,
        color: colors.primary,
        textAlign: constants.layout.align.center,
    },
});

export default styles;