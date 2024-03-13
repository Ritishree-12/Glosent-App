import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, ScrollView, Alert, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
import { launchCamera } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ManagerTransportationType = () => {
    const navigation = useNavigation();
    const [activeBox, setActiveBox] = useState(0);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const [transportDetails, setTransportDetails] = useState({
        amount: '',
        dateOfExpense: '',
        pickup: '',
        drop: '',
        notes: '',
        subExpenseType: 'Auto',
    });

    const handleBoxPress = (index) => {
        setActiveBox(index);
    };

    const handleTransportChange = (field, value) => {
        setTransportDetails(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleDateSelect = (date) => {
        handleTransportChange('dateOfExpense', date.dateString);
        setShowCalendar(false);
    };

    const handleSubmit = async () => {
        navigation.goBack();
        const data = {
            subExpenseType: activeBox === 0 ? 'Auto' :
                activeBox === 1 ? 'Car' :
                    activeBox === 2 ? 'Bus' : 'Train',
            amount: transportDetails.amount,
            dateOfExpense: transportDetails.dateOfExpense,
            notes: transportDetails.notes,
            expenseType: "transportation",
        };
        try {
            const authToken = await AsyncStorage.getItem('authToken');
            if (!authToken) {
                console.error('Authentication token not found');
                return;
            }
            const response = await axios.post('http://46.28.44.174:5001/manager/expense/managerAddExpense', data, {
                headers: {
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${authToken}`
                }
            });
            // Handle the response data
            if (response.data.status === "1") {
              
                const responseData = response.data.data;
                console.log('Expense submitted successfully:', responseData);
                // Clear the form fields
                setTransportDetails({
                    amount: '',
                    dateOfExpense: '',
                    notes: '',
                });
                setActiveBox(0);
                setShowCalendar(false);
                Alert.alert(
                    'Success',
                    'Expense details submitted successfully!',
                    [
                        {
                            text: 'OK',
                            onPress: () => console.log('OK Pressed')
                        }
                    ],
                    { cancelable: false }
                );
            } else {
                console.error('Expense submission failed:', response.data);
                // Handle the failure scenario, display error message or take appropriate action
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            // Handle the error scenario, display error message or take appropriate action
        }
    };


    const handlePhotoPicker = () => {
        const options = {
            title: 'Select Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchCamera(options, response => {
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                setSelectedImage(response.uri);
            }
        });
    };

    const handleFilePicker = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setSelectedFile(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled file picker');
            } else {
                throw err;
            }
        }
    };


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#003c9e" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image source={require('../../../assets/images/arrow.png')} style={{ width: 30, height: 30, }} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Transportation</Text>
            </View>

            <View style={styles.section1}>
                <Text style={styles.heading}>Select Transportation Type</Text>
                <View style={styles.boxContainer}>
                    <View>
                        <TouchableOpacity onPress={() => handleBoxPress(0)}>
                            <View style={[styles.box, activeBox === 0 && styles.activeBox]}>
                                <Image source={require('../../../assets/images/auto-icon.png')} style={{ width: 34, height: 32 }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.title}>Auto</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => handleBoxPress(1)}>
                            <View style={[styles.box, activeBox === 1 && styles.activeBox]}>
                                <Image source={require('../../../assets/images/car-icon.png')} style={{ width: 40, height: 40 }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.title}>Car</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => handleBoxPress(2)}>
                            <View style={[styles.box, activeBox === 2 && styles.activeBox]}>
                                <Image source={require('../../../assets/images/bus-icon.png')} style={{ width: 34, height: 32 }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.title}>Bus</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => handleBoxPress(3)}>
                            <View style={[styles.box, activeBox === 3 && styles.activeBox]}>
                                <Image source={require('../../../assets/images/train-icon.png')} style={{ width: 34, height: 32 }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.title}>Train</Text>
                    </View>
                </View>

            </View>

            <View style={styles.section1}>

                <View style={styles.section2}>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <Input
                            placeholder='Amount'
                            placeholderTextColor='white'
                            inputStyle={styles.inputStyle}
                            value={transportDetails.amount}
                            onChangeText={text => handleTransportChange('amount', text)}
                        />
                        <TouchableOpacity onPress={() => setShowCalendar(true)}>
                            <Input
                                placeholder='Date of Expense'
                                placeholderTextColor='white'
                                inputStyle={styles.inputStyle}
                                value={transportDetails.dateOfExpense}
                                editable={false}
                            />
                        </TouchableOpacity>
                        {showCalendar && (
                            <Calendar
                                onDayPress={handleDateSelect}
                                current={transportDetails.dateOfExpense}
                            />
                        )}
                        <Input
                            placeholder='Notes'
                            placeholderTextColor='white'
                            inputStyle={styles.inputStyle}
                            value={transportDetails.notes}
                            onChangeText={text => handleTransportChange('notes', text)}
                        />
                        <Input
                            placeholder='Pickup Location'
                            placeholderTextColor='white'
                            inputStyle={styles.inputStyle}
                            value={transportDetails.pickup}
                            onChangeText={text => handleTransportChange('pickup', text)}
                        />
                        <Input
                            placeholder='Drop Location'
                            placeholderTextColor='white'
                            inputStyle={styles.inputStyle}
                            value={transportDetails.drop}
                            onChangeText={text => handleTransportChange('drop', text)}
                        />
                    </ScrollView>
                </View>
                <Text style={styles.attachTitle}>Attach Receipts (Image or File)</Text>
                <View style={styles.cameraContainer}>
                    <TouchableOpacity style={styles.boxAttach} onPress={handleFilePicker}>
                        <Image source={require('../../../assets/images/upload.png')} style={{ width: 42, height: 28, }} />
                        <Text style={{ fontSize: 10, margin: 4, color: '#fff' }}>Browse File to Upload</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxAttach} onPress={handlePhotoPicker}>
                        <Image source={require('../../../assets/images/photo.png')} style={{ width: 38, height: 30, }} />
                        <Text style={{ fontSize: 10, margin: 4, color: '#fff' }}>Click Photo</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.boxContainer}>
                    <TouchableOpacity style={styles.button1} onPress={handleSubmit}>
                        <Text style={styles.btnText}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} onPress={() => { // handle reset
                        setTransportDetails({
                            amount: '',
                            dateOfExpense: '',
                            pickup: '',
                            drop: '',
                            notes: '',
                        });
                        setSelectedImage(null); // Clear selected image
                        setSelectedFile(null);  // Clear selected file
                    }}>
                        <Text style={styles.btnText} >Reset</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default ManagerTransportationType;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003c9e',
    },
    header: {
        backgroundColor: '#ffffff',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 5,
        flexDirection: 'row',
        paddingHorizontal: '2%',
    },
    backButton: {
        position: 'absolute',
        left: 18,
        zIndex: 1,
    },
    headerText: {
        fontSize: width > 360 ? 18 : 16,
        fontWeight: 'bold',
        color: '#003c9d',
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 12,
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 10,
        fontWeight: 'bold'
    },
    section2: {
        backgroundColor: '#1a50a7',
        borderRadius: 20,
        margin: 12,
        height: 240
    },
    attachTitle: {
        marginLeft: 18,
        fontWeight: 'bold',
        color: '#b9ce19'
    },
    inputStyle: {
        color: '#fff',
        fontSize: 14,
        marginBottom: 5,
        height: 20,
    },
    boxAttach: {
        borderStyle: 'dashed',
        borderColor: '#fff',
        borderWidth: 1,
        width: 116,
        height: 66,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    button1: {
        backgroundColor: '#b9ce19',
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 25,
    },
    button2: {
        backgroundColor: '#fff',
        paddingVertical: 12,
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
        alignItems: 'center',
    },
    activeBox: {
        backgroundColor: '#b9ce19',
    },
});
