import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import globalstyles from '../../theme/globalstyles';

const styles = StyleSheet.create({
    card: {
        ...globalstyles.card,
        borderRadius: 15,
        height:100,
        paddingTop: 5,
        marginVertical: 8,
    },
    shadow: globalstyles.shadow,
    delete: {
        ...globalstyles.deleteIcon,
        marginTop: 5,
    },
    right: globalstyles.textRight,
    bold: {
        width:300,
        fontWeight: globalstyles.boldText,
        fontSize: 20,
    },
    text: {
        fontSize: 19,
        marginTop: 2,
    }
})
    


export default styles