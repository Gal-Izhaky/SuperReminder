// External imports
import { createDrawerNavigator, } from "@react-navigation/drawer";

import { memo } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { navigationRef } from "./NavigationRoot";
import { StatusBar } from 'expo-status-bar';
import DRAWER_SCREENS from "./screens";


// Context imports
import { ShoppingListProvider } from "../state/contexts/ShoppingListContext";

// Styles and theme
import styles from "./customDrawerContent/CustomDrawerContent.styles";
import CustomDrawerContent from "./customDrawerContent/CustomDrawerContent";

// Initialize drawer navigator
const Drawer = createDrawerNavigator();


/**
 * DrawerNavigator Component
 * Implements a custom drawer navigation with right-to-left support
 * 
 * Features:
 * - Right-side drawer
 * - Custom styling
 * - No default headers
 * - Custom drawer content
 */
const DrawerNavigator = () => {
    return (
        <ShoppingListProvider>
            <NavigationContainer ref={navigationRef}>
                <StatusBar style="auto" />

                <Drawer.Navigator
                    initialRouteName="homeScreen"
                    backBehavior="history"
                    screenOptions={{
                        drawerPosition: "right",
                        headerShown: false,
                        drawerStyle: styles.drawerStyle,
                        freezeOnBlur: true,
                    }}
                    drawerContent={(props) => <CustomDrawerContent {...props} />}
                >
                    {DRAWER_SCREENS.map((screen) => (
                        <Drawer.Screen 
                            key={screen.key} 
                            name={screen.key} 
                            component={screen.component} 
                        />
                    ))}
                </Drawer.Navigator>
            </NavigationContainer>
        </ShoppingListProvider>

    );
};

export default memo(DrawerNavigator);