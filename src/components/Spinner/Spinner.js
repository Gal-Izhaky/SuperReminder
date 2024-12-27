// react imports
import { ActivityIndicator, Text, View } from "react-native";

// styles
import styles from "./Spinner.styles";

const Spinner = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.appName}>Super Reminder</Text>
            <ActivityIndicator style={styles.spinner} size="large" color="#ff4500" />
        </View>
    );
};

export default Spinner;