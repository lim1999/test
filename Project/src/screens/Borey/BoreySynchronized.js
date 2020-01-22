import React, {Fragment} from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Toast from 'react-native-root-toast';
import { NavigationEvents } from "react-navigation";
import RenderBoreyDetail from '../../components/Borey/RenderBoreyDetail';
import {primaryBg,color,productName} from '../../../app.json';
import LoadingDialog from '../../components/Tools/RenderLoadingDialog';
import RNFS from 'react-native-fs';
import { getData,storeData  } from '../../components/function/flexi/flexiAsync';

class BoreySync extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: `${navigation.getParam('title','N/A').toUpperCase()}`,
        headerStyle: { backgroundColor: `${primaryBg}`, }, 
        headerTintColor: `${color}`,
    });
    constructor(props) {
        super(props);
        this.state = {
        isSync: false,
        loadingDialog: false,
        properties: [],
        borey: props.navigation.getParam('borey')
        }
    }; 

    async componentDidMount(){
        this._loadData();
    }

    async _refresh(){
        var storageProperties = await getData('properties');
        var {properties} = this.state;
        var {navigation} = this.props;
        if(navigation&&navigation.state.params&&navigation.state.params.refresh || (properties!=null && storageProperties && properties.length!=storageProperties.length)){
            navigation.setParams({ refresh: false });
            this._loadData();
        }
    }

    _visibleLoading(status){
        this.setState({
            ...this.state,
            loadingDialog: status
        });
    }

    async _loadData(){
        await this._visibleLoading(true);
        const {borey} = this.state;
        const storageProperties = (await getData('properties'));
        this._visibleLoading(true);
        setTimeout(()=>{
        this.setState({
            ...this.state,
            loadingDialog: false,
            properties: storageProperties?storageProperties.filter(p=>p.parent_id==borey.id&&p.sync==2):[]
        });
        },1000);
    }

    // when swip left to delete property
    async _onDelete(id){
        let storageProperties = (await getData('properties'));
        storeData('properties',storageProperties.filter(p=>p.id!=id));
        images = storageProperties.filter(p=>p.id==id)[0].selected_images;
        images&&images.map(image=>{
        var promise = new Promise(function(resolve, reject) {
            RNFS.exists(image).then(()=>{
            RNFS.unlink(image).then(() => { resolve(true); })
            }).catch(error => { reject(error) });
        })
        promise.then(bool => console.log(bool+'Bool is true'))
        });
        this._loadData();
        this._toastMessage(productName+' has been deleted.','green');
    } 

    _toastMessage(message,color){
        Toast.show(message, {
            backgroundColor: color, opacity: 0.8,
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true, animation: true, hideOnPress: true, delay: 1000,
        });
    }

    render() {
        console.disableYellowBox = true;
        const { navigation } = this.props;
        const {properties,borey,loadingDialog} = this.state;
        let filterProperty = properties.filter(p=>p.sync==2);
        return (
            <Fragment>
                <SafeAreaView/>
                <View style={styles.container}>
                    <RenderBoreyDetail 
                        loadingDialog={loadingDialog}
                        borey={borey} 
                        onRefresh={this._loadData.bind(this)}
                        _onDelete={this._onDelete.bind(this)}
                        properties={filterProperty} 
                        navigation={navigation}
                        isActionButton={false} 
                        routeBack={`BoreySynchronized`}
                    />
                </View>
                <NavigationEvents onWillFocus={() =>  this._refresh() } />
                <LoadingDialog visible={loadingDialog}/>
                <SafeAreaView/>
            </Fragment>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: `#fff`
    },
});
export default BoreySync;

