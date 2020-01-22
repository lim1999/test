import React from 'react';
import { StyleSheet, View,ScrollView,Alert } from 'react-native';
import RegisterForm from '../../components/Login/RenderRegisterForm';
import {primaryBg,color,APP_API_BASE_URL} from '../../../app.json';
import LayoutContainer from '../../components/Tools/RenderLayoutContainer';
import {storeData} from '../../components/function/flexi/flexiAsync';
import {_splitMessageError} from '../../components/function/flexi/flexiFunction';

class Login extends React.Component {
    static navigationOptions = () => ({
        headerTitle: `User Register`,
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
                name: null,
                phone: null,
                email: null,
                password: null,
                password_confirmation: null
            }
        }
    }; 

    _visibleLoading(status){
        this.setState({
            ...this.state,
            loadingDialog: status
        });
    }

    // when submit register
    _onRegister(){
        const {choosed} = this.state;
        this._visibleLoading(true);
        return fetch(APP_API_BASE_URL+'register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: choosed.name,
                email: choosed.email,
                phone: choosed.phone,
                password: choosed.password,
                password_confirmation: choosed.password_confirmation,
            }),
        })
        .then(response => {
            const statusCode = response.status;
            const data = response.json();
            this.setState({ ...this.state, loadingDialog: false, });
            return Promise.all([statusCode, data]);
        })
        .then(([statusCode, responseJson]) => {
            console.log(responseJson);
            if(statusCode==200 && responseJson.token_type=='Bearer' && responseJson.access_token != ''){
                var auth = responseJson.token_type+' '+responseJson.access_token;
                Alert.alert('Register Success','Your account has been create successfully.');
                storeData('auth',auth);
                this._loadUserInfo(auth);
            }else if(statusCode==422){
                var validationMessage = responseJson.errors;
                var displayValidation = '';

                displayValidation += _splitMessageError(validationMessage.name);
                displayValidation += _splitMessageError(validationMessage.email);
                displayValidation += _splitMessageError(validationMessage.phone);
                displayValidation += _splitMessageError(validationMessage.password);

                Alert.alert('Invalid Input!',responseJson.message+'\r\n'+displayValidation);
            }else{
                Alert.alert('Register Failed!','Please Contact Administrator');
            }
        })
        .catch(error => {
            this.setState({ ...this.state, loadingDialog: false, });
            alert(error)
        });
    }

     // user information
    _loadUserInfo(auth){
        return fetch(APP_API_BASE_URL+'user', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: auth,
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            var user = responseJson;
            storeData('user',user);
            this._goToDashboard();
        })
        .catch(error => alert(error));
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
        const {navigation} = this.props;
        navigation.navigate('LoginScreen');
    }
    _goToDashboard(){
        this.setState({
            ...this.state,
            choosed:{
                name: null,
                phone: null,
                email: null,
                password: null,
                password_confirmation: null
            }
        });
        const {navigation} = this.props;
        navigation.navigate('DashboardScreen');
    }
    render() {
        const {loadingDialog,choosed} = this.state;
        return (
            <LayoutContainer loadingDialog={loadingDialog}>
                <ScrollView>
                    <View style={styles.container}>
                        <RegisterForm
                            choosed={choosed}
                            _onChangeInput={this._onChangeInput.bind(this)}
                            _onRegister={this._onRegister.bind(this)}
                            _goToLogin={this._goToLogin.bind(this)}
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
export default Login;

