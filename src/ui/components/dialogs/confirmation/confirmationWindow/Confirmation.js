// External imports
import React, { useRef, useState, useCallback, useMemo, useEffect } from "react";
import { View, Text, Modal, Animated, TextInput } from "react-native";

// Internal components
import ConfirmButtons from "../confirmationButtons/ConfirmationButtons";
import SearchBar from "../../../inputs/searchBar/SearchBar";
import ChooseAmount from "../../chooseAmount/ChooseAmount";

// Styles
import styles from "./Confirmation.styles";
import { useTranslation } from "react-i18next";
import i18n from "../../../../../i18n/i18next";

// Constants
const BTN_TEXTS = {
    del: "delete",
    add: "add", 
    addItem: "add",
};

const DEFAULT_UNIT = "יח'";
const WEIGHTED_UNITS = ["100 גרם", '100 מ"ל'];

/**
 * Confirmation Component
 * Modal window for confirming various actions with animation
 *
 * @param {boolean} visible - Controls modal visibility
 * @param {Function} onConfirm - Callback for confirmation
 * @param {Function} onCancel - Callback for cancellation
 * @param {string} title - Modal title
 * @param {string} type - Type of confirmation ('del', 'add', or 'addItem')
 */
const Confirmation = ({ visible, onConfirm, onCancel, title, type, itemAmount }) => {
    // Translation hook
    const { t } = useTranslation();

    // Keep internal visibility state for animation timing
    const [internalVisible, setInternalVisible] = useState(false);
    
    // Combine other state to reduce renders
    const [state, setState] = useState({
        name: "",
        selectedItem: null,
        selectedAmount: 1
    });
    
    // Animation refs
    const slideAnim = useRef(new Animated.Value(-300)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const animationsRunning = useRef(false);
    
    // Memoize unit calculations to prevent recalculations
    const unitCalcResults = useMemo(() => {
        if (type !== "addItem" || !state.selectedItem) {
            return { step: 0, maxAmount: 0, finalUnit: "", weighted: false };
        }
        
        const unit = state.selectedItem.measurementUnit.replace('ק"ג', "100 גרם").replace("ליטר", '100 מ"ל');
        const weighted = state.selectedItem.weighted && WEIGHTED_UNITS.includes(unit);
        const finalUnit = weighted ? unit.replace("100 ", "") : DEFAULT_UNIT;
        
        return {
            step: weighted ? 100 : 1,
            maxAmount: finalUnit === "יח'" ? 10000 : 100000,
            finalUnit: finalUnit,
            weighted: weighted
        };
    }, [type, state.selectedItem]);

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
            setState(prev => ({...prev, selectedItem: null, name: ""}));
            slideAnim.setValue(-300);
        });
    }, [slideAnim, opacityAnim]);

    // Handle visibility changes - key improvement
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

    // Handle name change
    const handleNameChange = useCallback((text) => {
        setState(prev => ({...prev, name: text}));
    }, []);
    
    // Handle item selection
    const handleItemSelected = useCallback((item) => {
        setState(prev => ({...prev, selectedItem: item}));
    }, []);
    
    // Handle amount change
    const handleAmountChange = useCallback((amount) => {
        setState(prev => ({...prev, selectedAmount: amount}));
    }, []);

    // Memoize the confirm handler
    const handleConfirm = useCallback(() => {
        if (type === "del") {
            onConfirm();
            return;
        }
        
        if (type === "addItem") {
            if(!state.selectedItem) return;
            
            const finalAmount = Math.max(0, Math.min(
                state.selectedAmount, 
                unitCalcResults.maxAmount - itemAmount(state.selectedItem.key)
            ));

            onConfirm(state.selectedItem.key, finalAmount);
            return;
        }

        if (state.name.trim() === "") return;
        onConfirm(state.name);
    }, [type, state, onConfirm, unitCalcResults, itemAmount]);

    // Render with the same content as before, but using state.* instead
    return (
        <Modal
            statusBarTranslucent
            transparent
            visible={internalVisible}
            animationType="none"
            onRequestClose={onCancel}
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
                    <Text style={styles.title}>{title}</Text>

                    {/* Conditional content based on type */}
                    {type === "add" ? (
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder={t('editList.listNamePlaceholder')}
                                maxLength={15}
                                onChangeText={handleNameChange}
                                keyboardType="visible-password"
                                underlineColorAndroid="transparent"
                            />
                            <Text style={styles.charIndicator}>
                                {state.name.length}/15
                            </Text>
                        </View>
                    ) : type === "addItem" ? (
                        <>
                            <View style={{width: "100%", marginTop: 20}}>
                                <SearchBar onSelect={handleItemSelected} />
                            </View>
                            {state.selectedItem ? (
                                <>
                                    <Text style={[styles.itemPropertyText, 
                                        i18n.language === "he" ? 
                                        {textAlign: "right"} : 
                                        {textAlign: "left"}
                                    ]}>
                                        {t('editList.amountGuide')}
                                    </Text>
                                    <ChooseAmount 
                                        unitCalcResults={unitCalcResults}
                                        item={state.selectedItem} 
                                        onAmountChange={handleAmountChange}
                                    />
                                </>
                            ) : (
                                <Text style={styles.notYetSelected}>
                                    {t('editList.noItemPlaceholder')}
                                </Text>
                            )}
                        </>
                    ) : null}

                    <ConfirmButtons
                        onConfirm={handleConfirm}
                        onCancel={onCancel}
                        text={t(`common.${BTN_TEXTS[type]}`)}
                        text2={t('common.cancel')}
                    />
                </Animated.View>
            </Animated.View>
        </Modal>
    );
};

export default React.memo(Confirmation, (prevProps, nextProps) => {
    // More comprehensive comparison
    return (
        prevProps.visible === nextProps.visible &&
        prevProps.title === nextProps.title &&
        prevProps.type === nextProps.type &&
        prevProps.onConfirm === nextProps.onConfirm &&
        prevProps.onCancel === nextProps.onCancel
    );
});