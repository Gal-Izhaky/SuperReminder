// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StatusBar } from 'expo-status-bar';

// core imports
import { ShoppingListProvider } from "../../core/contexts/ShoppingListContext";

// components
import EditList from "../../screens/EditList/EditList";
import DrawerNavigator from "../../Navigation/DrawerNavigator/DrawerNavigator";

const stack = createNativeStackNavigator();

const MainContent = () => {
    return (
        <ShoppingListProvider>
            <NavigationContainer>
                <StatusBar style="auto" />
                <stack.Navigator style={{ layoutDirection: "ltr" }} initialRouteName="Drawer">
                    <stack.Screen
                        name="Drawer"
                        component={DrawerNavigator}
                        options={{ headerShown: false }}
                    />

                    <stack.Screen
                        options={{ headerShown: false }}
                        name="עריכת רשימה"
                        component={EditList}
                    />
                </stack.Navigator>
            </NavigationContainer>
        </ShoppingListProvider>
    );
};

export default MainContent;
