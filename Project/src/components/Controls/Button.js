import React, {Fragment} from 'react';
import {StyleSheet,View,TouchableOpacity,Text} from 'react-native';
import {primaryBg} from '../../../app.json';
class CustomButton extends React.Component {
    render() {
        return (
            <Fragment>
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.button}
                        underlayColor='#fff'
                        {...this.props}
                    >
                        <Text style={styles.loginText}>
                            {this.props.children&&this.props.children}
                            {this.props.text&&this.props.text.toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                </View>
            </Fragment>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        margin: 5
    },
    button:{
        paddingTop:14,
        paddingBottom:14,
        backgroundColor:primaryBg,
        borderRadius:5,
        width: '100%'
    },
    loginText:{
        fontSize: 12,
        color:'#fff',
        textAlign:'center',
        paddingLeft : 1,
        paddingRight : 1,
        fontWeight: 'bold'
    }
});
export default CustomButton;

