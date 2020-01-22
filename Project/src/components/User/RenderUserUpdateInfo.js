import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomInput from '../Login/Contols/Input';
import CustomButton from '../Login/Contols/Button';
import CustomImage from '../Login/Contols/Image';

class UserUpdateInfo
 extends React.Component {
    render() {
        const {choosed,_onChangeInput,_onSave} = this.props;
        return (
            <View style={styles.container}>
                <CustomImage _uri={choosed.profile} _onChangeInput={_onChangeInput}/>
                <CustomInput placeholder="Name"
                    value={choosed.name}
                    onChangeText={(text)=>_onChangeInput('name',text) }
                />
                {/* <CustomInput placeholder="Phone"
                    value={choosed.phone}
                    onChangeText={(text)=>_onChangeInput('phone',text) }
                /> */}
                <CustomInput placeholder="Email Address"
                    value={choosed.email}
                    onChangeText={(text)=>_onChangeInput('email',text) }
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
export default UserUpdateInfo
;

