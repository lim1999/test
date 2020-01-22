import React, {Fragment} from 'react';
import {View,Linking,Platform,SafeAreaView} from 'react-native';
import Toast from 'react-native-root-toast';
import RenderBoreyUpdateForm from './RenderBoreyUpdateForm';
import { storeData,getData  } from '../../components/function/flexi/flexiAsync';
import LoadingDialog from '../Tools/RenderLoadingDialog';
import CustomButton from '../Controls/Button';
import ImagePicker from 'react-native-image-crop-picker';
import {primaryBg,productName} from '../../../app.json';
import RNFS from 'react-native-fs';
import {_isEmail} from '../function/flexi/flexiFunction'; 
var allowSave = true;

class BoreyUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingDialog: true,
            choosed: {
                ...props.property
            }
        }
    };  

    componentDidMount(){
        const {choosed} = this.state;
        let ImagesList = [];
        let loadImage = new Promise(function(resolveLoadImage) {
            (choosed.selected_images&&choosed.selected_images.length)?choosed.selected_images.map((img,i)=>{
                let promise = new Promise(function(resolve) {
                    RNFS.exists(img).then(()=>{
                        RNFS.readFile(img, 'base64').then((img) => { 
                            resolve(img); 
                        })
                    }).catch(error => { resolve(error); });
                })
                promise.then(img => {
                    if((i+1)==choosed.selected_images.length){ resolveLoadImage(true) } 
                    ImagesList.push(img);
                })
            }):(
                resolveLoadImage(true)
            );
        })
        loadImage.then(()=>{
            this.setState({
                ...this.state,
                loadingDialog: false,
                choosed: { ...this.state.choosed, selected_images:ImagesList }
            });
        })
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
        navigation.navigate('AddBoreyLocation',{ region:choosed.latlng,goBack: 'BoreyUpdate' });
    }
 
    // when save data to async
    async onSave(){
        this.setState({ ...this.state, loadingDialog: true, })
        const {choosed} = this.state;
        const {selected_images,email_address} = choosed;
        choosed['sync']='';

        // validate if iamges more than 5
        if(selected_images&&selected_images.length&&selected_images.length>5){ 
            this._toastMessage('the maximum images is 5. please remove some image to continue.','red');
            this._visibleLoading(false)
            return false;  
        }

        // if invalid email address
        if(email_address&&!_isEmail(email_address)){
            this._toastMessage('the given Email Address is invalid.','red');
            this._visibleLoading(false)
            return false;  
        }

        // condition on image
        var fs_images = [];
        var promise = new Promise(function(resolve) {
            if(choosed.selected_images&&choosed.selected_images.length){
                choosed.selected_images.map((img,i)=>{
                    var promissSaveImage = new Promise(function(resolveSaveImage, rejectSaveImage) {
                        var image_path = `${RNFS.DocumentDirectoryPath}/${new Date().getFullYear()}${new Date().getMonth()+1}${new Date().getDate()}${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}_${(i+1)}.jpeg`;
                        RNFS.writeFile(image_path, img, 'base64')
                        .then((success) => {
                            resolveSaveImage(success);
                            fs_images.push(image_path);
                        })
                        .catch((err) => {
                            rejectSaveImage(err);
                            alert(err.message);
                        });
                    })
                    promissSaveImage.then(()=>{
                        if((i+1)==choosed.selected_images.length){ resolve(true) }
                    })
                });
            }else{
                resolve(true);
            }
        })
        promise.then(()=>{
            this.setState({ ...this.state, loadingDialog: false });
            choosed['selected_images'] = fs_images;
            getData('properties').then(properties=>{
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
                storeData('properties',newPropeies).then(()=>{
                    setTimeout(()=>{ 
                        this.onSuccess();
                    },500);
                    this.setState({ ...this.state, loadingDialog: false, })
                });
            });
        })
    }

    onCallOwner(){
        const {choosed} = this.state;
        var phone= choosed.mobile_phone?choosed.mobile_phone:choosed.secondary_phone;
        if (Platform.OS !== 'android') { phoneNumber = `telprompt:${phone?phone:0}`; }else{ phoneNumber = `tel:${phone?phone:0}`; }
        Linking.canOpenURL(phoneNumber)
        .then(supported => {
            if (!supported) {
                this._toastMessage('The phone number is not available.','red');
            } else {
                return Linking.openURL(phoneNumber);
            }
        })
        .catch(err => console.log(err));
    }
 
    // choose image and save as base64 
    async onUploadImage(){
        const {selected_images} = this.state.choosed;
        await ImagePicker.openPicker({
            path: 'Photos',
            maxFiles: 5,
            includeBase64: true,
            mediaType: 'photo',
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

    // when save success need to clear text box and redirect
    onSuccess(){
        const {navigation} = this.props;
        const routeBack = `${navigation.getParam('routeBack')}`;
        this._toastMessage(productName+' saved.','green');
        navigation.navigate(routeBack,{refresh:true}); 
    }

    _visibleLoading(status){
        this.setState({
            ...this.state,
            loadingDialog: status
        });
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
                    <RenderBoreyUpdateForm 
                        navigation={navigation}
                        borey={borey} 
                        choosed={choosed}
                        onOpenCamera={this.onOpenCamera.bind(this)}
                        onDeleteTmpImage={this.onDeleteTmpImage.bind(this)}
                        onUploadImage={this.onUploadImage.bind(this)}
                        onChangeInput={this.onChangeInput.bind(this)}
                        onGoToPin={this.onGoToPin.bind(this)}
                    />
                    <View style={{ height: 55, paddingHorizontal: 5, borderTopWidth: 1.2, borderTopColor: primaryBg }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 3 }}>
                                <CustomButton text="call" onPress={()=>this.onCallOwner()}/>
                            </View>
                            <View style={{ flex: 3 }}>
                                <CustomButton  text="save" onPress={()=>{ allowSave&&this.onSave(); allowSave=false; setTimeout(()=>{allowSave=true},3000); }}/>
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
export default BoreyUpdate;

