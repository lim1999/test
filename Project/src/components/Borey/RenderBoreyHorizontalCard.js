import React, {Fragment} from 'react';
import { StyleSheet, View, Text } from 'react-native';
class BoreyHorizontalCard extends React.Component {
    render() {
        const {borey} = this.props;
        return (
            <Fragment>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionDescription}>{borey.display_name&&borey.display_name}</Text>
                </View>
            </Fragment>
        ); 
    }
}
const styles = StyleSheet.create({
    sectionContainer:{
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.7,
        position: 'relative'
    },
    sectionLabel:{
        position: 'absolute',
        height: 30, width: 30, 
        textAlign: 'center',
        borderRadius: 50,
        paddingTop: 14,
        fontWeight: 'bold'
    },
    sectionDescription:{
        color: '#222', 
        paddingVertical: 15,
        paddingHorizontal: 10,
        fontSize: 14,
    }
});
export default BoreyHorizontalCard;

