import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomInput from '../Login/Contols/Input';
import CustomButton from '../Login/Contols/Button';

class UserDashboard extends React.Component {
    render() {
        const {choosed,_onChangeInput,_onSave} = this.props;
        return (
            <View style={styles.container}>
                <CustomInput placeholder="Old password"
                    value={choosed.old_password} secureTextEntry={true} 
                    onChangeText={(text)=>_onChangeInput('old_password',text) }
                />
                <CustomInput placeholder="New password"
                    value={choosed.new_password} secureTextEntry={true} 
                    onChangeText={(text)=>_onChangeInput('new_password',text) }
                />
                <CustomInput placeholder="Confirm new password"
                    value={choosed.confirm_password} secureTextEntry={true} 
                    onChangeText={(text)=>_onChangeInput('confirm_password',text) }
                />
                <CustomButton onPress={()=>_onSave()}>Save</CustomButton>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1, margin: 15
    }
});
export default UserDashboard;

