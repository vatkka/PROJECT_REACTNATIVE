import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput, Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const AddTopUpsScreen = ({ addTopUp }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState('');
  const [topUpAmount, setTopUpAmount] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [disableButton, setDisableButton] = useState(true);

  const handleEnter = () => {
    const topUp = {
      timestamp: selectedDate.getTime(),
      category: selectedCategory,
      amount: topUpAmount,
    };
    addTopUp(topUp);
    setSuccessMessage('Top-Up Successfully Added!');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000); // Clear message after 3 seconds
    // Reset form fields
    setSelectedDate(new Date());
    setSelectedCategory('');
    setTopUpAmount('');
    // Disable button after adding top-up
    setDisableButton(true);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setSelectedDate(currentDate);
    checkButtonStatus(currentDate, selectedCategory, topUpAmount);
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
    checkButtonStatus(selectedDate, category, topUpAmount);
  };

  const onAmountChange = (amount) => {
    setTopUpAmount(amount);
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
            placeholder="Enter Top-Up Amount"
            placeholderTextColor="white"
            keyboardType="numeric"
            value={topUpAmount}
            onChangeText={onAmountChange}
          />
        </View>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCategory}
          style={[styles.picker, { backgroundColor: '#C9D2D9', width: 210 }]}
          dropdownIconColor="#000"
          onValueChange={onCategoryChange}
          mode="dropdown"
        >
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Salary" value="Salary" />
          <Picker.Item label="Bonus" value="Bonus" />
          <Picker.Item label="Gift" value="Gift" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>
      <View style={[styles.buttonContainer, { flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10 }]}>
        <Button title="Add Top-Up" onPress={handleEnter} disabled={disableButton} />
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

export default AddTopUpsScreen;
