// External imports
import React, { useContext } from 'react';

// Core imports
import { ShoppingListContext } from '../../../../../core/state/contexts/ShoppingListContext';
import { useSortAndFilter } from '../../hooks/useSortAndFilter';

// Components
import SortAndFilter from '../../components/sortAndFilter/sortAndFilter/SortAndFilter';
import ShopList from '../../components/shoplist/ShopList';

/**
 * ShoppingListsContent Component
 * Contains the sort/filter controls and list display
 */
const ShoppingListsContent = ({ isDropdownVisible, setDropdownVisible }) => {
    // Get max items value from context
    const { maxItemsVal } = useContext(ShoppingListContext);
    
    // Sort and filter functionality
    const {
        options,
        getSortValues,
        setSortValues,
        getFilterValues,
        setFilterValues,
        sortLists,
        filterLists
    } = useSortAndFilter(maxItemsVal);

    return (
        <>
            {/* Sort and filter controls */}
            <SortAndFilter
                options={options}
                getSortValues={getSortValues}
                setSortValues={setSortValues}
                getFilterValues={getFilterValues}
                setFilterValues={setFilterValues}
                isDropdownVisible={isDropdownVisible}
                setDropdownVisible={setDropdownVisible}
            />

            {/* Shopping lists display */}
            <ShopList
                sortLists={sortLists}
                filterLists={filterLists}
            />
        </>
    );
};

export default ShoppingListsContent;