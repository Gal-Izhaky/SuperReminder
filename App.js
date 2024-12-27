// react imports
import { useState, useEffect } from "react";

// imports
import { manageData, shouldDownloadData } from "./src/firebase/DataManager";

// components
import Spinner from "./src/components/Spinner/Spinner";
import MainContent from "./src/components/MainContent/MainContent";


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
            ?   <Spinner /> 
            :   <MainContent />
        }
    </>
}

export default App;