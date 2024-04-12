import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput, Platform, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { Picker } from '@react-native-picker/picker'; 

const Tab = createBottomTabNavigator();

const ExpensesScreen = ({ expenses, deleteExpense }) => {
  const [selectedExpense, setSelectedExpense] = useState(null);

  const handleLongPress = (category, index) => {
    setSelectedExpense({ category, index });
  };

  const handleDelete = () => {
    deleteExpense(selectedExpense.category, selectedExpense.index);
    setSelectedExpense(null); // Clear selected expense
  };

  return (
    <View style={[styles.container, { backgroundColor: '#0D1017' }]}>
      {Object.keys(expenses).map(category => (
        <View key={category}>
          <Text style={styles.categoryTitle}>{category}</Text>
          <View style={styles.expenseContainer}>
            {expenses[category].map((expense, index) => (
              <TouchableOpacity 
                key={index} 
                onLongPress={() => handleLongPress(category, index)} // Select expense on long press
              >
                <Text style={styles.expense}>
                  {expense.date.toDateString()} - ${expense.amount}
                </Text>
                {/* Delete button for each expense */}
                {selectedExpense && selectedExpense.category === category && selectedExpense.index === index && (
                  <TouchableOpacity onPress={handleDelete}>
                    <Ionicons name="trash-outline" size={24} color="white" style={styles.deleteIcon} />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};


const StatsScreen = () => {
  return (
    <View style={[styles.container, { backgroundColor: '#0D1017' }]}>
      {/* Add your statistics screen content here */}
    </View>
  );
};

const AddExpensesScreen = ({ addExpense }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [disableButton, setDisableButton] = useState(true);

  const handleEnter = () => {
    const expense = {
      date: selectedDate,
      category: selectedCategory,
      amount: expenseAmount
    };
    addExpense(expense);
    setSuccessMessage('Expense Successfully Added!');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000); // Clear message after 3 seconds
    // Reset form fields
    setSelectedDate(new Date());
    setSelectedCategory('');
    setExpenseAmount('');
    // Disable button after adding expense
    setDisableButton(true);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setSelectedDate(currentDate);
    checkButtonStatus(currentDate, selectedCategory, expenseAmount);
  };

  const checkButtonStatus = (date, category, amount) => {
    if (date && category && amount) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };

  const onCategoryChange = (category) => {
    setSelectedCategory(category);
    checkButtonStatus(selectedDate, category, expenseAmount);
  };

  const onAmountChange = (amount) => {
    setExpenseAmount(amount);
    checkButtonStatus(selectedDate, selectedCategory, amount);
  };

  return (
    <View style={[styles.container, { backgroundColor: '#0D1017' }]}>
      <View style={[styles.buttonContainer, { marginTop: 20, flexDirection: 'row', alignItems: 'center', marginLeft: 10 }]}>
        <Ionicons name="calendar" size={24} color="white" style={styles.icon} />
        <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
        <View style={{ marginLeft: 20 }}>
          <TextInput
            style={styles.input}
            placeholder="Enter Expense Amount"
            keyboardType="numeric"
            value={expenseAmount}
            onChangeText={onAmountChange}
          />
        </View>
      </View>
      <View style={styles.pickerContainer}>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onDateChange}
          />
        )}
        <Picker
          selectedValue={selectedCategory}
          style={[styles.picker, { backgroundColor: '#C9D2D9', width: 210 }]}
          dropdownIconColor="#000"
          onValueChange={onCategoryChange}
          mode="dropdown"
          itemStyle={{ height: 30 }}
        >
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Pharmacy" value="Pharmacy" />
          <Picker.Item label="Clothes" value="Clothes" />
          <Picker.Item label="Gifts" value="Gifts" />
          <Picker.Item label="Rent" value="Rent" />
          <Picker.Item label="Repairs" value="Repairs" />
          <Picker.Item label="Transportation" value="Transportation" />
          <Picker.Item label="Child Care" value="Child Care" />
          <Picker.Item label="Health Care" value="Health Care"/>
          <Picker.Item label="Other" value="Other"/>
        </Picker>
      </View>
      <View style={[styles.buttonContainer, { flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10 }]}>
        <Button title="Add Expense" onPress={handleEnter} disabled={disableButton} />
      </View>
      {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
    </View>
  );
};

const App = () => {
  const [expenses, setExpenses] = useState({});

  const addExpense = (expense) => {
    const updatedExpenses = { ...expenses };
    if (updatedExpenses[expense.category]) {
      updatedExpenses[expense.category].push(expense);
    } else {
      updatedExpenses[expense.category] = [expense];
    }
    setExpenses(updatedExpenses);
  };

  const deleteExpense = (category, index) => {
    const updatedExpenses = { ...expenses };
    updatedExpenses[category].splice(index, 1);
    if (updatedExpenses[category].length === 0) {
      delete updatedExpenses[category]; // Remove category if it becomes empty
    }
    setExpenses(updatedExpenses);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: { backgroundColor: '#161B21' },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          headerStyle: { backgroundColor: '#161B21' },
          headerTintColor: 'white',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Expenses') {
              iconName = 'eye';
            } else if (route.name === 'Add Expenses') {
              iconName = 'add-circle-outline';
            } else if (route.name === 'Stats') {
              iconName = 'stats-chart-sharp';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Expenses">
          {() => <ExpensesScreen expenses={expenses} deleteExpense={deleteExpense} />}
        </Tab.Screen>
        <Tab.Screen name="Add Expenses">
          {() => <AddExpensesScreen addExpense={addExpense} />}
        </Tab.Screen>
        <Tab.Screen name="Stats" component={StatsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
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
});

export default App;
