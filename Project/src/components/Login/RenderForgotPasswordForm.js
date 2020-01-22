import React from 'react';
import { StyleSheet,View} from 'react-native';
import Logo from './Contols/Logo';
import CustomButton from './Contols/Button';
import CustomInput from './Contols/Input';

class ForgotPassword extends React.Component {
    render() {
        const {_onChangeInput,_onSubmit,choosed} = this.props;
        return (
            <View style={styles.container}> 
                <Logo/>
                <CustomInput placeholder="Email address"
                    value={choosed.email} 
                    onChangeText={(text)=>_onChangeInput('email',text) } 
                />
                <CustomButton onPress={()=>_onSubmit()}>Submit</CustomButton>
            </View>
        ); 
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1, margin: 15, justifyContent: 'center'
    },
});
export default ForgotPassword;

