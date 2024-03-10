import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
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
      >
        <Drawer.Screen name="Home" component={AuthStack}
        options={{ headerShown: false }}
        />
        {/* <Drawer.Screen name="LogOut" component={LogOut} /> */}
      </Drawer.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    color: '#fff'
  },
});

export default DrawerNav;
