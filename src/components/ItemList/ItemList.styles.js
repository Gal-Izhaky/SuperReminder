import { StyleSheet } from "react-native"
import colors from "../../theme/colors"

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: colors.background,
    },
    normalHeight: {
        height:"60%",
    },
    autoMinHeight: {
        minHeight: "auto",
        maxHeight: "40%",
    }
})

export default styles