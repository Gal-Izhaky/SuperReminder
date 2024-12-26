import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";
import globalstyles from "../../../theme/globalstyles"

const styles = StyleSheet.create({
    container: {
        margin:"auto",
        width: globalstyles.contentWidth,
        marginTop: 20,
        flexDirection: "row-reverse",
        justifyContent: "space-between",
    },
    button: {
        width: "45%",
        padding: 10,
        backgroundColor: colors.buttonDark,
        borderRadius: 10,
    },
    buttonText: {
        textAlign: "center",
        color: "white",
        fontWeight: globalstyles.boldText,
        fontSize: 24,
    },
});

export default styles