import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import CheckBox from '@react-native-community/checkbox'
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notifications = () => {
    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
            getFcmToken()
        }
    }

    async function getFcmToken() {
        let fcmtoken = await AsyncStorage.getItem('fcmtoken');
        if (!fcmtoken) {
            try {
                fcmtoken = await messaging().getToken();
                console.log('Token:', fcmtoken);

                if (fcmtoken) {
                    console.log("newToken",fcmtoken);
                    await AsyncStorage.setItem('fcmtoken', fcmtoken);
                    
                }
            } catch (error) {
                console.log(error, 'error in fcmToken');
            }
        }
    }

    useEffect(() => {
        requestUserPermission();
    }, []);
    const [isSelected, setSelection] = useState(false);
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#003c9e" />
            <View style={styles.header}>
                <Text style={styles.headerText}>Send Notifications</Text>
            </View>

            <View style={{ width: '90%', height: '50%', alignSelf: 'center', marginTop: 50, borderRadius: 30, backgroundColor: '#1a50a7' }}>

                <View style={{ borderBottomWidth: 1, height: '35%', width: '90%', alignSelf: 'center', borderBottomColor: 'white' }}>
                    <TextInput
                        placeholder='Notification'
                        placeholderTextColor={'white'}
                        style={{ color: 'white' }}>
                    </TextInput>
                </View>

                <View style={{ marginTop: 20, borderBottomWidth: 1, height: '15%', width: '90%', alignSelf: 'center', borderBottomColor: 'white' }}>
                    <TextInput
                        placeholder='Select Employee'
                        placeholderTextColor={'white'}
                        style={{ color: 'white' }}>
                    </TextInput>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', width: '90%', alignSelf: 'center', }}>
                    <Text style={{ color: 'white' }}>Select All</Text>
                    <CheckBox
                        value={isSelected}
                        onValueChange={setSelection}></CheckBox>

                </View>


                <View style={{ marginTop: 30, flexDirection: 'row', width: '90%', alignSelf: 'center', justifyContent: 'space-evenly' }}>
                    <TouchableOpacity style={{ height: 50, width: '40%', justifyContent: 'center', alignItems: 'center', borderRadius: 25, backgroundColor: '#e3e635' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Send</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ height: 50, width: '40%', justifyContent: 'center', alignItems: 'center', borderRadius: 25, backgroundColor: '#e3e635' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Reset</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default Notifications

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
        color: '#003c9d',
    },
})