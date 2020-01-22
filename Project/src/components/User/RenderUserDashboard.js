import React from 'react';
import { StyleSheet, View,ImageBackground,Text,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {rgbColor} from '../../../app.json'

class UserDashboard extends React.Component {
    render() {
        const {user,_goToLogin,_goToChangePassword,_goToUpdateInfo} = this.props;
        const {profile,name} = user;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>_goToUpdateInfo()}>
                    <View style={styles.imageContainer}>
                        <ImageBackground
                            style={styles.sectionBackgrounnd}
                            source={profile?{uri: profile}:require('../../images/Tools/no-photo-available.png') }
                        />
                        <View style={styles.sectionTextContainer}>
                            <Text style={styles.sectionText}>{name&&name.toUpperCase()}</Text>
                        </View>
                        <Icon style={styles.sectionIcon} name="pencil" type="FontAwesome" size={17} color="#eee" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>_goToChangePassword()}>
                    <Text style={styles.linkText}>
                        Change Password
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>_goToLogin()}>
                    <Text style={styles.linkText}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: `#fff`,
        flex: 1, justifyContent: 'center',
    },
    imageContainer:{
        position: 'relative', 
        height: 250,
        marginBottom: 15
    },
    sectionBackgrounnd:{
        width: '100%', 
        height: 250,
        flex: 1,
        resizeMode: 'stretch'
    },
    sectionTextContainer:{
        backgroundColor: rgbColor,
        position: 'absolute', bottom: 0, left: 0, width: '100%', minHeight: 60,
        justifyContent: 'center'
    },
    sectionText:{
        padding: 8,
        color: '#eee',
        fontSize: 18,
        fontWeight: 'bold'
    },
    linkText:{
        color: '#444',
        fontSize: 18,
        paddingHorizontal: 10, paddingVertical: 10,
    },
    sectionIcon:{
        position: 'absolute', right: 15, bottom: 20
    }
});
export default UserDashboard;

