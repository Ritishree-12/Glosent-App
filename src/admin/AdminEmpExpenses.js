import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Pressable, Image, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function AdminEmpExpenses() {
    const [employeeData, setEmployeeData] = useState([]);
    const [expensesData, setExpensesData] = useState([]);
    const [error, setError] = useState(null);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('all');

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved':
                return '#22BB33'; // Green color for Approved
            case 'pending':
                return '#FFC300'; // Yellow color for Pending
            case 'rejected':
                return 'red'; // Red color for Rejected
            default:
                return '#FFFFFF'; // Default white color
        }
    };

    useEffect(() => {
        const fetchDataEmpl = async () => {
            try {
                const authToken = await AsyncStorage.getItem('authToken');
                const response = await axios.get('http://46.28.44.174:5001/admin/expense/AllEmployeeExpense', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                const { employeeData, expenses } = response.data.data;
                console.log('admin all employees expense data:', employeeData);
                console.log('all expenses data:', expenses);
                setEmployeeData(employeeData);
                setExpensesData(expenses);
                setFilteredExpenses(expenses);
            } catch (error) {
                console.error('Error fetching expenses data:', error);
                setError(error.message);
            }
        };
        fetchDataEmpl();
    }, []);

    useEffect(() => {
        filterExpenses(); // Filter expenses when selectedStatus changes
    }, [selectedStatus]);

    const filterExpenses = () => {
        if (selectedStatus === 'all') {
            setFilteredExpenses(expensesData);
        } else {
            const filtered = expensesData.filter(expense => expense.status === selectedStatus);
            setFilteredExpenses(filtered);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>{item.employeeId?.personalInformation.firstName} {item.employeeId?.personalInformation.middleName} {item.employeeId?.personalInformation.lastName} - {item.employeeId?.emplyId}</Text>
                <Pressable style={[styles.section2Btn, { backgroundColor: getStatusColor(item.status) }]}>
                    {item.status === 'approved' && <Image style={styles.section2BtnImage} source={require('../../assets/images/approve.png')} />}
                    {item.status === 'pending' && <Image style={styles.section2BtnImage} source={require('../../assets/images/pending.png')} />}
                    {item.status === 'rejected' && <Image style={styles.section2BtnImage} source={require('../../assets/images/cancel.png')} />}
                    <Text style={styles.section2BtnText}>{item.status}</Text>
                </Pressable>
                <Text style={styles.infoText}>Total ₹: {item.totalExpenseAmount?.totalAmount}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <View style={{ width: '30%', alignSelf: 'center', justifyContent: 'flex-start' }}>
                    <Text numberOfLines={1} style={styles.infoText1}>Date: {item.dateOfExpense}</Text>
                </View>
                <View style={styles.leftBorder}>
                    <Text style={styles.infoText2}>Expense Type: {item.expenseType}</Text>
                    <Text style={styles.infoText}>Amount: ₹{item.amount}</Text>
                </View>
                <View style={styles.leftBorder}>
                    <Text style={styles.infoText2}>Sub Expense Type: {item.subExpenseType}</Text>
                    <Text style={styles.infoText}>Notes: {item.notes}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#003C9E" />
            <View style={styles.header}>
                <Text style={styles.headerText}>Employee Expenses</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.inputContainer}>
                    <Image style={styles.searchIcon} source={require('../../assets/images/searchGray.png')} />
                    <TextInput
                        placeholder='Search'
                        placeholderTextColor='white'
                        style={styles.input}
                    />
                </View>
                <View style={styles.filterIconContainer}>
                    <Pressable style={[styles.section2Btn1, selectedStatus === 'rejected' && { backgroundColor: 'red' }]}
                        onPress={() => setSelectedStatus('rejected')}>
                        <Image style={styles.section2BtnImage1} source={require('../../assets/images/cancel.png')} />
                        <Text style={styles.section2BtnText}>Rejected</Text>
                    </Pressable>
                    <Pressable style={[styles.section2Btn1, selectedStatus === 'pending' && { backgroundColor: '#FFC300' }]}
                        onPress={() => setSelectedStatus('pending')}>
                        <Image style={styles.section2BtnImage} source={require('../../assets/images/pending.png')} />
                        <Text style={styles.section2BtnText}>Pending</Text>
                    </Pressable>
                    <Pressable style={[styles.section2Btn1, selectedStatus === 'approved' && { backgroundColor: '#22BB33' }]}
                        onPress={() => setSelectedStatus('approved')}>
                        <Image style={styles.section2BtnImage} source={require('../../assets/images/approve.png')} />
                        <Text style={styles.section2BtnText}>Approved</Text>
                    </Pressable>
                </View>
            </View>
            <FlatList
                data={filteredExpenses}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003C9E',
    },
    header: {
        backgroundColor: '#FFFFFF',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 5,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#003c9d',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        marginHorizontal: 10,
        marginTop: 10,
        borderBottomColor: 'white',
        width: '35%',
    },
    input: {
        borderBottomWidth: 1,
        width: '70%',
        marginLeft: 10,
        borderBottomColor: 'white',
        color: 'white',
    },
    searchIcon: {
        width: 20,
        height: 20,
        tintColor: 'white',
    },
    filterIconContainer: {
        flexDirection: 'row',
        width: '18%',
        height: 40,
        alignSelf: 'center',
        alignItems: 'flex-end'
    },
    section2Btn: {
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 3,
        paddingHorizontal: 8,
    },
    section2Btn1: {
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 20,
        marginLeft: 5
    },
    section2BtnText: {
        color: '#fff',
        fontSize: 10,
        paddingHorizontal: 5,
        fontWeight: 'bold',
    },
    section2BtnImage: {
        width: 15,
        height: 15,
        alignSelf: 'center'
    },
    section2BtnImage1: {
        width: 10,
        height: 10,
        alignSelf: 'center'
    },
    itemContainer: {
        justifyContent: 'space-between',
        padding: 10,
        width: '95%',
        backgroundColor: '#1A50A7',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 5,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        marginTop: 2,
    },
    infoText: {
        marginBottom: 5,
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold'
    },
    infoText1: {
        marginBottom: 5,
        color: 'white',
        fontSize: 10,
    },
    infoText2: {
        color: 'yellow',
        fontSize: 8,
    },
    detailsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: 'white',
    },
    leftBorder: {
        borderLeftWidth: 1,
        borderLeftColor: 'grey',
    },
});
