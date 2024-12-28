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
    disabledButton: {
        backgroundColor: 'darkred',
    },
    plusMinusIcon: {
        height: 15,
        width: 15,
        textAlign: "center",
        color: "white",
        tintColor: "white",
        fontSize: 28,
        padding: 0,
        fontWeight: 'bold',
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
    input: {
        direction: "rtl",
        fontSize: 24,
        fontWeight: 'bold',
        minWidth: 40,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.themeRed,
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