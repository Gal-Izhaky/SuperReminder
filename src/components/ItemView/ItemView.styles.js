import { StyleSheet } from 'react-native';
import globalstyles from '../../theme/globalstyles';

const styles = StyleSheet.create({
    card: {
        ...globalstyles.card,
        borderRadius: 12,
        height:75,
        alignItems: "center",
    }, 
    shadow: globalstyles.shadow,
    delete: globalstyles.deleteIcon,
    right: globalstyles.textRight,
    text: {
        fontWeight: globalstyles.semiBoldText,
        maxWidth: 200,
        textAlign: "right",
        fontSize: 22,
    },
})
    


export default styles