import React, { Component } from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'

import NavigationBar from 'react-native-navbar';
import Tabs from 'react-native-tabs';
import { Actions } from 'react-native-router-flux';

import DashboardView from './DashboardView';
import ExcersiceView from './ExcersiceView';
import FoodView from './FoodView';
import ProgressView from './ProgressView';
import ProfileView from './ProfileView';

export default class MenuView extends Component {

  constructor(props) {
    super(props);
    this.state = {page:'DashboardView'};
  }

  onPressLogin = () => {
    Actions.login();
  }

  onTabChange = (el) => {
      this.setState({page:el.props.name})
  }

  renderPage = () => {
      switch(this.state.page){
          case 'DashboardView':
              return (<DashboardView/>);
          case 'ExcersiceView':
              return (<ExcersiceView/>);
          case 'FoodView':
              return (<FoodView/>);
          case 'ProgressView':
              return (<ProgressView/>);
          case 'ProfileView':
              return (<ProfileView/>);
      }
  }

  render(){

        return (
            <View style={styles.container}>
              <Tabs selected={this.state.page} style={{backgroundColor:'white'}} selectedStyle={{color:'#09a9d3'}} onSelect={this.onTabChange}>
                  <Text name="DashboardView" selectedIconStyle={{borderTopWidth:2,borderTopColor:'#09a9d3'}}>Dashboard</Text>
                  <Text name="ExcersiceView" selectedIconStyle={{borderTopWidth:2,borderTopColor:'#09a9d3'}}>Excersice</Text>
                  <Text name="FoodView" selectedIconStyle={{borderTopWidth:2,borderTopColor:'#09a9d3'}}>Food</Text>
                  <Text name="ProgressView" selectedIconStyle={{borderTopWidth:2,borderTopColor:'#09a9d3'}}>Progress</Text>
                  <Text name="ProfileView" selectedIconStyle={{borderTopWidth:2,borderTopColor:'#09a9d3'}}>Profile</Text>
              </Tabs>

                {this.renderPage()}

            </View>
        );
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 5,
        zIndex:-1000
    }
});
