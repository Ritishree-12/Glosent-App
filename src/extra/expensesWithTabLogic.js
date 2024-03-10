// rm -rf node_modules
// rm package-lock.json
// npm install





import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';

const ExpensesEntry = () => {
    const [activeTab, setActiveTab] = useState('Food');

    const handleTabPress = (category) => {
        setActiveTab(category);
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#003c9e" />
            <View style={styles.header}>
                <Text style={styles.headerText}>Expenses Entry</Text>
            </View>

            <View style={styles.section1}>
                <Text style={styles.heading}>choose Categories</Text>
                <View style={styles.boxContainer}>
                    <View>
                        <TouchableOpacity onPress={() => handleTabPress('Food')}>
                            <View style={[styles.box, activeTab === 'Food' && styles.activeBox]}>
                                <Image source={require('../../assets/images/food.png')} style={{ width: 34, height: 32, }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.title}>Food</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => handleTabPress('Transportation')}>
                            <View style={[styles.box, activeTab === 'Transportation' && styles.activeBox]}>
                                <Image source={require('../../assets/images/location.png')} style={{ width: 33, height: 33 }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.title}>Transportation</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => handleTabPress('Accommodation')}>
                            <View style={[styles.box, activeTab === 'Accommodation' && styles.activeBox]}>
                                <Image source={require('../../assets/images/bed.png')} style={{ width: 34, height: 32 }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.title}>Accommodation</Text>
                    </View>
                </View>
            </View>

            <View style={styles.section1}>
                <View style={styles.section2}>
                    <Input
                        placeholder={`${activeTab} Type`}
                        placeholderTextColor='white'
                        inputStyle={styles.inputStyle}
                    />
                    <Input
                        placeholder='Amount'
                        placeholderTextColor='white'
                        inputStyle={styles.inputStyle}
                    />
                    <Input
                        placeholder='Date of expense'
                        placeholderTextColor='white'
                        inputStyle={styles.inputStyle}
                    />
                    <Input
                        placeholder='Notes'
                        placeholderTextColor='white'
                        inputStyle={styles.inputStyle}
                    />

                </View>
                <Text style={styles.attachTitle}>Attach receipts(image or file)</Text>
                <View style={styles.cameraContainer}>
                    <View style={styles.boxAttach}>
                        <Image source={require('../../assets/images/upload.png')} style={{ width: 42, height: 28, }} />
                        <Text style={{ fontSize: 10, margin: 4, color: '#fff' }}>Browse File to Upload</Text>
                    </View>
                    <View style={styles.boxAttach}>
                        <Image source={require('../../assets/images/photo.png')} style={{ width: 38, height: 30, }} />
                        <Text style={{ fontSize: 10, margin: 4, color: '#fff' }}>Click Photo</Text>
                    </View>
                </View>
                <View style={styles.boxContainer}>
                    <TouchableOpacity style={styles.button1}>
                        <Text style={styles.btnText}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2}>
                        <Text style={styles.btnText} >Reset</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default ExpensesEntry;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003c9e',
    },
    header: {
        backgroundColor: '#ffffff',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: '#b9ce19',
        borderBottomWidth: 5,
        position: 'relative',
        elevation: 5,

    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#fff",
        marginTop: 20,
        left: 20,
    },
    section1: {
        backgroundColor: '#1a50a7',
        borderRadius: 20,
        margin: 10,
    },
    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 18,
        alignItems: 'center',
    },
    box: {
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderRightColor: '#fff',
        marginLeft: 16,
        justifyContent: 'center', // Align children vertically in the center
        alignItems: 'center', // Align children horizontally in the center
    },
    activeBox: {
        backgroundColor: '#b9ce19', // Change the active color here
    },
    title: {
        color: '#fff',
        fontSize: 12,
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 10,
        fontWeight: 'bold'
    },
    label: {
        color: '#fff'
    },
    section2: {
        backgroundColor: '#1a50a7',
        borderRadius: 20,
        margin: 5,
    },
    attachTitle: {
        margin: 8,
        fontWeight: 'bold',
        color: '#b9ce19'
    },
    inputStyle: {
        color: '#fff',
        fontSize: 14,
        marginBottom: 5, // Decrease the marginBottom to reduce the height of input fields
        height: 20, // Set a specific height for the input fields
    },
    boxAttach: {
        borderStyle: 'dashed',
        borderColor: '#fff',
        borderWidth: 1,
        width: 116,
        height: 66,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button1: {
        backgroundColor: '#b9ce19',
        paddingVertical: 8,
        paddingHorizontal: 50,
        borderRadius: 25,
    },
    button2: {
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 50,
        borderRadius: 25,
    },
    btnText: {
        color: '#1248a1',
        fontWeight: 'bold',
        fontSize: 14
    },
    cameraContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // paddingVertical: 18,
        alignItems: 'center',
    }
});
