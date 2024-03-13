import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, ScrollView, Pressable, TextInput,Dimensions} from 'react-native';
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const ApproveExpenses = () => {
    const navigation = useNavigation();

    const [expensesData, setExpensesData] = useState([]);
    const [error, setError] = useState(null);
    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved':
                return '#22BB33';
            case 'Pending':
                return '#FFC300';
            case 'Rejected':
                return 'red';
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const authToken = await AsyncStorage.getItem('authToken');
                const response = await axios.get('http://46.28.44.174:5001/manager/expense/fillterAlltheDataExpense', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                const data = response.data.data;
                console.log('ApproveExpenses****************************', data)
                const uniqueExpenses = Array.from(new Set(data.expenses.map(expense => expense._id)))
                    .map(id => data.expenses.find(expense => expense._id === id));
                console.log('unque', uniqueExpenses)
                setExpensesData(uniqueExpenses);
                //setLoading(false);
            } catch (error) {
                console.error('Error fetching expenses data:', error);
                setError(error.message);
                //setLoading(false);
            }
        };
        fetchData();
    }, [])
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#003C9E" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image source={require('../../assets/images/arrow.png')} style={{ width: 30, height: 30, }} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Approve Expenses</Text>
            </View>
            <View>
                <View style={styles.section1}>
                    <TextInput
                        placeholder='Search'
                        placeholderTextColor='white'
                        style={styles.input}
                    />
                    <View>
                        <Pressable style={styles.section1Btn}>
                            <Image style={styles.section2BtnImage} source={require('../../assets/images/download.png')}></Image>
                            <Text style={styles.section1BtnText}>Download</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} >
                {expensesData.map((expense, index) => (
                    <View style={styles.section2} key={index}>
                        <View style={styles.headingText}>
                            <Text style={styles.categoriesText3}>{expense.employeeId?.personalInformation.firstName} {expense.employeeId?.personalInformation?.lastName} - {expense.employeeId?.emplyId}</Text>
                            <Text style={styles.categoriesText3}></Text>
                            <View style={{ alignSelf: 'flex-end', alignItems: 'flex-end' }}>
                                <Text style={styles.infoText1}>Date: {expense.dateOfExpense}</Text>
                            </View>
                        </View>
                        <View style={styles.underline} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={styles.categoriesType1}>Food - {expense.subExpenseType === 'breakfast' ? 'breakfast' : 'lunch'} : {expense.amount}</Text>
                                <Text style={styles.categoriesType1}>Transportation - {expense.subExpenseType === 'train' ? 'Train' : expense.subExpenseType === 'bus' ? 'Bus' : null} : {expense.amount}</Text>
                            </View>
                            <View style={{}}>
                                <Text style={styles.categoriesType1}>Food - {expense.subExpenseType === 'snacks' ? 'snacks' : 'dinner'} : {expense.amount}</Text>
                                <Text style={styles.categoriesType1}>Accommodation : {expense.subExpenseType === 'hotel' ? 'hotel' : 'Room'} : {expense.amount}</Text>
                            </View>
                        </View>
                        <Text style={{ color: 'white' }}>Notes:   {expense.notes}</Text>
                        <View>
                        </View>
                        <View style={styles.underline} />
                        <View style={styles.categories}>
                            {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}> */}
                            <Text style={{ color: 'yellow' }}>Total : {expense.totalFoodAmount}</Text>
                            <View style={{ flexDirection: 'row', }}>
                                {['Approved', 'Pending', 'Rejected'].map((status, index) => (
                                    <Pressable key={index} style={[styles.section2Btn, { backgroundColor: getStatusColor(status) }]}>
                                        {status === 'Approved' && <Image style={styles.statusImage} source={require('../../assets/images/approve.png')} />}
                                        {status === 'Pending' && <Image style={styles.statusImage} source={require('../../assets/images/pending.png')} />}
                                        {status === 'Rejected' && <Image style={styles.statusImage} source={require('../../assets/images/cancel.png')} />}
                                        <Text style={styles.section2BtnText}>{status}</Text>
                                    </Pressable>
                                ))}
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
export default ApproveExpenses
const styles = StyleSheet.create({
    statusImage: {
        width: 12,
        height: 12,
        marginLeft: 5,
    },
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
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    section1: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 40,
        marginHorizontal: 10,
        marginTop: 10,
        alignItems: 'flex-end'
    },
    section1Btn: {
        borderRadius: 20,
        backgroundColor: '#DDB80F',
        alignSelf: 'center',
        alignContent: 'flex-end',
        flexDirection: "row",
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
        backgroundColor: '#1A50A7',
        borderRadius: 20,
        margin: 8,
        padding: 16
    },
    section2Btn: {
        borderRadius: 20,
        backgroundColor: '#22BB33',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        marginLeft: 10
    },
    section2BtnText: {
        color: '#fff',
        fontSize: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontWeight: 'bold'
    },
    infoText1: {
        color: '#fff',
        fontSize: 10,
        alignContent: 'flex-end',
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
        marginTop: 15,
    },
    categoriesType1: {
        fontSize: 9,
        fontWeight: '600',
        color: 'yellow',
        // width: 80,
        // height: 20,
        // marginLeft: 10,
        //alignItems: 'flex-start'
    },
    categoriesText2: {
        fontSize: 12,
        fontWeight: '600',
        color: '#fff',
        width: 100,
        height: 20
    },
    section2BtnImage: {
        width: 15,
        height: 15,
        marginLeft: 5,
        alignSelf: 'center'
    },
    categoriesText3: {
        fontSize: 12,
        fontWeight: '600',
        color: '#fff',
        // width: "50%",,
        //justifyContent:'space-between'
    },
    input: {
        borderBottomWidth: 1,
        width: '40%',
        marginLeft: 30,
        borderBottomColor: 'white',
        color: 'white', // Add color property for text color
        marginRight: 40
    },
})














