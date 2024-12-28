// External imports
import { ActivityIndicator, Text, View } from "react-native";

// Styles
import styles from "./Spinner.styles";

/**
 * Spinner Component
 * Displays a loading spinner with the app name
 * Used as a loading indicator throughout the application
 */
const Spinner = () => {
    // Render
    return (
        <View style={styles.container}>
            {/* App name display */}
            <Text style={styles.appName}>Super Reminder</Text>

            {/* Loading indicator */}
            <ActivityIndicator 
                style={styles.spinner} 
                size="large" 
                color="#ff4500" 
            />
        </View>
    );
};

export default Spinner;