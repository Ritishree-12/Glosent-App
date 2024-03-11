import { StyleSheet, Text, View, StatusBar, Picker, FlatList, ScrollView, Image, TouchableOpacity,TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';


const TransactionHistory = () => {
    const [employeeData, SetEmployeeData] = useState([]);
    const [totalExpenseAmounts, setTotalExpenseAmounts] = useState(0);
    const [selectedManagerId, setSelectedManagerId] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [expenseReports, setExpenseReports] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchEmplData = async () => {
            try {
                const authToken = await AsyncStorage.getItem('authToken');
                console.log(' logout bearer token----------------', authToken)
                const response = await axios.get('http://46.28.44.174:5001/admin/expense/AllEmloyeeExpenseReportList', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                const data = response.data.data;
                console.log('MangerExpenses****************************', data)
                // const uniqueExpenses = Array.from(new Set(data.expenses.map(expense => expense._id)))
                //     .map(id => data.expenses.find(expense => expense._id === id));
                // console.log('unque', uniqueExpenses)

                SetEmployeeData(data.employeeData);
                setTotalExpenseAmounts(data.totalExpenseAmounts);
                setExpenseReports(data.expensesReports);
                //setLoading(false);  
            } catch (error) {
                console.error('Error fetching expenses data:', error);
                setError(error.message);
                //setLoading(false);
            }
        };
        fetchEmplData();
    }, [])

    const filteredManagerData = selectedManagerId ? employeeData.filter(manager => manager._id === selectedManagerId) : employeeData;
    console.log('employee', filteredManagerData)
    const filteredSearchData = employeeData.filter(manager => {
        const fullName = `${manager.personalInformation.firstName} ${manager.personalInformation.lastName}`;
        return fullName.toLowerCase().includes(searchQuery.toLowerCase()) || manager.emplyId.toLowerCase().includes(searchQuery.toLowerCase()) || manager.managerDepartment.toLowerCase().includes(searchQuery.toLowerCase());
    });

   

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#003c9e" />
            <View style={styles.header}>
                <Text style={styles.headerText}>Transaction History</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, }}>
                <View style={{ width: '30%', borderBottomWidth: 1, borderBottomColor: 'white', marginRight: 5 }}>
                    <Dropdown
                        placeholder='select'
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedStyle}
                        data={employeeData.map(manager => ({
                            label: `${manager.personalInformation.firstName} ${manager.personalInformation.lastName}`,
                            value: manager._id,
                        }))}
                        value={selectedManagerId}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        onChange={item => {
                            setSelectedManagerId(item.value);
                            setIsFocus(false);
                        }}
                    />

                </View>
                <View style={{ width: '30%', borderBottomWidth: 1, borderBottomColor: 'white' }}>
                    <Dropdown
                        placeholder='select Month'
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedStyle}
                        data={expenseReports?.map(report => ({
                            label: new Date(report.date).toLocaleDateString(),
                            value: report._id,
                        }))}
                        value={selectedDate}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        onChange={item => {
                            setSelectedDate(item.value);
                            setIsFocus(false);
                        }}
                    ></Dropdown>
                </View>
                <View style={{marginLeft:5,justifyContent:'center',width:'10%',height:30,alignSelf:'center',backgroundColor:'yellow',borderRadius:5,marginTop:5}}>
                    <TouchableOpacity>
                    <TextInput
            style={{ color: 'white' }}
            placeholder="Search"
            placeholderTextColor="white"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
        />
                <Image style={styles.section2BtnImage} source={require('../../assets/images/searchGray.png')} />
                </TouchableOpacity>
                </View>
                {/* <View style={{ width: '30%', }}>
                    <Text style={styles.text}>Total: {totalExpenseAmounts}</Text>
                </View> */}
             </View>

             <View style={{ flexDirection: 'row',width:'90%',alignSelf:'center',justifyContent:'space-evenly',marginTop:10 }}>
                <View style={{ flexDirection: 'row', }}>
                    <TouchableOpacity style={{height:20,width:'30%',borderWidth:1,borderRadius:20,paddingHorizontal:2,justifyContent:'center',alignItems:'center',borderColor:'yellow'}}>
                        <Text style={{fontSize:10,color:'yellow'}}>Weekly</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{height:20,width:'30%',borderWidth:1,borderRadius:20,paddingHorizontal:2,justifyContent:'center',alignItems:'center',marginLeft:10,borderColor:'yellow'}}>
                        <Text style={{fontSize:10,color:'yellow'}}>Daily</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width:'28%' }}>
                    <Text style={styles.text}>Total: {totalExpenseAmounts}</Text>
                </View>
            </View>

            <View style={{ backgroundColor: '#1a50a7', width: '90%', borderRadius: 30, paddingHorizontal: 5, alignSelf: 'center', marginTop: 20, height: '80%' }}>
                <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#89a5d1' }}>
                    <Text style={[styles.text, { width: '25%' }]}>Emp.Name</Text>
                    <Text style={[styles.text, { width: '25%' }]}>Emp.id</Text>
                    <Text style={[styles.text, { width: '25%' }]}>Department</Text>
                    <Text style={[styles.text, { width: '25%' }]}>Amount</Text>
                </View>
                <ScrollView>
                    {filteredManagerData.map((manager, index) => {
                        // Filter expense reports for the current manager
                        const managerExpenseReports = expenseReports.filter(report => report.employeeId === manager._id);

                        // Get the total amount from the filtered expense reports
                        const totalAmount = managerExpenseReports.reduce((acc, curr) => acc + curr.totalAmount, 0);

                        return (
                            <View key={index} style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#668ac4', }}>
                                <Text style={[styles.text1, { width: '25%' }]}>{manager.personalInformation.firstName} {manager.personalInformation.lastName}</Text>
                                <Text style={[styles.text1, { width: '25%' }]}>{manager.emplyId}</Text>
                                <Text style={[styles.text1, { width: '25%' }]}>{manager.managerDepartment}</Text>
                                <Text style={[styles.text1, { width: '25%' }]}>{totalAmount}</Text>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>


        </View>
    );
}

export default TransactionHistory;

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
        position: 'relative',
        elevation: 5,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    text: {
        color: 'yellow',
        fontSize: 10,
        //width: '25%',
        textAlign: 'center',
    },
    text1: {
        color: 'white',
        fontSize: 10,
        textAlign: 'center'
        //width: '28%',
        //textAlign: 'left',
        //justifyContent:'space-between'

    },
    section2BtnImage: {
        width: 18,
        height: 18,
        marginLeft: 8,
        

    },
    selectedStyle: {
        fontSize: 10,
        color: 'white'

    },
    placeholderStyle: {
        color: 'white',
        fontSize: 8
    },
});