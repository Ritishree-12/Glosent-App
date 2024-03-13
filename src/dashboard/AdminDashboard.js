import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const ManagerDashboard = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#003c9e" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.backButton}>
                    <Image source={require('../../assets/images/menu.png')} style={{ width: 24, height: 24, color:'#003c9d' }} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Admin Dashboard</Text>
            </View>
            <View style={styles.boxContainer}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('AdminEmployeeList')} style={styles.box}>
                        <Image source={require('../../assets/images/user.png')} style={styles.boxIcon} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Employee List</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('ManagerList')} style={styles.box}>
                        <Image source={require('../../assets/images/expenses1.png')} style={styles.boxIcon} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Manager List</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('AdminEmpExpensesReport')} style={styles.box}>
                        <Image source={require('../../assets/images/notification.png')} style={styles.boxIcon} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Approve Manager Expenses</Text>
                </View>
            </View>
            <View style={styles.boxContainer}>
               
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('ExpenseEntriesManager')} style={styles.box}>
                        <Image source={require('../../assets/images/expenses1.png')} style={styles.boxIcon} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Employee Expenses</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('ManagerExpenses')} style={styles.box}>
                        <Image source={require('../../assets/images/transaction.png')} style={styles.boxIcon} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Manager Expenses</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('AdminEmpExpensesReport')} style={styles.box}>
                        <Image source={require('../../assets/images/notification.png')} style={styles.boxIcon} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Employee Transaction History</Text>
                </View>
            </View>
            <View style={styles.boxContainer}>
                <View>
                <TouchableOpacity onPress={() => navigation.navigate('AdminMngTransHistory')} style={styles.box}>
                    <Image source={require('../../assets/images/notification.png')} style={styles.boxIcon} />            
                </TouchableOpacity>
                <Text style={styles.title}>Manager Transaction History</Text>
                </View>  
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('TransactionHistory')} style={styles.box}>
                        <Image source={require('../../assets/images/transaction.png')} style={styles.boxIcon} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Send Notification</Text>
                </View>         
            </View>
            <View style={styles.section1}>
                <View style={styles.yellowBtn}>
                    <Image source={require('../../assets/images/user-blue.png')} style={styles.yellowBtnIcon} />
                    <View style={styles.verticalLine} />
                    <View>
                        <Text style={styles.yellowBtnText}>Total Employee</Text>
                        <Text style={styles.yellowBtnText}>500</Text>
                    </View>
                </View>
                <View style={styles.yellowBtn}>
                    <Image source={require('../../assets/images/user-blue.png')} style={styles.yellowBtnIcon} />
                    <View style={styles.verticalLine} />
                    <View>
                        <Text style={styles.yellowBtnText}>Total Transaction</Text>
                        <Text style={styles.yellowBtnText}>1,12,345.00</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ManagerDashboard;

const { width } = Dimensions.get('window');
const boxSize = (width - 80) / 3;

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
        fontSize: 18,
        fontWeight: 'bold',
        color: '#003c9d',
    },
    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 20,
    },
   
    box: {
        width: boxSize,
        height: boxSize,
        backgroundColor: '#09b724',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor:'#fff',
        borderWidth:1
    },
    boxIcon: {
        width: boxSize * 0.6,
        height: boxSize * 0.6,
    },
    title: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
        width:87
        // paddingHorizontal: 10,
    },
    section1: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    yellowBtn: {
        backgroundColor: '#E3e635',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        borderColor: '#fff',
        borderWidth: 1,
        width: 160,
        height: 56,
    },
    yellowBtnIcon: {
        width: 36,
        height: 36,
        padding: 10,
    },
    yellowBtnText: {
        color: '#003d9e',
        fontSize: 12,
        fontWeight: 'bold',
    },
    verticalLine: {
        width: 1,
        height: '100%',
        backgroundColor: '#C9CACB',
        marginHorizontal: 10,
    },
});
