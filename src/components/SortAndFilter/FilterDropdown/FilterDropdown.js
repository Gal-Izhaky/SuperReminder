// react imports
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { useState, useContext } from 'react';

// core
import { ShoppingListContext } from '../../../core/contexts/ShoppingListContext.js';

// styles
import styles from "./FilterDropdown.styles"

// menus
import DateMenu from './FilterMenus/DateMenu.js';
import NameMenu from './FilterMenus/NameMenu.js';
import SizeMenu from './FilterMenus/SizeMenu.js';

const FilterDropdown = ({ options, filterValues, setValues }) => {    
    const [openMenu, setOpenMenu] = useState(null);
    
    const getArrow = (menu) => {
        return menu === openMenu ?
         require("../../../assets/images/upArrow.png") : 
         require("../../../assets/images/downArrow.png")
    }

    const interactWithMenuButton = (menu) => {
        if(openMenu === menu){
            setOpenMenu(null);
            return
        }
        setOpenMenu(menu);
    }

    const setDates = ({startDate, endDate}) => {
        setValues.setStartDate(startDate);
        setValues.setEndDate(endDate);
    }
    
    return (
        <View style={styles.dropdown}>
            {options.map((option) => {
                return <TouchableOpacity                    
                    key={option.value}
                    activeOpacity={1}>

                    <TouchableOpacity 
                        style={styles.option}
                        onPress={() => {interactWithMenuButton(option.value)}}
                        activeOpacity={1}>
                        <Text style={styles.optionText}>{option.key}</Text>

                        <Image 
                            style={styles.arrow}
                            source={getArrow(option.value)} 
                        />

                    </TouchableOpacity>

                    {option.value === openMenu &&
                        (
                            option.value === "updateTime" 
                            ? <DateMenu startDate={filterValues.startDate} endDate={filterValues.endDate} setDates={setDates}/> :
                            option.value === "name" 
                            ? <NameMenu name={filterValues.name} setName={setValues.setName}/> : 
                            option.value === "amount" 
                            ? <SizeMenu minMaxVals={filterValues.minMaxVals} maxItemsVal={filterValues.maxItemsVal} setMinMaxVals={setValues.setMinMaxVals}/> :
                            ""
                        )
                    }
                    
                </TouchableOpacity>
            })}
        </View>
    )
}

export default FilterDropdown