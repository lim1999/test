import React, {Fragment} from 'react';
import {Text,View,StyleSheet,Platform} from 'react-native';
import {primaryBg} from '../../../app.json';
import Icon from 'react-native-vector-icons/FontAwesome';
class Button extends React.Component {
    render() {
        return (
            <Fragment>
                <View style={[{ backgroundColor: '#fff', width: 50, height: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center' },styles.shadow]}>
                    <Text style={{ color: primaryBg, fontSize: 45  }}>
                        <Icon name="refresh" type="FontAwesome" size={23} color="darkblue" />
                    </Text>
                </View>
            </Fragment>
        );
    }
}
const styles = StyleSheet.create({
    shadow:{
        shadowColor: Platform.OS === 'ios' ?"#aaa":"#aaa",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: Platform.OS === 'ios'?1:1.84,
        elevation: 3,
    },
});
export default Button;

