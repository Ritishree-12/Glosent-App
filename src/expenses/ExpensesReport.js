import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, Pressable, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpensesReport = () => {
    const [expensesData, setExpensesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authToken = await AsyncStorage.getItem('authToken');
                const response = await axios.get('http://46.28.44.174:5001/v1/expense/ExployeeExpenseReport', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                console.log('report data updated **********************',response)
                const data = response.data.data;
                setExpensesData(data.expenseData); 
                setTotalAmount(data.totalAmount);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching expenses data:', error);
                setError(error.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: {error}</Text>
                <Pressable onPress={() => fetchData()}>
                    <Text style={styles.retryText}>Retry</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#003c9e" />
            <View style={styles.header}>
                <Text style={styles.headerText}>Expenses Report</Text>
            </View>

            <View style={styles.section1}>
                {/* <Text style={{ color: '#fff', fontWeight: 'bold' }}>Total Expenses: {expensesData.length}</Text> */}
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Total Amount: {totalAmount}</Text>
                <Pressable style={styles.section1Btn}>
                    <Text style={styles.section1BtnText}>Download statement</Text>
                </Pressable>
                <Pressable style={styles.section1Btn}>
                    <Text style={styles.section1BtnText}>select month</Text>
                </Pressable>
            </View>

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                {expensesData.map((expense, index) => (
                    <View style={styles.section2} key={index}>
                        <View style={styles.headingText}>
                            <Text style={styles.categoriesText3}>Date: {expense.dateOfExpense}</Text>
                            <Text style={styles.categoriesText3}>Amount- ₹ : {expense.amount}</Text>

                            {expense.status && (
                                <Pressable style={[styles.section2Btn, { backgroundColor: getStatusColor(expense.status) }]}>
                                    <Text style={styles.section2BtnText}>{expense.status}</Text>
                                </Pressable>
                            )}
                        </View>
                        <View style={styles.underline} />
                        <View style={styles.categories}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={styles.categoriesType}>Category:</Text>
                                <Text style={styles.categoriesType1}>{expense.expenseType}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.categoriesType}>Type:</Text>
                                <Text style={styles.categoriesType1}>{expense.subExpenseType}</Text>
                            </View>
                        </View>
                        <View style={styles.underline} />
                        <View style={styles.categories}>
                            <View style={{ width: '70%', color: 'yellow', height: '90%' }}>
                                <Text style={{ color: 'yellow' }}>Notes: {expense.notes}</Text>
                            </View>
                            <View>
                                <Pressable style={{ backgroundColor: '#154086', width: 100, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', padding: 4 }}>
                                    <Text style={{ color: '#fff', fontSize: 11, }}>Attachments</Text>
                                    <Image source={require('../../assets/images/approve.png')} style={{ width: 14, height: 12, justifyContent: 'center' }} />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case 'pending':
            return '#FFC300';
        case 'approved':
            return '#22bb33';
        case 'rejected':
            return 'red';
        default:
            return '#22bb33';
    }
}

export default ExpensesReport;

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
    section1: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 16,
        marginBottom: 6
    },
    section1Btn: {
        borderRadius: 20,
        backgroundColor: '#22bb33'
    },
    section1BtnText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
        paddingHorizontal: 6,
        paddingVertical: 4
    },
    section2: {
        backgroundColor: '#1a50a7',
        borderRadius: 20,
        marginTop: 6,
        width: '94%',
        alignSelf: 'center',
        padding: 10,
        // height:'15%'

    },
    section2Btn: {
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height:22
    },
    section2BtnText: {
        color: '#fff',
        fontSize: 12,
        paddingHorizontal: 18,
        paddingVertical: 3,
        fontWeight: 'bold'

    },
    headingText: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    underline: {
        borderBottomWidth: 1,
        borderBottomColor: '#C9CACB',
        flex: 1,
        marginTop: 6
    },
    categories: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    categoriesType: {
        fontSize: 12,
        fontWeight: '400',
        color: 'yellow',
    },
    categoriesType1: {
        fontSize: 12,
        fontWeight: '600',
        color: '#fff',
        marginLeft: 10,
        alignItems: 'flex-start'
    },
    categoriesText3: {
        fontSize: 12,
        fontWeight: '600',
        color: '#fff',
        width: 100,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#003c9e',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#003c9e',
    },
    errorText: {
        color: '#ffffff',
        fontSize: 16,
        marginBottom: 10,
    },
    retryText: {
        color: '#ffffff',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});
