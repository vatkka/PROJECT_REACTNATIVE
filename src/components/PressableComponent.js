import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

const PressableComponent = (props) => {

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          Alert.alert("Pressed!");
        }}
        onLongPress={() => {
          Alert.alert("Long Pressed!");
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
          },
          styles.wrapperCustom,
        ]}>
        <Text style={styles.text}>Press Me</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30
  },
  text: {
    fontSize: 16,
  },
  wrapperCustom: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 6,
  }
});

export default PressableComponent;