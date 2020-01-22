import React, {Fragment} from 'react';
import {StyleSheet,View,TextInput,Text,Platform,TouchableOpacity} from 'react-native';
import {primaryBg} from '../../../app.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import Picker from 'react-native-picker';
class CustomSelect extends React.Component {
    onOpen(){
        const {props} = this; 
        const {placeholder,value,onChangeText,data} = props;
        Picker.init({
            pickerData: ['',...data],
            pickerTitleText: placeholder,
            selectedValue: [value],
            onPickerConfirm: data => {
                if(value!=data[0]) onChangeText(data[0])
            },
            onPickerCancel: data => {
                // console.log(data);
            },
            onPickerSelect: data => {
                // console.log(data);
            }
        });
        Picker.show();
    }

    render() {
        const {props} = this; 
        const {custom_style,isRequired,value,placeholder} = props;
        return (
            <Fragment>
                <TouchableOpacity onPress={()=>this.onOpen()}>
                    <View style={styles.container}>
                        <Text style={[styles.input,custom_style,{height: 'auto', borderColor: (isRequired&&!value)?'red':primaryBg, color: props&&value?'#000':'#aaa'}]} >{props&&value?value:placeholder}</Text>
                        <Text style={styles.icon}><Icon style={styles.sectionIcon} name="caret-down" type="FontAwesome" size={17} color="#888" /></Text>
                    </View>
                </TouchableOpacity>
            </Fragment>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        position: 'relative'
    },
    input:{
        textAlignVertical: "top", 
        borderWidth: 1, margin: 5,
        paddingVertical: 15, paddingHorizontal: 10, paddingRight: 30,
        paddingBottom: Platform.OS === "ios"?15:5,
        borderRadius: 5, backgroundColor: '#fff'
    },
    icon:{
        position: 'absolute', 
        top: 20, right: 12
    }
});
export default CustomSelect;

