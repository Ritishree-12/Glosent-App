import { StyleSheet, Text, View, StatusBar, Picker, FlatList, ScrollView,Image } from 'react-native'
import React, { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select';
import { Dropdown } from 'react-native-element-dropdown';


const TransactionHistory = () => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    // const [value, setValue] = useState(null);
    const data = [
        {
            EmpName: 'Rajesh',
            EmpId: 2345,
            Deparment: 'Sales',
            Amount: 345
        },
        {
            EmpName: 'Rajesh',
            EmpId: 2345,
            Deparment: 'Sales',
            Amount: 345
        },
        {
            EmpName: 'Rajesh',
            EmpId: 2345,
            Deparment: 'Sales',
            Amount: 345
        },
        {
            EmpName: 'Rajesh',
            EmpId: 2345,
            Deparment: 'Sales',
            Amount: 345
        }
    ]
    const data1 = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ]
    const data2 = [
        { label: 'January', value: '1' },
        { label: 'February', value: '2' },
        { label: 'March', value: '3' },
        // Add more months as needed
    ];

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#003c9e" />
            <View style={styles.header}>
                <Text style={styles.headerText}>Employee Expenses</Text>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <Dropdown style={{ width: '30%' ,borderBottomWidth:1,borderBottomColor: '#89a5d1', }}
                    placeholder='select Employee'
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedStyle}
                    data={data1}
                    search
                    value={selectedEmployee}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    onChange={item => {
                        setSelectedEmployee(item.value);
                        setIsFocus(false);
                    }}

                />
                <Dropdown style={{ width: '30%'  ,borderBottomWidth:1,borderBottomColor: '#89a5d1',marginLeft:5 }}
                    placeholder='Select Month'
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedStyle}
                    data={data2} // Pass data2 to the second dropdown
                    search
                    value={selectedMonth}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    onChange={item => {
                        setSelectedMonth(item.value);
                        setIsFocus(true);
                    }}

                />
                <View style={{height:10,width:10,borderWidth:1}}>
                <Image style={styles.section2BtnImage} source={require('../../assets/images/searchGray.png')}></Image>
                </View>
            </View>



            <View style={{ backgroundColor: '#1a50a7', width: '90%', borderRadius: 30, paddingHorizontal: 5, alignSelf: 'center', height: '80%' }}>
                <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#89a5d1' }}>
                    <Text style={styles.text}>Emp.Name</Text>
                    <Text style={styles.text}>Emp.id</Text>
                    <Text style={styles.text}>Department</Text>
                    <Text style={styles.text}>Amount</Text>
                </View>
                <ScrollView >
                    {data.map((item, index) => (
                        <View key={index}>
                            <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#668ac4' }}>
                                <Text style={{ color: 'white' }}>{item.EmpName}</Text>
                                <Text style={{ color: 'white' }}>{item.EmpId}</Text>
                                <Text style={{ color: 'white' }}>{item.Deparment}</Text>
                                <Text style={{ color: 'white' }}>{item.Amount}</Text>
                            </View>
                        </View>
                    ))}

                </ScrollView>
            </View>




        </View>
    )
}

export default TransactionHistory

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
    placeholderStyle: {
        color:'white',
        fontSize:10
    },
    selectedStyle: {
        fontSize:10,
        color:'white'

    },
    section2BtnImage: {
        width: 15,
        height: 15,
        marginLeft: 5,
    },
    text: {
        color:'yellow'
    }
})