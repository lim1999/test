import React from 'react';
import { StyleSheet, View,ScrollView,Alert } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import LoginForm from '../../components/Login/RenderLoginForm';
import {primaryBg,color,APP_API_BASE_URL} from '../../../app.json';
import LayoutContainer from '../../components/Tools/RenderLayoutContainer';
import {storeData,getData} from '../../components/function/flexi/flexiAsync';
import {_splitMessageError} from '../../components/function/flexi/flexiFunction';

class Login extends React.Component {
    static navigationOptions = () => ({
        headerTitle: `User Login`,
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
                email: null,
                password: null,
            }
        }
    }; 

    async componentDidMount(){
        let user = await getData('user');
        let auth = await getData('auth');
        if(user && auth){
          this._loadUserInfo(auth);
        }
    }

    // when user login 
    async _onLogin () {
        const {choosed} = this.state;
        this._visibleLoading(true);
        await fetch(APP_API_BASE_URL+'login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: choosed.email,
                password: choosed.password,
            }),
        })
        .then(response => {
            const statusCode = response.status;
            const data = response.json();
            this.setState({ ...this.state, loadingDialog: false });
            return Promise.all([statusCode, data]);
        })
        .then(([statusCode, responseJson]) => {
            if(statusCode==200 && responseJson.token_type=='Bearer' && responseJson.access_token != ''){
                var auth = responseJson.token_type+' '+responseJson.access_token;
                storeData('auth',auth);
                this._loadUserInfo(auth);
            }else{
                Alert.alert('Login Failed', 'The given data was invalid');
            }
        })
        .catch(error => {
            this.setState({ ...this.state, loadingDialog: false,})
            alert(error);
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
        .then(response => {
            const statusCode = response.status;
            const data = response.json();
            return Promise.all([statusCode, data]);
        })
        .then(([statusCode,responseJson]) => {
            if(statusCode===200){
                var user = responseJson;
                storeData('user',user);
                this._goToDashboard();
            }else{
                storeData('user','');
                storeData('auth','');
            }
        })
        .catch(error => alert(error));
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
    _goToRegister(){
        const {navigation} = this.props;
        navigation.navigate('RegisterScreen');
    }
    _forgotPassword(){
        const {navigation} = this.props;
        navigation.navigate('ForgotPasswordScreen');
    }
    _goToDashboard(){
        this.setState({
            ...this.state,
            choosed:{
                email: null,
                password: null,
            }
        });
        const {navigation} = this.props;
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'DashboardScreen' })],
        });
        navigation.dispatch(resetAction); 
    }
    render() {
        const {loadingDialog,choosed} = this.state;
        return (
            <LayoutContainer loadingDialog={loadingDialog}>
                <ScrollView>
                    <View style={styles.container}>
                        <LoginForm 
                            choosed={choosed}
                            _onChangeInput={this._onChangeInput.bind(this)}
                            _onLogin={this._onLogin.bind(this)}
                            _goToRegister={this._goToRegister.bind(this)}
                            _forgotPassword={this._forgotPassword.bind(this)}
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

