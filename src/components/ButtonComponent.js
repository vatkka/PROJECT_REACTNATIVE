import React from 'react';
import { StyleSheet, Button, View, Text, Alert } from 'react-native';

const ButtonComponent = (props) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>The title and onPress handler are required.</Text>
                <Button
                    title="Example 1"
                    onPress={() => Alert.alert('Simple Button pressed')}
                />
            </View>
            <View style={styles.separator} />
            <View>
                <Text style={styles.title}>Adjust the color in a way that looks standard on each platform.</Text>
                <Button title="Example 2" color="#f194ff" onPress={() => Alert.alert('Button with adjusted color pressed')} />
            </View>
            <View style={styles.separator} />
            <View>
                <Text style={styles.title}>All interaction for the component are disabled, if the button is disabled.</Text>
                <Button title="Example 3" disabled onPress={() => Alert.alert('Cannot press this one')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
    },
    separator: {
        marginVertical: 30,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});

export default ButtonComponent;