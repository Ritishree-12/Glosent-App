import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNav from './DrawerNav';



function AppNavigation() {

  return (
    <NavigationContainer>
     <DrawerNav/>
    </NavigationContainer>
  );
}

export default AppNavigation;
