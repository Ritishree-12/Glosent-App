import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ManagerFoodType = () => {
    const navigation = useNavigation();

    const [activeBox, setActiveBox] = useState(0);
    const [showCalendar, setShowCalendar] = useState(false);
    const [expenseType, setExpenseType] = useState('FOOD')
    const [foodDetails, setFoodDetails] = useState({
        amount: '',
        dateOfExpense: '',
        notes: '',

    });
    // const [selectedImageURI, setSelectedImageURI] = useState(null);


    const handleBoxPress = (index) => {
        setActiveBox(index);
    };

    const handleFoodChange = (field, value) => {
        if (field === 'amount') {
            value = parseInt(value, 10);
        }
        setFoodDetails(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleDateSelect = (date) => {
        handleFoodChange('dateOfExpense', date.dateString);
        setShowCalendar(false);
    };

    const handleSubmit = async () => {
        const data = {

            subExpenseType: activeBox === 0 ? 'BreakFast' :
                activeBox === 1 ? 'Lunch' :
                    activeBox === 2 ? 'Snacks' : 'Dinner',
            amount: foodDetails.amount,
            dateOfExpense: foodDetails.dateOfExpense,
            notes: foodDetails.notes,
            expenseType: "food",

        };

        try {
            const authToken = await AsyncStorage.getItem('authToken');
            if (!authToken) {
                console.error('Authentication token not found');
                return;
            }

            const response = await axios.post('http://46.28.44.174:5001/manager/expense/managerAddExpense', data, {
                headers: {
                    'Content-Type': 'application/json', // Corrected content type
                    Authorization: `Bearer ${authToken}`
                }
            });

            // Handle the response data
            if (response.data.status === "1") {
                // Update your state or perform any other actions based on the response
                const responseData = response.data.data;
                console.log('Expense submitted successfully:', responseData);

                // Clear the form fields
                setFoodDetails({

                    amount: '',
                    dateOfExpense: '',
                    notes: '',

                });
                setActiveBox(0);
                setShowCalendar(false);
            } else {
                console.error('Expense submission failed:', response.data);
                // Handle the failure scenario, display error message or take appropriate action
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            // Handle the error scenario, display error message or take appropriate action
        }
    };


    const handleReset = () => {
        setFoodDetails({
            subExpenseType: '',
            amount: '',
            dateOfExpense: '',
            notes: '',

        });
        setActiveBox(0);
        setShowCalendar(false);
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#003c9e" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image source={require('../../../assets/images/arrow.png')} style={{ width: 30, height: 30, }} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Food Type</Text>
            </View>

            <View style={styles.section1}>
                <Text style={styles.heading}>Select Food Type</Text>
                <View style={styles.boxContainer}>
                    <TouchableOpacity onPress={() => handleBoxPress(0)}>
                        <View style={[styles.box, activeBox === 0 && styles.activeBox]}>
                            <Image source={require('../../../assets/images/breakfast-icon.png')} style={{ width: 34, height: 32 }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleBoxPress(1)}>
                        <View style={[styles.box, activeBox === 1 && styles.activeBox]}>
                            <Image source={require('../../../assets/images/lunch-icon.png')} style={{ width: 33, height: 33 }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleBoxPress(2)}>
                        <View style={[styles.box, activeBox === 2 && styles.activeBox]}>
                            <Image source={require('../../../assets/images/snacks-icon.png')} style={{ width: 34, height: 32 }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleBoxPress(3)}>
                        <View style={[styles.box, activeBox === 3 && styles.activeBox]}>
                            <Image source={require('../../../assets/images/dinner-icon.png')} style={{ width: 34, height: 32 }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.section1}>
                    <View style={styles.section2}>
                        <Input
                            placeholder='Amount'
                            placeholderTextColor='white'
                            inputStyle={styles.inputStyle}
                            value={foodDetails.amount}
                            onChangeText={text => handleFoodChange('amount', text)}
                        />
                        <TouchableOpacity onPress={() => setShowCalendar(true)}>
                            <Input
                                placeholder='Date of Expense'
                                placeholderTextColor='white'
                                inputStyle={styles.inputStyle}
                                value={foodDetails.dateOfExpense}
                                editable={false}
                            />
                        </TouchableOpacity>
                        {showCalendar && (
                            <Calendar
                                onDayPress={handleDateSelect}
                                current={foodDetails.dateOfExpense}
                            />
                        )}
                        <Input
                            placeholder='Notes'
                            placeholderTextColor='white'
                            inputStyle={styles.inputStyle}
                            value={foodDetails.notes}
                            onChangeText={text => handleFoodChange('notes', text)}
                        />
                    </View>
                    <View style={styles.attachTitle}>
                        <Text style={{ marginLeft: 18, fontWeight: 'bold', color: '#b9ce19' }}>Attach Receipts (Image or File)</Text>
                        <View style={styles.cameraContainer}>
                            {/* <TouchableOpacity style={styles.boxAttach} onPress={openGallery}>
                                <Image source={require('../../assets/images/upload.png')} style={{ width: 42, height: 28, }} />
                                <Text style={{ fontSize: 10, margin: 4, color: '#fff' }}>Browse File to Upload</Text>
                            </TouchableOpacity> */}
                            {/* <TouchableOpacity style={styles.boxAttach} onPress={openGallery}>
                                <Image source={require('../../assets/images/photo.png')} style={{ width: 38, height: 30, }} />
                                <Text style={{ fontSize: 10, margin: 4, color: '#fff' }}>Click Photo</Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                    <View style={styles.boxContainer}>
                        <TouchableOpacity style={styles.button1} onPress={handleSubmit}>
                            <Text style={styles.btnText}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button2} onPress={handleReset}>
                            <Text style={styles.btnText}>Reset</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default ManagerFoodType;

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
    imageContainer: {
        alignItems: 'center',
        marginVertical: 10,
        width: '100%',
    },
});