import React, { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View, TouchableOpacity, Alert, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('employee');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleLogin = async () => {
        setLoading(true);

        try {
            let loginEndpoint = '';
            let screenName = '';
            
            switch (userType) {
                case 'admin':
                    loginEndpoint = 'http://46.28.44.174:5001/admin/login';
                    screenName = 'AdminDashboard';
                    break;
                case 'manager':
                    loginEndpoint = 'http://46.28.44.174:5001/manager/login';
                    screenName = 'ManagerDashboard'; 
                    break;
                case 'employee':
                    loginEndpoint = 'http://46.28.44.174:5001/v1/employee/login';
                    screenName = 'otpscreen';
                    break;
                default:
                    // Default to employee login if user type is not recognized
                    loginEndpoint = 'http://46.28.44.174:5001/v1/employee/login';
                    screenName = 'otpscreen';
                    break;
            }
        
            const response = await axios.post(loginEndpoint, { email, password });
            const authToken = response.data.data.tokens;
        
            await AsyncStorage.setItem('authToken', authToken);
        
            axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
            Alert.alert('Login Successful');
            navigation.navigate(screenName);
         console.log('data of logIn@@@@@@@@@@@@@@@@', response)
        } catch (error) {
            console.error('Login Error:', error);
            if (error.response && error.response.data) {
                Alert.alert('Login Failed', error.response.data.message);
            } else {
                Alert.alert('Login Failed', 'An error occurred. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            {loading && <ActivityIndicator size="large" color="#00ff00" />}
            <Image
                source={require('../../assets/loginsceen.jpg')}
                style={styles.backgroundImage}
            />
            <Text style={styles.title}>Login to your account</Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Email / Phone'
                    placeholderTextColor='white'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={{color:'#fff'}}
                />
                <Input
                    placeholder='Password'
                    placeholderTextColor='white'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={!showPassword}
                    rightIcon={
                        <TouchableOpacity onPress={togglePasswordVisibility}>
                            <Image source={showPassword ? require('../../assets/images/openeye.png') : require('../../assets/images/closeEye.png')} style={styles.eyeIcon} />
                        </TouchableOpacity>
                    }
                    style={{color:'#fff'}}
                />
                <View style={styles.userTypeContainer}>
                    <TouchableOpacity style={[styles.userTypeButton, userType === 'admin' && styles.selectedUserTypeButton]} onPress={() => setUserType('admin')}>
                        <Text style={[styles.userTypeButtonText, userType === 'admin' && styles.selectedUserTypeButtonText]}>Admin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.userTypeButton, userType === 'manager' && styles.selectedUserTypeButton]} onPress={() => setUserType('manager')}>
                        <Text style={[styles.userTypeButtonText, userType === 'manager' && styles.selectedUserTypeButtonText]}>Manager</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.userTypeButton, userType === 'employee' && styles.selectedUserTypeButton]} onPress={() => setUserType('employee')}>
                        <Text style={[styles.userTypeButtonText, userType === 'employee' && styles.selectedUserTypeButtonText]}>Employee</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        width: width,
        height: height,
        backgroundColor: '#003c9e'
    },
    title: {
        color: '#e2e733',
        marginTop: height * 0.1,
        alignItems: 'flex-start',
        fontSize: width * 0.06,
        fontWeight: '600',
    },
    inputContainer: {
        width: width * 0.8,
        backgroundColor: '#1a50a7',
        borderRadius: width * 0.05,
        padding: width * 0.04,
        marginTop: height * 0.03,
        color:'#fff'
    },
    userTypeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: height * 0.02,
    },
    userTypeButton: {
        backgroundColor: '#1a50a7',
        padding: width * 0.02,
        borderRadius: width * 0.1,
        borderWidth: 1,
        borderColor: '#fff',
        width: width * 0.25,
        alignItems: 'center',
    },
    selectedUserTypeButton: {
        backgroundColor: '#fff',
    },
    userTypeButtonText: {
        color: '#fff',
        fontSize: width * 0.04,
    },
    selectedUserTypeButtonText: {
        color: '#1a50a7',
    },
    loginButton: {
        backgroundColor: '#e2e733',
        padding: width * 0.04,
        borderRadius: width * 0.1,
        marginTop: height * 0.02,
    },
    loginButtonText: {
        color: '#1248a1',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: width * 0.05,
    },
    eyeIcon: {
        width: 22,
        height: 15,
    },
});