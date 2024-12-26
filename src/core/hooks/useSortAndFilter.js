import { useState, useCallback } from "react";

const sortOptions = [
    {key:"לפי תאריך", value:"updateTime"},
    {key:"לפי שם", value:"name"},
    {key:"לפי גודל", value:"amount"},
]

export const useSortAndFilter = () => {
    const [sortKey, setSortKey] = useState("updateTime");
    const [isAscending, setIsAscending] = useState(false);

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
        // implement filter logic
    };

    const getSortValues = () => {
        return {sortKey, isAscending}
    }

    const setSortValues = useCallback((key) => {
        setSortKey(key);
        setIsAscending(prev => (sortKey === key ? !prev : false));
    }, [sortKey]);


    return { sortOptions, getSortValues, setSortValues, sortLists, filterLists };
};
