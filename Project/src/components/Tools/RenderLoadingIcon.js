import React, { Component } from 'react';
import {StyleSheet, View,ActivityIndicator} from 'react-native';

class RenderLoadingIcon extends Component {
    render() {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    }
});
export default RenderLoadingIcon;