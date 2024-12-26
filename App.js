// react imports
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { StatusBar } from 'expo-status-bar';

// core imports
import { ShoppingListProvider } from "./src/core/contexts/ShoppingListContext";

// imports
import { manageData } from "./src/firebase/DataManager";

// components
import EditList from "./src/screens/EditList/EditList";
import DrawerNavigator from "./src/Navigation/DrawerNavigator/DrawerNavigator";

const stack = createNativeStackNavigator();

const App = () => {
    useEffect(() => {
        // Run on app load
        manageData();

        // Set up interval for periodic updates
        const interval = setInterval(() => {
            manageData();
        }, 60 * 60 * 1000); // Check every hour

        return () => clearInterval(interval); // Clean up the interval on unmount
    }, []);

    // wrap the content in the context provider and the navigation provider
    return <ShoppingListProvider>
        <NavigationContainer>
            <StatusBar style="auto" />
            <stack.Navigator style={{ layoutDirection: 'ltr' }} initialRouteName="Drawer">
                <stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />

                <stack.Screen options={{headerShown: false}} name="עריכת רשימה" component={EditList} />
            </stack.Navigator>
        </NavigationContainer>
    </ShoppingListProvider>
}

export default App;