import { useState, useCallback, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { ShoppingListContext } from '../../../core/state/contexts/ShoppingListContext';
import { supermarketChains } from "../../../core/data/Chains";
import { startTrackingGeofences, stopTrackingGeofences } from '../../location/GeofencingService';

// Storage keys
const STORAGE_KEYS = {
    SELECTED_LIST: 'smart_reminder_list',
    SELECTED_CHAINS: 'smart_reminder_chains',
    ENABLED: 'smart_reminder_enabled'
};

/**
 * Custom hook for managing smart reminder
 * Each change is automatically saved to AsyncStorage
 */
export const useSmartReminders = () => {
    const { t } = useTranslation();
    const { lists } = useContext(ShoppingListContext);
    
    // Form state - using selectedListKey instead of selectedList for stability
    const [selectedListKey, setSelectedListKey] = useState(null);
    const [selectedChains, setSelectedChains] = useState([]);
    const [isEnabled, setIsEnabled] = useState(false);
    
    // UI state
    const [isListDropdownOpen, setIsListDropdownOpen] = useState(false);
    const [isChainsDropdownOpen, setIsChainsDropdownOpen] = useState(false);
    
    // Derived value: find the actual list object based on the key
    const selectedList = selectedListKey ? lists.find(l => l.key === selectedListKey) : null;
    
    // Load saved values on mount
    useEffect(() => {
        const loadSavedValues = async () => {
            try {
                // Load list key
                const listKey = await AsyncStorage.getItem(STORAGE_KEYS.SELECTED_LIST);
                if (listKey) {
                    setSelectedListKey(listKey);
                }
                
                // Load chains
                const chainsData = await AsyncStorage.getItem(STORAGE_KEYS.SELECTED_CHAINS);
                if (chainsData) setSelectedChains(JSON.parse(chainsData));
                
                // Load enabled state
                const enabledData = await AsyncStorage.getItem(STORAGE_KEYS.ENABLED);
                if (enabledData === 'true') setIsEnabled(true);
            } catch (error) {
                console.error('Error loading reminder data:', error);
            }
        };
        
        loadSavedValues();
    }, []);
    
    // Auto-disable when list or chains are missing
    useEffect(() => {
        const updateEnabledState = async () => {
            // If no list or no chains, the reminder can't be enabled
            if (!selectedListKey || selectedChains.length === 0) {
                if (isEnabled) {
                    console.log('No list or chains selected, disabling reminder');
                    setIsEnabled(false);
                    await AsyncStorage.setItem(STORAGE_KEYS.ENABLED, 'false');
                }
            }
        };
        
        updateEnabledState();
    }, [selectedListKey, selectedChains, isEnabled]);
    
    // UI handlers
    const toggleListDropdown = useCallback(() => {
        setIsListDropdownOpen(prev => !prev);
        setIsChainsDropdownOpen(false);
    }, []);
    
    const toggleChainsDropdown = useCallback(() => {
        setIsChainsDropdownOpen(prev => !prev);
        setIsListDropdownOpen(false);
    }, []);
    
    const closeDropdowns = useCallback(() => {
        setIsListDropdownOpen(false);
        setIsChainsDropdownOpen(false);
    }, []);
    
    // List selection - with immediate save and toggle for re-selecting
    const handleListSelect = useCallback(async (list) => {
        // If selecting the currently selected list, deselect it
        if (list && list.key === selectedListKey) {
            setSelectedListKey(null);
            await AsyncStorage.removeItem(STORAGE_KEYS.SELECTED_LIST);
            
            // Also disable reminders
            if (isEnabled) {
                setIsEnabled(false);
                await AsyncStorage.setItem(STORAGE_KEYS.ENABLED, 'false');
            }
        } else {
            setSelectedListKey(list ? list.key : null);
            
            if (list) {
                await AsyncStorage.setItem(STORAGE_KEYS.SELECTED_LIST, list.key);
            } else {
                await AsyncStorage.removeItem(STORAGE_KEYS.SELECTED_LIST);
                
                // Also disable reminders if unselecting
                if (isEnabled) {
                    setIsEnabled(false);
                    await AsyncStorage.setItem(STORAGE_KEYS.ENABLED, 'false');
                }
            }
        }
        
        // Close dropdown after selection
        setIsListDropdownOpen(false);
    }, [selectedListKey, isEnabled]);
    
    // Chain selection with hierarchy - with immediate save
    const toggleChain = useCallback((chainId) => {
        setSelectedChains(prev => {
            let newSelected = [...prev];
            const chain = supermarketChains.find(c => c.id === chainId);
            
            // Handle main chain with subchains
            if (chain?.subChains) {
                const isSelected = prev.includes(chainId);
                
                if (isSelected) {
                    // Remove main + all subs
                    newSelected = newSelected.filter(id => id !== chainId);
                    chain.subChains.forEach(sub => {
                        newSelected = newSelected.filter(id => id !== sub.id);
                    });
                } else {
                    // Add main + all subs
                    newSelected.push(chainId);
                    chain.subChains.forEach(sub => {
                        if (!newSelected.includes(sub.id)) {
                            newSelected.push(sub.id);
                        }
                    });
                }
            } else {
                // Find if this is a subchain
                let parentChain = null;
                
                for (const c of supermarketChains) {
                    if (c.subChains?.some(sub => sub.id === chainId)) {
                        parentChain = c;
                        break;
                    }
                }
                
                if (parentChain) {
                    const isSelected = prev.includes(chainId);
                    
                    if (isSelected) {
                        // Remove this sub
                        newSelected = newSelected.filter(id => id !== chainId);
                        
                        // Check if parent should be removed
                        const anySubSelected = parentChain.subChains.some(
                            sub => sub.id !== chainId && newSelected.includes(sub.id)
                        );
                        if (!anySubSelected) {
                            newSelected = newSelected.filter(id => id !== parentChain.id);
                        }
                    } else {
                        // Add this sub
                        newSelected.push(chainId);
                        
                        // Add parent if not already added
                        if (!newSelected.includes(parentChain.id)) {
                            newSelected.push(parentChain.id);
                        }
                    }
                } else {
                    // Regular chain toggle
                    if (prev.includes(chainId)) {
                        newSelected = newSelected.filter(id => id !== chainId);
                    } else {
                        newSelected.push(chainId);
                    }
                }
            }
            
            // Immediately save to AsyncStorage
            AsyncStorage.setItem(STORAGE_KEYS.SELECTED_CHAINS, JSON.stringify(newSelected))
                .catch(error => console.error('Error saving chains:', error));
            
            // If removing all chains, disable the reminder
            if (newSelected.length === 0 && isEnabled) {
                setIsEnabled(false);
                AsyncStorage.setItem(STORAGE_KEYS.ENABLED, 'false')
                    .catch(error => console.error('Error saving enabled state:', error));
            }
                
            return newSelected;
        });
    }, [isEnabled]);
    
    // Toggle enabled state - with immediate save
    const toggleEnabled = useCallback(() => {
        // Only allow enabling if we have both list and chains
        if (!selectedListKey || selectedChains.length === 0) {
            // Cannot enable without list and chains
            if (isEnabled) {
                setIsEnabled(false);
                AsyncStorage.setItem(STORAGE_KEYS.ENABLED, 'false')
                    .catch(error => console.error('Error saving enabled state:', error));
            }
            return;
        }
        
        setIsEnabled(prev => {
            const newValue = !prev;
            
            // Immediately save to AsyncStorage
            AsyncStorage.setItem(STORAGE_KEYS.ENABLED, String(newValue))
                .catch(error => console.error('Error saving enabled state:', error));
            
            return newValue;
        });
    }, [selectedListKey, selectedChains]);
    
    // Effect to update geofencing when enabled state changes
    useEffect(() => {
        const updateGeofencing = async () => {
            if (isEnabled) {
                startTrackingGeofences();
            } else {
                stopTrackingGeofences();
            }
        };
        
        updateGeofencing();
    }, [isEnabled]);
    
    // Clear reminder state
    const clearReminder = useCallback(async () => {
        try {
            // First disable to make sure geofencing stops
            if (isEnabled) {
                setIsEnabled(false);
                await AsyncStorage.setItem(STORAGE_KEYS.ENABLED, 'false');
            }
            
            // Then clear other values
            await AsyncStorage.removeItem(STORAGE_KEYS.SELECTED_LIST);
            await AsyncStorage.removeItem(STORAGE_KEYS.SELECTED_CHAINS);
            
            setSelectedListKey(null);
            setSelectedChains([]);
        } catch (error) {
            console.error('Error clearing reminder:', error);
        }
    }, [isEnabled]);
    
    return {
        // State
        selectedListKey,
        selectedList, // For convenience in UI
        selectedChains, 
        isEnabled,
        
        // UI state
        dropdowns: {
            isListDropdownOpen,
            isChainsDropdownOpen
        },
        
        // Available data
        lists,
        chains: supermarketChains,
        
        // Handlers
        handlers: {
            toggleListDropdown,
            toggleChainsDropdown,
            closeDropdowns,
            handleListSelect,
            toggleChain,
            toggleEnabled,
            clearReminder
        }
    };
};