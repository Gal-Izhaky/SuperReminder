import { StyleSheet } from "react-native";
import colors from "../../../../theme/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
        marginBottom: 150,
    },
    logo: {
        height: 350,
        aspectRatio: 1,
        marginBottom: 10,
    },
    spinner: {
        transform: [{scale: 1.65}]
    }
});

export default styles;
