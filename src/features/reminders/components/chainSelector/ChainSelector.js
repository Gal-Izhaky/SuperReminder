import React, { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

// Components
import ChainItem from '../chainItem/ChainItem';

// Styles
import styles from './ChainSelector.styles';

/**
 * ChainSelector Component
 * Dropdown for selecting supermarket chains
 * Selection is saved immediately
 * 
 * @param {Array} chains - Available supermarket chains
 * @param {Array} selectedChains - Selected chain IDs
 * @param {boolean} isDropdownOpen - Whether dropdown is open
 * @param {Function} onToggleDropdown - Toggle dropdown visibility
 * @param {Function} onToggleChain - Handle chain selection/deselection (auto-saves)
 */
const ChainSelector = ({
    chains,
    selectedChains,
    isDropdownOpen,
    onToggleDropdown,
    onToggleChain
}) => {
    const { t } = useTranslation();
    
    const countChains = useCallback(() => {
        return selectedChains.filter((chain) => chain !== "שופרסל").length;
    }, [selectedChains]);


    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {t('reminders.selectChains')}
            </Text>
            
            <TouchableOpacity
                style={styles.selector}
                onPress={onToggleDropdown}
                activeOpacity={0.7}
            >
                <Text style={styles.selectedText}>
                    {selectedChains.length > 0
                        ? t('reminders.selectedChainsCount', { count: countChains() })
                        : t('reminders.selectChainsPlaceholder')
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
                        style={styles.scrollView}
                        nestedScrollEnabled={true}
                    >
                        {chains.map(chain => (
                            <ChainItem
                                key={chain.id}
                                chain={chain}
                                selectedChains={selectedChains}
                                onToggleChain={onToggleChain}
                            />
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

export default memo(ChainSelector);