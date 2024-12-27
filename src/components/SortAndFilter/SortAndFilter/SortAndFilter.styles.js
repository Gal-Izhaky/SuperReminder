import colors from '../../../theme/colors';
import { StyleSheet } from 'react-native';
import globalstyles from '../../../theme/globalstyles';

const styles = StyleSheet.create({
    container: {
        zIndex: 2,
        position: "absolute",
        width: "90%",
        marginBottom: 3,
    },
    rowContainer: {
        ...globalstyles.flexRow,
        marginTop: 3,
        justifyContent: "space-between",
        width: "100%",
    },
    divider: {
        width: 2,
        height: "95%",
        backgroundColor: colors.lightGray,
        marginHorizontal: 10,
    },
    button: { 
        flexGrow: 1,
    },
    absPos: {
        position: "absolute",
    }
}); 


export default styles
