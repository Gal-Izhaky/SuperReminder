import { Text, TouchableOpacity, View, Image } from 'react-native';

import styles from "./FilterDropdown.styles"

const FilterDropdown = ({ options, sortKey, isAscending, setValues }) => {
    const getArrow = () => {
        return isAscending ?
         require("../../../assets/images/upArrow.png") : 
         require("../../../assets/images/downArrow.png")
    }
    return (
        <View style={styles.dropdown}>
            {options.map((option) => {
                return <TouchableOpacity 
                    key={option.value} 
                    style={styles.option}
                    onPress={() => {setValues(option.value)}}
                    activeOpacity={1}>
                    <Text style={styles.optionText}>{option.key}</Text>
                    {sortKey==option.value && 
                        <Image 
                            style={styles.arrow}
                            source={getArrow()} />
                    }
                </TouchableOpacity>
            })}
        </View>
    )
}

export default FilterDropdown