import React, {Fragment} from 'react';
import {StyleSheet,View,ScrollView} from 'react-native';
import RenderBoreyDetailImage from './RenderBoreyDetailImage';
import { NavigationEvents } from "react-navigation";
import CustomInput from '../Controls/Input';
import CustomLabel from '../Controls/Label';
import CustomButton from '../Controls/Button';
import CustomImageBox from '../Controls/Image';
import Icon from 'react-native-vector-icons/FontAwesome';
import {_isNumber} from '../function/flexi/flexiFunction';
 
class BoreyAddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pinnedAddress: 'CHANGE LOCATION '
        }
    }; 
    _refresh(){ 
        const {navigation,onChangeInput} = this.props;
        if(navigation&&navigation.state.params&&navigation.state.params.location){
            navigation.setParams({ location: null });
            const {location,pinnedAddress} = navigation.state.params;
            onChangeInput('latlng',location);
            this.setState({
                ...this.state,
                pinnedAddress: pinnedAddress&&pinnedAddress[0]?pinnedAddress[0].formattedAddress+'  ':'CHANGE LOCATION '
            });
        }
    }
    render() {
        const {borey,
            onOpenCamera,onUploadImage,onDeleteTmpImage,onGoToPin,
            choosed,onChangeInput} = this.props;
        const ImagesList = choosed.selected_images&&choosed.selected_images.map((img,i)=>{
            return <CustomImageBox key={i} img={img} i={i} _onDelete={()=>onDeleteTmpImage(i)} isBase64={true}/>
        });
        return (
            <Fragment>
                <ScrollView>
                    <RenderBoreyDetailImage borey={borey}/>
                    <View style={styles.container}>
                        <CustomLabel text="Home Address"/>
                        <CustomInput 
                            placeholder="Enter Home No" 
                            name="house_no"  
                            isRequired={true}
                            value={choosed.house_no} 
                            onChangeText={(text)=>onChangeInput('house_no',text)}
                        />
                        <CustomInput 
                            placeholder="Enter Street No" 
                            name="street_no" 
                            isRequired={true}
                            value={choosed.street_no} 
                            onChangeText={(text)=>onChangeInput('street_no',text)}
                        />
                        <CustomButton onPress={()=>onGoToPin()}>
                            {choosed.latlng&&this.state.pinnedAddress}
                            {choosed.latlng&&<Icon name="pencil" type="FontAwesome" size={17} color="#fff" />}
                            {!choosed.latlng&&'SET LOCATION'}
                        </CustomButton>
                        <NavigationEvents onWillFocus={() =>  this._refresh() } />
                    </View>
                    <View style={styles.container}>
                        <CustomLabel text="Property owner"/>
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
                    </View>
                    <View style={styles.container}>
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
    },
});
export default BoreyAddForm;

