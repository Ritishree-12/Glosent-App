import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';


const AdminDashboard = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#003c9e" />
            <View style={styles.header}>
            <View>
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <Image source={require('../../assets/images/menu.png')} style={{ width: 24, height: 20, marginLeft: 30 }} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.headerText}>Admin Dashboard</Text>
            </View>

            <View style={styles.boxContainer}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('AdminEmployeeList')}>
                        <View style={styles.box}>
                            <Image source={require('../../assets/images/user.png')} style={{ width: 56, height: 56 }} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.title}>Employee List</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('ManagerList')}>
                        <View style={styles.box}>
                            <Image source={require('../../assets/images/expenses1.png')} style={{ width: 56, height: 56 }} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.title}>Manager List</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('AdminEmpExpensesReport')}>
                        <View style={styles.box}>
                            <Image source={require('../../assets/images/rupees.png')} style={{ width: 54, height: 54 }} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.title}>Approve Manager Expenses</Text>
                </View>

            </View>
            <View style={styles.boxContainer2}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('ExpensesEntry')}>
                        <View style={styles.box}>
                            <Image source={require('../../assets/images/notification.png')} style={{ width: 56, height: 56 }} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.title}>Send Notification</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('ExpensesReport')}>
                        <View style={styles.box}>
                            <Image source={require('../../assets/images/expenses1.png')} style={{ width: 56, height: 56 }} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.title}>Add Expenses</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('TransactionHistory')}>
                        <View style={styles.box}>
                            <Image source={require('../../assets/images/transaction.png')} style={{ width: 54, height: 54 }} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.title}>Transaction History</Text>
                </View>

            </View>
            <View style={styles.section1}>
                <View style={styles.yellowBtn}>
                <View>
                    <Image source={require('../../assets/images/user-blue.png')} style={{ width: 36, height: 36, padding: 16 }} />
                    </View>
                    <View style={styles.verticalLine}></View>
                    <View>
                        <Text style={{ color: '#003d9e',fontSize:12}}>Total Employee</Text>
                        <Text style={{ color: '#003d9e',fontWeight:'bold' }}>500</Text>
                    </View>
                </View>

                <View style={styles.yellowBtn}>                  
                    <View>
                    <Image source={require('../../assets/images/user-blue.png')} style={{ width: 36, height: 36, padding: 16 }} />
                    </View>
                  <View style={styles.verticalLine}></View>
                    <View>
                        <Text style={{ color: '#003d9e',fontSize:12}}>Total Transaction</Text>
                        <Text style={{ color: '#003d9e',fontWeight:'bold' }}>1,12,345.00</Text>
                    </View>
                  
                </View>
            </View>
            <View style={styles.section1}>
                <View style={styles.yellowBtn}>
                <View>
                    <Image source={require('../../assets/images/user-blue.png')} style={{ width: 36, height: 36, padding: 16 }} />
                    </View>
                    <View style={styles.verticalLine}></View>
                    <View>
                        <Text style={{ color: '#003d9e',fontSize:12}}>Total Employee</Text>
                        <Text style={{ color: '#003d9e',fontWeight:'bold' }}>500</Text>
                    </View>
                </View>

                <View style={styles.yellowBtn}>                  
                    <View>
                    <Image source={require('../../assets/images/user-blue.png')} style={{ width: 36, height: 36, padding: 16 }} />
                    </View>
                  <View style={styles.verticalLine}></View>
                    <View>
                        <Text style={{ color: '#003d9e',fontSize:12}}>Total Transaction</Text>
                        <Text style={{ color: '#003d9e',fontWeight:'bold' }}>1,12,345.00</Text>
                    </View>
                  
                </View>
            </View>


        </View>
    );
};

export default AdminDashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003C9E',
    },
    header: {
        backgroundColor: '#FFFFFF',
        height: 70,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: '#E2E733',
        borderBottomWidth: 5,
        elevation: 5,
        flexDirection: 'row',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 50
    },
    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        paddingHorizontal: 10, 
    },
    boxContainer2: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 10, 
    },
    box: {
        width: 80,
        height: 80,
        backgroundColor: '#09B724',
        borderRadius: 15,
        borderColor: '#fff',
        borderWidth: 0.6,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        marginHorizontal: 10,
    },
    title: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        width: 80, // Added width to limit the text width
    },
    section1: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    yellowBtn: {
        backgroundColor: '#E3E635',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        borderColor: '#fff',
        borderWidth: 1,
        width: 160,
        height: 56,
    },
    verticalLine: {
        width: 1,
        height: '100%',
        backgroundColor: '#C9CACB',
        marginHorizontal: 10,
    },
});
