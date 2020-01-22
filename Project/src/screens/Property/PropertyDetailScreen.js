import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {primaryBg,color} from '../../../app.json';
import RenderPropertyDetail from '../../components/Property/RenderPropertyDetail';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LayoutContainer from '../../components/Tools/RenderLayoutContainer';
   
class PropertyDetailScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: `Property Data Detail`,
        headerStyle: {
            backgroundColor: `${primaryBg}`,
        },
        headerTintColor: `${color}`,
        headerRight: (
            <TouchableOpacity onPress={()=>{ 
                navigation.navigate('PropertyEditScreen',{property:navigation.getParam('property')}) 
            }} style={{ paddingRight: Platform.OS === 'ios'?20:20, paddingLeft: 10 }}>
                <FontAwesome name="pencil" type="FontAwesome" size={20} color="#fff" /> 
            </TouchableOpacity>
        ),
    });  
    constructor(props) {
        super(props);
        this.state = {
            property: {},
            loadingDialog: false,
        }
    }; 

    componentDidMount(){
        this._loadData();
    }

    _loadData(){
        const {navigation} = this.props;
        this.setState({ ...this.state, property: navigation.getParam('property') });
    }

    render() {
        const { loadingDialog,property } = this.state;
        return (
            <LayoutContainer loadingDialog={loadingDialog}>
                <RenderPropertyDetail property={property}/>
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
export default PropertyDetailScreen;
