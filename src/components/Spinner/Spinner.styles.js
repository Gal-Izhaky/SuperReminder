import { StyleSheet } from "react-native";
import colors from "../../theme/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
        marginBottom: 80,
    },
    appName: {
        fontSize: 36,
        fontWeight: "bold",
        color: colors.themeRed,
        marginBottom: 50,
    },
    spinner: {
        transform: [{scale: 1.65}]
    }
});

export default styles;
