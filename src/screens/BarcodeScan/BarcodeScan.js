import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { RNCamera } from "react-native-camera";

import styles from "./BarcodeScan.styles";
import FirebaseData from "../../data/FirebaseData";
import Header from "../../components/Header/Header";

const BarcodeScan = () => {
    const [scanned, setScanned] = useState(false);
    const [scannedItem, setScannedItem] = useState(null);
    const cameraRef = useRef(null);

    const handleGoogleVisionBarcodesDetected = ({ barcodes }) => {
        if (barcodes.length > 0) {
            const barcodeData = barcodes[0];

            setScanned(true);
            console.log("Barcode Scanned", `Data: ${barcodeData.data}`);

            const item = FirebaseData.getItemByKey(barcodeData.data);
            setScannedItem(item);
        }
    };

    return (
        <>
            <Header title="סריקת מוצר" />
            <View style={styles.container}>
                <RNCamera
                    ref={cameraRef}
                    style={styles.camera}
                    onGoogleVisionBarcodesDetected={scanned ? undefined : handleGoogleVisionBarcodesDetected}
                    type={RNCamera.Constants.Type.back}
                    captureAudio={false}
                    androidCameraPermissionOptions={{
                        title: "Permission to use camera",
                        message: "We need your permission to use your camera",
                        buttonPositive: "Ok",
                        buttonNegative: "Cancel",
                    }}
                />
                <Text style={styles.instructionText}>
                    החזק את המצלמה מעל הברקוד עד שהסריקה תושלם
                </Text>
                {scanned && (
                    <TouchableOpacity
                        style={styles.scanAgainButton}
                        onPress={() => {
                            setScanned(false);
                            setScannedItem(null);
                        }}
                    >
                        <Text style={styles.scanAgainButtonText}>Tap to Scan Again</Text>
                    </TouchableOpacity>
                )}
                {scannedItem && (
                    <View style={styles.resultContainer}>
                        <Text style={styles.resultHeader}>תוצאות סריקה</Text>
                        <ScrollView style={styles.resultContent}>
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
                                <Text style={styles.value}>{scannedItem.measurementUnit}</Text>
                            </View>
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
