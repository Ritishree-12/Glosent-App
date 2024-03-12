import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#003c9e" />
      <View style={styles.header}>
        <View>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Image source={require('../../assets/images/menu.png')} style={{ width: 24, height: 20, marginLeft: 30 }} />
          </TouchableOpacity>
        </View>
        <View>
        <Text style={styles.headerText}>Employee Dashboard</Text>
        </View>
      
      </View>
      <View style={styles.boxContainer}>
        <View style={styles.boxWrapper}>
          <TouchableOpacity onPress={() => navigation.navigate('ExpensesEntry')}>
            <View style={styles.box}>
              <Image source={require('../../assets/images/expenses.png')} style={styles.icon} />
            </View>
          </TouchableOpacity>
          <Text style={styles.title}>Expenses Entry</Text>
        </View>
        <View style={styles.boxWrapper}>
          <TouchableOpacity onPress={() => navigation.navigate('ExpensesReport')}>
            <View style={styles.box}>
              <Image source={require('../../assets/images/transaction1.png')} style={styles.icon1} />
            </View>
          </TouchableOpacity>
          <Text style={styles.title}>Expenses Report</Text>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003c9e',
  },
  header: {
    height: height * 0.09,
    backgroundColor: '#ffffff',
    justifyContent:'flex-start',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: '#b9ce19',
    borderBottomWidth: 5,
    position: 'relative',
    elevation: 5,
    marginBottom: height * 0.05,
    flexDirection:'row'
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft:50
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: width * 0,
  },
  boxWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  box: {
    width: width * 0.26,
    aspectRatio: 1, // Maintain aspect ratio
    backgroundColor: '#b9ce19',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '58%',
    height: '58%',
  },
  icon1: {
    width: '50%',
    height: '59%',
  },
  title: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: height * 0.02, // Adjust margin based on screen height
    fontWeight: 'bold',
  },
});
