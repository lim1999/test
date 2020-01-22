import React, {Fragment} from 'react';
import {StyleSheet,View,ScrollView} from 'react-native';
import RenderBoreyDetailImage from './RenderBoreyDetailImage';
import { NavigationEvents } from "react-navigation";
import CustomInput from '../Controls/Input';
import CustomButton from '../Controls/Button';
import CustomLabel from '../Controls/Label';
import CustomMap from '../Controls/Map';
import CustomImageBox from '../Controls/Image';
import Icon from 'react-native-vector-icons/FontAwesome';
import {_isNumber} from '../function/flexi/flexiFunction'; 

class BoreyUpdateForm extends React.Component {
    _refresh(){
        const {navigation,onChangeInput} = this.props;
        if(navigation&&navigation.state.params&&navigation.state.params.location){
            navigation.setParams({ location: null });
            const {location} = navigation.state.params;
            onChangeInput('latlng',location);
        }
    }
    render() {
        const {borey, onGoToPin, choosed,
            onOpenCamera,onUploadImage,onDeleteTmpImage,
            onChangeInput} = this.props;
        const ImagesList = choosed.selected_images&&choosed.selected_images.map((img,i)=>{
            return <CustomImageBox key={i} img={img} i={i} isBase64={true} _onDelete={()=>onDeleteTmpImage(i)}/>
        });
        return (
            <Fragment>
                <ScrollView>
                    <RenderBoreyDetailImage borey={borey}/>
                    <View style={styles.container}>
                        <CustomLabel text="Transaction"/>
                        <CustomInput 
                            placeholder="Rental Price" 
                            name="rental_price" 
                            keyboardType='numeric'
                            value={choosed.rental_price} 
                            onChangeText={(text)=>{ if(_isNumber(text)) onChangeInput('rental_price',text) }}
                        /> 
                        <CustomInput 
                            placeholder="Sale Price" 
                            name="sale_price" 
                            keyboardType='numeric'
                            value={choosed.sale_price} 
                            onChangeText={(text)=>{ if(_isNumber(text)) onChangeInput('sale_price',text) }}
                        />
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <CustomInput 
                                    placeholder="List Price" 
                                    name="list_price" 
                                    keyboardType='numeric'
                                    value={choosed.list_price} 
                                    onChangeText={(text)=>{ if(_isNumber(text)) onChangeInput('list_price',text) }}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <CustomInput 
                                    placeholder="Sold Price" 
                                    name="sold_price" 
                                    keyboardType='numeric'
                                    value={choosed.sold_price} 
                                    onChangeText={(text)=>{ if(_isNumber(text)) onChangeInput('sold_price',text) }}
                                />
                            </View>
                        </View>
                        <CustomInput 
                            placeholder="Financing Price" 
                            name="financing_price" 
                            keyboardType='numeric'
                            value={choosed.financing_price} 
                            onChangeText={(text)=>{ if(_isNumber(text)) onChangeInput('financing_price',text) }}
                        />
                    </View> 
                    <View style={styles.container}>
                        <CustomLabel text="Property owner"/>
                        <CustomInput 
                            placeholder="Name"
                            name="owner_name"
                            value={choosed.owner_name} 
                            onChangeText={(text)=>onChangeInput('owner_name',text)}
                        />
                        <CustomInput 
                            placeholder="Mobile Phone"
                            name="mobile_phone" 
                            value={choosed.mobile_phone} 
                            onChangeText={(text)=>{ if(_isNumber(text)) onChangeInput('mobile_phone',text) }}
                        />
                        <CustomInput 
                            placeholder="Secondary Phone"
                            name="secondary_phone" 
                            value={choosed.secondary_phone} 
                            onChangeText={(text)=>{ if(_isNumber(text)) onChangeInput('secondary_phone',text) }}
                        />
                        <CustomInput 
                            placeholder="Email Address"
                            name="email_address" 
                            value={choosed.email_address} 
                            onChangeText={(text)=>onChangeInput('email_address',text)}
                        />
                    </View>
                    <View style={styles.container}>
                        <CustomLabel text="Map">
                            <Icon name="pencil"  onPress={()=>onGoToPin()} style={{ position: 'absolute', right: 5, top: 5 }} type="FontAwesome" size={17} color="#888" />
                        </CustomLabel>
                        {choosed.latlng&&<CustomMap latlng={choosed.latlng}/>}
                        <NavigationEvents onWillFocus={() =>  this._refresh() } />
                    </View>
                    <View style={styles.container}>
                        <CustomLabel text="Galleries"/>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <CustomButton onPress={()=>onOpenCamera()}>
                                    <Icon style={styles.sectionIcon} name="camera" type="FontAwesome" size={15} color="#fff" />
                                </CustomButton>
                            </View>
                            <View style={{ flex: 3 }}>
                                <CustomButton  text="upload image" onPress={()=>onUploadImage()}>
                                </CustomButton>
                            </View>
                        </View>
                        <ScrollView horizontal={true}>
                            {ImagesList}
                        </ScrollView>
                    </View>
                    <View style={styles.container}>
                        <CustomLabel text="Internal Note"/>
                        <CustomInput 
                            placeholder="Internal Note" 
                            isMultiple
                            name="note" 
                            value={choosed.note} 
                            onChangeText={(text)=>onChangeInput('note',text)}
                        />
                    </View>
                </ScrollView>
            </Fragment>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        margin: 10,
        padding: 10,
        shadowColor: Platform.OS === 'ios' ?"#aaa":"#aaa",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: Platform.OS === 'ios'?1:1.84,
        elevation: 3, 
        backgroundColor: '#fafafa',
        borderRadius: 5
    }
});
export default BoreyUpdateForm;
 
