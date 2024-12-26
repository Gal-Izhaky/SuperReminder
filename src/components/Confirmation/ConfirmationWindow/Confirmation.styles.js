import { StyleSheet } from "react-native";
import globalstyles from "../../../theme/globalstyles";
import colors from "../../../theme/colors";

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    grayBG: globalstyles.semiTransparentBG,
    content: {
        marginTop: -50,
        width: "85%",
        padding: 15,

        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",

        backgroundColor: colors.background,
        borderRadius: 15,
        borderColor: colors.lightGray,
        borderWidth: 2.5,
    },
    title:{
        fontSize: 24,
        fontWeight: globalstyles.boldText,
    },
    inputContainer: {
        width: "90%",
        marginTop: 15,
        padding:13,
        ...globalstyles.input
    },
    input: {
        textAlign: "right",
        fontSize: 24,
    },
    charIndicator: globalstyles.charIndicator,
});

export default styles