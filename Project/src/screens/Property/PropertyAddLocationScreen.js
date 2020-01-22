import React, {Fragment} from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import {primaryBg,color} from '../../../app.json';
import RenderPropertyAddLocation from '../../components/Property/RenderPropertyAddLocation.js';

class PropertyAddLocationScreen extends React.Component{
    static navigationOptions = ({ navigation }) => ({
        headerTitle: `Set Location`,
        headerStyle: {
          backgroundColor: `${primaryBg}`,
        },
        headerTintColor: `${color}`,
    });

    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        console.disableYellowBox=true;
        const {navigation}=this.props;
        const region = navigation.getParam('region');
        return(
            <Fragment>
                <SafeAreaView forceInset={{ top: 'always' }} style={{ flex: 1}}>
                    <View style={styles.container}>
                        <RenderPropertyAddLocation region={region} navigation={navigation}/>
                    </View>
                </SafeAreaView>
            </Fragment>
        );
    }
}
const styles= StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: `#fff`,
    },
});

export default  PropertyAddLocationScreen;