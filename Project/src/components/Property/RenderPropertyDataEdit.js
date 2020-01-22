import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import CustomInput from '../Controls/Input';
import CustomSelect from '../Controls/Select';
import CustomLabel from '../Controls/Label';
import CustomButton from '../Controls/Button';
import CustomImageBox from '../Controls/Image';
import Icon from 'react-native-vector-icons/FontAwesome';
import {primaryBg} from '../../../app.json';
import {_isNumber} from '../function/flexi/flexiFunction'; 

class RenderProperyDataEdit extends React.Component {
    render() {
        const {
            onOpenCamera,onUploadImage,onDeleteTmpImage,onGoToPin,
            choosed,onChangeInput,onChangeInputNested,options,address,
            onAddStory,onRemoveStory} = this.props;
        const ImagesList = choosed.selected_images&&choosed.selected_images.map((img,i)=>{
            return <CustomImageBox key={i} img={img} i={i} _onDelete={()=>onDeleteTmpImage(i)} isBase64={true}/>
        });

        const BiuldingList = choosed.building_description.map((b,i)=>{
            return <View key={i}>
                <Text style={{ paddingVertical: 3, paddingHorizontal: 10, marginTop: 10 }}>Stories <Text style={{ color: primaryBg, fontWeight: 'bold' }}>{i+1}</Text></Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <CustomInput 
                            placeholder="Width"
                            name="width"
                            value={`${b.width}`}
                            onChangeText={(text)=>onChangeInputNested('width',i,text)}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <CustomInput 
                            placeholder="Length"
                            name="length"
                            value={`${b.length}`}
                            onChangeText={(text)=>onChangeInputNested('length',i,text)}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <CustomInput 
                            placeholder="Total area"
                            name="total_area"
                            value={`${b.total_area}`}
                            onChangeText={(text)=>onChangeInputNested('total_area',i,text)}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <CustomInput 
                            placeholder="Year built"
                            name="year_built"
                            icon="calendar"
                            value={`${b.year_built}`}
                            onChangeText={(text)=>onChangeInputNested('year_built',i,text)}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <CustomInput 
                            placeholder="Useful life"
                            name="usefull_life"
                            value={`${b.usefull_life}`}
                            onChangeText={(text)=>onChangeInputNested('usefull_life',i,text)}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <CustomInput 
                            placeholder="Effective ages"
                            name="effective_ages"
                            value={`${b.effective_ages}`}
                            onChangeText={(text)=>onChangeInputNested('effective_ages',i,text)}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <CustomInput 
                            placeholder="Cost estimate"
                            name="cost_estimate"
                            value={`${b.cost_estimate}`}
                            onChangeText={(text)=>onChangeInputNested('cost_estimate',i,text)}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <CustomInput 
                            placeholder="Bedrooms"
                            name="bedrooms"
                            value={`${b.bedrooms}`}
                            onChangeText={(text)=>onChangeInputNested('bedrooms',i,text)}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <CustomInput 
                            placeholder="Bathrooms"
                            name="bathrooms"
                            value={`${b.bathrooms}`}
                            onChangeText={(text)=>onChangeInputNested('bathrooms',i,text)}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <CustomInput 
                            placeholder="Livingrooms"
                            name="livingrooms"
                            value={`${b.livingrooms}`}
                            onChangeText={(text)=>onChangeInputNested('livingrooms',i,text)}
                        />
                    </View>
                </View>
                
                <CustomInput 
                    placeholder="Parkings"
                    name="parkings"
                    value={`${b.parkings}`}
                    onChangeText={(text)=>onChangeInputNested('parkings',i,text)}
                />
                <CustomSelect 
                    placeholder="Choose design appeal"
                    name="design_appeal" 
                    value={`${choosed.building_description[i].design_appeal}`}
                    data={options.design_appeals.map(d=>d.name).filter(d=>d)}
                    onChangeText={(text)=>{ onChangeInputNested('design_appeal',i,text) }}
                />
                <CustomSelect 
                    placeholder="Choose quality"
                    value={`${choosed.building_description[i].quality}`}
                    data={options.qualities.map(d=>d.name).filter(d=>d)}
                    onChangeText={(text)=>{ onChangeInputNested('quality',i,text) }}
                />
            </View>
        })
        return (
            <>
                <View style={styles.container}>
                    <CustomSelect
                        placeholder="Record Type"
                        name="record_type" 
                        value={`${choosed.record_type}`}
                        data={options.record_types.map(d=>d.name).filter(d=>d)}
                        onChangeText={(text)=>{ onChangeInput('record_type',text) }}
                    />
                    <CustomSelect 
                        placeholder="Property Type"
                        name="property_type" 
                        value={`${choosed.property_type}`}
                        data={options.property_types.map(d=>d.name).filter(d=>d)}
                        onChangeText={(text)=>{ onChangeInput('property_type',text) }}
                    />
                </View>
                <View style={styles.container}>
                    <CustomLabel text="Address"/>
                    <CustomInput 
                        placeholder="House no"
                        name="house_no" 
                        value={`${choosed.house_no}`}
                        onChangeText={(text)=>{ onChangeInput('house_no',text) }}
                    />
                    <CustomInput 
                        placeholder="Street"
                        name="street_no" 
                        value={`${choosed.street_no}`}
                        onChangeText={(text)=>{ onChangeInput('street_no',text) }}
                    />
                    <CustomSelect 
                        placeholder="City"
                        name="city" 
                        data={address.cities.map(d=>d.name).filter(d=>d)}
                        value={`${choosed.city}`}
                        onChangeText={(text)=>{ onChangeInput('city',text) }}
                    />
                    <CustomSelect 
                        placeholder="District"
                        name="district" 
                        data={address.districts.map(d=>d.name).filter(d=>d)}
                        value={`${choosed.district}`}
                        onChangeText={(text)=>{ onChangeInput('district',text) }}
                    />
                    <CustomSelect 
                        placeholder="Commune"
                        name="commune"
                        data={address.communes.map(d=>d.name).filter(d=>d)}
                        value={`${choosed.commune}`}
                        onChangeText={(text)=>{ onChangeInput('commune',text) }}
                    />
                    <CustomSelect 
                        placeholder="Village"
                        name="village" 
                        data={address.villages.map(d=>d.name).filter(d=>d)}
                        value={`${choosed.village}`}
                        onChangeText={(text)=>{ onChangeInput('village',text) }}
                    />
                    <CustomButton onPress={()=>onGoToPin()}>
                        Pin My Location
                        {choosed&&choosed.location?"\n Location: "+choosed.location.latitude+', '+choosed.location.longitude:''}
                    </CustomButton>
                    <CustomSelect 
                        placeholder="Data Source"
                        name="data_source" 
                        value={`${choosed.data_source}`}
                        data={options.data_sources.map(d=>d.name).filter(d=>d)}
                        onChangeText={(text)=>{ onChangeInput('data_source',text) }}
                    />
                </View>
                <View style={styles.container}>
                    <CustomLabel text="main street"/>
                    <CustomInput 
                        placeholder="Name street"
                        name="main_street_name" 
                        value={`${choosed.main_street_name}`}
                        onChangeText={(text)=>{ onChangeInput('main_street_name',text) }}
                    />
                    <CustomInput 
                        placeholder="Width"
                        name="main_street_width" 
                        value={`${choosed.main_street_width}`}
                        onChangeText={(text)=>{ if(_isNumber(text)) onChangeInput('main_street_width',text) }}
                    />
                </View>
                <View style={styles.container}>
                    <CustomLabel text="Transaction"/>
                    <CustomInput 
                        placeholder="Rental Price" 
                        name="rental_price" 
                        keyboardType='numeric'
                        value={`${choosed.rental_price}`}
                        onChangeText={(text)=>{ if(_isNumber(text)) onChangeInput('rental_price',text) }}
                    /> 
                    <CustomInput 
                        placeholder="Sale Price" 
                        name="sale_price" 
                        keyboardType='numeric'
                        value={`${choosed.sale_price}`}
                        onChangeText={(text)=>{ if(_isNumber(text)) onChangeInput('sale_price',text) }}
                    />
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <CustomInput 
                                placeholder="List Price" 
                                name="list_price" 
                                keyboardType='numeric'
                                value={`${choosed.list_price}`}
                                onChangeText={(text)=>{ if(_isNumber(text)) onChangeInput('list_price',text) }}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <CustomInput 
                                placeholder="Sold Price" 
                                name="sold_price" 
                                keyboardType='numeric'
                                value={`${choosed.sold_price}`}
                                onChangeText={(text)=>{ if(_isNumber(text)) onChangeInput('sold_price',text) }}
                            />
                        </View>
                    </View>
                    <CustomInput 
                        placeholder="Financing Price" 
                        name="financing_price" 
                        keyboardType='numeric'
                        value={`${choosed.financing_price}`}
                        onChangeText={(text)=>{ if(_isNumber(text)) onChangeInput('financing_price',text) }}
                    />
                </View>
                <View style={styles.container}>
                    <CustomLabel text="Property owner"/>
                    <CustomInput 
                        placeholder="Name"
                        name="owner_name"
                        value={`${choosed.owner_name}`}
                        onChangeText={(text)=>onChangeInput('owner_name',text)}
                    />
                    <CustomInput 
                        placeholder="Mobile Phone"
                        name="mobile_phone" 
                        value={`${choosed.mobile_phone}`}
                        onChangeText={(text)=>{ if(_isNumber(text)) onChangeInput('mobile_phone',text) }}
                    />
                    <CustomInput 
                        placeholder="Secondary Phone"
                        name="secondary_phone" 
                        value={`${choosed.secondary_phone}`}
                        onChangeText={(text)=>{ if(_isNumber(text)) onChangeInput('secondary_phone',text) }}
                    />
                    <CustomInput 
                        placeholder="Email Address"
                        name="email_address" 
                        value={`${choosed.email_address}`}
                        onChangeText={(text)=>onChangeInput('email_address',text)}
                    />
                </View>
                <View style={styles.container}>
                    <CustomLabel text="Land Description"/>
                    <CustomInput 
                        placeholder="Enter land width"
                        name="land_width"
                        value={`${choosed.land_width}`}
                        onChangeText={(text)=>{ if(_isNumber(text)) onChangeInput('land_width',text) }}
                    />
                    <CustomInput 
                        placeholder="Enter land length"
                        name="land_length" 
                        value={`${choosed.land_length}`}
                        onChangeText={(text)=>{ if(_isNumber(text)) onChangeInput('land_length',text) }}
                    />
                    <CustomInput 
                        placeholder="Enter total area"
                        name="land_total_area" 
                        value={`${choosed.land_total_area}`}
                        onChangeText={(text)=>{ if(_isNumber(text)) onChangeInput('land_total_area',text) }}
                    />
                    <CustomSelect 
                        placeholder="Choose title deed"
                        name="land_title_deed" 
                        value={`${choosed.land_title_deed}`}
                        data={options.title_deeds.map(d=>d.name).filter(d=>d)}
                        onChangeText={(text)=>onChangeInput('land_title_deed',text)}
                    />
                    <CustomSelect 
                        placeholder="Choose shape"
                        name="land_shape" 
                        value={`${choosed.land_shape}`}
                        data={options.shapes.map(d=>d.name).filter(d=>d)}
                        onChangeText={(text)=>onChangeInput('land_shape',text)}
                    />
                    <CustomSelect 
                        placeholder="Choose topography"
                        name="land_topography" 
                        value={`${choosed.land_topography}`}
                        data={options.topographies.map(d=>d.name).filter(d=>d)}
                        onChangeText={(text)=>onChangeInput('land_topography',text)}
                    />
                    <CustomSelect 
                        placeholder="Choose current use"
                        name="land_current_use" 
                        value={`${choosed.land_current_use}`}
                        data={options.current_uses.map(d=>d.name).filter(d=>d)}
                        onChangeText={(text)=>onChangeInput('land_current_use',text)}
                    />
                </View>

                <View style={styles.container}>
                    <CustomLabel text="Building Description"/>
                    <CustomSelect 
                        placeholder="Type of building"
                        name="building_type"
                        value={`${choosed.building_type}`}
                        data={options.building_types.map(d=>d.name).filter(d=>d)}
                        onChangeText={(text)=>onChangeInput('building_type',text)}
                    />
                    <View style={styles.buttonAction}>
                        <TouchableOpacity onPress={()=>onRemoveStory()}>
                            <Icon name="minus-circle" size={25} color={primaryBg}/>
                        </TouchableOpacity>
                        <Text style={{ paddingVertical: 3, paddingHorizontal: 10, fontWeight: 'bold' }}>{BiuldingList&&BiuldingList.length}</Text>
                        <TouchableOpacity onPress={()=>onAddStory()}>
                            <Icon name="plus-circle" size={25} color={primaryBg}/>
                        </TouchableOpacity>
                    </View>
                    {BiuldingList}
                </View>

                <View style={styles.container}>
                    <CustomInput 
                        placeholder="Surrounding"
                        name="surrounding"
                        isMultiple
                        value={`${choosed.surrounding}`}
                        onChangeText={(text)=>onChangeInput('surrounding',text)}
                    />
                </View>
                <View style={styles.container}>
                    <CustomInput 
                        placeholder="Additional note"
                        name="note"
                        isMultiple
                        value={`${choosed.note}`}
                        onChangeText={(text)=>onChangeInput('note',text)}
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
            </>
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
        elevation: 1, 
        backgroundColor: '#fafafa',
        borderRadius: 5,
    },
    buttonAction:{
        width: '100%', flexDirection: 'row', padding: 7,
        justifyContent: 'flex-end'
        
    }
});
export default RenderProperyDataEdit;

