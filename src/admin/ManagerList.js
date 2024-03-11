import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, Image, TextInput, Pressable, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ManagerList = () => {
    const navigation = useNavigation();
    const [employeeList, setEmployeeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authToken = await AsyncStorage.getItem('authToken');
                const response = await axios.get('http://46.28.44.174:5001/admin/employee/managerList', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                console.log('admin data employee ****************************', response.data);

                setEmployeeList(response.data.data); // Update to match the structure of your response data
                setLoading(false);
            } catch (error) {
                console.error('Error fetching employee data:', error);
                setError(error.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#003c9e" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Image source={require('../../assets/images/menu.png')} style={{ width: 24, height: 20, marginLeft: 30 }} />
                </TouchableOpacity>
                <Text style={styles.headerText}>View Manager List</Text>
            </View>
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

            <ScrollView style={{ flex: 1 }}>
                {loading ? (
                    <Text>Loading...</Text>
                ) : error ? (
                    <Text>Error: {error}</Text>
                ) : (
                    employeeList.map((employee, index) => (
                        <View style={styles.section2} key={index}>
                            <View>
                                <Image source={require('../../assets/images/blank-profile.png')} style={{ width: 50, height: 50, borderRadius: 10 }} />
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                                    <Text style={{ width: 200, fontSize: 9, fontWeight: 'bold', color: '#fff' }}>Name: {employee.firstName} {employee.lastName}</Text>
                                    
                                    <Image source={require('../../assets/images/edit.png')} style={{ width: 16, height: 16, marginLeft: 22 }} />
                                    <Image source={require('../../assets/images/delete.png')} style={{ width: 16, height: 16, marginLeft: 14 }} />
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 10, width: 200 }}>
                                    <View>
                                        <Text style={styles.text1}>Designation</Text>
                                        <Text style={styles.text2}>{employee.designation}</Text>
                                    </View>
                                    <View style={styles.verticalLine} />
                                    <View>
                                        <Text style={styles.text1}>Manager ID</Text>
                                        <Text style={styles.text2}>{employee.managerId}</Text>
                                    </View>
                                    <View style={styles.verticalLine} />
                                    <View>
                                        <Text style={styles.text1}>Phone Number</Text>
                                        <Text style={styles.text2}>{employee.mobileNumber}</Text>
                                    </View>
                                    <View style={styles.verticalLine} />
                                    <View>
                                        <Text style={styles.text1}>Departments</Text>
                                        <Text style={styles.text2}>{employee.managerDepartment}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

export default ManagerList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003c9e',
    },
    header: {
        backgroundColor: '#ffffff',
        height: 70,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: '#dade04',
        borderBottomWidth: 5,
        marginBottom: 8,
        flexDirection: 'row'
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 50
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
