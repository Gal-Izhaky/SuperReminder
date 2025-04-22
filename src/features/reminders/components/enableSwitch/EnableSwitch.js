import React, { memo } from 'react';
import { View, Text, Switch } from 'react-native';
import { useTranslation } from 'react-i18next';

// Styles
import styles from './EnableSwitch.styles';
import colors from '../../../../theme/colors';

/**
 * EnableSwitch Component
 * Toggle switch for enabling/disabling reminders
 * Change is saved immediately
 * 
 * @param {boolean} value - Current switch value
 * @param {Function} onToggle - Toggle callback (auto-saves)
 */
const EnableSwitch = ({ value, onToggle }) => {
    const { t } = useTranslation();
    
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {t('reminders.enableReminder')}
            </Text>
            <Switch
                style={styles.switch}
                value={value}
                onValueChange={onToggle}
                trackColor={{ false: colors.textSecondary, true: colors.primary }}
                thumbColor={colors.background}
            />
        </View>
    );
};

export default memo(EnableSwitch);