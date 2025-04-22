import React, { memo } from 'react';
import { Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';

// Components
import Header from '../../../ui/components/header/Header';
import ReminderForm from '../components/reminderForm/ReminderForm.js';

// Custom hooks
import { useSmartReminders } from '../hooks/useSmartReminders.js';

// Styles
import styles from './SmartReminders.styles';

/**
 * Smart Reminders Screen
 * Manages location-based reminders for shopping lists
 * Changes are saved immediately upon selection
 */
const SmartReminders = () => {
    const { t } = useTranslation();
    const {
        selectedList,
        selectedListKey,
        selectedChains,
        isEnabled,
        lists,
        dropdowns,
        handlers
    } = useSmartReminders();

    return (
        <Pressable style={styles.container} onPress={handlers.closeDropdowns}>
            <Header title={t('screens.smartReminders')} />
            
            {/* Form for creating new reminders */}
            <ReminderForm
                lists={lists}
                selectedList={selectedList}
                selectedListKey={selectedListKey}
                selectedChains={selectedChains}
                isEnabled={isEnabled}
                dropdownState={dropdowns}
                handlers={handlers}
            />
        </Pressable>
    );
};

export default memo(SmartReminders);
