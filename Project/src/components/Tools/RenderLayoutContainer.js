import React, {Fragment} from 'react';
import { StyleSheet, View,KeyboardAvoidingView,Platform } from 'react-native';
import { NavigationEvents } from "react-navigation";
import {SafeAreaView} from 'react-navigation';
import LoadingDialog from './RenderLoadingDialog';
import { Header } from 'react-navigation-stack';

class LayoutContainer extends React.Component {
  render() {
    console.disableYellowBox = true;
    const {loadingDialog,children,_refresh} = this.props;
    return (
      <Fragment>
        {/* <SafeAreaView style={{ flex: 1}}> */}
          <KeyboardAvoidingView style={styles.container} behavior="height" enabled={true} keyboardVerticalOffset={Platform.OS === "ios"?(Header.HEIGHT-20):-500}>
            <View style={styles.container}>
              {children}
              <LoadingDialog visible={loadingDialog}/>
            </View>
          </KeyboardAvoidingView>
          <NavigationEvents onWillFocus={() => _refresh&&_refresh() } />
        {/* </SafeAreaView> */}
      </Fragment>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: `#fff`,
  },
});
export default LayoutContainer;

