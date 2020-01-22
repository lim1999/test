import React, {Fragment} from 'react';
import {StyleSheet,View,TouchableWithoutFeedback,Text} from 'react-native';
import BoreyCard from './RenderBoreyHorizontalCard';
class BoreyGListAll extends React.Component {
    render() {
        const {boreys,routeName,navigation,loadingDialog} = this.props;
        const boreyList = (boreys&&boreys.length)?boreys.map(borey=>{
            return (
                <View style={styles.col} key={borey.id}>
                    <TouchableWithoutFeedback onPress={()=>{
                            routeName==="BoreyList"&&navigation.navigate(routeName,{
                                title: borey.name,
                                boreys: borey.boreys,
                            });
                            routeName==="BoreyDetail"&&navigation.navigate(routeName,{
                                title: borey.name,
                                borey: borey,
                            });
                        }}>
                        <View>
                            <BoreyCard borey={borey}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )
        }):(
            loadingDialog?<></>:<Text style={{ textAlign: 'center', width: '100%' , paddingVertical: 100, color: '#444' }}>No borey.</Text>
        )
        return (
            <Fragment>
                <View style={styles.row}>
                    {boreyList}
                </View>
            </Fragment>
        );
    }
}
const styles = StyleSheet.create({
    row:{ 
        flex: 1, 
        flexWrap: 'wrap',
        padding: 5,
    },
    col:{
        width: '100%',
    },
});
export default BoreyGListAll;

