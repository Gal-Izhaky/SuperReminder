import { StyleSheet } from 'react-native';
import constants from '../../../../theme/constants';
import colors from '../../../../theme/colors';

const styles = StyleSheet.create({
    container: {
        flexDirection: constants.layout.flex.direction.rowReverse,
        alignItems: constants.layout.align.center,
        justifyContent: constants.layout.align.spaceBetween,
        marginVertical: constants.spacing.medium,
    },
    label: {
        fontSize: constants.typography.size.xxl,
        fontWeight: constants.typography.weight.medium,
        color: colors.text,
        textAlign: constants.layout.align.right,
    },
    switch: {
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
        marginLeft: constants.spacing.small,
    },
});

export default styles;