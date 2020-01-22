import React, {Fragment} from 'react';
import {StyleSheet,View,Text,ImageBackground,Platform} from 'react-native';
import {primaryBg} from '../../../app.json';
import Icon from 'react-native-vector-icons/Ionicons';
class RenderPropertyCard extends React.Component {
    render() {
        const {property,borey} = this.props;
        return (
            <Fragment>
                <View style={[styles.sectionContainer,!(property.rental_price || property.sale_price || property.list_price || property.sold_price || property.financing_price)&&{ borderColor: 'red' }]}>
                    <ImageBackground
                        style={styles.sectionBackgrounnd}
                        source={(property&&property.selected_images)&&property.selected_images[0]?{uri: `${Platform.OS !== "ios"?'file://':''}${property.selected_images[0]}`}:require('../../images/Tools/no-photo-available.png') }
                    />
                    <View style={styles.sectionArticle}>
                        <View>
                            <Text style={styles.sectionDescription}><Icon style={styles.sectionIcon} name="md-pin" type="FontAwesome" size={13} color="#333" /> {property.house_no&&'#'+property.house_no+', '} {property.street_no&&'St. '+property.street_no+', '} {borey.city&&borey.city}</Text>
                            {property.mobile_phone?<Text style={styles.sectionDescription}><Icon style={styles.sectionIcon} name="md-call" type="FontAwesome" size={13} color="#333" /> {property.mobile_phone&&property.mobile_phone}</Text>:<></>}
                            {property.secondary_phone?<Text style={styles.sectionDescription}><Icon style={styles.sectionIcon} name="md-call" type="FontAwesome" size={13} color="#333" /> {property.secondary_phone}</Text>:<></>}
                        </View>
                    </View>
                    <View style={styles.sectionIcon}>
                        <Text style={styles.textIcon}>
                            <Icon style={styles.sectionIcon} name="ios-arrow-forward" type="Ionicons" size={15} color={primaryBg} />
                        </Text>
                    </View>
                    <View style={styles.syncStatus}>
                        <Text style={styles.textIcon}>
                            {property.sync==1&&<Icon style={styles.sectionIcon} name="md-sync" type="FontAwesome" size={15} color="darkblue" />}
                            {property.sync==2&&<Icon style={styles.sectionIcon} name="md-checkmark" type="FontAwesome" size={15} color="green" />}
                            {property.sync==3&&<Icon style={styles.sectionIcon} name="md-close" type="FontAwesome" size={15} color="red" />}
                        </Text>
                    </View>
                </View>
            </Fragment>
        );
    }
}
const styles = StyleSheet.create({
    sectionContainer:{
        backgroundColor: '#fff',
        shadowColor: Platform.OS === 'ios' ?"#000":"#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: Platform.OS === 'ios'?1:3.84,
        elevation: 3,
        borderRadius: 5,
        overflow: 'hidden',
        margin: 5,

        flex: 1, flexDirection: 'row',
        height: 80,
        borderWidth:1, borderColor: '#ccc',
        position: 'relative'
    },
    sectionBackgrounnd:{
        width: 80, 
        height: 80,
        resizeMode: 'stretch',
        backgroundColor: '#aaa',
        shadowColor: Platform.OS === 'ios' ?"#000":"#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: Platform.OS === 'ios'?1:3.84,
        elevation: 3,
    },
    sectionArticle:{
        marginTop: 0,
        padding: 10,
        justifyContent: 'center'
    },
    sectionDescription:{
        color: '#222', 
        fontSize: 14,
        marginBottom: 3,
    },
    sectionIcon:{
        position: 'absolute',
        right: 10, top: '40%',
        backgroundColor: '#fff'
    },
    textIcon:{
        color: primaryBg, 
        fontWeight: 'bold'
    },
    syncStatus:{
        position: 'absolute',
        right: 10, bottom: 5,
        backgroundColor: '#f5f5f5'
    }
});
export default RenderPropertyCard;

