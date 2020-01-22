import React from 'react';
import { StyleSheet, View,ScrollView,Alert } from 'react-native';
import ForgotPasswordForm from '../../components/Login/RenderForgotPasswordForm';
import {primaryBg,color,APP_API_BASE_URL} from '../../../app.json';
import LayoutContainer from '../../components/Tools/RenderLayoutContainer';
import {_splitMessageError} from '../../components/function/flexi/flexiFunction';

class ForgotPassword extends React.Component {
    static navigationOptions = () => ({
        headerTitle: `User Forgot Password`,
        headerStyle: {
        backgroundColor: `${primaryBg}`,
        },
        headerTintColor: `${color}`,
    }); 
    constructor(props) {
        super(props);
        this.state = {
            loadingDialog: false,
            choosed:{
                email: null
            }
        }
    }; 

    // suvbmit
    _onSubmit(){
        const {choosed} = this.state;
        this._visibleLoading(true);
        return fetch(APP_API_BASE_URL+'user/reset-password', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: choosed.email,
            }),
        })
        .then(response => {
            const statusCode = response.status;
            const data = response.json();
            this.setState({ ...this.state, loadingDialog: false, });
            return Promise.all([statusCode, data]);
        })
        .then(([statusCode, responseJson]) => {
            if(statusCode==201){
                Alert.alert('Reset Success','Please check your email for the instruction on reseting your password.');
                this._goToLogin();
            }else if(statusCode==422){
                var displayValidation = '';
                if(responseJson.email){
                    responseJson.message = '';
                    displayValidation += _splitMessageError(responseJson.email);
                }else{
                    var validationMessage = responseJson.errors;
                    displayValidation += _splitMessageError(validationMessage.email);
                }
                Alert.alert('Invalid Input!',responseJson.message+'\r\n'+displayValidation);
            }else{
                Alert.alert('Failed!','Please Contact Administrator');
            }
        })
        .catch(error => {
            this.setState({ ...this.state, loadingDialog: false, });
            alert(error)
        });
    }

    _visibleLoading(status){
        this.setState({
            ...this.state,
            loadingDialog: status
        });
    }

    // when input control has been changed
    _onChangeInput(target,value){
        this.setState({
            ...this.state,
            choosed:{
                ...this.state.choosed,
                [target]:value
            }
        });
    }

    // link 
    _goToLogin(){
        this.setState({
            ...this.state,
            choosed:{
                email: null,
            }
        });
        const {navigation} = this.props;
        navigation.navigate('LoginScreen');
    }
    render() {
        const {loadingDialog,choosed} = this.state;
        return (
            <LayoutContainer loadingDialog={loadingDialog}>
                <ScrollView>
                    <View style={styles.container}>
                        <ForgotPasswordForm
                            choosed={choosed}
                            _onChangeInput={this._onChangeInput.bind(this)}
                            _onSubmit={this._onSubmit.bind(this)}
                        />
                    </View>
                </ScrollView>
            </LayoutContainer>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: `#fff`,
        flex: 1, justifyContent: 'center',
    },
});
export default ForgotPassword;

