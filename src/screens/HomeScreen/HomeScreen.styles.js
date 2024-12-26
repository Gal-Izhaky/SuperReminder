import { StyleSheet } from "react-native";
import colors from "../../theme/colors";
import globalstyles from "../../theme/globalstyles";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
        padding: 20,
    },
    appName: {
        fontSize: 36,
        fontWeight: "bold",
        color: colors.themeRed,
        marginBottom: 50,
    },
    button: {
        ...globalstyles.shadow,
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        paddingVertical: 15,
        marginBottom: 20,
    },
    shoppingListButton: {
        backgroundColor: colors.buttonDark,
    },
    scanButton: {
        backgroundColor: colors.themeRed,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "600",
        color: colors.background,
    },
});

export default styles;