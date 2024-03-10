import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Onboarding = () => {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <Swiper style={styles.wrapper} loop={false}>
      <View style={styles.slide}>
        <StatusBar backgroundColor="#003c9e" />
        <Image source={require('../../assets/images/splash-screen-1.png')} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.text}>
            Welcome to
            <Text style={styles.greenText}> Glosent </Text> 
             Service App
          </Text>
          <Text style={styles.text2}>Consultancy and service provider</Text>
        </View>
      </View>
      <View style={styles.slide}>
        <StatusBar backgroundColor="#003c9e" />
        <Image source={require('../../assets/images/splash-screen-2.png')} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.text3}>Ensure customer satisfaction through</Text>
          <Text style={styles.text2}>transparency, quality and responsive </Text>
          <Text style={styles.text2}>service consistently </Text>
        </View>
      </View>
      <View style={styles.slide}>
        <StatusBar backgroundColor="#003c9e" />
        <Image source={require('../../assets/images/login-image.png')} style={styles.image} />
        <View style={styles.content}>
          <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
            <Text style={styles.buttonText}>Login Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Swiper>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  // wrapper: {
  //   flex:1
  // },
  slide: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#003c9e',
  },
  image: {
    width: width * 0.98,
    height: height * 0.67,
    marginTop: height * 0.05,
    resizeMode: 'contain',
  },
  content: {
    flex: 0.6,
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  text2: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: '400',
  },
  text3: {
    color: '#dade04',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.2,
    borderRadius: width * 0.1,
    marginTop: height * 0.05,
  },
  buttonText: {
    color: '#0448b8',
    fontSize: width * 0.04,
    fontWeight: '400',
  },
  greenText: {
    color: '#dade04',
  },
});
