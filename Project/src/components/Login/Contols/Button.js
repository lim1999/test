import React from 'react';
import { StyleSheet,TouchableOpacity,View,Text} from 'react-native';
import {primaryBg} from '../../../../app.json';
 
class Button extends React.Component {
    render() {
        return (
            <View style={styles.container}> 
                <TouchableOpacity style={[styles.input,styles.button]} {...this.props}>
                    <Text style={styles.buttonText}>{this.props.children}</Text>
                </TouchableOpacity>
            </View>
        ); 
    }
}
const styles = StyleSheet.create({
    input:{
        backgroundColor: '#fff', padding: 20, borderRadius:5,
        paddingVertical:  Platform.OS === "ios"?15:15, paddingHorizontal: 10, 
        marginBottom: 10, borderColor: primaryBg, borderWidth: 1
    },
    button:{
        backgroundColor: primaryBg, marginTop: 0
    },
    buttonText:{
        textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: 16
    },
});
export default Button;

