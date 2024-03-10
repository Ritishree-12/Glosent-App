// CustomDrawerContent.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();

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
    if (userRole === 'admin') {
      return 'http://46.28.44.174:5001/admin/logout';
    } else if (userRole === 'employee') {
      return 'http://46.28.44.174:5001/v1/employee/logout';
    } else {
      return 'http://46.28.44.174:5001/manager/logout';
    }
  };

  const { userRole } = props;

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>Profile</Text>
      </View>
      <DrawerItemList {...props} />
      <TouchableOpacity onPress={() => handleLogout(determineLogoutApi(userRole))} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#003c9e',
    borderRightWidth: 1,
    borderRightColor: '#e2e733',
    color: '#fff',
  },
  drawerHeader: {
    height: 100,
    backgroundColor: '#e2e733',
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#e2e733',
    padding: 10,
    alignItems: 'center',
    backgroundColor:'#003c9e'
  },
  logoutText: {
    fontSize: 16,
    color:'white',
    // backgroundColor:'#e2e733'
  },
});

export default CustomDrawerContent;
