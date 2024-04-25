import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput, Platform, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

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
      amount: expenseAmount,
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
    if (date && category && amount && !isNaN(parseFloat(amount))) {
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
            placeholderTextColor="white"
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
          <Picker.Item label="Health Care" value="Health Care" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>
      <View style={[styles.buttonContainer, { flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10 }]}>
        <Button title="Add Expense" onPress={handleEnter} disabled={disableButton} />
      </View>
      {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
    </View>
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
  successMessage: {
    color: 'green',
    marginTop: 10,
  },
});

export default AddExpensesScreen;
