import React from 'react';
import RenderBoreyAdd from '../../components/Borey/RenderBoreyAdd';
import {primaryBg,color} from '../../../app.json';
import LayoutContainer from '../../components/Tools/RenderLayoutContainer';

class AddBorey extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: `${navigation.getParam('title','N/A').toUpperCase()}`,
    headerStyle: {
      backgroundColor: `${primaryBg}`,
    },
    headerTintColor: `${color}`,
  });
  constructor(props) {
    super(props);
    this.state = {
        
    }
  };  
  render() {
    const { navigation } = this.props;
    const borey = navigation.getParam('borey',{});
    return (
      <LayoutContainer loadingDialog={false}>
        <RenderBoreyAdd borey={borey} navigation={navigation}/>
      </LayoutContainer>
    );
  }
}
export default AddBorey;

