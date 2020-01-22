import React from 'react';
import { StyleSheet,Image,View} from 'react-native';

class Logo extends React.Component {
    render() {
        return (
            <View style={styles.logo}> 
                <Image
                    style={{width: 150, height: 100}}
                    source={require('../../../images/Logo/logo.png')}
                />
            </View>
        ); 
    }
}
const styles = StyleSheet.create({
    logo:{
        alignItems: 'center', marginBottom: 30
    },
});
export default Logo;

