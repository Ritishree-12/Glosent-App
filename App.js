import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AuthStack from './src/navigation/AuthStack'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/utils/store';
import AppNavigation from './src/navigation/AppNavigation';

const App = () => {
  return (

    <>
      {/* <AuthStack /> */}
      <AppNavigation/>
    </>
  )
}

export default App

const styles = StyleSheet.create({})

  // <>
    // <AuthStack />
    // </>


     // <Provider store={store}>
    //   <PersistGate loading={null} persistor={persistor}>
    //     <AuthStack />
    //   </PersistGate>
    // </Provider>