import React, {Fragment} from 'react';
import {StyleSheet,View,TouchableOpacity,Text,ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {primaryBg} from '../../../app.json';
class CustomImageBox extends React.Component {
    render() {
        const {_onDelete,img} = this.props;
        return (
            <Fragment>
                <View style={styles.container}>
                    <View
                        style={styles.image}
                        underlayColor='#fff'
                        {...this.props}
                    >
                        <ImageBackground
                            style={styles.sectionBackgrounnd}
                            source={{uri: `${this.props.isBase64?'data:image/jpeg;base64,':''}${img}`}}
                        />
                        <TouchableOpacity style={styles.button} onPress={()=>_onDelete()}>
                            <Text style={styles.buttonText}>
                                <Icon name="trash" size={16} color={primaryBg} />
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Fragment>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        margin: 5,
        position: 'relative',
    },
    image:{
        width: 90,
        height: 90,
        paddingTop:14,
        paddingBottom:14,
        backgroundColor:primaryBg,
        borderRadius:5,
        overflow: 'hidden'
    },
    sectionBackgrounnd:{
        position: 'absolute',
        width: 90, 
        height: 90,
        flex: 1,
        resizeMode: 'stretch'
    },
    button:{
        position: 'absolute',
        padding: 5, fontWeight: 'bold',
        textAlign: 'center', justifyContent: 'center',
        width: 25, height: 30,
        right: 0, top: 0,
        backgroundColor: '#ccc',
    },
    buttonText:{
        color: primaryBg,
        textAlign:'center'
    }
});
export default CustomImageBox;

