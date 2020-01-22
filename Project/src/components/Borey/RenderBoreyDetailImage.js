import React, {Fragment} from 'react';
import {StyleSheet,View,ImageBackground,Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
class BoreyDetailImage extends React.Component {
    render() {
        const {profiles,address} = this.props.borey;
        return (
            <Fragment>
                <View style={styles.container}>
                    <ImageBackground
                        style={styles.sectionBackgrounnd}
                        source={profiles?{uri: profiles}:require('../../images/Tools/no-photo-available.png') }
                    />
                    <View style={styles.sectionTextContainer}>
                        <Text style={styles.sectionText}>{address}</Text>
                    </View>
                    <Icon style={styles.sectionIcon} name="md-pin" type="FontAwesome" size={22} color="#fff" />
                </View>
            </Fragment>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        position: 'relative', 
        height: 250
    },
    sectionBackgrounnd:{
        width: '100%', 
        height: 250,
        flex: 1,
        resizeMode: 'stretch'
    },
    sectionTextContainer:{
        backgroundColor: `rgba(140,29,26,0.6)`,
        position: 'absolute', bottom: 0, left: 0, width: '100%', minHeight: 60,
        justifyContent: 'center'
    },
    sectionText:{
        padding: 8,
        color: '#eee',
        fontSize: 17,
        paddingLeft: 40
    },
    sectionIcon:{
        position: 'absolute', bottom: 18, left: 15,
    }
});
export default BoreyDetailImage;

