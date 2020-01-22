import React, {Fragment} from 'react';
import {StyleSheet,View,TextInput,Text,Platform} from 'react-native';
import {primaryBg} from '../../../app.json';
import Icon from 'react-native-vector-icons/FontAwesome';
class CustomInput extends React.Component {
    render() {
        const {props} = this; 
        const {custom_style,isMultiple,isRequired,value,icon} = props;
        return (
            <Fragment>
                <View style={styles.container}>
                    <TextInput 
                        style={[styles.input,custom_style,{height: isMultiple?100:'auto', borderColor: (isRequired&&!value)?'red':primaryBg}]} 
                        multiline={isMultiple}
                        {...props}
                    >
                    </TextInput>
                    {!isMultiple&&<Text style={styles.icon}><Icon style={styles.sectionIcon} name={icon?icon:"pencil"} type="FontAwesome" size={17} color="#888" /></Text>}
                </View>
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
export default CustomInput;

