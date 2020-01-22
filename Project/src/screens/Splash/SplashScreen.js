import React from 'react';
import { View, Image, Text } from 'react-native';
import {primaryBg} from '../../../app.json';

class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
    } 
    performTimeConsumingTask = async() => {
        return new Promise((resolve) =>
            setTimeout(
                () => { resolve('result') },
                2000
            )
        )
    }

    async componentDidMount() {
        const data = await this.performTimeConsumingTask();
        this.props.navigation.navigate('App');
    }

    renderImage(){
        var imageSrc=require('../../images/Logo/logo.png');
        return (
            <Image 
                source={imageSrc}                
                style={styles.image}
            />
        )
    }
    
    render() {
        return (
            <View style={styles.viewStyles}>
                {this.renderImage()}
                <Text style={styles.textStyles}>VTrust Data Collection</Text>
            </View>
        );
    }
}

const styles = {
    viewStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    textStyles: {
        marginTop: 10,
        color: primaryBg,
        fontWeight: 'bold'
    },
    image:{
        width: 150, 
        height: 100,
    },
}

export default SplashScreen;