import React, {Fragment} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import CustomLabel from '../Controls/Label';
import {primaryBg} from '../../../app.json';

class RenderPropertyDetail extends React.Component {
    render() {
        const {property} = this.props;
        return (
            <Fragment>
                <View style={styles.container}>
                    <CustomLabel text="Address"/>
                    <Text style={ styles.simpleText }>
                        {property.house_no?'#'+property.house_no+', ':''}
                        {property.street_no?'St.'+property.street_no+', ':''}
                        {property.village?property.village+', ':''}
                        {property.commune?property.commune+', ':''}
                        {property.district?property.district+', ':''}
                        {property.city?property.city+', ':''}
                    </Text>
                </View>
                <View style={styles.container}>
                    <CustomLabel text="Price"/>
                    <Text style={ styles.simpleText }>
                        {property.house_no?'#'+property.house_no+', ':''}
                        {property.street_no?'St.'+property.street_no+', ':''}
                        {property.village?property.village+', ':''}
                        {property.commune?property.commune+', ':''}
                        {property.district?property.district+', ':''}
                        {property.city?property.city+', ':''}
                    </Text>
                </View>
            </Fragment>
        );
    }
} 
const styles = StyleSheet.create({
    container:{
        margin: 10,
        padding: 10,
        shadowColor: Platform.OS === 'ios' ?"#aaa":"#aaa",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: Platform.OS === 'ios'?1:1.84,
        elevation: 1, 
        backgroundColor: '#fafafa',
        borderRadius: 5,
    },
    simpleText:{
        paddingHorizontal: 5
    }
});
export default RenderPropertyDetail;

