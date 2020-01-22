import React from 'react';
import { StyleSheet, ScrollView, View, Image, Platform, TouchableOpacity } from 'react-native';
import MenuDashboard from '../../components/Dashboard/MenuBoard';
import {primaryBg,color} from '../../../app.json';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import LayoutContainer from '../../components/Tools/RenderLayoutContainer';
  
class Dashboard extends React.Component {
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

    render() {
        const { navigation } = this.props;
        return (
        <LayoutContainer loadingDialog={false}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
            <View style={styles.container}>
                <MenuDashboard _source={require(`../../images/Dashboard/property_data.png`)} _route="PropertyListScreen" title="property data" navigation={navigation}/>
                <MenuDashboard _borderLeft _borderRight _source={require(`../../images/Dashboard/update_borey.png`)} _route="BoreyListAll" title="update borey" navigation={navigation}/>
                <MenuDashboard />
                <MenuDashboard _borderTop/>
                <MenuDashboard _borderTop _borderLeft _borderRight/>
                <MenuDashboard _borderTop/>
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
        flex: 1, flexDirection: 'row', flexWrap: 'wrap'
    },
});
export default Dashboard;

