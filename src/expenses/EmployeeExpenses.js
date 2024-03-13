import { StyleSheet, Text, View, StatusBar, TextInput, Pressable, Image, FlatList,Dimensions,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'


const { width } = Dimensions.get('window');

export default function EmployeeExpenses() {

    const navigation = useNavigation();

    const [expensesData, setExpensesData] = useState([]);
    const [error, setError] = useState(null);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const getStatusColor = (status) => {
        switch (status) {
            case 'approved':
                return '#22BB33';
            case 'pending':
                return '#FFC300';
            case 'rejected':
                return 'red';
        }
    }
    useEffect(() => {
        const fetchDataEmpl = async () => {
            try {
                const authToken = await AsyncStorage.getItem('authToken');
                const response = await axios.get('http://46.28.44.174:5001/manager/expense/fillterAlltheDataExpense', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                const data = response.data.data;
                console.log('expeses data****************************', data)
                setExpensesData(data.expenses);
                setFilteredExpenses(data.expenses);

            } catch (error) {
                console.error('Error fetching expenses data:', error);
                setError(error.message);

            }
        };
        fetchDataEmpl();
    }, [])
    useEffect(() => {
        filterExpenses();
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
                {/* <Text style={styles.infoText}>{item.EmployeeId}</Text> */}
                {/* <Text style={[styles.infoText1,styles.section2Btn, { color: getStatusColor(item.status) }]}>{item.status}</Text> */}
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
                    <Text style={styles.infoText2}>Food</Text>
                    {item.expenseType === 'food' && <Text style={styles.infoText}>{item.amount}</Text>}
                </View>
                <View style={styles.leftBorder}>
                    <Text style={styles.infoText2}>Accommodation</Text>
                    {item.expenseType === 'accommodation' && <Text style={styles.infoText}>{item.amount}</Text>}
                </View>
                <View style={styles.leftBorder}>
                    <Text style={styles.infoText2}>Transportation</Text>
                    {item.expenseType === 'transportation' && <Text style={styles.infoText}>{item.amount}</Text>}
                </View>
            </View>
        </View>
    );
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#003C9E" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image source={require('../../assets/images/arrow.png')} style={{ width: 30, height: 30, }} />
                </TouchableOpacity>
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
                    <Pressable style={[styles.section2Btn1, selectedStatus === 'approved', { backgroundColor: 'red' }]}
                        onPress={() => setSelectedStatus('rejected')}>
                        <Image style={styles.section2BtnImage1} source={require('../../assets/images/cancel.png')} />
                        <Text style={styles.section2BtnText}>Rejected</Text>
                    </Pressable>
                    <Pressable style={[styles.section2Btn1, selectedStatus === 'pending', { backgroundColor: '#FFC300' }]}
                        onPress={() => setSelectedStatus('pending')}>
                        <Image style={styles.section2BtnImage} source={require('../../assets/images/pending.png')} />
                        <Text style={styles.section2BtnText}>Pending</Text>
                    </Pressable>
                    <Pressable style={[styles.section2Btn1, selectedStatus === 'rejected', { backgroundColor: '#22BB33' }]}
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
        color: '#000',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        marginHorizontal: 10,
        marginTop: 10,
        borderBottomColor: 'white',
        width: '35%',
        //backgroundColor:'white'
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
        marginLeft: 5,
        // paddingHorizontal:2
    },
    section2BtnText: {
        color: '#fff',
        fontSize: 10,
        paddingHorizontal: 5,
        fontWeight: 'bold',
        // paddingHorizontal:2
        
    },
    section2BtnImage: {
        width: 10,
        height: 15,
        alignSelf: 'center',
        paddingHorizontal:2,
        left:5,
        margin:3
     
    },
    section2BtnImage1: {
        width: 10,
        height: 10,
        alignSelf: 'center',
        paddingHorizontal:2,
        left:5,
        margin:5
    },
    itemContainer: {
        justifyContent: 'space-between',
        width: '95%',
        backgroundColor: '#1A50A7',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 5,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        marginTop: 2,
        paddingVertical: 5
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
        //alignSelf: 'center',
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
        paddingVertical: 10
    },
    leftBorder: {
        borderLeftWidth: 1,
        borderLeftColor: 'grey',
        // alignItems:'center'
        // margin:2
    },
});