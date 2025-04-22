// React imports
import { StyleSheet } from 'react-native';

// Theme imports
import constants from '../../../../theme/constants';
import colors from '../../../../theme/colors';
import globalstyles from '../../../../theme/globalstyles';

const styles = StyleSheet.create({
  container: {
    padding: constants.spacing.small,
    justifyContent: constants.layout.align.center,
    alignItems: constants.layout.align.center,
    backgroundColor: colors.transparent,
  }
});

export default styles;