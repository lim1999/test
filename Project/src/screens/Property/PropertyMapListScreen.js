import React from 'react';
import { View,Image,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import {primaryBg,color} from '../../../app.json';
import RenderPropertyMapList from '../../components/Property/RenderPropertMapList';
import { NavigationEvents } from "react-navigation";
// import { storeData,getData  } from '../../components/function/flexi/flexiAsync';
import LayoutContainer from '../../components/Tools/RenderLayoutContainer';
import RenderButtonAdd from '../../components/Tools/RenderButtonAddButtomRight';
import RenderPropertySearchMapList from '../../components/Property/RenderPropertySearchMapList';

export default class PropertyMapListScreen extends React.Component{
    static navigationOptions = ({ navigation }) => ({
        headerTitle: `Data Collector`,
        headerLeft: ( /* Your custom header */
        <View
            style={{
            height: 80,
            marginTop: 20, /* only for IOS to give StatusBar Space */
            paddingLeft: 10, paddingTop: Platform.OS === "ios"?10:15,
            }}
        >
            <Image source={ require('../../images/Logo/logo.png') } style={{ width: 35, height: 35 }}/>
        </View>
        ),
        headerRight: (
            <>
                <TouchableOpacity onPress={()=>{ navigation.navigate('UserDashboard') }} style={{ paddingRight: Platform.OS === 'ios'?10:20, paddingLeft: 10 }}>
                    <Icon name="user-circle" type="FontAwesome" size={20} color="#fff" />
                </TouchableOpacity>
            </>
          ),
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
            region: {
                latitude: 11.5564,
                longitude: 104.9282,
                latitudeDelta: 0.01,
                longitudeDelta: 0.0121,
            },
            user: {},
            auth: '',
            filtered: null,
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
        await fetch('http://192.168.13.107:81/api/properties',{
            method:"GET",
            headers:{
                Acccpt:'application/json',
                Authorization: ('Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQ5NjZjZjU0YWI1ZGUxYzk5MWE5MDFjOTMzMTZiNTY2OWIyZGQzMzEyNzM4ODcwMmIxZDJmZWViOThlODYzZTc4NGIxOTU0NGIwNWI5ZDViIn0.eyJhdWQiOiIyIiwianRpIjoiNDk2NmNmNTRhYjVkZTFjOTkxYTkwMWM5MzMxNmI1NjY5YjJkZDMzMTI3Mzg4NzAyYjFkMmZlZWI5OGU4NjNlNzg0YjE5NTQ0YjA1YjlkNWIiLCJpYXQiOjE1Nzg5ODc3MjEsIm5iZiI6MTU3ODk4NzcyMSwiZXhwIjoxNTgwMjgzNzIxLCJzdWIiOiI4NiIsInNjb3BlcyI6WyIqIl19.q9WHml265-7_YnLT7Xkc5IiCYdWPXcK38ekqEeUQHzuNquKHYMybdmhSIpo7iVLTHHcHlLOdu9DByLChFB0eqbaETuEvbMwTNslbgkTIHKChpvlVUR_ero3WOlxvDPLAVVcupw7-p8357MbrY-RyR1MsLjoksjR_I24-w8Y3lTOklqO6wWh7oJZWocaNdodT6jUMbCv5V9FjUvmOY7QjzMQR4lPGFWOEBS2RTwRy8_2cM3xsZiVwlvBABs0OO9NgWTOn6ED5S2OxHBjccEvV34C_WQ7g2pujlVqLhJNnJ5wA5V4ObEYpkCGBPGLsHbuhVY6fGPrvtNG2N0zd8DQHGVOt3Q1vwvsyXvvSo09E5tHbyEkaSIL9I-fnnP753cZ2jYzjSd-Sn1SYZYAE7825mQrtot6z_G7KbBRciRLnqhwMB1t9ca4rTydhj59bYWgR4Xv5MQwM1QTnofKBJ0MzT549_Mq1r6Z0vk2UPZGLRrCMJUonpKQStW21Yk0tM-n_pdNpWAUUTZNvklGMRHtLs9fUd5a9VOKsx0vnoyoe2-n3t2ACUOuGkGFKDm9rHgaE7dcti4aScN-5no2V0-1_7j-R1E51gbS911tDAr3HLqwC8txRiQXLBR_ZbrFaHTLlPJmA0ASBwTjL-Z7WtFDCOsU7mlxdGtcSw3pz-6vpLQM'),
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
    _refresh(){
        
    }
    render(){
        const { region,loadingDialog,properties,coordinates } = this.state;
        const { navigation } = this.props;
        return(
            <LayoutContainer loadingDialog={loadingDialog}>
                    <View style={{height:50}}>
                        <RenderPropertySearchMapList/>
                    </View>
                    <View>
                        <RenderPropertyMapList 
                            region={region}
                            coordinates={coordinates}
                            properties={properties}
                            navigation={navigation}
                        />
                    </View>
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