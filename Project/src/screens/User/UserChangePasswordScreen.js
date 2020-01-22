import React from 'react';
import { StyleSheet, View,ScrollView,Alert} from 'react-native';
import Toast from 'react-native-root-toast';
import {StackActions, NavigationActions} from 'react-navigation';
import RenderUserChangePassword from '../../components/User/RenderUserChangePassword';
import {primaryBg,color,APP_API_BASE_URL} from '../../../app.json';
import LayoutContainer from '../../components/Tools/RenderLayoutContainer';
import { storeData,getData } from '../../components/function/flexi/flexiAsync';
import {_splitMessageError} from '../../components/function/flexi/flexiFunction';

class UserDashboard extends React.Component {
    static navigationOptions = () => ({
        headerTitle: `Change Password`,
        headerStyle: {
        backgroundColor: `${primaryBg}`,
        },
        headerTintColor: `${color}`,
    }); 
    constructor(props) {
        super(props);
        this.state = {
            auth: '',
            loadingDialog: false,
            choosed:{
                old_password: '',
                new_password: '',
                confirm_password: '',
            }
        }
    }; 

    async componentDidMount(){
        var auth = await getData('auth');
        this.setState({
          ...this.state, auth
        });
      }

    _onSave(){
        const {navigation} = this.props;
        const {auth,choosed}=this.state;
        this._visibleLoading(true);
        return fetch(APP_API_BASE_URL+'user/change-password', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: auth,
            },
            body: JSON.stringify({
                old_password: choosed.old_password,
                new_password: choosed.new_password,
                confirm_password: choosed.confirm_password,
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
            if(statusCode==200){
                this._toastMessage('Your password has been changed.','green');
                navigation.goBack();
            }else if(statusCode==422){
                var validationMessage = responseJson.errors;
                var displayValidation = '';
                displayValidation += _splitMessageError(validationMessage.old_password);
                displayValidation += _splitMessageError(validationMessage.new_password);
                Alert.alert('Invalid Input!',responseJson.message+'\r\n'+displayValidation);
            }else{
                Alert.alert('Failed changed password!','Please Contact Administrator');
            }
        })
        .catch(error => {
            this.setState({ ...this.state, loadingDialog: false, });
            alert(error);
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

    _goToLogin(){
        storeData('user','');
        storeData('auth','');
        const {navigation} = this.props;
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })],
        });
        navigation.dispatch(resetAction); 
    }

    _toastMessage(message,color){
        Toast.show(message, {
            backgroundColor: color, opacity: 0.8,
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true, animation: true, hideOnPress: true, delay: 1000,
        });
    }
    
    render() {
        const {loadingDialog,choosed} = this.state;
        return (
            <LayoutContainer loadingDialog={loadingDialog}>
                <ScrollView>
                    <View style={styles.container}>
                        <RenderUserChangePassword
                            choosed={choosed}
                            _onChangeInput={this._onChangeInput.bind(this)}
                            _onSave={this._onSave.bind(this)}
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
export default UserDashboard;

