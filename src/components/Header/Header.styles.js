import { StyleSheet } from "react-native";
import colors from "../../theme/colors";
import globalstyles from "../../theme/globalstyles";

const styles = StyleSheet.create({
    background: {
        backgroundColor: colors.background,
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
    },
    top: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "90%",
        marginTop: 40,
    },
    title: {
        fontSize: 38,
        fontWeight: globalstyles.boldText,
        textAlign: "center",
    },
    leftIcon: {
        width: 40, // To reserve consistent space for alignment
    },
    rightIcon: {
        width: 40, // To reserve consistent space for alignment
        alignItems: "flex-end",
    },
    horizontalRule: {
        marginTop: 5,
        width: "90%",
        height: 4,
        backgroundColor: colors.lightGray,
        alignSelf: "center",
    },
});

export default styles;
