import React from 'react';
import RenderBoreyUpdate from '../../components/Borey/RenderBoreyUpdate';
import {primaryBg,color} from '../../../app.json';
import LayoutContainer from '../../components/Tools/RenderLayoutContainer';

class AddBorey extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: `Call Update`,
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
    const borey = navigation.getParam('borey');
    const property = navigation.getParam('property');
    return (
      <LayoutContainer loadingDialog={false}>
        <RenderBoreyUpdate borey={borey} property={property} navigation={navigation}/>
      </LayoutContainer>
    );
  }
}
export default AddBorey;

