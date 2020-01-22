import React from 'react';
import { StyleSheet, ScrollView, View,TouchableOpacity, Image, Platform } from 'react-native';
import RenderBoreySearchList from '../../components/Borey/RenderBoreySearchList';
import RenderBoreyListAll from '../../components/Borey/RenderBoreyListAll';
import {primaryBg,color,APP_API_BASE_URL} from '../../../app.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import LayoutContainer from '../../components/Tools/RenderLayoutContainer';
import {getData} from '../../components/function/flexi/flexiAsync';
  
class BoreyListAll extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: `All Borey List`,
    headerStyle: {
      backgroundColor: `${primaryBg}`,
    },
    headerTintColor: `${color}`,
    headerRight: (
      <>
      <TouchableOpacity onPress={()=>{ navigation.getParam('_this')._goRecentList(); }} style={{ paddingRight: Platform.OS === 'ios'?10:20, paddingLeft: 10 }}>
        <Icon name="folder-open" type="FontAwesome" size={20} color="#fff" />
      </TouchableOpacity>
      </>
    ),
  }); 
  constructor(props) {
    super(props);
    this.state = {
      loadingDialog: false,
      user: {},
      auth: '',
      filtered: null,
      boreys : []
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

  // load data from api
  async _loadData(){
    const {auth} = this.state;
    await this._visibleLoading(true);
    await fetch(APP_API_BASE_URL+'sub-boreies',{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: auth.trim('"'),
      }
    }) 
    .then((response) => { return response.json()  })
    .then((responseJson) => {
      if(responseJson&&responseJson.data&&responseJson.data.length==0){
        this.setState({ ...this.state,  loadingDialog: false, });
      }else{
        this.setState({ ...this.state, boreys : responseJson.data })
      }
    })
    .catch(error => { 
      this.setState({ ...this.state,  loadingDialog: false, });
      alert(error); 
    });
    setTimeout(()=>{ this._visibleLoading(false); },500)
  }

  _visibleLoading(status){
    this.setState({
      ...this.state,
      loadingDialog: status
    });
  }
  
  _goRecentList(){
    const {boreys} = this.state;
    const {navigation} = this.props;
    navigation.navigate("BoreyListRecent",{boreys:boreys});
  }

  onSearch(text){
    this.setState({ ...this.state, filtered: text?text:null });
  }
  onClear(){
    this.setState({ ...this.state, filtered: null });
  }
  render() {
    var { boreys,filtered,loadingDialog } = this.state;
    boreys = filtered
      ?
        boreys.filter(b=>{
          return b.display_name.toLowerCase().includes(filtered.toLowerCase())
        })
      :
        boreys;
    const { navigation } = this.props;
    return (
      <LayoutContainer loadingDialog={loadingDialog}>
        <View style={{ height: 50 }}>
          <RenderBoreySearchList
            onChangeText={ this.onSearch.bind(this) }
            onClear={ this.onClear.bind(this) }
            value={filtered}
          />
        </View>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <View style={styles.container}>
            <RenderBoreyListAll 
              loadingDialog={loadingDialog}
              boreys={boreys} 
              routeName="BoreyDetail" 
              navigation={navigation}
            />
          </View>
        </ScrollView>
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
export default BoreyListAll;

