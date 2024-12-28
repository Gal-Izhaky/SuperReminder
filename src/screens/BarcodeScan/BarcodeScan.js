// External imports
import React, { useState, useRef } from "react";
import { 
    View, 
    Text, 
    TouchableOpacity, 
    ScrollView 
} from "react-native";
import { RNCamera } from "react-native-camera";

// Internal imports
import styles from "./BarcodeScan.styles";
import FirebaseData from "../../data/FirebaseData";
import Header from "../../components/Header/Header";

/**
 * BarcodeScan Component
 * Handles barcode scanning functionality and displays scan results
 */
const BarcodeScan = () => {
    // State management
    const [scanned, setScanned] = useState(false);
    const [scannedItem, setScannedItem] = useState(null);
    const cameraRef = useRef(null);

    /**
     * Handles barcode detection from camera
     * @param {Object} param0 - Contains detected barcodes
     */
    const handleGoogleVisionBarcodesDetected = ({ barcodes }) => {
        if (barcodes.length > 0) {
            const barcodeData = barcodes[0];
            setScanned(true);
            console.log("Barcode Scanned", `Data: ${barcodeData.data}`);

            const item = FirebaseData.getItemByKey(barcodeData.data);
            setScannedItem(item);
        }
    };

    /**
     * Resets scan state to initial values
     */
    const handleResetScan = () => {
        setScanned(false);
        setScannedItem(null);
    };

    // Render
    return (
        <>
            <Header title="סריקת מוצר" />
            <View style={styles.container}>
                {/* Camera Component */}
                <RNCamera
                    ref={cameraRef}
                    style={styles.camera}
                    onGoogleVisionBarcodesDetected={
                        scanned ? undefined : handleGoogleVisionBarcodesDetected
                    }
                    type={RNCamera.Constants.Type.back}
                    captureAudio={false}
                    androidCameraPermissionOptions={{
                        title: "Permission to use camera",
                        message: "We need your permission to use your camera",
                        buttonPositive: "Ok",
                        buttonNegative: "Cancel",
                    }}
                />

                {/* Instructions Text */}
                <Text style={styles.instructionText}>
                    החזק את המצלמה מעל הברקוד עד שהסריקה תושלם
                </Text>

                {/* Scan Again Button */}
                {scanned && (
                    <TouchableOpacity
                        style={styles.scanAgainButton}
                        onPress={handleResetScan}
                    >
                        <Text style={styles.scanAgainButtonText}>
                            Tap to Scan Again
                        </Text>
                    </TouchableOpacity>
                )}

                {/* Scan Results */}
                {scannedItem && (
                    <View style={styles.resultContainer}>
                        <Text style={styles.resultHeader}>תוצאות סריקה</Text>
                        <ScrollView style={styles.resultContent}>
                            {/* Item Details */}
                            <View style={styles.resultRow}>
                                <Text style={styles.label}>מק"ט:</Text>
                                <Text style={styles.value}>{scannedItem.key}</Text>
                            </View>
                            <View style={styles.resultRow}>
                                <Text style={styles.label}>שם מוצר:</Text>
                                <Text style={styles.value}>{scannedItem.name}</Text>
                            </View>
                            <View style={styles.resultRow}>
                                <Text style={styles.label}>יחידת מדידה:</Text>
                                <Text style={styles.value}>
                                    {scannedItem.measurementUnit}
                                </Text>
                            </View>

                            {/* Price List */}
                            <View style={styles.resultRow}>
                                <Text style={styles.label}>מחירים:</Text>
                                <View>
                                    {scannedItem.prices.map((price, index) => (
                                        <Text key={index} style={styles.value}>
                                            {price.brand}: {price.price}
                                        </Text>
                                    ))}
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                )}
            </View>
        </>
    );
};

export default BarcodeScan;
