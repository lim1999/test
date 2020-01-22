import React, {Fragment} from 'react';
import {View,SafeAreaView} from 'react-native';
import Toast from 'react-native-root-toast';
import RenderBoreyAddForm from './RenderBoreyAddForm';
import { storeData,getData  } from '../../components/function/flexi/flexiAsync';
import ImagePicker from 'react-native-image-crop-picker';
import LoadingDialog from '../Tools/RenderLoadingDialog';
import CustomButton from '../Controls/Button';
import {primaryBg,productName} from '../../../app.json';
import RNFS from 'react-native-fs';
var allowSave = true;

class BoreyDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingDialog: false,
            choosed: {
                id: `${new Date().getFullYear()}${new Date().getMonth()+1}${new Date().getDate()}${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}`,
                parent_id: props.borey.id,
                house_no: null,
                street_no: null,
                latlng: null,

                rental_price: null,
                sale_price: null,
                list_price: null,
                sold_price: null,
                financing_price: null,

                owner_name: null,
                mobile_phone: null,
                secondary_phone: null,
                email_address: null,
 
                selected_images: [],

                note: null
            }
        }
    }; 
    
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
        this.setState({
            ...this.state,
            choosed:{
                ...this.state.choosed,
                [target]:value
            }
        });
    }
  
    // when go to location screen
    async onGoToPin(){
        const {choosed} = this.state;
        const {navigation} = this.props;
        navigation.navigate('AddBoreyLocation',{ region:choosed.latlng,goBack: 'AddBorey' });
    }

    _visibleLoading(status){
        this.setState({
            ...this.state,
            loadingDialog: status
        });
    }

    // when save data to async
    async onSave(action){
        await this._visibleLoading(true);
        const {choosed} = this.state;
        choosed['id'] = `${new Date().getFullYear()}${new Date().getMonth()+1}${new Date().getDate()}${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}`;
        var properties = (await getData('properties'));
        
        // validation
        const {house_no,street_no,parent_id,selected_images} = choosed;
        if(!house_no){ 
            this._toastMessage('please input Home number to continue.','red');
            this._visibleLoading(false)
            return false; 
        }
        if(!street_no){ 
            this._toastMessage('please input Street number to continue.','red');
            this._visibleLoading(false)
            return false; 
        }
        if(!parent_id){ 
            this._toastMessage('please input Parent to continue.','red');
            this._visibleLoading(false)
            return false;  
        } 
        if(selected_images&&selected_images.length&&selected_images.length>5){ 
            this._toastMessage('the maximum images is 5. please remove some image to continue','red');
            this._visibleLoading(false)
            return false;  
        }
        if(properties&&properties.filter(p=>{
            return p.house_no==house_no&&p.street_no==street_no&&p.parent_id==parent_id
        }).length){  
            this._toastMessage('this '+productName+' already exist','red');
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
            var newPropeies = properties?[choosed,...properties]:[choosed];
            setTimeout(()=>{ 
                this.onSuccess(action,newPropeies.length-1);
                storeData('properties',newPropeies); 
            },500);
            this.setState({
                ...this.state, loadingDialog: false,
            })
        })
    }
 
    // when save success need to clear text box and redirect
    async onSuccess(action,i){
        const {choosed} = this.state;
        const {borey} = this.props;
        const {navigation} = this.props;
        const updateParams = { 
            routeBack: 'BoreyDetail',
            borey:{address:`${borey.name}, ${choosed.house_no&&'#'+choosed.house_no+','} ${choosed.street_no&&'St. '+choosed.street_no+', '} ${borey.city&&borey.city}`, 
            profiles:choosed.selected_images&&choosed.selected_images[0]?`${Platform.OS !== "ios"?'file://':''}${choosed.selected_images[0]}`:null},
            property:choosed 
        };
        this.setState({
            choosed: {
                parent_id: this.props.borey.id,
                house_no: null,
                street_no: null,
                latlng: null,
                selected_images: [],
                mobile_phone: null,
                secondary_phone: null,
                note: null
            }
        });   
        this._toastMessage(productName+' saved.','green');
        if(action==='back'){ navigation.navigate('BoreyDetail',{refresh:true}); }
        if(action==='new'){ navigation.setParams({ refresh: true }); }
        if(action==='update'){ navigation.navigate('BoreyUpdate',updateParams) }
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
        const {choosed,loadingDialog} = this.state;
        const {borey,navigation} = this.props;
        return ( 
            <Fragment> 
                <View style={{ flex: 1 }}>
                    <RenderBoreyAddForm 
                        navigation={navigation}
                        borey={borey} 
                        choosed={choosed}
                        onChangeInput={this.onChangeInput.bind(this)}
                        onOpenCamera={this.onOpenCamera.bind(this)}
                        onUploadImage={this.onUploadImage.bind(this)}
                        onDeleteTmpImage={this.onDeleteTmpImage.bind(this)}
                        onGoToPin={this.onGoToPin.bind(this)}
                    />
                    <View style={{ height: 55, paddingHorizontal: 5, borderTopWidth: 1.2, borderTopColor: primaryBg }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 3 }}>
                            <CustomButton text="save" onPress={()=>{ allowSave&&this.onSave("back"); allowSave=false; setTimeout(()=>{allowSave=true},3000); }}/>
                            </View>
                            <View style={{ flex: 3 }}>
                            <CustomButton  text="save & new" onPress={()=>{ allowSave&&this.onSave("new"); allowSave=false; setTimeout(()=>{allowSave=true},3000); }}/>
                            </View>
                            <View style={{ flex: 3 }}>
                            <CustomButton  text="save & update" onPress={()=>{ allowSave&&this.onSave("update"); allowSave=false; setTimeout(()=>{allowSave=true},3000); }}/>
                            </View>
                        </View>
                    </View>
                    <SafeAreaView style={{ flex: 1 }}>
                        <LoadingDialog visible={loadingDialog}/>
                    </SafeAreaView>
                </View>
            </Fragment> 
        );
    }
}
export default BoreyDetail;

