import React, { Component } from 'react';
import NavigationBar from 'react-native-navbar';
import MultiStep from 'react-native-multistep-wizard';
import PersonalInfoView from './personalInfo/PersonalInfoView';
import GoalsView from './goals/GoalsView';
import UserView from './user/UserView';
import RecommendationsView from './recommendations/RecommendationsView';

import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert
} from 'react-native'

import { Actions } from 'react-native-router-flux';

const steps = [
              {name: 'RecommendationsView', component: <RecommendationsView/>},
              {name: 'PersonalInfoView', component: <PersonalInfoView/>},
              {name: 'ProfileView', component: <UserView/>},
              {name: 'GoalsView', component: <GoalsView/>}
            ];

UserView

const leftButtonConfig = {
  title: 'Back',
  handler: () => Actions.pop()
};

export default class RegisterView extends Component {

  constructor(props) {
    super(props);
  }

  onPressLogin = () => {
    Actions.login();
  }

  finish(wizardState){
    //code to be executed when wizard is finished
    console.log(wizardState);
    Alert.alert('Finish wizard');
  }

  render(){

        return (
            <View style={styles.container}>
              <NavigationBar
                      title={ {
                        title: "Register"
                      }}
                      leftButton={leftButtonConfig}
              />

              <MultiStep steps={steps} onFinish={this.finish}/>

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
