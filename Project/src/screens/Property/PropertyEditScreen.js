import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RenderPropertyDataEdit from '../../components/Property/RenderPropertyDataEdit';
import CustomButton from '../../components/Controls/Button';
import {primaryBg,color} from '../../../app.json';
import LayoutContainer from '../../components/Tools/RenderLayoutContainer';
import Geolocation from '@react-native-community/geolocation';
import RNFS from 'react-native-fs';
import Toast from 'react-native-root-toast';
import { storeData,getData  } from '../../components/function/flexi/flexiAsync';
import options from '../../data/options.json';
import cities from '../../data/address/level_1.json';
import districts from '../../data/address/level_2.json';
import communes from '../../data/address/level_3.json';
import villages from '../../data/address/level_4.json'; 
  
class PropertyEditScreen extends React.Component {
    static navigationOptions = () => ({
        headerTitle: `Edit Property Data`,
        headerStyle: {
            backgroundColor: `${primaryBg}`,
        },
        headerTintColor: `${color}`,
    }); 
    constructor(props) {
        super(props);
        this.state = {
            loadingDialog: false,
            options: options,
            choosed: {
                id: '',
                
                record_type: '',
                property_type: '',
                
                house_no: '',
                street_no: '',
                location: null,
                data_source: '',
                main_street_name: '',
                main_street_width: '',

                city: '',
                district: '',
                commune: '',
                village: '',
                seleted_address: '',


                rental_price: '',
                sale_price: '',
                list_price: '',
                sold_price: '',
                financing_price: '',

                land_width: '',
                land_length: '',
                land_total_area: '',
                land_title_deed: '',
                land_shape: '',
                land_topography: '',
                land_current_use: '',

                owner_name: '',
                mobile_phone: '',
                secondary_phone: '',
                email_address: '',
 
                selected_images: [],

                building_type: '',
                building_description_default: { width: '', length: '', total_area: '', year_built: '', usefull_life: '', effective_ages: '', cost_estimate: '', bedrooms: '', bathrooms: '', livingrooms: '', parkings: '', design_appeal: '', quality: '' },
                building_description: [
                    { width: '', length: '', total_area: '', year_built: '', usefull_life: '', effective_ages: '', cost_estimate: '', bedrooms: '', bathrooms: '', livingrooms: '', parkings: '', design_appeal: '', quality: '' },
                ],

                surrounding: '',
                note: ''
            },

            address: {
                cities, districts:[], communes: [], villages: []
            }
        }
    }; 

    componentDidMount(){
        const {navigation} = this.props;
        const property = navigation.getParam('property');

        let ImagesList = [];
        let loadImage = new Promise(function(resolveLoadImage) {
            (property.selected_images&&property.selected_images.length)?property.selected_images.map((img,i)=>{
                let promise = new Promise(function(resolve) {
                    RNFS.exists(img).then(()=>{
                        RNFS.readFile(img, 'base64').then((img) => { 
                            resolve(img); 
                        })
                    }).catch(error => { resolve(error); });
                })
                promise.then(img => {
                    if((i+1)==property.selected_images.length){ resolveLoadImage(true) } 
                    ImagesList.push(img);
                })
            }):(
                resolveLoadImage(true)
            );
        })

        this.loadAddressOption();
        
        loadImage.then(()=>{
            this.setState({
                ...this.state,
                loadingDialog: false,
                choosed: { ...property, selected_images:ImagesList }
            });
        })
    }

    // on open camera
    onOpenCamera(){
        const {selected_images} = this.state.choosed;
        ImagePicker.openCamera({
            // width: 300,
            // height: 400,
            includeBase64: true,
            // cropping: true,
        }).then(image => {
            console.log
            this._visibleLoading(true);
            const selectedImages = `${image.data}`;
            selectedImages&&this.setState({
                ...this.state,
                choosed:{
                    ...this.state.choosed,
                    selected_images: [selectedImages,...selected_images]
                }
            });
            setTimeout(()=>{ this._visibleLoading(false); },500)
        });
    }

    // choose image and save as base64 
    async onUploadImage(){
        const {selected_images} = this.state.choosed;
        await ImagePicker.openPicker({
            path: 'Photos',
            maxFiles: 5,
            mediaType: 'photo',
            includeBase64: true,
            multiple: true
        }).then(images => {
            this._visibleLoading(true);
            const selectedImages = (images&&images.length)&&images.filter(image=>!selected_images.includes(`${image.data}`)).map(image=> `${image.data}`);
            selectedImages&&this.setState({
                ...this.state,
                choosed:{
                    ...this.state.choosed,
                    selected_images: [...selectedImages,...selected_images]
                }
            });
            setTimeout(()=>{ this._visibleLoading(false); },500)
        });
    }

