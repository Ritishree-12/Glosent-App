import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../home/HomeScreen';
import LogOut from '../authentication/LogOut';
import AuthStack from './AuthStack';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <View style={styles.container}>
      <Drawer.Navigator
        drawerContent={CustomDrawerContent}
        screenOptions={{
          drawerActiveTintColor: '#fff', // Text color for active items
          drawerInactiveTintColor: '#fff', // Text color for inactive items
        }}
      >
        <Drawer.Screen name="Home" component={AuthStack} options={{ headerShown: false }} />
        <Drawer.Screen name="LogOut" component={LogOut} options={{ headerShown: true}} />
      </Drawer.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
});

export default DrawerNav;
