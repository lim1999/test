import {Alert,BackHandler} from 'react-native';
function _splitMessageError(errors){
    if(errors){
        messageError = errors.map((error)=>{
            return '-'+error+'\r\n';
        });
        return messageError;
    }else{
        return '';
    }
}

function _isNumber(txt){
    let num = txt.replace(".", '');
    if(txt&&txt.charAt(0)=='.'){ return false; }
    if(txt.split('.')&&txt.split('.').length>2){ return false; }
    if(!isNaN(num)){
        return true;
    }else{
        return false;
    }
}

// confirm exit box
function _confirmExit(navigation) {
    if(navigation.dangerouslyGetParent().state.index==0 && navigation.state.routeName=="HomeList"){
        Alert.alert(
            'Exit App',
            'Exiting the application?', [{
                text: 'Cancel',
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
            }, ], {
                cancelable: false
            }
        )
    }else{
        navigation.goBack(null);
    }
}
function _isEmail(text){
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(text) === false) {
        return false;
    }
    else{
        return true;
    }
}
export {_splitMessageError,_isNumber,_isEmail,_confirmExit};