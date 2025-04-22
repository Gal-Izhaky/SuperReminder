// External imports
import React, { memo, useRef, useState, useCallback, useEffect } from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useTranslation } from 'react-i18next';

// Components
import PriceTable from '../priceTable/PriceTable';

// Styles
import styles from './PriceTableModal.styles';
import TextButton from '../../../../../ui/components/button';
import FirebaseData from '../../../../../core/storage/firebase/FirebaseData';
import i18n from '../../../../../i18n/i18next';

/**
 * PriceTableModal Component
 * Modal that displays a price comparison table for all items
 * Uses animation similar to Confirmation component
 *
 * @param {boolean} visible - Whether the modal is visible
 * @param {Function} onClose - Function to close the modal
 * @param {Object} list - Shopping list containing items with prices
 */
const PriceTableModal = ({ visible, onClose, list, singleItemDetails=false }) => {
    const { t } = useTranslation();
    
    // Keep internal visibility state for animation timing
    const [internalVisible, setInternalVisible] = useState(false);
    
    // Animation refs
    const slideAnim = useRef(new Animated.Value(-300)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const animationsRunning = useRef(false);
    
    // Animation functions
    const animateIn = useCallback(() => {
        if (animationsRunning.current) return;
        
        animationsRunning.current = true;
        slideAnim.setValue(-300);
        opacityAnim.setValue(0);
        
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start(() => {
            animationsRunning.current = false;
        });
    }, [slideAnim, opacityAnim]);

    const animateOut = useCallback(() => {
        if (animationsRunning.current) return;
        
        animationsRunning.current = true;
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 300,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start(() => {
            animationsRunning.current = false;
            // Only hide modal AFTER animation completes
            setInternalVisible(false);
            slideAnim.setValue(-300);
        });
    }, [slideAnim, opacityAnim]);

    // Handle visibility changes
    useEffect(() => {
        if (visible && !internalVisible) {
            // Show modal immediately when requested
            setInternalVisible(true);
            // Then animate in
            animateIn();
        } else if (!visible && internalVisible) {
            // Start hiding animation, but keep modal visible until animation completes
            animateOut();
            // Modal will be hidden in the animateOut callback
        }
    }, [visible, internalVisible, animateIn, animateOut]);
    
    // Handle close request
    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    if(!list.items.length){
        return null;
    }

    return (
        <Modal
            transparent={true}
            statusBarTranslucent
            visible={internalVisible}
            animationType="none"
            onRequestClose={handleClose}
        >
            <Animated.View
                style={[styles.center, styles.grayBG, { opacity: opacityAnim }]}
            >
                <Animated.View
                    style={[
                        styles.content,
                        {
                            transform: [{ translateY: slideAnim }],
                            opacity: opacityAnim,
                        },
                    ]}
                >
                    <Text style={styles.title}>{!singleItemDetails ? t('itemDetails.priceComparison') : t('scanner.scanResult')}</Text>
                    
                    {singleItemDetails && (() => {
                        const item = FirebaseData.getItemByKey(list.items[0].key);
                        
                        return (
                            <>
                                <View style={[styles.resultRow, {flexDirection: i18n.language === "en" ? "row" : "row-reverse"}]}>
                                    <Text style={styles.label}>{t('itemDetails.barcode')}</Text>
                                    <Text style={styles.value}>{item.key}</Text>
                                </View>
                                <View style={[styles.resultRow, {flexDirection: i18n.language === "en" ? "row" : "row-reverse"}]}>
                                    <Text style={styles.label}>{t('itemDetails.name')}</Text> 
                                    <Text style={styles.value}>{item.name}</Text>
                                </View>  
                            </>                      
                        );  
                    })()}

                    <PriceTable list={list} />

                    <TextButton
                        text={t('common.back')}
                        onPress={handleClose}
                        style={[styles.button, styles.closeButton]}
                    />
                </Animated.View>
            </Animated.View>
        </Modal>
    );
};

export default memo(PriceTableModal);