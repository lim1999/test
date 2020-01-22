import React from 'react';
import { StyleSheet,View} from 'react-native';
import Logo from './Contols/Logo';
import CustomButton from './Contols/Button';
import CustomLink from './Contols/Link';
import CustomInput from './Contols/Input';

class Login extends React.Component {
    render() {
        const {_goToRegister,_forgotPassword,_onLogin,_onChangeInput,choosed} = this.props;
        return (
            <View style={styles.container}> 
                <Logo/>
                <CustomInput placeholder="Email address" 
                    value={choosed.email} 
                    onChangeText={(text)=>_onChangeInput('email',text) } 
                />
                <CustomInput placeholder="Password" secureTextEntry={true} 
                    value={choosed.password}
                    onChangeText={(text)=>_onChangeInput('password',text) } 
                />
                <CustomButton onPress={()=>_onLogin()}>Login</CustomButton>
                <CustomLink onPress={()=>_forgotPassword()}> Forgot password </CustomLink>
                {/* <CustomLink onPress={()=>_goToRegister()}> Don't have account yet? </CustomLink> */}
            </View>
        ); 
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1, margin: 15, justifyContent: 'center'
    },
});
export default Login;

