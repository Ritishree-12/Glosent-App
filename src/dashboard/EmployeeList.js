import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, Image, TextInput, Pressable, TouchableOpacity,Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const EmployeeList = () => {
    const navigation = useNavigation();
    
    const [employeeList, setEmployeeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authToken = await AsyncStorage.getItem('authToken');
                console.log('bearer Token******', authToken)
                const response = await axios.get('http://46.28.44.174:5001/manager/employee/ManagerUnderAllEmployees', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                console.log('data employee  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', response.data)
                if (response.data && response.data.status === "1" && response.data.data && response.data.data.employee) {
                    setEmployeeList(response.data.data.employee);
                } else {
                    throw new Error("Invalid response format");
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching employee data:', error);
                setError(error.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredEmployeeList = employeeList.filter(employee =>
        employee.personalInformation.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.personalInformation.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete=()=>{
        console.log('deleted*********************')
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#003c9e" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Image source={require('../../assets/images/arrow.png')} style={{width:30,height:30,}}/>
                </TouchableOpacity>
                <Text style={styles.headerText}>Employee List</Text>
            </View>
            <View>
                <View style={styles.section1}>
                    <TextInput
                        placeholder='Search'
                        placeholderTextColor='white'
                        style={styles.input}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <View>
                        <Pressable style={styles.section1Btn}>
                            <Image style={styles.section2BtnImage} source={require('../../assets/images/download.png')}></Image>
                            <Text style={styles.section1BtnText}>Download</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

            <ScrollView style={{ flex: 1 }}>
                {loading ? (
                    <Text>Loading...</Text>
                ) : error ? (
                    <Text>Error: {error}</Text>
                ) : (
                    filteredEmployeeList.map((employee, index) => (
                        <View style={styles.section2} key={index}>
                            <View>
                                <Image source={require('../../assets/images/blank-profile.png')} style={{ width: 50, height: 50, borderRadius: 10 }} />
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                                    <Text style={{ width: 200, fontSize: 12, fontWeight: 'bold', color: '#fff' }}>Name: {employee.personalInformation.firstName} {employee.personalInformation.middleName} {employee.personalInformation.lastName}</Text>
                                    <Image source={require('../../assets/images/edit.png')} style={{ width: 16, height: 16, marginLeft: 22 }} />
                                    <Image source={require('../../assets/images/delete.png')} style={{ width: 16, height: 16, marginLeft: 14 }} />
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 10, width: 70 }}>
                                    <View>
                                        <Text style={styles.text1}>Designation</Text>
                                        <Text style={styles.text2}>{employee.designation}</Text>
                                    </View>
                                    <View style={styles.verticalLine} />
                                    <View>
                                        <Text style={styles.text1}>Employee ID</Text>
                                        <Text style={styles.text2}>{employee.emplyId}</Text>
                                    </View>
                                    <View style={styles.verticalLine} />
                                    <View>
                                        <Text style={styles.text1}>Phone Number</Text>
                                        <Text style={styles.text2}>{employee.mobileNumber}</Text>
                                    </View>
                                    <View style={styles.verticalLine} />
                                    <View>
                                        <Text style={styles.text1}>Departments</Text>
                                        <Text style={styles.text2}>Marketing</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    )
}

export default EmployeeList;

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
    section1: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 40,
        marginHorizontal: 10,
        alignItems: 'flex-end'
    },
    section1Btn: {
        borderRadius: 20,
        backgroundColor: '#ddb80f',
        alignSelf: 'center',
        alignContent: 'flex-end',
        flexDirection: "row",
    },
    section2BtnImage: {
        width: 15,
        height: 15,
        marginLeft: 5,
        alignSelf: 'center'
    },
    section1BtnText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '400',
        paddingHorizontal: 6,
        paddingVertical: 4,
        fontWeight: 'bold',
    },
    section2: {
        backgroundColor: '#1a50a7',
        borderRadius: 14,
        margin: 8,
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 18
    },
    text1: {
        fontWeight: 'bold',
        fontSize: 8,
        color: '#e2e733'
    },
    text2: {
        fontWeight: 'bold',
        width: 56,
        fontSize: 7,
        color: '#fff'
    },
    verticalLine: {
        width: 1,
        height: '100%',
        backgroundColor: '#C9CACB',
        marginHorizontal: 8,
    },
    input: {
        borderBottomWidth: 1,
        width: '40%',
        marginLeft: 30,
        borderBottomColor: 'white',
        color: 'white',
        marginRight: 20
    },
});
