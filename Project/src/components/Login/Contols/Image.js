import React from 'react';
import { StyleSheet,Image, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {primaryBg} from '../../../../app.json';

class CustomImage extends React.Component {
    async chooseImage(){
        const {_onChangeInput} = this.props;
        await ImagePicker.openPicker({
            maxFiles: 1,
            mediaType: 'photo',
            includeBase64: true,
            cropping: true,
            compressImageQuality: 1
        }).then(image => {
            image = `data:${image.mime};base64,${image.data}`;
            _onChangeInput('profile',image)
        });
    }
    render() {
        const {_uri} = this.props;
        return (
            <TouchableOpacity onPress={()=>this.chooseImage()}>
                <Image source={_uri?{uri: _uri}:require('../../../images/Tools/no-photo-available.png')} style={styles.input}/>
            </TouchableOpacity>
        ); 
    }
} 
const styles = StyleSheet.create({
    input:{
        width: '100%', height: 200,
        backgroundColor: '#fff', padding: 20, borderRadius: 5,
        marginBottom: 10, borderColor: primaryBg, borderWidth: 1
    },
});
export default CustomImage;

