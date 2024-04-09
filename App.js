import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';// Download it with npm install first
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { FontAwesome } from '@expo/vector-icons';// Download it with npm install first
import DateTimePicker from '@react-native-community/datetimepicker';// Download it with npm install first
import { Picker } from '@react-native-picker/picker'; // Download it with npm install first

const Tab = createBottomTabNavigator();

const ExpensesScreen = () => {
  return (
    <View style={[styles.container, { backgroundColor: '#0D1017' }]}>
      {/* Add your expenses screen content here */}
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

const AddExpensesScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const handleEnter = () => {
    // Implement logic to handle expense submission for the selected date
    console.log('Selected date:', selectedDate);
    console.log('Selected category:', selectedCategory);
    console.log('Expense amount:', expenseAmount);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setSelectedDate(currentDate);
  };

  return (
    <View style={[styles.container, { backgroundColor: '#0D1017' }]}>
      <View style={[styles.buttonContainer, { marginTop: 20, flexDirection: 'row', alignItems: 'center', marginLeft: 10 }]}>
        <FontAwesome name="calendar" size={24} color="white" style={styles.icon} />
        <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
        <View style={{ marginLeft: 20 }}>
          <TextInput
            style={styles.input}
            placeholder="Enter Expense Amount"
            placeholderTextColor="white"
            keyboardType="numeric"
            value={expenseAmount}
            onChangeText={setExpenseAmount}
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
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          mode="dropdown"
          itemStyle={{ height: 30 }}
        >
          <Picker.Item label="Select Category" value="" enabled={false} />
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
        <Button title="Add Expense" onPress={handleEnter} />
      </View>
    </View>
  );
};

const App = () => {
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
        <Tab.Screen name="Expenses" component={ExpensesScreen} />
        <Tab.Screen name="Add Expenses" component={AddExpensesScreen} />
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
});

export default App;