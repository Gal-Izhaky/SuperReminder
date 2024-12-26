import { StyleSheet } from "react-native"
import colors from "../../theme/colors"
import globalstyles from "../../theme/globalstyles"

const styles = StyleSheet.create({
    background: {
        backgroundColor: colors.background,
        flex:1,
    },
    top: {
        alignItems: 'right',
    },
    buttonText: {
        color:"white",
        fontSize: 32,
        fontWeight: globalstyles.boldText,
    },
    button: {
        marginTop: 30,
        backgroundColor: colors.buttonDark,
        borderRadius: 12,
        paddingVertical:10,
        paddingHorizontal:20,
        marginRight:"5%",
        marginLeft: "auto",
    },
    txt: {
        fontSize: 26,
        marginRight:"5%",
    },
    inputContainer: {
        width: "52%",
        padding:13,
        ...globalstyles.input
    },
    name: {
        textAlign: "right",
        fontSize: 20,
        textDecorationStyle: undefined,
    },
    row: {
        margin:"auto",
        width: "100%",
        alignItems: "center",
        flexDirection: "row-reverse",
        justifyContent: "space-between",
    },
    marginTop: {
        marginTop: 25,
    },
    center: {
        textAlign: "center",
    },

    charIndicator: globalstyles.charIndicator,
})

export default styles