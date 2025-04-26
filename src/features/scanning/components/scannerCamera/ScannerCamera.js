// External imports
import React, { memo } from "react";
import { Text } from "react-native";
import { RNCamera } from "react-native-camera";
import { useTranslation } from "react-i18next";

// Styles
import styles from "./ScannerCamera.styles";

/**
 * Camera component for barcode scanning
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.hasPermissions - Whether camera permissions are granted
 * @param {boolean} props.scanned - Whether a barcode has been scanned
 * @param {Function} props.onBarcodeDetected - Callback when barcode is detected
 */
const ScannerCamera = ({ hasPermissions, scanned, onBarcodeDetected }) => {
    const { t } = useTranslation();
    
    if (!hasPermissions) {
        return <Text style={styles.instructionText}>{t('scanner.noPermissions')}</Text>;
    }
    
    return (
        <>
            <RNCamera
                style={styles.camera}
                onGoogleVisionBarcodesDetected={
                    scanned ? undefined : onBarcodeDetected
                }
                type={RNCamera.Constants.Type.back}
                captureAudio={false}
            />
            <Text style={styles.instructionText}>{t('scanner.scanInstructions')}</Text>
        </>
    );
};

export default memo(ScannerCamera);