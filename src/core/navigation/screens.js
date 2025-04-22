// Screen imports
import HomeScreen from "../../features/home/screen/HomeScreen";
import BarcodeScan from "../../features/scanning/screen/BarcodeScan";
import SmartReminders from "../../features/reminders/screen/SmartReminders";
import ShoppingLists from "../../features/shopping/management/screen/ShoppingLists";
import EditList from "../../features/shopping/editing/screen/EditList";

// Screen configuration
export default DRAWER_SCREENS = [
    {
        key: "homeScreen",      
        component: HomeScreen,
    },
    {
        key: "shoppingLists",      
        component: ShoppingLists,
    },
    {
        key: "smartReminders",
        component: SmartReminders,
    },
    {
        key: "barcodeScanner",      
        component: BarcodeScan,
    },
    {
        key: "editList",
        component: EditList,
        hidden: true,
    }
];