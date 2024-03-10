import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, Image } from 'react-native';
import axios from 'axios';
const AdminMngTransHistory = () => {
    const [managerData, setManagerData] = useState([]);
    const [totalExpenseAmounts, setTotalExpenseAmounts] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWM5YmNmZWZiNzZjZTQyMmM2Y2ZmZmQiLCJpYXQiOjE3MDk5ODk0MTcsImV4cCI6MTcxMDA3NTgxN30.mnzTp-tic-mwULNcbs0n6ctC80EhQhg4SACIL6LVSR0";
                const response = await axios.get('http://46.28.44.174:5001/admin/expense/AllManagerExpenseReportList', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                const data = response.data.data;
                console.log('Response Data:', data);
                setManagerData(data.managerData);
                setTotalExpenseAmounts(data.totalExpenseAmounts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#003C9E" />
            <View style={styles.header}>
                <Text style={styles.headerText}>Transaction History</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20,justifyContent:'flex-end' }}>
                <Image style={styles.section2BtnImage} source={require('../../assets/images/searchGray.png')} />
                <Text style={styles.text}>Total: {totalExpenseAmounts}</Text>
            </View>
            <View style={{ backgroundColor: '#1A50A7', width: '90%', borderRadius: 30, paddingHorizontal: 5, alignSelf: 'center', marginTop: 20,height:'80%' }}>
                <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#89A5D1' }}>
                    <Text style={styles.text}>Emp.Name</Text>
                    <Text style={styles.text}>Emp.id</Text>
                    <Text style={styles.text}>Department</Text>
                    <Text style={styles.text}>Amount</Text>
                </View>
                <ScrollView>
                    {managerData.map((manager, index) => (
                        <View key={index} style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#668AC4', }}>
                            <Text style={styles.text1}>{manager.firstName} {manager.lastName}</Text>
                            <Text style={styles.text1}>{manager.managerId}</Text>
                            <Text style={styles.text1}>{manager.managerDepartment}</Text>
                            <Text style={styles.text1}>700</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}
export default AdminMngTransHistory;
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
        width: '25%',
        textAlign: 'center',
    },
    text1: {
        color: 'white',
        fontSize: 10,
        width: '28%',
        //textAlign: 'left',
        //justifyContent:'space-between'
    },
    section2BtnImage: {
        width: 15,
        height: 15,
        marginLeft: 5,
    },
});