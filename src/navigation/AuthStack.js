import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from '../onboarding/Onboarding';
import Login from '../authentication/Login';
import HomeScreen from '../home/HomeScreen';
import SplashScreen from '../SplashScreen';
import ExpensesEntry from '../expenses/ExpensesEntry';
import ExpensesReport from '../expenses/ExpensesReport';
import ManagerDashboard from '../dashboard/ManagerDashboard';
import AdminDashboard from '../dashboard/AdminDashboard';
import EmployeeList from '../dashboard/EmployeeList';
import FoodType from '../expensestypes/FoodType';
import TransportType from '../expensestypes/TransportType';
import AccomodationType from '../expensestypes/AccomodationType';
import OTPScreen from '../authentication/Otp';
import EmployeeExpenses from '../expenses/EmployeeExpenses';
import ApproveExpenses from '../expenses/ApproveExpenses';
import TransactionHistory from '../expenses/TransactionHistory';
import AdminEmployeeList from '../admin/AdminEmployeeList';
import ManagerList from '../admin/ManagerList';
import AdminEmpExpensesReport from '../admin/AdminEmpExpenses';
import ManagerFoodType from '../manager/managerExpenses/ManagerFoodType';
import ManagerAccommodationType from '../manager/managerExpenses/ManagerAccommodationType';
import ManagerTransportationType from '../manager/managerExpenses/ManagerTransportExpenses';
import ExpenseEntriesManager from '../manager/managerExpenses/ExpenseEntriesManager';
import ManagerExpenseReport from '../manager/expesesReport/ManagerExpenseReport';
import AdminMngTransHistory from '../admin/AdminMngTransHistory';

const Stack = createNativeStackNavigator();

const AuthStack = () => {

    return (
      
            <Stack.Navigator>
                <Stack.Screen name="Splash"
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen name="Onboarding"
                    component={Onboarding}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="otpscreen"
                    component={OTPScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                // options={{ title: "Employee Dashboard" }}
                />
                <Stack.Screen
                    name="ExpensesEntry"
                    component={ExpensesEntry}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ExpensesReport"
                    component={ExpensesReport}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ManagerDashboard"
                    component={ManagerDashboard}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AdminDashboard"
                    component={AdminDashboard}
                    options={{ headerShown: false }}
                />
                 <Stack.Screen
                    name="EmployeeList"
                    component={EmployeeList}
                    options={{ headerShown: false }}
                />
                 <Stack.Screen
                    name="FoodType"
                    component={FoodType}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="TransportType"
                    component={TransportType}
                    options={{ headerShown: false }}
                />
                  <Stack.Screen
                    name="AccomodationType"
                    component={AccomodationType}
                    options={{ headerShown: false }}
                />
                 <Stack.Screen
                    name="EmployeeExpenses"
                    component={EmployeeExpenses}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ApproveExpenses"
                    component={ApproveExpenses}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="TransactionHistory"
                    component={TransactionHistory}
                    options={{ headerShown: false }}
                />
                 <Stack.Screen
                    name="AdminEmployeeList"
                    component={AdminEmployeeList}
                    options={{ headerShown: false }}
                />
                 <Stack.Screen
                    name="ManagerList"
                    component={ManagerList}
                    options={{ headerShown: false }}
                />
                 <Stack.Screen
                    name="AdminEmpExpensesReport"
                    component={AdminEmpExpensesReport}
                    options={{ headerShown: false }}
                />
                 <Stack.Screen
                    name="ExpenseEntriesManager"
                    component={ExpenseEntriesManager}
                    options={{ headerShown: false }}
                />
                  <Stack.Screen
                    name="ManagerFoodType"
                    component={ManagerFoodType}
                    options={{ headerShown: false }}
                />
                 <Stack.Screen
                    name="ManagerAccommodationType"
                    component={ManagerAccommodationType}
                    options={{ headerShown: false }}
                />
                 <Stack.Screen
                    name="ManagerTransportationType"
                    component={ManagerTransportationType}
                    options={{ headerShown: false }}
                />
                  <Stack.Screen
                    name="ManagerExpenseReport"
                    component={ManagerExpenseReport}
                    options={{ headerShown: false }}
                />
                  <Stack.Screen
                    name="AdminMngTransHistory"
                    component={AdminMngTransHistory}
                    options={{ headerShown: false }}
                />
                
                
                
                
            </Stack.Navigator>
       
    )
}

export default AuthStack
