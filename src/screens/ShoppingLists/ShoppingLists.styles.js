import colors from '../../theme/colors';
import { StyleSheet } from 'react-native';
import globalstyles from '../../theme/globalstyles';

const styles = StyleSheet.create({
    top: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
    },
    button: {
        position: "absolute",
        bottom: 60,
        backgroundColor: colors.buttonDark,
        borderRadius: 12,
        paddingVertical:10,
        paddingHorizontal:20,
    },
    buttonText: {
        color:"white",
        fontSize: 32,
        fontWeight: globalstyles.boldText,
    },
    pressableBackground: {
        position: "absolute", 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        backgroundColor: 'transparent',
    },
    ShopListContainer: {
        height: "67%"
    }
}); 


export default styles
