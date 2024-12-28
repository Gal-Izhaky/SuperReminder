// External imports
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { useState, useContext } from 'react';

// Internal imports
import { ShoppingListContext } from '../../../core/contexts/ShoppingListContext.js';
import DateMenu from './FilterMenus/DateMenu.js';
import NameMenu from './FilterMenus/NameMenu.js';
import SizeMenu from './FilterMenus/SizeMenu.js';

// Styles
import styles from "./FilterDropdown.styles"

/**
 * FilterDropdown Component
 * Renders a dropdown menu with various filter options
 *
 * @param {Array} options - Array of filter options
 * @param {Object} filterValues - Current filter values
 * @param {Object} setValues - Object containing setter functions for filter values
 */
const FilterDropdown = ({ options, filterValues, setValues }) => {    
    // State management
    const [openMenu, setOpenMenu] = useState(null);
    
    /**
     * Determines which arrow icon to display based on menu state
     * @param {string} menu - Menu identifier
     * @returns {ImageSource} Arrow image source
     */
    const getArrow = (menu) => {
        return menu === openMenu ?
         require("../../../assets/images/upArrow.png") : 
         require("../../../assets/images/downArrow.png")
    }

    /**
     * Handles menu button interactions
     * @param {string} menu - Menu identifier
     */
    const interactWithMenuButton = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    }

    /**
     * Updates date filter values
     * @param {Object} param0 - Object containing start and end dates
     */
    const setDates = ({startDate, endDate}) => {
        setValues.setStartDate(startDate);
        setValues.setEndDate(endDate);
    }
    
    // Render
    return (
        <View style={styles.dropdown}>
            {options.map((option) => (
                <TouchableOpacity                    
                    key={option.value}
                    activeOpacity={1}
                >
                    {/* Filter option button */}
                    <TouchableOpacity 
                        style={styles.option}
                        onPress={() => interactWithMenuButton(option.value)}
                        activeOpacity={1}
                    >
                        <Text style={styles.optionText}>{option.key}</Text>
                        <Image 
                            style={styles.arrow}
                            source={getArrow(option.value)} 
                        />
                    </TouchableOpacity>

                    {/* Filter menu content */}
                    {option.value === openMenu && (
                        option.value === "updateTime" 
                            ? <DateMenu 
                                startDate={filterValues.startDate} 
                                endDate={filterValues.endDate} 
                                setDates={setDates}
                              /> 
                            : option.value === "name" 
                            ? <NameMenu 
                                name={filterValues.name} 
                                setName={setValues.setName}
                              /> 
                            : option.value === "amount" 
                            ? <SizeMenu 
                                minMaxVals={filterValues.minMaxVals} 
                                maxItemsVal={filterValues.maxItemsVal} 
                                setMinMaxVals={setValues.setMinMaxVals}
                              />
                            : null
                    )}
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default FilterDropdown;