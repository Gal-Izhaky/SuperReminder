import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Styles
import styles from './ChainItem.styles';

/**
 * ChainItem Component
 * Display a supermarket chain with checkbox and optional subchains
 * 
 * @param {Object} chain - Chain data
 * @param {Array} selectedChains - Selected chain IDs
 * @param {Function} onToggleChain - Chain toggle handler
 */
const ChainItem = ({ chain, selectedChains, onToggleChain }) => {
    const hasSubchains = chain.subChains && chain.subChains.length > 0;
    const isSelected = selectedChains.includes(chain.id);
    
    return (
        <View style={styles.container}>
            {/* Main chain */}
            <TouchableOpacity 
                style={styles.mainItem}
                onPress={() => onToggleChain(chain.id)}
            >
                <View style={[
                    styles.checkbox,
                    isSelected && styles.checkboxSelected
                ]}>
                    {isSelected && (
                        <Text style={styles.checkmark}>✓</Text>
                    )}
                </View>
                <Text style={styles.mainText}>{chain.id}</Text>
            </TouchableOpacity>
            
            {/* Subchains */}
            {hasSubchains && (
                <View style={styles.subchains}>
                    {chain.subChains.map(subchain => {
                        const isSubSelected = selectedChains.includes(subchain.id);
                        
                        return (
                            <TouchableOpacity
                                key={subchain.id}
                                style={styles.subItem}
                                onPress={() => onToggleChain(subchain.id)}
                            >
                                <View style={[
                                    styles.checkbox,
                                    isSubSelected && styles.checkboxSelected
                                ]}>
                                    {isSubSelected && (
                                        <Text style={styles.checkmark}>✓</Text>
                                    )}
                                </View>
                                <Text style={styles.subText}>{subchain.id}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            )}
        </View>
    );
};

export default memo(ChainItem);