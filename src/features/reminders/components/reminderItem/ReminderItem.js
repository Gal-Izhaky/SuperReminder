import React, { memo, useCallback } from 'react';
import { View, Text, Switch, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';

// Utils
import { getChainNames } from '../../../../core/data/Chains';

// Styles
import styles from './ReminderItem.styles';
import colors from '../../../../theme/colors';

/**
 * ReminderItem Component
 * Displays a single reminder with options to toggle or delete
 * 
 * @param {Object} reminder - Reminder data
 * @param {Function} onToggle - Toggle callback
 * @param {Function} onDelete - Delete callback
 */
const ReminderItem = ({ reminder, onToggle, onDelete }) => {
    const { t } = useTranslation();
    
    // Event handlers
    const handleToggle = useCallback(() => {
        onToggle(reminder.id);
    }, [reminder.id, onToggle]);
    
    const handleDelete = useCallback(() => {
        onDelete(reminder.id);
    }, [reminder.id, onDelete]);
    
    // Get chain names
    const chainNames = getChainNames(reminder.chains);
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.listName}>{reminder.listName}</Text>
                
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={handleDelete}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Image 
                        source={require('../../../../assets/images/delete.png')}
                        style={styles.deleteIcon}
                    />
                </TouchableOpacity>
            </View>
            
            <View style={styles.details}>
                <Text style={styles.storesLabel}>
                    {t('reminders.activeInStores')}:
                </Text>
                <Text style={styles.storesText}>
                    {chainNames.join(', ')}
                </Text>
            </View>
            
            <View style={styles.footer}>
                <Text style={styles.statusText}>
                    {t('reminders.active')}
                </Text>
                <Switch
                    value={reminder.isEnabled}
                    onValueChange={handleToggle}
                    trackColor={{ false: colors.textSecondary, true: colors.primary }}
                    thumbColor={colors.background}
                />
            </View>
        </View>
    );
};

export default memo(ReminderItem);