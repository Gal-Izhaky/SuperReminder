// React and core component imports
import React, { memo, useCallback } from 'react';
import { Text, View } from 'react-native';

// Navigation related imports
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

// Internationalization import
import { useTranslation } from 'react-i18next';

// Styles import
import styles from './CustomDrawerContent.styles';

// Navigation constants
import DRAWER_SCREENS from "../screens";

/**
 * CustomDrawerContent Component
 * Renders the content of the drawer menu
 * 
 * @param {Object} props - Navigation props from drawer
 */
const CustomDrawerContent = memo((props) => {
    const { t } = useTranslation(); // Get translation directly in component
    const { routes, index } = props.state;
    const focused = routes[index];
    
    // Create a function to check if a screen is currently active
    const isScreenActive = useCallback((screenKey) => {
        return focused.name === screenKey || (focused.name === "editList" && screenKey === "shoppingLists");
    }, [focused.name]);

    const getNavigationHandler = useCallback((screenKey) => {
        return () => props.navigation.navigate(screenKey);
    }, [props.navigation]);

    return (
        <DrawerContentScrollView {...props}>
            <Text style={styles.appName}>Super Reminder</Text>
            {DRAWER_SCREENS.map((screen) => (
                !screen.hidden ?
                    <DrawerItem
                        key={screen.key}
                        label={t(`screens.${screen.key}`)}
                        onPress={getNavigationHandler(screen.key)}
                        focused={isScreenActive(screen.key)}
                        activeBackgroundColor={styles.drawerBackground}
                        activeTintColor={styles.drawerTint}
                    /> : <View key={screen.key}></View>
            ))}
        </DrawerContentScrollView>
    );
});

export default CustomDrawerContent;