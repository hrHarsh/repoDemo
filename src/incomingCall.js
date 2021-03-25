import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function IncomingCall({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnTxt}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    style={[styles.btn, { backgroundColor: 'red' }]}>
                    <Text style={styles.btnTxt}>Reject</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 50,
    },
    btn: {
        padding: 20,
        borderRadius: 8,
        backgroundColor: 'green',
    },
    btnTxt: {
        fontWeight: '800',
        color: '#fff',
    },
});
