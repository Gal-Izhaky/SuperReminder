// React imports
import { StyleSheet, Dimensions } from 'react-native';

// Theme imports
import constants from '../../../../../theme/constants';
import colors from '../../../../../theme/colors';
import globalstyles from '../../../../../theme/globalstyles';

// Get screen dimensions 
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    // Modal background
    center: {
        width: width,
        height: height,
        justifyContent: constants.layout.align.center,
        alignItems: constants.layout.align.center,
    },
    grayBG: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    
    // Modal content container
    content: {
        width: '90%',
        maxHeight: '80%',
        backgroundColor: colors.background,
        borderRadius: constants.layout.radius.medium,
        borderWidth: 3,
        borderColor: colors.input.border,
        paddingVertical: constants.spacing.mediumLarge,
        paddingHorizontal: constants.spacing.medium,
        elevation: 5,
        alignItems: constants.layout.align.center,
    },
    
    // Title
    title: {
        fontSize: constants.typography.size.xxl,
        fontWeight: constants.typography.weight.bold,
        color: colors.text.primary,
        textAlign: constants.layout.align.center,
    },
    
    // Scroll container
    scrollContainer: {
        width: '100%',
        marginBottom: constants.spacing.medium,
        maxHeight: '70%',
    },
    
    // Button container and styles
    buttonContainer: {
        width: '100%',
        marginTop: constants.spacing.small,
        flexDirection: constants.layout.flex.direction.row,
        justifyContent: constants.layout.align.center,
    },
    button: {
        paddingVertical: constants.spacing.medium,
        paddingHorizontal: constants.spacing.large,
        borderRadius: constants.layout.radius.small,
        minWidth: 150,
        alignItems: constants.layout.align.center,
    },
    resultRow: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        marginVertical: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        borderColor: colors.text,
    },
    value: {
        fontSize: 16,
        fontWeight: "400",
        color: colors.text,
    },
});

export default styles;