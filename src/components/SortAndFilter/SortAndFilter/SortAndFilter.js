import styles from "./SortAndFilter.styles";
import { View } from "react-native";

import SortDropdown from "../SortDropdown/SortDropdown";
import FilterDropdown from "../FilterDropdown/FilterDropdown";
import DropdownButton from "../DropdownButton/DropdownButton";
import { useCallback } from "react";

const SortAndFilter = ({ options, getSortValues, setSortValues, getFilterValues, setFilterValues, isDropdownVisible, setDropdownVisible  }) => {
    const { sortKey, isAscending } = getSortValues()
    const filterValues = getFilterValues()
    
    const toggleDropdown = useCallback((value) => {
        setDropdownVisible((prev) => prev !== value ? value : ""); 
    }, []);

    const getDropdown = () => {
        if (isDropdownVisible === "sort") {
            return <SortDropdown options={options} setValues={setSortValues} sortKey={sortKey} isAscending={isAscending}/>;
        } else if (isDropdownVisible === "filter") {
            return <FilterDropdown options={options} setValues={setFilterValues} filterValues={filterValues}/>;
        }
        return null;
    };

    const sortConfig = {
        text: "מיון",
        icon: require("../../../assets/images/sortImage.png"),
        toggleFunction: () => toggleDropdown("sort"),
    };
    const filterConfig = {
        text: "סינון",
        icon: require("../../../assets/images/filterImage.png"),
        toggleFunction: () => toggleDropdown("filter"),
    };

    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <DropdownButton style={styles.button} config={sortConfig} />
                <View style={styles.divider} />
                <DropdownButton style={styles.button} config={filterConfig} />
            </View>
            {getDropdown()}
        </View>
    );
};

export default SortAndFilter;
