// External imports
import { useEffect, useState } from "react";

// Constants
const SORT_FILTER_OPTIONS = [
    { key: "byDate", value: "updateTime" },
    { key: "byName", value: "name" },
    { key: "bySize", value: "amount" },
];

/**
 * Custom hook for sorting and filtering shopping lists
 * Provides functionality for sorting by different criteria and filtering by date, name, and size
 * 
 * @returns {Object} Sorting and filtering methods and states
 */
export const useSortAndFilter = (maxItemsVal) => {
    // Sorting states
    const [sortKey, setSortKey] = useState("updateTime");
    const [isAscending, setIsAscending] = useState(false);

    // Filtering states
    const [startDate, setStartDate] = useState(undefined);
    const [endDate, setEndDate] = useState(undefined);
    const [name, setName] = useState("");
    
    // Context and derived states
    const [minMaxVals, setMinMaxVals] = useState([0, maxItemsVal]);

    // Effects
    useEffect(() => {
        setMinMaxVals([0, maxItemsVal]);
    }, [maxItemsVal]);

    /**
     * Sorts lists based on current sort key and direction
     * @param {Array} lists - Lists to sort
     * @returns {Array} Sorted lists
     */
    const sortLists = (lists) => {
        if (sortKey === "") return lists;

        return lists.sort((a, b) => {
            let comparison = 0;

            if (sortKey === "amount") {
                comparison = a.items.length - b.items.length;
            } else if (typeof a[sortKey] === 'string') {
                comparison = a[sortKey].localeCompare(b[sortKey]);
            } else {
                comparison = a[sortKey] - b[sortKey];
            }
            
            return isAscending ? comparison : -comparison;
        });
    };

    /**
     * Filters lists based on current filter criteria
     * @param {Array} lists - Lists to filter
     * @returns {Array} Filtered lists
     */
    const filterLists = (lists) => {
        // Name filter
        lists = lists.filter(list => 
            list.name.toLowerCase().includes(name.toLowerCase())
        ); 
        
        // Date filter
        lists = lists.filter(list => {
            if (startDate && endDate) {
                return list.updateTime >= startDate && list.updateTime <= endDate;
            }
            if (startDate) {
                const dayEnd = new Date(startDate).getTime() + 24 * 60 * 60 * 1000 - 1;
                return list.updateTime >= startDate && list.updateTime <= dayEnd;
            }
            return true;
        });

        // Size filter
        lists = lists.filter(list => {
            const amount = list.items.length;
            return amount >= minMaxVals[0] && amount <= minMaxVals[1];
        });

        return lists;
    };

    // Getter and setter methods
    const getSortValues = () => ({ sortKey, isAscending });

    const setSortValues = (key) => {
        setSortKey(key);
        setIsAscending(prev => (sortKey === key ? !prev : false));
    };

    const getFilterValues = () => ({
        startDate,
        endDate,
        name,
        minMaxVals,
        maxItemsVal
    });

    const setFilterValues = {
        setStartDate,
        setEndDate,
        setName,
        setMinMaxVals,
    };

    return {
        options: SORT_FILTER_OPTIONS,
        getSortValues,
        setSortValues,
        getFilterValues,
        setFilterValues,
        sortLists,
        filterLists
    };
};
