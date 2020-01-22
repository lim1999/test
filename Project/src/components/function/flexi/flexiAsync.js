import AsyncStorage from '@react-native-community/async-storage';

// conver data to sting and store
async function storeData(key,value) {
    try {
        var value = JSON.stringify(value);
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        alert(e);
    }
}

const getData = async key => {
    try {
        const getData = await AsyncStorage.getItem(key);
        return JSON.parse(getData);
    } catch (e) {
        alert(e);
    }
}

export {
    storeData,
    getData,
};