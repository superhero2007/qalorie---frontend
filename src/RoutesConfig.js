import React, { Component } from 'react';

import IndexView from '@containers/IndexView';
import LoginView from '@containers/LoginView';
import RegisterView from '@containers/register/RegisterView';
import SignupView from '@containers/signup/SignupView';
import ForgotPasswordView from '@containers/ForgotPasswordView';
import MenuView from '@containers/dashboard/MenuView';
import Suggest from '@containers/Suggest';

import {Scene, Router} from 'react-native-router-flux';

const getSceneStyle = (props, computedProps) => {
  const style = {
    flex: 1
  };
  return style;
};


export default class RoutesConfig extends Component {

  constructor(props){
    super(props);
  }


  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="index" component={IndexView} initial={true} hideNavBar hideTabBar/>
          <Scene key="login" component={LoginView} hideNavBar hideTabBar/>
          <Scene key="forgot" component={ForgotPasswordView} hideNavBar hideTabBar/>
          <Scene key="register" component={RegisterView} hideNavBar hideTabBar/>
          <Scene key="signup" component={SignupView} hideNavBar hideTabBar/>
          <Scene key="dashboard" component={MenuView} hideNavBar hideTabBar/>
          <Scene key="suggest" component={Suggest} hideNavBar hideTabBar/>
        </Scene>
      </Router>
    )
  }
}
