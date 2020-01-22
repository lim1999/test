import React, {Fragment} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import {primaryBg} from '../../../app.json';
class CustomArticle extends React.Component {
    render() {
        return (
            <Fragment>
                <View style={styles.container}>
                    <Text style={styles.loginText}>
                        {this.props.children&&this.props.children}
                        {this.props.text&&this.props.text}
                    </Text>
                </View>
            </Fragment>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        margin: 5
    },
    loginText:{
        color:'#222',
        paddingLeft : 1,
        paddingRight : 1,
    }
});
export default CustomArticle;

