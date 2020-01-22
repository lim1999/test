import React, {Fragment} from 'react';
import {StyleSheet,View,Text,ImageBackground,Platform,Image} from 'react-native';
import {primaryBg} from '../../../app.json';
import Icon from 'react-native-vector-icons/Ionicons';
class RenderPropertyCard extends React.Component {
    render() {
        const {property} = this.props;
        return (
            <Fragment>
                <View style={styles.sectionContainer}>
                    <ImageBackground
                        style={styles.sectionBackgrounnd}
                        source={(property&&property.profile)&&property.profile?{uri: `${Platform.OS !== "ios"?'file://':''}${property.profile}`}:require('../../images/Tools/no-photo-available.png') }
                    />
                    <View style={styles.sectionArticle}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={[styles.sectionDescription,{fontWeight: 'bold'}]}>{property.name}</Text>
                            <Text style={[styles.sectionDescription,{ color: '#000' }]} numberOfLines={1}>
                                {property.house_no?'#'+property.house_no+', ':''}
                                {property.street_no?'St.'+property.street_no+', ':''}
                                {property.city?property.city:(property.district?property.district:(property.commune?property.commune:property.village))}
                            </Text>
                            {/* <Text style={styles.sectionDescription}>  */}
                                {/* <ImageBackground style={styles.imageIcon} source={require('../../images/Property/icon/search.png')}/> */}
                                {/* Case Number: <Text style={{ fontWeight: 'bold' }}>00103795</Text>  */}
                            {/* </Text> */}
                            <Text style={styles.sectionDescription}> 
                                {/* <Image style={styles.imageIcon} source={require('../../images/Property/icon/area.png')}/>  */}
                                Case Number: <Text style={{ fontWeight: 'bold' }}>{property.ref} sqm</Text> 
                            </Text>
                            <Text style={styles.sectionDescription}> 
                                {/* <Image style={styles.imageIcon} source={require('../../images/Property/icon/area.png')}/>  */}
                                Total Area: <Text style={{ fontWeight: 'bold' }}>{property.land_total_area} sqm</Text> 
                            </Text>
                            {/* <Text style={styles.sectionDescription}>  */}
                                {/* <Image style={styles.imageIcon} source={require('../../images/Property/icon/clock.png')}/>  */}
                                {/* <Text style={{ color: '#D19D9A' }}> 6 mins ago</Text>  */}
                            {/* </Text> */}
                        </View>
                    </View>
                    <View style={styles.sectionIcon}>
                        <Text style={styles.textIcon}>
                            <Icon style={styles.sectionIcon} name="ios-arrow-forward" type="Ionicons" size={15} color={primaryBg} />
                        </Text>
                    </View>
                    <View style={styles.sectionType}>
                        {/* <Text style={{ fontWeight: 'bold' }}>Rent</Text> */}
                    </View>
                </View>
                {/* <Text style={{ color: '#D19D9A' }}> {JSON.stringify(property)}</Text> */}
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
        height: 120,
        borderWidth:1, borderColor: '#ccc',
        position: 'relative'
    },
    sectionBackgrounnd:{
        width: 100, 
        height: 120,
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
        justifyContent: 'center',
        flex: 1
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
    imageIcon:{
        width: 20, height: 20
    },
    sectionType:{
        position: 'absolute',
        top: 5, right: 10
    }
});
export default RenderPropertyCard;

