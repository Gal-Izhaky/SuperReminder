// External imports
import React, { memo, useMemo, useEffect, useRef } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

// Data
import { supermarketChains } from '../../../../../core/data/Chains';
import { getItemByKey } from '../../../../../core/storage/firebase/FirebaseData';

// Styles
import styles from './PriceTable.styles';

// Constants for unit handling - matching those in other components
const DEFAULT_UNIT = "יח'";
const WEIGHTED_UNITS = ["100 גרם", '100 מ"ל'];

/**
 * Calculate price based on item's measurement unit and amount
 * 
 * @param {number} basePrice - The base price per standard unit
 * @param {Object} item - The item with amount and measurement info
 * @returns {number|undefined} - Calculated price or undefined if no base price
 */
const calculatePrice = (basePrice, item) => {
    if (basePrice === undefined) return undefined;
    
    // Get item details
    const unit = item.measurementUnit?.replace('ק"ג', "100 גרם").replace("ליטר", '100 מ"ל');
    const weighted = item.weighted && WEIGHTED_UNITS.includes(unit);
    const amount = item.amount || 1;
    
    // Calculate price multiplier based on unit type
    if (weighted) {
        // For weighted items (price is per 100g/100ml)
        return basePrice * (amount / 100);
    } else {
        // For regular items, multiply directly by amount
        return basePrice * amount;
    }
};

/**
 * Format display amount with appropriate unit for table display
 * 
 * @param {Object} item - Item with amount and measurement details
 * @returns {string} - Formatted amount for display
 */
const getDisplayAmount = (item, t) => {
    if (!item) return "1";
    
    const amount = item.amount || 1;
    
    // Process unit for display
    const unit = item.measurementUnit?.replace('ק"ג', "100 גרם").replace("ליטר", '100 מ"ל');
    const weighted = item.weighted && WEIGHTED_UNITS.includes(unit);
    const finalUnit = weighted ? unit.replace("100 ", "") : DEFAULT_UNIT;

    // Format display based on amount size
    if (weighted && amount >= 1000) {
        return `${(amount / 1000).toFixed(1)} ${t(`units.`+finalUnit.replace("גרם", 'ק"ג').replace('מ"ל', "ליטר"))}`;
    } else {
        return `${amount} ${t(`units.`+finalUnit)}`;
    }
};

/**
 * PriceTable Component
 * Displays a price comparison table for items across different supermarket chains
 * 
 * @param {Object} list - The shopping list with items
 */
const PriceTable = ({ list }) => {
    const { t } = useTranslation();
    
    // Refs for scrolling to top-right on mount
    const horizontalScrollRef = useRef(null);
    const verticalScrollRef = useRef(null);
    
    // Get main chains for columns (filter out subchains)
    const chains = useMemo(() => {
        const chainsFinal = [];
        for(const c of supermarketChains){
            if(c.subChains?.length){
                for(const subChain of c.subChains){
                    chainsFinal.push(subChain);
                }
            } else {
                chainsFinal.push(c);
            }
        }
        return chainsFinal.reverse();
    }, []);
    
    // Calculate horizontal scroll position to right side
    useEffect(() => {
        if (horizontalScrollRef.current) {
            // Scroll to far right (RTL layout)
            setTimeout(() => horizontalScrollRef.current.scrollToEnd({ animated: false }), 50);
        }
        
        // Scroll vertically to top
        if (verticalScrollRef.current) {
            verticalScrollRef.current.scrollTo({ y: 0, animated: false });
        }
    }, [list?.items?.length]);

    // Don't render if no items
    if (!list?.items?.length) {
        return null;
    }

    const itemsWithData = useMemo(() => {
        const mapped = list.items.map(listItem => {
            return {
                ...getItemByKey(listItem.key),
                amount: listItem.amount
            }
        });

        return mapped.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });
    }, [list.items]);

    return (
        <View style={styles.container}>
            <ScrollView 
                ref={verticalScrollRef}
                style={styles.verticalScroll}
                contentContainerStyle={styles.verticalScrollContent}
                showsVerticalScrollIndicator={true}
                horizontal={false} // Make sure this is vertical scrolling
            >
                <ScrollView
                    ref={horizontalScrollRef}
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    contentContainerStyle={styles.horizontalScrollContent}
                >
                    <View style={styles.table}>
                        <View style={styles.headerRow}>
                            {chains.map(chain => (
                                <View key={`header-${chain.id}`} style={styles.chainCell}>
                                    <Text style={styles.headerText}>{t(`chains.${chain.id}`)}</Text>
                                </View>
                            ))}
                            
                            <View style={styles.amountCell}>
                                <Text style={styles.headerText}>{t('itemDetails.amount')}</Text>
                            </View>
                            
                            <View style={styles.nameCell}>
                                <Text style={styles.headerText}>{t('itemDetails.item')}</Text>
                            </View>
                        </View>
                        
                        {itemsWithData.map(itemObj => {
                            return <View key={`item-${itemObj.key}`} style={styles.itemRow}>
                                {chains.map(chain => {
                                    // Find base price for this chain
                                    const chainPrice = itemObj.prices?.find(
                                        p => p?.brand?.toLowerCase() === chain.id?.toLowerCase()
                                    )?.price;
                                        
                                    // Calculate price with unit conversions
                                    const totalPrice = calculatePrice(chainPrice, itemObj);
                                        
                                    return (
                                        <View key={`price-${itemObj.key}-${chain.id}`} style={styles.chainCell}>
                                            <Text style={styles.priceText}>
                                                {totalPrice !== undefined 
                                                    ? `₪${totalPrice.toFixed(2)}`
                                                    : "-"
                                                }
                                            </Text>
                                        </View>
                                    );
                                })}
                                    
                                <View style={styles.amountCell}>
                                    <Text style={styles.amountText}>
                                        {getDisplayAmount(itemObj, t)}
                                    </Text>
                                </View>
                                
                                <View style={styles.nameCell}>
                                    <Text style={styles.nameText}>
                                        {itemObj.name}
                                    </Text>
                                </View>
                            </View>
                        })}
                    </View>
                </ScrollView>
            </ScrollView>
        </View>
    );
};

export default memo(PriceTable);