// react imports
import { Text, TouchableOpacity, View, Image } from 'react-native';

import DateTimePicker from 'react-native-ui-datepicker';

// styles
import styles from "./FilterDropdown.styles"
import { useState } from 'react';

const refreshImage = require("../../../assets/images/refresh.png")

const FilterDropdown = ({ options, sortKey, isAscending, setValues }) => {    
    const [openMenu, setOpenMenu] = useState(null);

    const [startDate, setStartDate] = useState(undefined)
    const [endDate, setEndDate] = useState(undefined)

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
        setStartDate(startDate);
        setEndDate(endDate);
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
                        <>
                        <DateTimePicker
                            mode="range"
                            startDate={startDate}
                            endDate={endDate}
                            locale="he-IL"
                            onChange={setDates}
                        />
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.refreshDate}
                            onPress={() => {setDates({})}}>
                                
                            <Image 
                                style={styles.arrow}
                                source={refreshImage} 
                            />
                        </TouchableOpacity>
                        </>
                        
                    }
                </TouchableOpacity>
            })}
        </View>
    )
}

export default FilterDropdown