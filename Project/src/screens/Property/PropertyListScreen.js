import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { NavigationEvents } from "react-navigation";
import RenderButtonAdd from '../../components/Tools/RenderButtonAddButtomRight';
import RenderPropertyDataList from '../../components/Property/RenderPropertyDataList';
import RenderPropertMapList from '../../components/Property/RenderPropertMapList';
import {primaryBg,color,APP_API_BASE_URL} from '../../../app.json';
import { storeData,getData  } from '../../components/function/flexi/flexiAsync';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LayoutContainer from '../../components/Tools/RenderLayoutContainer';
  
class PropertyList extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: `Property Data`,
        headerStyle: {
            backgroundColor: `${primaryBg}`,
        },
        headerTintColor: `${color}`,
    });  
    constructor(props) {
        super(props);
        this.state = {
            properties: [],
            loadingDialog: false,
            user: {},
            auth: '',
            filtered: null,
            deleteorder:'',
            
        }
    }; 
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


    async _loadData(){
        const {auth}=this.state;
        await this._visibleLoading(true);
        await fetch(APP_API_BASE_URL+'properties',{
            method:"GET",
            headers:{
                Acccpt:'application/json',
                Authorization: auth.trim('"'),
            }
        })
        .then((response)=>{return response.json()})
        .then((responseJson)=>{
            if(responseJson&&responseJson.data&&responseJson.data.length==0){
                this.setState({...this.state,loadingDialog:false});
            }else{
                this.setState({...this.state,properties:responseJson.data})
            }
        })
        .catch(error=>{
            this.setState({...this.state,loadingDialog:false});
            alert(error);
        });
        setTimeout(() => {this._visibleLoading(false)}, 500);
    }

    
    _visibleLoading(status){
        this.setState({
          ...this.state,
          loadingDialog: status
        });
      }

    async _refresh(){
        var storageProperties = await getData('propertiesData');
        var {properties} = this.state;
        var {navigation} = this.props;
        if(navigation&&navigation.state.params&&navigation.state.params.refresh || (properties!=null && storageProperties && properties.length!=storageProperties.length)){
            navigation.setParams({ refresh: false });
            this._loadData();
        }
    }

    _onDelete(id){
        console.log(id);
        fetch(APP_API_BASE_URL+'properties'+ id, {
          method: 'DELETE'
        }).then(() => {
           alert("delete")
        }).catch(err => {
          console.error(err)
        });
    }
    render() {
        const { loadingDialog,properties } = this.state;
        const { navigation } = this.props;
        console.log(properties);
        return (
            <LayoutContainer loadingDialog={loadingDialog}>
                    <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
                        <View style={styles.container}>
                            <RenderPropertyDataList
                                properties={properties}
                                navigation={navigation}
                                _onDelete={this._onDelete.bind(this)}
                            /> 
                        </View>
                    </ScrollView>
                    <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
                    <TouchableOpacity onPress={()=>navigation.navigate('PropertyAddScreen')}>
                        <RenderButtonAdd/>
                    </TouchableOpacity>
                </View>
                <NavigationEvents onWillFocus={() =>  this._refresh() } />
            </LayoutContainer>
        );
    }
}
const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: `#fff`,
    },
    container:{
        backgroundColor: `#fff`,
        flex: 1,
    },
});
export default PropertyList;

 