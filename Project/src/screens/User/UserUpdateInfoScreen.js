import React from 'react';
import { StyleSheet, View,ScrollView,Alert} from 'react-native';
import Toast from 'react-native-root-toast';
import RenderUserUpdateInfo from '../../components/User/RenderUserUpdateInfo';
import {primaryBg,color,APP_API_BASE_URL} from '../../../app.json';
import LayoutContainer from '../../components/Tools/RenderLayoutContainer';
import { storeData,getData } from '../../components/function/flexi/flexiAsync';
import {_splitMessageError} from '../../components/function/flexi/flexiFunction';

class UserUpdateInfo extends React.Component {
    static navigationOptions = () => ({
        headerTitle: `Update Information`,
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
                name: null,
                phone: null,
                email: null,
                profile: null
            }
        }
    }; 

    async componentDidMount(){
        var auth = await getData('auth');
        var user = await getData('user');
        this.setState({
            ...this.state, auth,
            choosed:{
                name: user.name,
                phone: user.phone,
                email: user.email,
                profile: user.profile,
            }
        });
    }

    _onSave(){
        const {navigation} = this.props;
        const {auth,choosed}=this.state;
        this._visibleLoading(true);
        return fetch(APP_API_BASE_URL+'user', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: auth,
            },
            body: JSON.stringify({
                name: choosed.name,
                email: choosed.email,
                // phone: choosed.phone,
                gravatar: choosed.profile
            }),
        })
        .then(response => {
            const statusCode = response.status;
            const data = response.json();
            this.setState({ ...this.state, loadingDialog: false, });
            return Promise.all([statusCode, data]);
        })
        .then(([statusCode, responseJson]) => {
            if(statusCode==200){
                this._toastMessage('Your information updated.','green');
                var user = responseJson;
                storeData('user',user);
                navigation.navigate('UserDashboard', {refresh:true});
            }else if(statusCode==422){
                var validationMessage = responseJson.errors;
                var displayValidation = '';
        
                displayValidation += _splitMessageError(validationMessage.name);
                displayValidation += _splitMessageError(validationMessage.email);
                displayValidation += _splitMessageError(validationMessage.phone);
        
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
                        <RenderUserUpdateInfo
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
export default UserUpdateInfo;

