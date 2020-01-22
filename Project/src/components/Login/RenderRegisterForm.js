import React from 'react';
import { StyleSheet,View} from 'react-native';
import Logo from './Contols/Logo';
import CustomButton from './Contols/Button';
import CustomLink from './Contols/Link';
import CustomInput from './Contols/Input';

class Register extends React.Component {
    render() {
        const {_goToLogin,_onChangeInput,_onRegister,choosed} = this.props;
        return (
            <View style={styles.container}> 
                <Logo/>
                <CustomInput placeholder="Name" 
                    value={choosed.name}
                    onChangeText={(text)=>_onChangeInput('name',text) }
                />
                <CustomInput placeholder="Phone" 
                    value={choosed.phone}
                    onChangeText={(text)=>_onChangeInput('phone',text) }
                />
                <CustomInput placeholder="Email Address" 
                    value={choosed.email}
                    onChangeText={(text)=>_onChangeInput('email',text) }
                />
                <CustomInput placeholder="Password" secureTextEntry={true} 
                    value={choosed.password}
                    onChangeText={(text)=>_onChangeInput('password',text) }
                />
                <CustomInput placeholder="Conform Password" secureTextEntry={true} 
                    value={choosed.password_confirmation}
                    onChangeText={(text)=>_onChangeInput('password_confirmation',text) }
                />
                <CustomButton onPress={()=>_onRegister()}>Register</CustomButton>
                <CustomLink onPress={()=>_goToLogin()}>Already have account</CustomLink>
            </View>
        ); 
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1, margin: 15, justifyContent: 'center'
    },
});
export default Register;

