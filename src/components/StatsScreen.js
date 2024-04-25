import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, DrawerLayoutAndroid, FlatList, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StatsScreen = ({ topUps = [], expenses = [], navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState({ startDate: null, endDate: null });
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalTopUps, setTotalTopUps] = useState(0);

  useEffect(() => {
    // Filter recent transactions based on selected category and date range
    const filtered = [...expenses, ...topUps].filter((transaction) => {
      const isInCategory = selectedCategory === '' || transaction.category === selectedCategory;
      const isInRange = !selectedDateRange.startDate || !selectedDateRange.endDate ||
        (transaction.date >= selectedDateRange.startDate && transaction.date <= selectedDateRange.endDate);
      return isInCategory && isInRange;
    });
    setFilteredTransactions(filtered);

    // Calculate total expenses
    const expensesTotal = expenses.reduce((acc, expense) => {
      if (selectedCategory === '' || expense.category === selectedCategory) {
        acc += parseFloat(expense.amount);
      }
      return acc;
    }, 0);
    setTotalExpenses(expensesTotal);

    // Calculate total top-ups
    const topUpsTotal = topUps.reduce((acc, topUp) => {
      if (selectedCategory === '' || topUp.category === selectedCategory) {
        acc += parseFloat(topUp.amount);
      }
      return acc;
    }, 0);
    setTotalTopUps(topUpsTotal);
  }, [selectedCategory, selectedDateRange, topUps, expenses]);

  // Calculate available balance
  const availableBalance = totalTopUps - totalExpenses;

  const drawerRef = React.createRef();

  const openDrawer = () => {
    drawerRef.current.openDrawer();
  };

  const closeDrawer = () => {
    drawerRef.current.closeDrawer();
  };

  // Function to filter expenses by category
  const filterExpensesByCategory = (category) => {
    setSelectedCategory(category);
    closeDrawer();
  };

  // Function to filter top-ups by category
  const filterTopUpsByCategory = (category) => {
    setSelectedCategory(category);
    closeDrawer();
  };

  // Function to filter expenses and top-ups by date range
  const filterDataByDateRange = () => {
    // Implement your logic to filter data by date range
    closeDrawer();
  };

  // Function to reset filters
  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedDateRange({ startDate: null, endDate: null });
    closeDrawer();
  };

  // Merge and sort expenses and top-ups by date
  const recentTransactions = [...filteredTransactions].sort((a, b) => new Date(b.date || b.timestamp) - new Date(a.date || a.timestamp));

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={() => (
        <View style={styles.drawerContainer}>
          <Text style={styles.drawerHeader}>Filter Options</Text>
          <View style={styles.drawerContent}>
            <Text style={styles.filterText}>Filter Expenses by Category:</Text>
            <Button title="All" onPress={() => filterExpensesByCategory('')} />
            {expenses.map((expense) => (
              <Button key={'expense_' + expense.category} title={expense.category} onPress={() => filterExpensesByCategory(expense.category)} />
            ))}
            <Text style={styles.filterText}>Filter Top-Ups by Category:</Text>
            <Button title="All" onPress={() => filterTopUpsByCategory('')} />
            {topUps.map((topUp) => (
              <Button key={'topup_' + topUp.category} title={topUp.category} onPress={() => filterTopUpsByCategory(topUp.category)} />
            ))}
            <Text style={styles.filterText}>Filter by Date Range:</Text>
            {/* Add date range filter components here */}
            <TextInput
              placeholder="Start Date"
              onChangeText={(text) => {
                // Handle input for start date
              }}
            />
            <TextInput
              placeholder="End Date"
              onChangeText={(text) => {
                // Handle input for end date
              }}
            />
            <Button title="Apply" onPress={filterDataByDateRange} />
            <Button title="Reset" onPress={resetFilters} />
          </View>
        </View>
      )}
    >
      <View style={styles.container}>
        <View style={styles.headerRight}>
          <Ionicons name="filter" size={24} color="black" onPress={openDrawer} />
        </View>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceTitle}>Available Balance</Text>
          <Text style={styles.balanceAmount}>${availableBalance.toFixed(2)}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.title}>Recent Transactions:</Text>
          <FlatList
            data={recentTransactions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text>{item.category}: ${item.amount}</Text>
            )}
          />
        </View>
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  drawerHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  drawerContent: {
    flex: 1,
  },
  filterText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dataContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'green',
  },
  headerRight: {
    marginRight: 10,
  },
});

export default StatsScreen;
