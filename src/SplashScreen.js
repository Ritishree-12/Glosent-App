import React, { useEffect } from 'react';
import {StyleSheet, StatusBar, Dimensions, View,Image } from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Onboarding');
    }, 1000);
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#003c9e" />
      <View style={styles.container}>
           <Image source={require('../assets/images/splash-screen-2.png')} style={styles.image}/>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#003c9e',
  },
 image: {
    flex: 0.7,
    width: width * 0.98,
    resizeMode: 'contain',
  },
});

export default SplashScreen;