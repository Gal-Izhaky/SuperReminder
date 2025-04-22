// Initialize firebase
import "./src/core/storage/firebase/Config";

// Initialize translator
import "./src/i18n/i18next";

// Internal imports
import { useDataFetching } from "./src/core/hooks/useDataFetching";
import { useNotificationNavigation } from "./src/core/hooks/useNotificationNavigation";
import useGeofencing from "./src/features/location/useGeofencing";

// Components
import Spinner from "./src/ui/components/feedback/spinner/Spinner";
import DrawerNavigator from "./src/core/navigation/DrawerNavigator";

/**
 * App Component
 * Root component of the application that manages data fetching and navigation
 * 
 * Features:
 * - Periodic data synchronization
 * - Deep linking from notifications
 * - Geofencing functionality
 * - Loading state management
 * 
 * @returns {JSX.Element} The root application component
 */
const App = () => {
    // Initialize geofencing with permissions
    useGeofencing();
    useNotificationNavigation();

    // State management
    const { fetchingData } = useDataFetching();

    return fetchingData ? <Spinner /> : <DrawerNavigator />
 
};

export default App;