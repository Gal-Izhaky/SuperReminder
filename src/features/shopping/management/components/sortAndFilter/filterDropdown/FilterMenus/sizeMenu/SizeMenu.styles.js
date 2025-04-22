// React imports
import { StyleSheet } from 'react-native';

// Theme imports
import constants from '../../../../../../../../theme/constants';
import colors from '../../../../../../../../theme/colors';

const styles = StyleSheet.create({
    sliderContainer: {
        alignItems: constants.layout.align.center,
        width: constants.layout.size.relative.full
    },
    sizesContainer: {
        display: constants.layout.display.flex,
        flexDirection: constants.layout.flex.direction.row,
        justifyContent: constants.layout.align.spaceBetween,
        alignItems: constants.layout.align.center,
        width: constants.layout.size.relative.full,
    },
    sizeText: {
        width: constants.layout.size.absolute.smallPlusPlus,
        textAlign: constants.layout.align.center,
        fontSize: constants.typography.size.xl2,
    },
    insufficientSizesText: {
        fontSize: constants.typography.size.large,
        marginTop: constants.spacing.smaller,
        textAlign: constants.layout.align.center,
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
