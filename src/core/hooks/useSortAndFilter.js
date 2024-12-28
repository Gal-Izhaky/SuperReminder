import { useContext, useState } from "react";
import { ShoppingListContext } from "../contexts/ShoppingListContext";

const options = [
    {key:"לפי תאריך", value:"updateTime"},
    {key:"לפי שם", value:"name"},
    {key:"לפי גודל", value:"amount"},
]

export const useSortAndFilter = () => {
    // sort states
    const [sortKey, setSortKey] = useState("updateTime");
    const [isAscending, setIsAscending] = useState(false);

    // filter states
    const [startDate, setStartDate] = useState(undefined);
    const [endDate, setEndDate] = useState(undefined);
    const [name, setName] = useState("");

    const { lists } = useContext(ShoppingListContext);
    
    const maxItemsVal = Math.max(...lists.map(list => list.items.length));
    
    const [minMaxVals, setMinMaxVals] = useState([0, maxItemsVal]);
    
    const sortLists = (lists) => {
        if (sortKey === "") {
            return lists;
        }

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

    const filterLists = (lists) => {
        // filter by name
        lists = lists.filter(list => list.name.toLowerCase().includes(name.toLowerCase())); 
        
        console.log("DATES: ", startDate, endDate);

        // filter by date
        lists = lists.filter(list => {
            if(startDate && endDate){
                return list.updateTime >= startDate && list.updateTime <= endDate;
            }
            if(startDate){
                return list.updateTime >= startDate && list.updateTime <= new Date(startDate).getTime() + 24 * 60 * 60 * 1000 - 1
            }
            return true;
        })

        // filter by size
        lists = lists.filter(list => {
            return list.items.length >= minMaxVals[0] && list.items.length <= minMaxVals[1]
        })

        return lists;
    };

    const getSortValues = () => {
        return {sortKey, isAscending}
    }

    const setSortValues = (key) => {
        setSortKey(key);
        setIsAscending(prev => (sortKey === key ? !prev : false));
    };

    const getFilterValues = () => {
        return {startDate, endDate, name, minMaxVals, maxItemsVal}
    }

    const setFilterValues = {
        setStartDate: (startDate) => setStartDate(startDate),
        setEndDate: (endDate) => setEndDate(endDate),
        setName: (name) => setName(name),
        setMinMaxVals: (minMaxVals) => setMinMaxVals(minMaxVals),
    }

    return { options, getSortValues, setSortValues, getFilterValues, setFilterValues, sortLists, filterLists };
};
