import { StyleSheet } from "react-native";
import colors from "../../theme/colors";
import globalstyles from "../../theme/globalstyles";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
        paddingHorizontal: 20,
    },
    camera: {
        width: "90%",
        height: undefined,
        aspectRatio: 1,
        borderRadius: 10,
        overflow: "hidden",
        ...globalstyles.shadow,
        marginBottom: 20,
    },
    instructionText: {
        fontSize: 16,
        color: colors.lightGray,
        textAlign: "center",
        marginBottom: 20,
    },
    scanAgainButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: colors.themeRed,
        borderRadius: 8,
        marginVertical: 20,
        ...globalstyles.shadow,
    },
    scanAgainButtonText: {
        color: colors.background,
        fontSize: 18,
        fontWeight: "500",
    },
    resultContainer: {
        width: "100%",
        padding: 15,
        borderRadius: 10,
        backgroundColor: colors.faintGray,
        marginTop: 20,
        ...globalstyles.shadow,
    },
    resultHeader: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.background,
        marginBottom: 10,
        textAlign: "center",
    },
    resultContent: {
        maxHeight: 200,
    },
    resultRow: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        marginVertical: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.lightGray,
    },
    value: {
        fontSize: 16,
        fontWeight: "400",
        color: colors.background,
    },
});

export default styles;
