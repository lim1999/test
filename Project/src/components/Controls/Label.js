import React, {Fragment} from 'react';
import {StyleSheet,View,Text} from 'react-native';
class CustomLabel extends React.Component {
    render() {
        return (
            <Fragment>
                <View style={styles.container}>
                    <Text style={styles.text} {...this.props}>{this.props.text&&this.props.text.toUpperCase()}</Text>
                    {this.props.children&&this.props.children}
                </View>
            </Fragment>
        );
    }
}
const styles = StyleSheet.create({
    text:{
        fontWeight: 'bold',
        paddingVertical: 5, paddingHorizontal: 5,
    },
});
export default CustomLabel;

