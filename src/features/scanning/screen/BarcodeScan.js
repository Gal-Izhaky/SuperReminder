// External imports
import React from "react";
import { View } from "react-native";

// Internal imports
import styles from "./BarcodeScan.styles";
import Header from "../../../ui/components/header/Header";
import { useTranslation } from "react-i18next";
import { useBarcodeScanner } from "../hooks/useBarcodeScanner";
import ScannerCamera from "../components/scannerCamera/ScannerCamera";
import PriceTableModal from "../../shopping/editing/components/priceTableModal/PriceTableModal";

/**
 * BarcodeScan Component
 * Handles barcode scanning functionality and displays price comparison
 */
const BarcodeScan = () => {
    // Translation hook
    const { t } = useTranslation();

    // Custom hook for barcode scanning logic
    const {
        hasPermissions,
        scanned,
        scannedItem,
        modalVisible,
        handleBarcodeDetected,
        handleCloseModal,
        mockList
    } = useBarcodeScanner();

    // Render
    return (
        <>
            <Header title={t('screens.barcodeScanner')} />
            <View style={styles.container}>
                {/* Camera or Permission Message */}
                <ScannerCamera
                    hasPermissions={hasPermissions}
                    scanned={scanned}
                    onBarcodeDetected={handleBarcodeDetected}
                />

                {/* Price Comparison Modal */}
                <PriceTableModal
                    visible={modalVisible && scannedItem !== null}
                    onClose={handleCloseModal}
                    list={mockList()}
                    singleItemDetails
                />
            </View>
        </>
    );
};

export default BarcodeScan;
