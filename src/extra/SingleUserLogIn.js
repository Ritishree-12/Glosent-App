import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Alert, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://46.28.44.174:5001/v1/employee/login', { email, password });
            console.log('API Response:', response);
            const { tokens } = response.data.data;
            const authToken = tokens;
            console.log('BearerToken', authToken)
    
            await AsyncStorage.setItem('authToken', authToken);
            
            axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
            Alert.alert('Login Successful');
            navigation.navigate('otpscreen');
            
        } catch (error) {
            console.error('API Error:', error);
        }
    };

    const handleForgotPassword = async () => {
        try {
            const response = await axios.post('http://46.28.44.174:5001/v1/employee/forgotPassword', { email });
            console.log(response,'response data')
            Alert.alert('Forgot Password', 'Password recovery email sent. Please check your inbox.');
        } catch (error) {
            console.error('API Error:', error);
            // Handle error response, maybe show an error message
            Alert.alert('Forgot Password Error', 'An error occurred. Please try again later.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Image
                source={require('../../assets/loginsceen.jpg')}
                style={styles.backgroundImage}
            />
                <Text style={styles.title}>Login to your account</Text>
                <View style={styles.inputContainer}>
                    <Input
                        placeholder='Email / Phone'
                        placeholderTextColor='white'
                        style={styles.label}
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    <Input
                        placeholder='Password'
                        placeholderTextColor='white'
                        style={styles.label}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={!showPassword}
                        rightIcon={
                            <TouchableOpacity onPress={togglePasswordVisibility}>
                                <Icon
                                    name={showPassword ? 'eye-slash' : 'eye'}
                                    color='white'
                                />
                            </TouchableOpacity>
                        }
                    />
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleForgotPassword}>
                        <Text style={styles.forgotpassword}>Forgot password</Text>
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
        backgroundColor:'#003c9e'
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
    },
    label: {
        color: '#fff'
    },
    loginButton: {
        backgroundColor: '#e2e733',
        padding: width * 0.04,
        borderRadius: width * 0.1,
    },
    loginButtonText: {
        color: '#1248a1',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: width * 0.05,
    },
    forgotpassword: {
        textAlign: 'center',
        fontSize: width * 0.04,
        fontWeight: '400',
        marginTop: height * 0.02,
        textDecorationLine: 'none',
        color: '#fff'
    },
});