import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Text, Pressable, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTPScreen = ({ navigation }) => { 
  const [otp, setOTP] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleOTPChange = (index, value) => {
    if (/^\d{0,1}$/.test(value)) {
      const updatedOTP = [...otp];
      updatedOTP[index] = value;
      setOTP(updatedOTP);
      
      if (value !== '' && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }

      if (value === '' && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = async () => {
    try {
      if (otp.some(digit => digit === '')) {
        Alert.alert('Error', 'Please fill all OTP fields.');
        return;
      }
  
      const enteredOTP = otp.join('');
      console.log('Submitting OTP:', enteredOTP);
  
      const authToken = await AsyncStorage.getItem('authToken');
      const response = await axios.post(
        'http://46.28.44.174:5001/v1/employee/verifyOtp',
        { otp: enteredOTP },
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );
  
      console.log('OTP Verification Response:', response.data);
  
      if (response.data.status === '1') {
        Alert.alert('Success', 'OTP verified successfully');
        setIsLoggedIn(true);
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Incorrect OTP. Please enter the correct OTP.');

        setOTP(['', '', '', '']);
        inputRefs.current[0].focus();
      }
    } catch (error) {
      console.error('OTP Verification Error:', error);
      Alert.alert('Error', 'Failed to verify OTP. Please try again.');
    }
  };
  
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => inputRefs.current[index] = ref}
            style={styles.input}
            value={digit}
            onChangeText={(text) => handleOTPChange(index, text)}
            keyboardType="numeric"
          />
        ))}
      </View>
      <Pressable style={styles.buttonContainer} onPress={handleSubmit} >
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#003c9e',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 60,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 40,
  },
  input: {
    height: 40,
    width: '16%',
    borderWidth: 1,
    paddingHorizontal: 10,
    textAlign: 'center',
    borderColor: '#e2e733',
    color: 'white',
  },
  buttonContainer: {
    width: '90%',
    backgroundColor: '#e2e733',
    paddingVertical: 14,
    borderRadius: 25,
  },
  buttonText: {
    textAlign: 'center',
    color: '#1248a1',
    fontWeight: 'bold',
  },
});

export default OTPScreen;
