import React, { Component } from 'react';
import {StyleSheet,View, Modal,TouchableOpacity,TouchableWithoutFeedback,ActivityIndicator} from 'react-native';

class RenderLoadingDialog extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        var {visible} = this.props
        return (
            <Modal 
                animationType="fade"
                transparent={true}
                visible={visible}
            >
                <TouchableOpacity 
                style={styles.modalArea} 
                activeOpacity={1} 
                >
                    <TouchableWithoutFeedback>
                    <View style={styles.modalView}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>  
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modalArea:{
        backgroundColor: 'rgba(0,0,0,0.3)', 
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView:{
        backgroundColor: '#fff',
        width: 100,
        height: 100,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
export default RenderLoadingDialog;
