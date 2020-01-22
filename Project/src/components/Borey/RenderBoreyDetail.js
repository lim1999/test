import React, {Fragment} from 'react';
import {View,ScrollView,TouchableOpacity,RefreshControl} from 'react-native';
import RenderBoreyDetailImage from './RenderBoreyDetailImage';
import RenderPropertyList from '../Property/RenderPropertyList';
import RenderButtonAdd from '../Tools/RenderButtonAddButtomRight';
import RenderButtonSync from '../Tools/RenderButtonSyncButtomRight';
class BoreyDetail extends React.Component {
    render() { 
        const {borey,properties,navigation,onRefresh,_onSync,_onDelete,isActionButton,routeBack,loadingDialog} = this.props;
        const filteredProperties = properties&&properties;
        return (
            <Fragment>
                <View style={{ flex: 1, position:'relative' }}>
                    <ScrollView 
                        refreshControl={
                            <RefreshControl refreshing={false} onRefresh={ () => { onRefresh() } } />
                        }
                    > 
                        <RenderBoreyDetailImage borey={borey}/>
                        <RenderPropertyList 
                            loadingDialog={loadingDialog}
                            navigation={navigation} 
                            borey={borey} 
                            properties={filteredProperties} 
                            _onDelete={_onDelete}
                            routeBack={routeBack}
                        />
                    </ScrollView>
                    {((filteredProperties&&isActionButton)&&filteredProperties.filter(p=>p.sync!=2).filter(property=>{ return (property.rental_price || property.sale_price || property.list_price || property.sold_price || property.financing_price) }).length)?<View style={{ position: 'absolute', bottom: 90, right: 20 }}>
                        <TouchableOpacity onPress={()=>{ _onSync() }}>
                            <RenderButtonSync />
                        </TouchableOpacity>
                    </View>:<></>}
                    {isActionButton&&(
                        <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
                            <TouchableOpacity onPress={()=>{ navigation.navigate("AddBorey",{
                                    title: borey.name,
                                    borey: borey,
                                }) }}>
                                <RenderButtonAdd />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </Fragment>
        );
    }
}
export default BoreyDetail;

