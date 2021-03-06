import React, {Fragment} from 'react';
import {View,TouchableWithoutFeedback,Text,StyleSheet,Alert} from 'react-native';
import RenderPropertyCard from './RenderPropertyDataCard';
import Swipeout from 'react-native-swipeout';
import {productName} from '../../../app.json';

class RenderPropertyDataList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }; 
 
    // Buttons
    swipeoutBtns = (id) => [
        {
            autoClose: true,
            component:(
                <TouchableWithoutFeedback onPress={()=>{ 
                        Alert.alert(
                            'Delete',
                            'Are you sure to delete this property?',
                            [
                                { text: 'No', onPress: () => { }, style: 'cancel'
                                },
                                { text: 'Yes', onPress: () => { this.props._onDelete(id) } },
                            ],
                            { cancelable: true }
                        );
                        
                    }}>
                    <View style={{ backgroundColor: '#fff', padding: 5, paddingLeft: 0 }}>
                        <View style={styles.buttonDelete}>
                            <Text style={styles.buttonDeleteText}>Delete</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    ]
     
    render() {
        const {properties,navigation,loadingDialog} = this.props;
        const propertyList = properties&&properties.length?properties.map((property)=>{
            return (
                <Swipeout style={{ backgroundColor: '#fff' }} right={this.swipeoutBtns(property.id)} key={property.id}>
                    <TouchableWithoutFeedback onPress={()=>{ navigation.navigate('PropertyDetailScreen',{property}) }}>
                            <View>
                                <RenderPropertyCard property={property}/>
                            </View>
                    </TouchableWithoutFeedback>
                </Swipeout>
            )
        }):(
            loadingDialog?<></>:<Text style={{ textAlign: 'center', paddingVertical: 100, color: '#444' }}>No {productName}.</Text>
        );
        return (
            <Fragment>
                <View style={{ margin: 5 }}>
                    {propertyList}
                    <View style={{ height: 90 }}></View>
                </View>
            </Fragment>
        );
    }
} 
const styles = StyleSheet.create({
    buttonDelete:{
        backgroundColor: '#fff',
        width: '100%', height: '100%',
        alignItems: 'center', justifyContent: 'center', 
        backgroundColor: '#ED5650'
    },
    buttonDeleteText:{
        color: '#fff', fontWeight: 'bold'
    }
});
export default RenderPropertyDataList;

