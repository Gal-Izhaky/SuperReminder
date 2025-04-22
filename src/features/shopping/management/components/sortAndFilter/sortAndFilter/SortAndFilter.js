// External imports
import { View } from "react-native";
import { memo, useCallback } from "react";

// Internal imports
import SortDropdown from "../sortDropdown/SortDropdown";
import FilterDropdown from "../filterDropdown/FilterDropdown";
import DropdownButton from "../dropdownButton/DropdownButton";

// Styles
import styles from "./SortAndFilter.styles";
import { useTranslation } from "react-i18next";

// Assets
const sortIcon = require("../../../../../../assets/images/sortImage.png");
const filterIcon = require("../../../../../../assets/images/filterImage.png");

/**
 * SortAndFilter Component
 * Provides sorting and filtering functionality with dropdown menus
 *
 * @param {Object} options - Available sort and filter options
 * @param {Function} getSortValues - Callback to get current sort values
 * @param {Function} setSortValues - Callback to update sort values
 * @param {Function} getFilterValues - Callback to get current filter values
 * @param {Function} setFilterValues - Callback to update filter values
 * @param {string} isDropdownVisible - Current visible dropdown ("sort"/"filter"/""")
 * @param {Function} setDropdownVisible - Callback to toggle dropdown visibility
 */
const SortAndFilter = ({
    options,
    getSortValues,
    setSortValues,
    getFilterValues,
    setFilterValues,
    isDropdownVisible,
    setDropdownVisible,
}) => {
    // Get current values
    const { sortKey, isAscending } = getSortValues();
    const filterValues = getFilterValues();

    // Translation hook
    const { t } = useTranslation();

    translationOptions = options.map((option) => {
        return { key: t(`shoppingLists.sortBy.${option.key}`), value: option.value };
    });

    // Handlers
    const toggleDropdown = useCallback((value) => {
        setDropdownVisible((prev) => (prev !== value ? value : ""));
    }, []);

    // Dropdown configuration
    const sortConfig = {
        text: t("shoppingLists.sort"),
        icon: sortIcon,
        toggleFunction: () => toggleDropdown("sort"),
    };

    const filterConfig = {
        text: t('shoppingLists.filter'),
        icon: filterIcon,
        toggleFunction: () => toggleDropdown("filter"),
    };

    // Dynamic dropdown render
    const getDropdown = () => {
        if (isDropdownVisible === "sort") {
            return (
                <SortDropdown
                    options={translationOptions}
                    setValues={setSortValues}
                    sortKey={sortKey}
                    isAscending={isAscending}
                />
            );
        }
        if (isDropdownVisible === "filter") {
            return (
                <FilterDropdown
                    options={translationOptions}
                    setValues={setFilterValues}
                    filterValues={filterValues}
                />
            );
        }
        return null;
    };

    // Render
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

export default memo(SortAndFilter);
