// React imports
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Text } from "react-native";

// screens
import ShoppingLists from "../../screens/ShoppingLists/ShoppingLists"
import HomeScreen from "../../screens/HomeScreen/HomeScreen"
import BarcodeScan from "../../screens/BarcodeScan/BarcodeScan"

// styles
import styles from "./DrawerNavigator.styles";
import colors from "../../theme/colors";

const Drawer = createDrawerNavigator();


const DRAWER_SCREENS = [
    {
        "key": "מסך בית",      
        "component": HomeScreen

    },
    {
        "key": "הרשימות שלך",      
        "component": ShoppingLists

    },
    {
        "key": "סריקת מוצר",      
        "component": BarcodeScan

    },
]

const DrawerNavigator = () => {
    return <Drawer.Navigator
        initialRouteName="מסך בית"
        screenOptions={{
            drawerPosition: "right", // Drawer slides in from the right
            headerShown: false, // Disable default drawer headers
            drawerStyle: {
                backgroundColor: colors.background,
                width: "65%",
            },
        }}
        drawerContent={props => {
            const { routes, index } = props.state;
            const focused = routes[index];


            return (
                <DrawerContentScrollView {...props}>
                    <Text style={styles.appName}>Super Reminder</Text>
                    {
                        DRAWER_SCREENS.map((screen) => {
                            return <DrawerItem
                                key={screen.key}
                                label={screen.key}
                                onPress={() => {
                                    props.navigation.navigate(screen.key)
                                }}
                                focused={focused.name === screen.key}
                                activeBackgroundColor="#fee0e1"
                                activeTintColor="#ff6163"
                                >
                            </DrawerItem>
                        })
                    }
                </DrawerContentScrollView>
            )
        }}
    >
        {
            DRAWER_SCREENS.map((screen) => {
                return <Drawer.Screen key={screen.key} name={screen.key} component={screen.component} />

            })
        }
    </Drawer.Navigator>
};

export default DrawerNavigator;