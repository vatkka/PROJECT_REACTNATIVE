import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TopUpCart from './TopUpCart';

const TopUpsScreen = ({ topUps, deleteTopUp }) => {
  const [selectedTopUp, setSelectedTopUp] = useState(null);

  const handleLongPress = (index) => {
    setSelectedTopUp(index);
  };

  const handleDelete = () => {
    if (selectedTopUp !== null) {
      deleteTopUp(selectedTopUp);
      setSelectedTopUp(null); // Clear selected top-up
    }
  };

  return (
    <View style={styles.container}>
      <TopUpCart 
        topUps={topUps} 
        selectedTopUp={selectedTopUp} 
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

export default TopUpsScreen;
