import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StatsScreen from './src/components/StatsScreen';
import AddExpensesScreen from './src/components/AddExpenseseScreen';
import ExpensesScreen from './src/components/ExpensesScreen';
import TopUpsScreen from './src/components/TopUpScreen';
import AddTopUpsScreen from './src/components/AddTopUpsScreen';
import AccountSettingsScreen from './src/components/AccountSettingsScreen';
import ApiTestScreen from './src/components/ApiTestScreen'; // Import ApiTestScreen

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [topUps, setTopUps] = useState([]);

  useEffect(() => {
    loadExpenses();
    loadTopUps();
  }, []);

  useEffect(() => {
    saveExpenses();
    saveTopUps();
  }, [expenses, topUps]);

  const loadExpenses = async () => {
    try {
      const storedExpenses = await AsyncStorage.getItem('expenses');
      if (storedExpenses !== null) {
        setExpenses(JSON.parse(storedExpenses));
      }
    } catch (error) {
      console.error('Error loading expenses:', error);
    }
  };

  const saveExpenses = async () => {
    try {
      await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
    } catch (error) {
      console.error('Error saving expenses:', error);
    }
  };

  const loadTopUps = async () => {
    try {
      const storedTopUps = await AsyncStorage.getItem('topUps');
      if (storedTopUps !== null) {
        setTopUps(JSON.parse(storedTopUps));
      }
    } catch (error) {
      console.error('Error loading top-ups:', error);
    }
  };

  const saveTopUps = async () => {
    try {
      await AsyncStorage.setItem('topUps', JSON.stringify(topUps));
    } catch (error) {
      console.error('Error saving top-ups:', error);
    }
  };

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  const addTopUp = (topUp) => {
    setTopUps([...topUps, topUp]);
  };

  const deleteTopUp = (index) => {
    const updatedTopUps = [...topUps];
    updatedTopUps.splice(index, 1);
    setTopUps(updatedTopUps);
  };

  const getTotal = () => {
    let total = 0;
    expenses.forEach((expense) => {
      total += parseFloat(expense.amount);
    });
    return total.toFixed(2);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Expenses') {
              iconName = 'eye';
            } else if (route.name === 'Add Expenses') {
              iconName = 'add-circle-outline';
            } else if (route.name === 'Top Ups') {
              iconName = 'card-outline';
            } else if (route.name === 'Add Top-Up') {
              iconName = 'add-circle-outline';
            } else if (route.name === 'Stats') {
              iconName = 'stats-chart-sharp';
            } else if (route.name === 'AccountSettings') {
              iconName = 'settings-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#00A6FF',
          inactiveTintColor: 'gray',
          style: {
            backgroundColor: '#F9F9F9',
            borderTopWidth: 0,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5,
          },
        }}
      >
        <Tab.Screen name="Expenses">
          {() => <ExpensesScreen expenses={expenses} deleteExpense={deleteExpense} />}
        </Tab.Screen>
        <Tab.Screen name="Add Expenses">
          {() => <AddExpensesScreen addExpense={addExpense} />}
        </Tab.Screen>
        <Tab.Screen name="Top Ups">
          {() => <TopUpsScreen topUps={topUps} deleteTopUp={deleteTopUp} />}
        </Tab.Screen>
        <Tab.Screen name="Add Top-Up">
          {() => <AddTopUpsScreen addTopUp={addTopUp} />}
        </Tab.Screen>
        <Tab.Screen name="Stats">
          {() => <StatsScreen topUps={topUps} expenses={expenses} />}
        </Tab.Screen>
        <Tab.Screen name="AccountSettings">
          {({ navigation }) => <AccountSettingsScreen navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen name="ApiTest" component={ApiTestScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  overviewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  overviewAmount: {
    fontSize: 32,
    color: '#00A6FF',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    padding: 10,
    color: 'white',
    width: 180,
  },
  pickerContainer: {
    marginBottom: 10,
  },
  picker: {
    height: 40,
    width: '100%',
    color: 'black',
  },
  icon: {
    marginRight: 10,
  },
  categoryContainer: {
    marginTop: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  expense: {
    color: 'white',
    marginRight: 150, // Added marginRight for horizontal layout
  },
  successMessage: {
    color: 'green',
    marginTop: 10,
  },
  deleteIcon: {
    marginLeft: 10,
  },
  expenseText: {
    color: '#fff', // Changed text color to white
    fontSize: 16,
    marginBottom: 5,
  },
  expenseCategory: {
    borderWidth: 2, // Increase border width
    borderColor: 'black', // Border color
    borderRadius: 5, // Border radius
    padding: 12, // Increase padding for spacing
    marginBottom: 15, // Add marginBottom
  },
});

export default App;
