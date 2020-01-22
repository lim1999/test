import React, {Fragment} from 'react';
import { SafeAreaView, StyleSheet, View,Alert,TouchableOpacity,Platform } from 'react-native';
import Toast from 'react-native-root-toast';
import { NavigationEvents } from "react-navigation";
import RenderBoreyDetail from '../../components/Borey/RenderBoreyDetail';
import {primaryBg,color,APP_API_BASE_URL,productName} from '../../../app.json';
import LoadingDialog from '../../components/Tools/RenderLoadingDialog';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getData,storeData  } from '../../components/function/flexi/flexiAsync';

class BoreyDetail extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: `${navigation.getParam('title','N/A').toUpperCase()}`,
    headerStyle: { backgroundColor: `${primaryBg}`, }, 
    headerTintColor: `${color}`,
    headerRight: (
      <TouchableOpacity onPress={()=>{ navigation.getParam('_this')._goGoSyncScreen(); }} style={{ paddingRight: Platform.OS === 'ios'?10:20, paddingLeft: 20 }}>
        <Icon name="database" type="FontAwesome" size={18} color="#fff" />
      </TouchableOpacity>
    ),
  }); 
  constructor(props) {
    super(props);
    this.state = {
      autoRefresh: false,
      isSync: false,
      loadingDialog: false,
      properties: [],
      borey: props.navigation.getParam('borey')
    }
  }; 

  _goGoSyncScreen(){
    this.setState({ ...this.state, autoRefresh: true });
    const { navigation } = this.props
    navigation.navigate('BoreySynchronized',{
      title: navigation.getParam('title')+' (Synchronized)',
      borey: navigation.getParam('borey'),
    })
  }
 
  async componentDidMount(){
    const { navigation } = this.props
    navigation.setParams({ _this: this })
    let user = await getData('user');
    let auth = await getData('auth');
    if(user && auth){
      this.setState({
        ...this.state, user: user, auth
      })
    }
    this._loadData();
  }

  async _refresh(){
    var storageProperties = await getData('properties');
    var {properties,autoRefresh} = this.state;
    var {navigation} = this.props;
    if(navigation&&navigation.state.params&&navigation.state.params.refresh || (properties!=null && storageProperties && properties.length!=storageProperties.length) || autoRefresh){
      navigation.setParams({ refresh: false });
      this._loadData();
    }
  }

  // when synce data to server
  async _onSync(){
    Alert.alert(
      'Synchronize',
      'Are you sure to Synchronize data now?',
      [
        { text: 'OK', onPress: () => {
          this.setState({
            ...this.state, isSync: true, properties: this.state.properties.map(p=>{ p['sync']=p.sync!=2?1:p.sync; return p; })
          });
          var {properties,borey,auth} = this.state;
          var filteredProperties = (properties&&properties.length)?properties.filter(p=>p.sync!=2).filter(p=>{
            return p.rental_price || p.sale_price || p.list_price || p.sold_price || p.financing_price
          }):[];
          var syncLength = filteredProperties.length;
          var syncError=false;
          var successID = [];
          filteredProperties.map((p)=>{
            this.setState({ ...this.state, loadingDialog: true });
            promissParent = new Promise(resolveParent => {
              var base64Images = [];
              promiss = new Promise(resolve => {
                this._visibleLoading(true);

                p.selected_images&&p.selected_images.length?p.selected_images.map((img,i)=>{
                  promissImage = new Promise(resolvePromissImage => {
                    RNFS.readFile(img, 'base64')
                    .then((result) => {
                      resolvePromissImage(img)
                      base64Images.push(`data:image/jpeg;base64,${result}`);
                    })
                    .catch((err) => {
                      resolvePromissImage(result)
                      console.log(err.message, err.code);
                    });
                  })
                  promissImage.then(()=>{
                    if((i+1)==p.selected_images.length){
                      resolve(true);
                    }
                  })
                }):(
                  resolve(true)
                );
              })
              promiss.then(()=>{ 
                let body = {
                  sub_borey_id: borey.id,
                  house_no: p.house_no,
                  street_no: p.street_no,
                  latlng: p.latlng?`${p.latlng.latitude},${p.latlng.longitude}`:'',
    
                  owner_name: p.owner_name,
                  owner_primary_phone: p.mobile_phone,
                  owner_secondary_phone: p.secondary_phone,
                  owner_email: p.email_address,
                  
                  rent_price: p.rental_price,
                  sale_price: p.sale_price,
                  list_price: p.list_price,
                  sold_price: p.sold_price,
                  financing_price: p.financing_price,

                  interal_note: p.note
                };
                if(base64Images&&base64Images.length){ body['profile']=base64Images[0]; }
                if(base64Images&&base64Images.length>=2){ body['galleries']=base64Images.slice(1); }
                
                fetch(APP_API_BASE_URL+'houses', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': ' multipart/form-data; application/json;',
                    Authorization: auth.trim('"'),
                  },
                  body: JSON.stringify(body),
                })
                .then(response => {
                  const statusCode = response.status;
                  const data = response.json();
                  this.setState({ ...this.state, loadingDialog: true });
                  return Promise.all([statusCode, data]);
                })
                .then(([statusCode, responseJson]) => {
                  this.setState({ ...this.state, loadingDialog: true });
                  if(statusCode==201 || statusCode==200){
                    // update state 
                    this.setState({
                      ...this.state,
                      properties: this.state.properties.map(property=>{
                        if(property.id==p.id){ property['sync']=2; }
                        return property;
                      })
                    });
                    successID.push(p.id);
                    resolveParent(responseJson);
                  }else{
                    syncError = true;
                    resolveParent('error');
                    this.setState({
                      ...this.state, loadingDialog: false,
                      properties: this.state.properties.map(property=>{
                        if(property.id==p.id){ property['sync']=3; }
                        return property;
                      })
                    });
                    this._toastMessage('Synchronize Failed, someting went wrong!', 'red');
                    setTimeout(()=>{
                      alert(statusCode+JSON.stringify(responseJson));
                    },500)
                  }
                })
                .catch(error => {
                  syncError = true;
                  resolveParent('catch error');
                });
              })
            });
            promissParent.then(()=>{
              if(--syncLength==0){
                // update storage
                getData('properties').then(storageProperties=>{
                  storageProperties = storageProperties.map(property=>{
                    if(successID.indexOf(property.id)!=-1){ property['sync']=2; }
                    return property;
                  })
                  storeData('properties',storageProperties).then(()=>{
                    setTimeout(()=>{
                      !syncError&&this._toastMessage('data synchronized to server','green');
                    },500);
                    this.setState({ ...this.state, loadingDialog: false, isSync: false })
                  });   
                });
              }
            })
          });
        }},
        { text: 'Cancel', style: 'cancel', },
      ],
      {cancelable: false},
    );
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
        autoRefresh: false,
        properties: storageProperties?storageProperties.filter(p=>p.parent_id==borey.id&&p.sync!=2):[]
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
        }).catch(error => reject(error) );
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
    const {properties,borey,loadingDialog,isSync} = this.state;
    let filterProperty = properties.filter(p=>p.sync!=2);
    return (
      <Fragment>
        <SafeAreaView/>
          <View style={styles.container}>
            <RenderBoreyDetail 
              loadingDialog={loadingDialog}
              borey={borey} 
              onRefresh={this._loadData.bind(this)}
              _onSync={this._onSync.bind(this)}
              _onDelete={this._onDelete.bind(this)}
              properties={filterProperty} 
              navigation={navigation}
              isActionButton={isSync?false:true}
              routeBack={`BoreyDetail`}
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
export default BoreyDetail;

