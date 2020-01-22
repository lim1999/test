import React, {Fragment} from 'react';
import {View,StyleSheet,Platform,PermissionsAndroid,TouchableOpacity} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
import CustomButton from '../Controls/Button';
import MapView from 'react-native-maps';
import LoadingDialog from '../Tools/RenderLoadingDialog';
import Icon from 'react-native-vector-icons/Ionicons';
class BoreyAddLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingDialog: false,
            region: {
                latitude: 11.5564,
                longitude: 104.9282,
                latitudeDelta: 0.01,
                longitudeDelta: 0.0121,
            },
            markerCenter: {
                latitude: 11.5564,
                longitude: 104.9282,
            }
        }
    }; 

    componentDidMount(){
        const {navigation} = this.props;
        if(navigation&&navigation.state.params&&navigation.state.params.region){
            const region = navigation.getParam('region');
            if(region){
                this.setState({
                    ...this.state,
                    region:{ ...this.state.region, latitude:region.latitude,longitude:region.longitude },
                    markerCenter:{ latitude:region.latitude,longitude:region.longitude }
                });
            }else{
                this._searchMyLocation()
            }
        }else{
            this._searchMyLocation()
        }
    }
    
    // when on button to get this location clicked this function is ask permission before get location
    _searchMyLocation= async () => {
        await this._visibleLoading(true);
        var that =this;
        if(Platform.OS === 'ios'){
            this._getMyLocation(that);
        }else{ 
            async function requestLocationPermission() {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                        'title': 'Location Access Required',
                        'message': 'This App needs to Access your location'
                        }
                    )
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        that._getMyLocation(that);
                    } else {
                        that.setState({ ...that.state, loadingDialog: false, })
                        alert("Permission Denied");
                    }
                } catch (err) {
                    that.setState({ ...that.state, loadingDialog: false, })
                    alert("err:",err);
                    console.warn(err)
                }
            }
            requestLocationPermission();
        } 
    }

    // after allow permission this function is to get lat lng of location
    async _getMyLocation(that){
        await Geolocation.getCurrentPosition(
            position => {
                const currentLatitude = parseFloat(position.coords.latitude);
                const currentLongitude = parseFloat(position.coords.longitude);
                that.setState({
                    ...that.state,
                    loadingDialog: false,
                    region:{
                        ...that.state.region,
                        latitude: currentLatitude,
                        longitude: currentLongitude
                    },
                    markerCenter:{
                        latitude: currentLatitude,
                        longitude: currentLongitude
                    }
                });
            },
            error => {
                that.setState({ ...that.state, loadingDialog: false, })
                alert(error.message)
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }
 

    onRegionChange = region => {
        this.setState({
            ...this.state, markerCenter:region, region
        })
    }
    onSetLocation = () => {
        const {navigation} = this.props;
        const {markerCenter} = this.state;
        Geocoder.geocodePosition({
            lat: markerCenter.latitude,
            lng: markerCenter.longitude
          }).then(res => {
            pinnedAddress = res;
            navigation.navigate(navigation.state.params.goBack,{location:markerCenter,pinnedAddress:res});
        })
        .catch(err => {
            navigation.navigate(navigation.state.params.goBack,{location:markerCenter,pinnedAddress:null});
            console.log(err)
        })
    }
    _visibleLoading(status){
        this.setState({
            ...this.state,
            loadingDialog: status
        });
    }
    render() {
        const {region,loadingDialog} = this.state;
        return (
            <Fragment>
                <View style={styles.sectionContainer}>
                    <Icon name="md-pin" 
                        type="Ionicons"
                        style={{    
                            zIndex: 3,
                            position: 'absolute',
                            marginTop: -37,
                            marginLeft: -11,
                            left: '50%',
                            top: '50%',
                        }} 
                        size={40}
                        color="brown" 
                    />

                    <MapView
                        style={styles.sectionMap}
                        initialRegion={region}
                        region={region}
                        onRegionChangeComplete={this.onRegionChange}
                    >
                    </MapView>
                    
                    <View style={styles.buttonMyLocation}>
                        <TouchableOpacity onPress={()=>this._searchMyLocation()}>
                            <Icon name="md-locate" type="Ionicons" size={25} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <CustomButton text="set location" onPress={this.onSetLocation}/>
                    </View>
                    <LoadingDialog visible={loadingDialog}/>
                </View>
            </Fragment>
        );
    }
} 
const styles = StyleSheet.create({
    sectionContainer:{
        flex: 1,
        height: '100%',
        position: 'relative',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    buttonContainer:{
        width: '100%',
        padding: 20
    },
    sectionMap:{
        position: 'absolute',
        width: '100%', 
        height: '100%',
    },
    buttonMyLocation:{
        width: 40, height: 40,
        borderWidth: 1, borderColor: '#aaa',
        alignItems: 'center',
        backgroundColor: '#fff', justifyContent: 'center',
        borderRadius: 50,
        position: 'absolute',
        right: 25,
        bottom: 90
    }
});
export default BoreyAddLocation;

