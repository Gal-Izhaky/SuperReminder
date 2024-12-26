import { database, ref, get } from "./Config";
import FirebaseData from "../data/FirebaseData";

const fetchAllData = async () => {
    const snapshot = await get(ref(database, "/"));
    return snapshot.val();
};

const parseFunction = (rawData) => {
    // Parse metadata
    const metadata = {
        id: "metadata",
        itemsCounter: rawData.metadata?.["items-counter"] || 0,
        updateTime: rawData.metadata?.["last-updated"] || "",
        supermarketsCounter: rawData.metadata?.["supermarkets-counter"] || 0,
    };

    // Parse supermarkets
    const supermarkets = Object.values(rawData.supermarkets || {}).map((supermarket) => ({
        address: supermarket.address,
        brand: supermarket.brand,
        city: supermarket.city,
        latitude: supermarket.latitude,
        longitude: supermarket.longitude,
    }));

    // Parse items
    const items = Object.entries(rawData.items || {}).map(([key, item]) => ({
        key: key,
        name: item.name,
        weighted: item.weighted,
        measurementUnit: item.measurementUnit,
        prices: (item.prices || []).map((price) => ({
            id: `${price.brand}_${price.price}`,
            brand: price.brand,
            price: price.price,
        })),
    }));

    return { metadata, supermarkets, items };
};

const fetchMetadata = async () => {
    const snapshot = await get(ref(database, "/metadata/last-updated"));
    return snapshot.val();
  };

const shouldDownloadData = async () => {
    // check for current version
    const currentVersion = FirebaseData.getCurrentUpdateTime();

    if (!currentVersion){
        return true;
    } 

    const lastUpdatedTime = parseInt(currentVersion, 10);
    const currentTime = Date.now();
    const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000;

    console.log(currentTime - lastUpdatedTime)


    if(currentTime - lastUpdatedTime < oneWeekInMillis){
        return false;
    };

    // check for database version (in case the data did not update)
    const lastUpdate = fetchMetadata()

    return lastUpdate !== currentVersion;
};

const manageData = async () => {
    try {
        if (!await shouldDownloadData()) {
            console.log("Data is up-to-date. No download needed.");
            return;
        }
        console.log("Started fetching")
        const rawData = await fetchAllData();
        console.log("Fetched all data!");
        const parsedData = parseFunction(rawData);
        console.log("Parsed the data");
        FirebaseData.writeData(parsedData);
        console.log("Data successfully downloaded and stored in Realm.");
    } catch (error) {
        console.error("Error managing data:", error);
    }
};

export { manageData };
