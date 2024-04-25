import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TopUpCart = ({ topUps, selectedTopUp, handleLongPress, handleDelete }) => {
  return (
    <View style={styles.container}>
      {topUps.map((topUp, index) => (
        <TouchableOpacity 
          key={index} 
          onLongPress={() => handleLongPress(index)} 
          style={styles.topUpItem}
        >
          <Text style={styles.topUp}>
            {new Date(topUp.timestamp).toDateString()} - ${topUp.amount} - {topUp.category}
          </Text>
          {selectedTopUp === index && (
            <TouchableOpacity onPress={() => handleDelete(index)}>
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
  topUpItem: {
    width: '100%',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topUp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  deleteIcon: {
    marginLeft: 10,
  },
});

export default TopUpCart;
