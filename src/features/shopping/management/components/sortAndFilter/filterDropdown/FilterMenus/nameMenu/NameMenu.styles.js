// React imports
import { StyleSheet } from 'react-native';

// Theme imports
import constants from '../../../../../../../../theme/constants';
import colors from '../../../../../../../../theme/colors';
import globalstyles from '../../../../../../../../theme/globalstyles';

const styles = StyleSheet.create({
    inputContainer: {
        width: constants.layout.size.relative.almostFull,
        height: constants.layout.size.absolute.small,
        marginTop: constants.layout.size.absolute.tiny,
        padding: constants.spacing.small,
        ...globalstyles.input,
    },
    input: {
        textAlign: constants.layout.align.right,
        fontSize: constants.typography.size.large,
    },
    charIndicator: {
        ...globalstyles.charIndicator,
        fontSize: constants.typography.size.small,
    },
    refreshIcon: {
        width: constants.layout.size.absolute.xxSmall,
        height: constants.layout.size.absolute.xxSmall,
    },
    refreshName: {
        marginRight: constants.spacing.mediumSmall,
        marginTop: constants.spacing.smaller,
        alignSelf: constants.layout.flex.self.end,
    },
});

export default styles;