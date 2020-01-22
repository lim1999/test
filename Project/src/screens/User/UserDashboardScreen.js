import React from 'react';
import { StyleSheet, View,ScrollView } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import RenderUserDashboard from '../../components/User/RenderUserDashboard';
import {primaryBg,color} from '../../../app.json';
import LayoutContainer from '../../components/Tools/RenderLayoutContainer';
import AsyncStorage from '@react-native-community/async-storage';
import { storeData  } from '../../components/function/flexi/flexiAsync';
import {_splitMessageError} from '../../components/function/flexi/flexiFunction';

class UserDashboard extends React.Component {
    static navigationOptions = () => ({
        headerTitle: `User Account`,
        headerStyle: {
        backgroundColor: `${primaryBg}`,
        },
        headerTintColor: `${color}`,
    });  
    constructor(props) {
        super(props);
        this.state = {
            loadingDialog: false,
            user: '',
            auth: '',
        }
    }; 

    componentDidMount(){
        this._loadData();
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

    async _loadData(){
        // this._visibleLoading(true);
        var user = await AsyncStorage.getItem('user');
        var auth = await AsyncStorage.getItem('auth');
        if(user && auth){
            this.setState({
                ...this.state, user: JSON.parse(user), auth,
                loadingDialog: false
            })
        }else{
            this.setState({ ...this.state, loadingDialog: false })
        }
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
    _goToChangePassword(){
        const {navigation} = this.props;
        navigation.navigate('UserChangePassword');
    }
    _goToUpdateInfo(){
        const {navigation} = this.props;
        navigation.navigate('UserUpdateInfo');
    }

    _refresh(){
        var {navigation} = this.props;
        if(navigation&&navigation.state.params&&navigation.state.params.refresh){
            navigation.setParams({ refresh: false });
            this._loadData();
        }
    }
    
    render() {
        const {loadingDialog,user} = this.state;
        return (
            <LayoutContainer loadingDialog={loadingDialog} _refresh={this._refresh.bind(this)}>
                <ScrollView>
                    <View style={styles.container}>
                        <RenderUserDashboard
                            user={user}
                            _goToLogin={this._goToLogin.bind(this)}
                            _goToChangePassword={this._goToChangePassword.bind(this)}
                            _goToUpdateInfo={this._goToUpdateInfo.bind(this)}
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

