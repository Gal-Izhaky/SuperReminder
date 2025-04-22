// External imports
import { useState, useEffect, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";

// Internal imports
import FirebaseData from "../../../core/storage/firebase/FirebaseData";
import PermissionManager from "../../../core/permissions/PermissionManager";

/**
 * Custom hook to manage barcode scanning functionality
 * @returns {Object} State and handlers for barcode scanning
 */
export const useBarcodeScanner = () => {
    // State management
    const [hasPermissions, setHasPermissions] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [scannedItem, setScannedItem] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    
    // Check if screen is focused
    const isFocused = useIsFocused();

    // Request camera permissions on mount
    useEffect(() => {
        PermissionManager.requestCameraPermissions(setHasPermissions);
    }, []);
    
    // Reset state when screen loses focus
    useEffect(() => {
        if (!isFocused) {
            setModalVisible(false);
            setScanned(false);
            setScannedItem(null);
        }
    }, [isFocused]);

    // Reset scan state after modal is closed
    useEffect(() => {
        if (!modalVisible && scannedItem) {
            setTimeout(() => {
                setScanned(false);
                setScannedItem(null);
            }, 450); // Match the animation duration of modal
        }
    }, [modalVisible, scannedItem]);

    /**
     * Handles barcode detection from camera
     */
    const handleBarcodeDetected = useCallback(({ barcodes }) => {
        if (barcodes.length > 0 && !scanned) {
            const barcodeData = barcodes[0];
            
            // Get item data
            const item = FirebaseData.getItemByKey(barcodeData.data);
            if (item) {
                setScannedItem(item);
                setScanned(true);
                setModalVisible(true);
            }
        }
    }, [scanned]);

    /**
     * Handles closing the price comparison modal
     */
    const handleCloseModal = useCallback(() => {
        setModalVisible(false);
    }, []);

    /**
     * Creates a mock list object with the scanned item
     */
    const mockList = useCallback(() => {
        if (!scannedItem) return { items: [] };
        
        return {
            key: 'scan-result',
            items: [{
                ...scannedItem,
                amount: 1
            }]
        };
    }, [scannedItem]);

    return {
        hasPermissions,
        scanned,
        scannedItem,
        modalVisible,
        handleBarcodeDetected,
        handleCloseModal,
        mockList
    };
};