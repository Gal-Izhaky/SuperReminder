import React, { memo } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

// Styles
import styles from './ListSelector.styles';

/**
 * ListSelector Component
 * Dropdown for selecting shopping lists
 * Selection is saved immediately
 * 
 * @param {Array} lists - Available lists
 * @param {Object} selectedList - Selected list object (derived from selectedListKey)
 * @param {string} selectedListKey - Key of the selected list
 * @param {boolean} isDropdownOpen - Whether dropdown is open
 * @param {Function} onToggleDropdown - Toggle dropdown visibility
 * @param {Function} onSelectList - Handle list selection (auto-saves)
 */
const ListSelector = ({ 
    lists, 
    selectedList,
    selectedListKey, 
    isDropdownOpen, 
    onToggleDropdown, 
    onSelectList 
}) => {
    const { t } = useTranslation();
    
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {t('reminders.selectList')}
            </Text>
            
            <TouchableOpacity
                style={styles.selector}
                onPress={onToggleDropdown}
                activeOpacity={0.7}
            >
                <Text style={styles.selectedText}>
                    {selectedList 
                        ? selectedList.name 
                        : t('reminders.selectListPlaceholder')
                    }
                </Text>
                <Image
                    source={require('../../../../assets/images/downArrow.png')}
                    style={[
                        styles.arrow,
                        isDropdownOpen && styles.arrowUp
                    ]}
                />
            </TouchableOpacity>
            
            {isDropdownOpen && (
                <View style={styles.dropdown}>
                    <ScrollView 
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={true}
                        style={styles.scrollView}
                    >
                        {lists.length > 0 ? (
                            lists.map(list => (
                                <TouchableOpacity
                                    key={list.key}
                                    style={[
                                        styles.item,
                                        selectedListKey === list.key && styles.selectedItem
                                    ]}
                                    onPress={() => onSelectList(list)}
                                >
                                    <Text style={[
                                        styles.itemText,
                                        selectedListKey === list.key && styles.selectedItemText
                                    ]}>
                                        {list.name}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text style={styles.noListsText}>
                                {t('reminders.noLists')}
                            </Text>
                        )}
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

export default memo(ListSelector);