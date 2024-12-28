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
        maxWidth: 165,
        textAlign: "right",
        fontSize: 22,
    },
    alignLeft: {
        display: "flex",
        flexDirection: "row-reverse",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "flex-start"
    }
})
    


export default styles