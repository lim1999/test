import React, {Fragment} from 'react';
import {View,StyleSheet} from 'react-native';
import MapView,{ Marker } from 'react-native-maps';

class RenderPropertyMapList extends React.Component { 
    constructor(props){
        super(props);
        this.state={
            markers: [{
                title: 'Wat Langka',
                coordinates: {
                  latitude: 11.555521,
                  longitude: 104.927327
                },
              },
              {
                title: 'NIE',
                coordinates: {
                  latitude: 11.557239,
                  longitude: 104.927661
                },  
            },
                {
                    title: 'Plov',
                    coordinates: {
                      latitude: 11.556780,
                      longitude: 104.927661
                    },  
                },
            ]
        }
    }
    render() {
        const {region,properties} = this.props;
        // const MarkerList = properties&&properties.map(p=>{
        //     return <Marker coordinate={{latitude: p.location.latitude,
        //         longitude: p.location.longitude}} ></Marker>
        // });
        const currentRegion = properties&&properties.length?{ 
            latitude: properties[0].location.latitude,
            longitude: properties[0].location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.0121, 
        }:region;
        return (
            <Fragment>
                <View style={{ margin: 5, width: '100%', height: '100%' }}>
                    <MapView
                        style={styles.sectionMap}
                        initialRegion={currentRegion}
                        region={currentRegion}
                        showsUserLocation
                        // onRegionChangeComplete={this.onRegionChange}
                    >
                        {this.state.markers.map(marker => (
                            <MapView.Marker 
                            coordinate={marker.coordinates}
                            title={marker.title}
                            />
                        ))}
                    </MapView>
                </View>
            </Fragment>
        );
    }
} 
const styles = StyleSheet.create({
    sectionMap:{
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        width: '100%', 
        height: '100%',
    },
});
export default RenderPropertyMapList;

