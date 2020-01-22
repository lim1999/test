import React from 'react';
import { StyleSheet,TextInput,Platform} from 'react-native';
import {primaryBg} from '../../../../app.json';

class Input extends React.Component {
    render() {
        return (
            <TextInput {...this.props} style={styles.input}/>
        ); 
    }
} 
const styles = StyleSheet.create({
    input:{
        backgroundColor: '#fff', padding: 20, borderRadius: 5,
        paddingVertical:  Platform.OS === "ios"?15:10, paddingHorizontal: 10, 
        marginBottom: 10, borderColor: primaryBg, borderWidth: 1
    },
});
export default Input;

