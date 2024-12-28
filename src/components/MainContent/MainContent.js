// External imports
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from 'expo-status-bar';

// Context imports
import { ShoppingListProvider } from "../../core/contexts/ShoppingListContext";

// Screen components
import EditList from "../../screens/EditList/EditList";
import DrawerNavigator from "../../Navigation/DrawerNavigator/DrawerNavigator";

// Initialize navigation stack
const Stack = createNativeStackNavigator();

/**
 * MainContent Component
 * Main navigation container that wraps the app's navigation structure
 * Provides shopping list context to all child components
 * 
 * @returns {JSX.Element} The main navigation structure of the app
 */
const MainContent = () => {
    return (
        <ShoppingListProvider>
            <NavigationContainer>
                <StatusBar style="auto" />
                <Stack.Navigator 
                    style={{ layoutDirection: "ltr" }} 
                    initialRouteName="Drawer"
                >
                    {/* Main drawer navigation */}
                    <Stack.Screen
                        name="Drawer"
                        component={DrawerNavigator}
                        options={{ headerShown: false }}
                    />

                    {/* Edit list screen */}
                    <Stack.Screen
                        name="עריכת רשימה"
                        component={EditList}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </ShoppingListProvider>
    );
};

export default MainContent;
