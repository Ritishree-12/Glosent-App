import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ExpensesEntry = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#003c9e" />
            <View style={styles.header}>
                <Text style={styles.headerText}>Expenses Entry</Text>
            </View>

            {/* <View style={styles.section1}>
                <Text style={styles.heading}>Choose Category</Text>
            </View> */}
            <View style={styles.section2}>
                <View style={styles.boxContainer}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('FoodType')}>
                            <View style={styles.box}>
                                <Image source={require('../../assets/images/food.png')} style={{ width: 46, height: 43 }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.title}>Food</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('TransportType')}>
                            <View style={styles.box}>
                                <Image source={require('../../assets/images/location.png')} style={{ width: 46, height: 45 }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.title}>Transportation</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('AccomodationType')}>
                            <View style={styles.box}>
                                <Image source={require('../../assets/images/bed.png')} style={{ width: 44, height: 44 }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.title}>Accomodation</Text>
                    </View>
                </View>
                <View style={styles.boxContainer2}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('EmployeeList')}>
                            <View style={styles.box}>
                                <Image source={require('../../assets/images/user.png')} style={{ width: 56, height: 56 }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.title}>user</Text>
                    </View>
                    
                    {/* <View>
                        <TouchableOpacity onPress={() => navigation.navigate('EmployeeList')}>
                            <View style={styles.box}>
                                <Image source={require('../../assets/images/user.png')} style={{ width: 56, height: 56 }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.title}>shopping</Text>
                    </View> */}
                    {/* <View>
                        <TouchableOpacity onPress={() => navigation.navigate('EmployeeList')}>
                            <View style={styles.box}>
                                <Image source={require('../../assets/images/user.png')} style={{ width: 56, height: 56 }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.title}>Food</Text>
                    </View> */}
                    

                </View>
                
            </View>
        </View>
    )
}

export default ExpensesEntry;

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
        backgroundColor: '#1a50a7',
        borderRadius: 10,
    },
    section2: {
        backgroundColor: '#1a50a7',
        borderRadius: 10,
        margin: 10,
        paddingVertical: 16,
        paddingHorizontal:10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width:'90%',
        alignSelf:'center'
    },
    
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#fff",
        textAlign: 'center'
    },
    boxContainer: {
        flexDirection: 'row',

    },
    boxContainer2: {
        flexDirection: 'row',
        // justifyContent:'flex-start',
        alignItems:'flex-start'

    },
    box: {
        width: 70,
        height: 70,
        backgroundColor: '#b9ce19',
        borderRadius: 15,
        borderColor: '#fff',
        borderWidth: 0.6,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        marginHorizontal: 18,
    },
    title: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },


});
