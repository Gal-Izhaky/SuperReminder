import React, { memo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

// Components
import ListSelector from '../listSelector/ListSelector.js';
import ChainSelector from '../chainSelector/ChainSelector.js';
import EnableSwitch from '../enableSwitch/EnableSwitch.js';

// Data
import { supermarketChains } from '../../../../core/data/Chains.js';

// Styles
import styles from './ReminderForm.styles';

/**
 * ReminderForm Component
 * Displays form for creating/editing reminders
 * Each change is automatically saved
 * 
 * @param {Array} lists - Available shopping lists
 * @param {Object} selectedList - Currently selected list (derived from selectedListKey)
 * @param {string} selectedListKey - Key of the selected list
 * @param {Array} selectedChains - Currently selected chains
 * @param {boolean} isEnabled - Whether reminder is enabled
 * @param {Object} dropdownState - State of dropdown menus
 * @param {Object} handlers - Event handler functions
 */
const ReminderForm = ({
    lists,
    selectedList,
    selectedListKey,
    selectedChains,
    isEnabled,
    dropdownState,
    handlers
}) => {
    const { t } = useTranslation();
    
    return (
        <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            <View style={styles.formSection}>
                <ListSelector
                    lists={lists}
                    selectedList={selectedList}
                    selectedListKey={selectedListKey}
                    isDropdownOpen={dropdownState.isListDropdownOpen}
                    onToggleDropdown={handlers.toggleListDropdown}
                    onSelectList={handlers.handleListSelect}
                />
                
                <ChainSelector
                    chains={supermarketChains}
                    selectedChains={selectedChains}
                    isDropdownOpen={dropdownState.isChainsDropdownOpen}
                    onToggleDropdown={handlers.toggleChainsDropdown}
                    onToggleChain={handlers.toggleChain}
                />
                
                <EnableSwitch
                    value={isEnabled}
                    onToggle={handlers.toggleEnabled}
                />
            </View>
        </ScrollView>
    );
};

export default memo(ReminderForm);