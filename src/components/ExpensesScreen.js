import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ExpenseCart from './ExpenseCart';

const ExpensesScreen = ({ expenses, deleteExpense }) => {
  const [selectedExpense, setSelectedExpense] = useState(null);

  const handleLongPress = (category, index) => {
    setSelectedExpense({ category, index });
  };

  const handleDelete = () => {
    if (selectedExpense) {
      deleteExpense(selectedExpense.category, selectedExpense.index);
      setSelectedExpense(null);
    }
  };

  return (
    <View style={styles.container}>
      <ExpenseCart
        expenses={expenses}
        selectedExpense={selectedExpense}
        handleLongPress={handleLongPress}
        handleDelete={handleDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 20,
  },
});

export default ExpensesScreen;
