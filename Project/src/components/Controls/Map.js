import React, {Fragment} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import MapView from 'react-native-maps';
class CustomMap extends React.Component {
    render() {
        const {latlng} = this.props;
        const initialRegion = {
            latitude: latlng.latitude?latlng.latitude:11.5564,
            longitude: latlng.longitude?latlng.longitude:104.9282,
            latitudeDelta: 0.01,
            longitudeDelta: 0.0121,
        };
        return (
            <Fragment>
                <View style={styles.container}>
                     {latlng&&(<MapView
                        style={styles.sectionMap}
                        initialRegion={initialRegion}
                        region={initialRegion}
                    >
                        <MapView.Marker
                            coordinate={{latitude:initialRegion.latitude,longitude:initialRegion.longitude}}
                        />
                    </MapView>)}
                </View>
            </Fragment>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        margin: 5
    },
    sectionMap:{
        width: '100%', height: 220
    }
});
export default CustomMap;

