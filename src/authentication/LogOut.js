import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogOut = ({ navigation }) => {
  const handleLogout = async (logoutApi) => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
      console.log(' logout bearer token----------------', authToken);
      const response = await fetch(logoutApi, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Logout successful');
        await AsyncStorage.removeItem('authToken');
        navigation.navigate('Login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const determineLogoutApi = (userRole) => {
    switch (userRole) {
      case 'admin':
        return 'http://46.28.44.174:5001/admin/logout';
      case 'employee':
        return 'http://46.28.44.174:5001/v1/employee/logout';
      case 'manager':
        return 'http://46.28.44.174:5001/manager/logout';
      default:
        return '';
    }
  };

  const handleAdminLogout = () => {
    const logoutApi = determineLogoutApi('admin');
    handleLogout(logoutApi);
  };

  const handleEmployeeLogout = () => {
    const logoutApi = determineLogoutApi('employee');
    handleLogout(logoutApi);
  };

  const handleManagerLogout = () => {
    const logoutApi = determineLogoutApi('manager');
    handleLogout(logoutApi);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleAdminLogout} style={styles.button}>
        <Text style={styles.text}>Logout As Admin</Text>
      </TouchableOpacity>
     
      <TouchableOpacity onPress={handleManagerLogout} style={styles.button}>
        <Text style={styles.text}>Logout As Manager</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleEmployeeLogout} style={styles.button}>
        <Text style={styles.text}>Logout As Employee</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogOut;

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#003c9e',
    flex:1,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  button:{
    backgroundColor:'#e2e733',
    height:60,
    margin:10,
    alignItems:'center',
    justifyContent: 'center'
  },
  text:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1248a1',
  }
});
