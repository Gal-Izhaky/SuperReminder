import { StyleSheet } from "react-native";
import colors from "./colors";

const globalstyles = StyleSheet.create({
    // reusable styles
    shadow: {
        shadowColor: colors.shadow,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    card : {
        width: '90%',

        marginHorizontal:"5%",
        marginVertical: 10,

        backgroundColor: colors.background,

        paddingRight:10,

        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "space-between",

        borderWidth:2,
        borderColor: colors.lightGray,
    },
    deleteIcon: {
        width: 35,
        height: 35,
        resizeMode: 'stretch',
        marginLeft: 10,
    },
    textRight: {
        textAlign: "right"
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    charIndicator: {
        position: "absolute",
        bottom:0,
        left: 5,
        textAlign: "left",
        fontSize: 16,
    },
    input: {
        marginHorizontal: "auto",
        textAlign: "right",
        borderRadius: 10,
        borderWidth:2,
        borderColor: colors.lightGray,
    },
    semiTransparentBG: {
        backgroundColor: colors.grayBG
    },
    // reusable values
    contentWidth: "90%",
    boldText: "600",
    semiBoldText: "500",
})

export default globalstyles