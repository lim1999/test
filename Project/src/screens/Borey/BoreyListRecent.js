import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { NavigationEvents } from "react-navigation";
import RenderBoreyListAll from '../../components/Borey/RenderBoreyListAll';
import {primaryBg,color} from '../../../app.json';
import LayoutContainer from '../../components/Tools/RenderLayoutContainer';
import {getData} from '../../components/function/flexi/flexiAsync';
  
class BoreyListRecent extends React.Component {
  static navigationOptions = () => ({
    headerTitle: `Recent List`,
    headerStyle: {
      backgroundColor: `${primaryBg}`,
    },
    headerTintColor: `${color}`
  }); 
  constructor(props) {
    super(props);
    this.state = {
      loadingDialog: false,
      propertiesId: [],
      boreys : []
    }
  }; 

  async componentDidMount(){
    let properties = await getData('properties');
    this.setState({
        ...this.state, propertiesId: properties.map(p=>p.parent_id),
    })
    this._loadData();
  }

  // load data from api
  async _loadData(){
    await this._visibleLoading(true);
    const {navigation} = this.props;
    const boreys = navigation.getParam('boreys');
    this.setState({ ...this.state, boreys:boreys, loadingDialog: false, });
    setTimeout(()=>{ this._visibleLoading(false); },500)
  }

  async _refresh(){
    let properties = await getData('properties');
    this.setState({
      ...this.state, propertiesId: properties.map(p=>p.parent_id),
    })
  }

  _visibleLoading(status){
    this.setState({
      ...this.state,
      loadingDialog: status
    });
  }

  render() {
    var { boreys,propertiesId,loadingDialog } = this.state;
    boreys = propertiesId&&boreys
      ?
        boreys.filter(b=>{
          return propertiesId.includes(b.id)
        })
      :
        boreys;
    const { navigation } = this.props;
    return (
      <LayoutContainer loadingDialog={loadingDialog}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <View style={styles.container}>
            <RenderBoreyListAll 
              loadingDialog={loadingDialog}
              boreys={boreys} 
              routeName="BoreyDetail" 
              navigation={navigation}
            />
          </View>
          <NavigationEvents onWillFocus={() =>  this._refresh() } />
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
export default BoreyListRecent; 