    loadAddressOption(){
        const {navigation} = this.props;
        property = navigation.getParam('property');
        if(property&&property.city){ this.onChangeInput('city',property.city); }
        if(property&&property.district){ setTimeout(()=>{ this.onChangeInput('district',property.district); },500); }
        if(property&&property.commune){ setTimeout(()=>{ this.onChangeInput('commune',property.commune); },1000); }
        if(property&&property.village){ setTimeout(()=>{ this.onChangeInput('village',property.village); },1500); }
    }

    // delete image from async
    async onDeleteTmpImage(i){
        await this._visibleLoading(true);
        const {selected_images} = this.state.choosed;
        const new_selected_images = selected_images.filter((img,index)=>index!=i);
        await this.setState({
            ...this.state,
            loadingDialog: false,
            choosed:{
                ...this.state.choosed,
                selected_images: new_selected_images
            }
        });
    }

    // when input control has been changed
    onChangeInput(target,value){
        if(target=="city"&&value){
            city_id = cities.filter(d=>d.name==value)[0].id;
            const option_districts = districts.filter(d=>{ 
                return (parseInt(d.id) >= parseInt(city_id.padEnd(4,0)) && parseInt(d.id)<=parseInt(city_id.padEnd(4,9)))
            })
            this.setState({ 
                ...this.state, 
                choosed:{ 
                    ...this.state.choosed, [target]:value, district: '', commune: '', village: '',
                },
                address:{
                    ...this.state.address, districts: option_districts, communes: [], villages:[]
                }
            }); 
        }else if(target=="district"&&value){
            district_id = districts.filter(d=>d.name==value)[0].id;
            const option_communes = communes.filter(d=>{ 
                return (parseInt(d.id) >= parseInt(district_id.padEnd(6,0)) && parseInt(d.id)<=parseInt(district_id.padEnd(6,9)))
            })
            this.setState({ 
                ...this.state, 
                choosed:{ 
                    ...this.state.choosed, [target]:value, commune: '', village: '',
                },
                address:{
                    ...this.state.address, communes: option_communes, villages:[]
                }
            }); 
        }else if(target=="commune"&&value){
            commune_id = communes.filter(d=>d.name==value)[0].id;
            const option_villages = villages.filter(d=>{ 
                return (parseInt(d.id) >= parseInt(commune_id.padEnd(8,0)) && parseInt(d.id)<=parseInt(commune_id.padEnd(8,9)))
            })
            this.setState({ 
                ...this.state, 
                choosed:{ 
                    ...this.state.choosed, [target]:value, village: '',
                },
                address:{
                    ...this.state.address, villages:option_villages
                }
            }); 
        }else{
            this.setState({
                ...this.state,
                choosed:{
                    ...this.state.choosed,
                    [target]:value
                }
            });
        }
    }
    onChangeInputNested(target,index,value){
        const {building_description} = this.state.choosed;
        this.setState({
            ...this.state,
            choosed:{
                ...this.state.choosed,
                building_description: building_description.map((bd,i)=>{
                    if(index==i){ bd[target]=value; }
                    return bd
                })
            }
        });
    }
  
    // when access location offline
    async onGoToPin(){
        Geolocation.getCurrentPosition(info =>{
            this.setState({...this.state, choosed: { ...this.state.choosed, location:info.coords} });
        })
    }

    // when remove and add duilding history
    async onRemoveStory(){
        let {building_description}  = this.state.choosed;
        if(building_description&&building_description.length){
            building_description.splice(building_description.length-1,1)
        }else{
            building_description = [];
        };
        this.setState({
            ...this.state,
            choosed:{
                ...this.state.choosed,
                building_description: building_description
            }
        })
    }
    async onAddStory(){
        let {building_description,building_description_default}  = this.state.choosed;
        this.setState({
            ...this.state,
            choosed:{
                ...this.state.choosed,
                building_description: [...building_description,building_description_default]
            }
        })
    }

    // visible loading
    _visibleLoading(status){
        this.setState({
            ...this.state,
            loadingDialog: status
        });
    }
 
