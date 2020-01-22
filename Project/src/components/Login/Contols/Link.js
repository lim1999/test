import React from 'react';
import { StyleSheet,TouchableOpacity,Text} from 'react-native';
import {primaryBg} from '../../../../app.json';

class Link extends React.Component {
    render() {
        return (
            <TouchableOpacity style={styles.linkTest} {...this.props}>
                <Text style={styles.linkText}>{this.props.children}</Text>
            </TouchableOpacity>
        ); 
    }
}
const styles = StyleSheet.create({
    input:{
        backgroundColor: '#fff', padding: 20, borderRadius: 30,
        marginBottom: 10, borderColor: primaryBg, borderWidth: 1
    },
    linkText:{
        textAlign: 'center', color: primaryBg, fontSize: 16, paddingVertical: 10
    }
});
export default Link;

