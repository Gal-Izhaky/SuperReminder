import { StyleSheet } from "react-native";
import colors from "../../theme/colors";

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    button: {
        width: 35,
        height: 35,
        backgroundColor: colors.themeRed,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 15,
    },
    buttonSmall: {
        width: 25,
        height: 25,
        backgroundColor: colors.themeRed,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    disabledButton: {
        backgroundColor: 'darkred',
    },
    plusMinusIcon: {
        height: 18,
        width: 18,
        textAlign: "center",
        color: "white",
        tintColor: "white",
        padding: 0,
        fontWeight: 'bold',
    },
    plusMinusIconSmall: {
        height: 15,
        width: 15,
    },
    minusIcon: {
        height: 20,
    },
    amountText: {
        fontSize: 24,
        fontWeight: 'bold',
        minWidth: 40,
        textAlign: 'center',
    },
    amountTextSmall: {
        fontSize: 18,
        maxWidth: 80,
    },  
    input: {
        direction: "rtl",
        borderBottomWidth: 1,
        borderBottomColor: colors.themeRed,
        maxWidth: 140,
        height: 50,
    },
    inputSmall: {
        maxWidth: 80,
    },
    resetButton: {
        padding: 8,
    },
    resetText: {
        color: colors.themeRed,
        fontSize: 14,
    },
});

export default styles;