    // when save 
    async onSave(){ 
        await this._visibleLoading(true);
        const {choosed} = this.state;
        var properties = (await getData('propertiesData'));
        
        // validation
        const {house_no,street_no,location,selected_images} = choosed;
        // if(!house_no){ 
        //     this._toastMessage('please input Home number to continue.','red');
        //     this._visibleLoading(false)
        //     return false; 
        // }
        // if(!street_no){ 
        //     this._toastMessage('please input Street number to continue.','red');
        //     this._visibleLoading(false)
        //     return false; 
        // }
        if(!location || !location.latitude || !location.longitude){
            this._toastMessage('please choose the location to continue','red');
            this._visibleLoading(false)
            return false; 
        }
        if(selected_images&&selected_images.length&&selected_images.length>5){ 
            this._toastMessage('the maximum images is 5. please remove some image to continue','red');
            this._visibleLoading(false)
            return false;  
        }
        if(properties&&properties.filter(p=>{
            return p.location==location
        }).length){  
            this._toastMessage('this property already exist','red');
            this._visibleLoading(false)
            return false;  
        }

        // condition on image
        var fs_images = [];
        var promise = new Promise(function(resolve) {
            if(choosed.selected_images&&choosed.selected_images.length){
                choosed.selected_images.map((img,i)=>{
                    var promissSaveImage = new Promise(function(resolveSaveImage) {
                        var image_path = `${RNFS.DocumentDirectoryPath}/${new Date().getFullYear()}${new Date().getMonth()+1}${new Date().getDate()}${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}_${(i+1)}.jpeg`;
                        RNFS.writeFile(image_path, img, 'base64')
                        .then((success) => { 
                            resolveSaveImage(success)
                            fs_images.push(image_path);
                        })
                        .catch((err) => {
                            resolveSaveImage(err)
                            alert(err.message);
                        });
                    })
                    promissSaveImage.then(()=>{
                        if((i+1)==choosed.selected_images.length){
                            resolve(true);
                        }
                    })
                }); 
                
            }else{
                resolve(true);
            }
        })
        promise.then(()=>{
            choosed['selected_images'] = fs_images;
            // store to storage
            var newPropeies = properties.map(p=> {
                if(p.id==choosed.id){
                    (p.selected_images&&p.selected_images.length)&&p.selected_images.map(image=>{
                        new Promise(function(resolve, reject) {
                            RNFS.exists(image).then(()=>{
                              RNFS.unlink(image).then(() => { resolve(true); })
                            }).catch(error => { reject(error) });
                        })
                    })
                    return choosed;
                }else{
                    return p;
                }
            });
            setTimeout(()=>{ 
                this.onSuccess();
                storeData('propertiesData',newPropeies); 
            },500);
            this.setState({
                ...this.state, loadingDialog: false,
            })
        })
    } 

    async onSuccess(){
        const {navigation} = this.props; 
        this._toastMessage('property has been updated.','green');
        navigation.navigate('PropertyListScreen',{refresh: true});
    }

    _toastMessage(message,color){
        Toast.show(message, {
            backgroundColor: color, opacity: 0.8,
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true, animation: true, hideOnPress: true, delay: 1000,
        });
    }

    render() {
        const {choosed,loadingDialog,address}=this.state;
        return (
            <LayoutContainer loadingDialog={loadingDialog}>
                <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
                    <View style={styles.container}>
                        <RenderPropertyDataEdit
                            options={options}
                            choosed={choosed}
                            address={address}
                            onChangeInput={this.onChangeInput.bind(this)}
                            onChangeInputNested={this.onChangeInputNested.bind(this)}
                            onOpenCamera={this.onOpenCamera.bind(this)}
                            onUploadImage={this.onUploadImage.bind(this)}
                            onDeleteTmpImage={this.onDeleteTmpImage.bind(this)}
                            onAddStory={this.onAddStory.bind(this)}
                            onRemoveStory={this.onRemoveStory.bind(this)}
                            onGoToPin={this.onGoToPin.bind(this)}
                        />
                    </View>
                </ScrollView>
                <View style={{ height: 55, paddingHorizontal: 5, borderTopWidth: 1.2, borderTopColor: primaryBg }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 3 }}>
                            <CustomButton text="save" onPress={()=>{ this.onSave(); allowSave=false; setTimeout(()=>{allowSave=true},3000); }}/>
                        </View>
                    </View>
                </View>
                <View style={styles.boxBackground}></View>
            </LayoutContainer>
        );
    }
}
const styles = StyleSheet.create({
    scrollView: {
        margin: 0, backgroundColor: 'rgba(0,0,0,0)'
    },
    container:{
        flex: 1,
    },
    boxBackground:{
        position: 'absolute', zIndex: -1,
        backgroundColor: primaryBg, width: '100%', height: 100,
        borderBottomLeftRadius: 50, borderBottomRightRadius: 50
    }
});
export default PropertyEditScreen;

