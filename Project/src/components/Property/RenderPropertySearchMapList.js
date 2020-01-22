import React, {Fragment} from 'react';
import {StyleSheet,View,TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
class RenderPropertySearch extends React.Component {
    render() {
        const {props} = this;
        const {value,onClear,onChangeText} = props;
        return (
            <Fragment style={{ height:'100%' }}>
                <View style={styles.row}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="search"
                        // onChangeText={(text)=>{ onChangeText(text) }}
                        value={value}
                    />
                    {!value&&<Icon style={styles.sectionIcon} name="search" type="FontAwesome" size={15} color="#555" />}
                    {value&&<Icon style={styles.sectionIcon} onPress={()=>onClear()} name="times" type="FontAwesome" size={15} color="#555" />}
                </View>
            </Fragment>
        );
    }
}
const styles = StyleSheet.create({
    row:{ 
        flex: 1, 
        padding: 5,
        position: 'relative',
        height: "10%", 
    },
    input:{
        backgroundColor: '#eee',
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        height:'100%'
    },
    sectionIcon:{  
        position: 'absolute',
        top: 0, right: 0, 
        padding: 15
    }
});
export default RenderPropertySearch;