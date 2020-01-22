import React from 'react';
import { StyleSheet, View, Text,Image,TouchableOpacity } from 'react-native';
import {secondaryBg,color} from '../../../app.json';
class MenuBoard extends React.Component {
    render() {
        const props = this.props;
        const {navigation,_route,_borderTop,_borderLeft,_borderRight} = props;
        return (
            <View style={[styles.box,{ borderTopWidth:_borderTop?1:0 , borderLeftWidth: _borderLeft?1:0, borderRightWidth: _borderRight?1:0 }]}>
                <TouchableOpacity onPress={ ()=>navigation.navigate(_route) }>
                    {props._source&&<Image 
                        source={props._source&&props._source} 
                        style={styles.image} 
                    />}
                    <Text style={styles.text}>{props.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    box: {
        width: '33.3333333%', height: 120,
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 0, borderColor: `#aaa`,
        backgroundColor: `${secondaryBg}`,
    },
    text: {
        color: `${color}`,
        textTransform: 'uppercase',
        fontSize: 13,
        textAlign: 'center'
    },
    image:{
        alignSelf: 'center',
        width: 50, height: 50, 
        marginBottom: 10
    }
});

export default MenuBoard;
