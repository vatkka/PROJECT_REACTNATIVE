import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ExpenseCart = ({ expenses, selectedExpense, handleLongPress, handleDelete }) => {
  return (
    <View style={styles.container}>
      {expenses.map((expense, index) => (
        <TouchableOpacity 
          key={index} 
          onLongPress={() => handleLongPress(expense.category, index)} 
          style={[
            styles.expenseItem,
            index === expenses.length - 1 && { marginBottom: 0 }
          ]}
        >
          <Text style={styles.expense}>
            {new Date(expense.date).toDateString()} - ${expense.amount} - {expense.category}
          </Text>
          {selectedExpense && selectedExpense.category === expense.category && selectedExpense.index === index && (
            <TouchableOpacity onPress={() => handleDelete(expense.category, index)}>
              <Ionicons name="trash-outline" size={24} color="#FF3333" style={styles.deleteIcon} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  expenseItem: {
    width: '100%',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  expense: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  deleteIcon: {
    marginLeft: 10,
  },
});

export default ExpenseCart;
