// External imports
import { 
    createDrawerNavigator, 
    DrawerContentScrollView, 
    DrawerItem 
} from "@react-navigation/drawer";
import { Text } from "react-native";

// Screen imports
import ShoppingLists from "../../screens/ShoppingLists/ShoppingLists";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import BarcodeScan from "../../screens/BarcodeScan/BarcodeScan";

// Styles and theme
import styles from "./DrawerNavigator.styles";
import colors from "../../theme/colors";

// Initialize drawer navigator
const Drawer = createDrawerNavigator();

// Screen configuration
const DRAWER_SCREENS = [
    {
        key: "מסך בית",      
        component: HomeScreen
    },
    {
        key: "הרשימות שלך",      
        component: ShoppingLists
    },
    {
        key: "סריקת מוצר",      
        component: BarcodeScan
    }
];

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
        <Drawer.Navigator
            initialRouteName="מסך בית"
            screenOptions={{
                drawerPosition: "right",
                headerShown: false,
                drawerStyle: {
                    backgroundColor: colors.background,
                    width: "65%",
                },
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
    );
};

/**
 * CustomDrawerContent Component
 * Renders the content of the drawer menu
 * 
 * @param {Object} props - Navigation props from drawer
 */
const CustomDrawerContent = (props) => {
    const { routes, index } = props.state;
    const focused = routes[index];

    return (
        <DrawerContentScrollView {...props}>
            <Text style={styles.appName}>Super Reminder</Text>
            {DRAWER_SCREENS.map((screen) => (
                <DrawerItem
                    key={screen.key}
                    label={screen.key}
                    onPress={() => props.navigation.navigate(screen.key)}
                    focused={focused.name === screen.key}
                    activeBackgroundColor="#fee0e1"
                    activeTintColor="#ff6163"
                />
            ))}
        </DrawerContentScrollView>
    );
};

export default DrawerNavigator;