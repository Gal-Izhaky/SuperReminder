// External imports
import React from "react";
import { View, Text, TextInput } from "react-native";
import { useTranslation } from "react-i18next";
import i18n from "../../../../../i18n/i18next";

// Styles
import styles from "./ListNameInput.styles";

/**
 * ListNameInput Component
 * Handles the editing of shopping list name with character limit display
 *
 * @param {Object} props - Component props
 * @param {Object} props.list - Shopping list object
 * @param {Function} props.onEdit - Function to call when list name changes
 */
const ListNameInput = ({ list, onEdit }) => {
    // Translation hook
    const { t } = useTranslation();

    // Render
    return (
        <View style={[styles.row, styles.marginTop]}>
            {i18n.language === "he" && (
                <Text style={[styles.txt, { marginRight: "5%" }]}>
                    {t("editList.listName")}
                </Text>
            )}
            <View style={styles.inputContainer}>
                <TextInput
                    defaultValue={list.name}
                    style={styles.name}
                    placeholder={t("editList.listNamePlaceholder")}
                    maxLength={15}
                    onChangeText={onEdit}
                    keyboardType="visible-password"
                    underlineColorAndroid="transparent"
                />
                <Text style={styles.charIndicator}>{list.name.length}/15</Text>
            </View>
            {i18n.language !== "he" && (
                <Text style={[styles.txt, { marginLeft: "5%" }]}>
                    {t("editList.listName")}
                </Text>
            )}
        </View>
    );
};

export default ListNameInput;