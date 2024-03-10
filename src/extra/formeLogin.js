import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../utils/userReducer';

const Login = () => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [token, setToken] = useState('');

    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            // Make API call to login endpoint
            const response = await axios.post(
                'https://your-api-url/login',
                {
                    username,
                    password,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include bearer token in the request headers
                    },
                }
            );

            // Assuming the API returns some data including the token
            const responseData = response.data;
            
            // Dispatch action to update Redux store with login success
            dispatch(loginSuccess(responseData.token));

            // Navigate to Home screen upon successful login
            navigation.navigate('Home');
        } catch (error) {
            // Handle error - show alert or any other appropriate action
            console.error('Login failed:', error);
            Alert.alert('Login Failed', 'Please check your credentials and try again.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleForgotPassword = () => {
        Alert.alert('Forgot Password', 'Please contact support for password recovery.');
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ImageBackground
                source={require('../../assets/loginsceen.jpg')}
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text style={styles.title}>Login to your account</Text>
                <View style={styles.inputContainer}>
                    <Input
                        placeholder='Email / Phone'
                        placeholderTextColor='white'
                        style={styles.label}
                        value={username}
                        onChangeText={text => setUsername(text)}
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
                                    // type='font-awesome'
                                    color='white'
                                    size={20}
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
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

export default Login;

const styles = StyleSheet.create({
    title: {
        color: '#e2e733',
        marginTop: 80,
        alignItems: 'flex-start',
        fontSize: 18,
        fontWeight: '600',
    },
    inputContainer: {
        flex: 0.4,
        width: '80%',
        backgroundColor: '#1a50a7',
        borderRadius: 20,
        padding: 10,
        top: 20
    },
    label: {
        color: '#fff'
    },
    loginButton: {
        backgroundColor: '#e2e733',
        padding: 14,
        borderRadius: 25,
        marginTop: 20, // Adjusted margin to keep login button visible
    },
    loginButtonText: {
        color: '#1248a1',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    forgotpassword: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
        marginTop: 10,
        textDecorationLine: 'none',
        color:'#fff'
    },
});
