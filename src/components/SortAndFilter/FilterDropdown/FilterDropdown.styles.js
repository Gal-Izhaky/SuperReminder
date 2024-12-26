import colors from '../../../theme/colors';
import { StyleSheet } from 'react-native';
import globalstyles from '../../../theme/globalstyles';

const styles = StyleSheet.create({
    dropdown: {
        width: "42%",
        marginVertical: 6,
        backgroundColor: colors.background,
        borderRadius: 8,
        paddingVertical: 6,
        marginRight: "4%",
        marginLeft: "auto",

        ...globalstyles.shadow,
    },
    option: {
        display:"flex",
        flexDirection:"row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    optionText: {
        fontSize: 15,
    },
    arrow: {
        width:15,
        height:15,
    }
}); 


export default styles
