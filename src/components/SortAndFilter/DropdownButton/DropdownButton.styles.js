import colors from '../../../theme/colors';
import { StyleSheet } from 'react-native';
import globalStyles from "../../../theme/globalstyles"

const styles = StyleSheet.create({
    container: {
        width: "45%",
        marginTop: 10,
        alignItems: "center",
    },
    button: {
        height: 35,
        backgroundColor: "transparent",
    },
    icon: {
        width:35,
        height:35,
    },
    buttonContainer: globalStyles.flexRow,
    text: {
        height: "100%",
        fontSize: 22,
        color: colors.faintGray,
        marginLeft: 8
    }
}); 


export default styles
