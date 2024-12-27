// react imports
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator } from 'react-native';

// core imports
import { ShoppingListProvider } from "./src/core/contexts/ShoppingListContext";

// imports
import { manageData, shouldDownloadData } from "./src/firebase/DataManager";

// components
import EditList from "./src/screens/EditList/EditList";
import DrawerNavigator from "./src/Navigation/DrawerNavigator/DrawerNavigator";

const stack = createNativeStackNavigator();

const App = () => {
    const [fetchingData, setFetchingData] = useState(false);
    
    useEffect(() => {
        if(!fetchingData){
            return 
        }

        const fetchData = async () => {
            try{
                console.log(fetchingData)
                await manageData();
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setFetchingData(false);
            }
        }
        fetchData();

    }, [fetchingData])

    useEffect(() => {
        const startFetching = async () => {
            if(fetchingData || !await shouldDownloadData()){
                console.log("Data is up-to-date. No download needed.");
                return 
            }
            
            console.log("FETCHING DATA")
            setFetchingData(true);
        }

        // Run on app load
        startFetching();
        
        // Set up interval for periodic updates
        const interval = setInterval(() => {
            startFetching()
        }, 60 * 60 * 1000); // Check every hour

        return () => clearInterval(interval)
    }, []);

    // wrap the content in the context provider and the navigation provider
    return <>
        {
            fetchingData 
            ?   <ActivityIndicator size="large" color="#ff4500" /> 
            :   <ShoppingListProvider>
                    <NavigationContainer>
                        <StatusBar style="auto" />
                        <stack.Navigator style={{ layoutDirection: 'ltr' }} initialRouteName="Drawer">
                            <stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />

                            <stack.Screen options={{headerShown: false}} name="עריכת רשימה" component={EditList} />
                        </stack.Navigator>
                    </NavigationContainer>
                </ShoppingListProvider>
        }
    </>
}

export default App;