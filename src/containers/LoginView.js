import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TextInput,
  Alert,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import { Actions } from 'react-native-router-flux';
import ApiUtils from '../../helpers/ApiUtils.js';
import Spinner from 'react-native-loading-spinner-overlay';

import { AppStyles, AppSizes, AppColors } from '@theme/';
import CustomTextInput from '@components/CustomTextInput';

export default class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showError:false,
      errorDescription:"",
      email:"espoz6@gmail.com",
      password:"Demo123*",
      loading:false
    };
    this.setValue = this.setValue.bind(this);
  }

  onPressLogin = () => {
    this.setState({
     loading:true
    });
    // Actions.dashboard();
    ApiUtils.login(this.state.email, this.state.password)
    .then((responseJson) => {
      AsyncStorage.setItem("token", responseJson.token);
      this.setState({
        loading:false
      }, function(){
        Actions.dashboard();
      });

    }).catch((error) => {
        this.setState({
          error:true,
          errorDescription: error.response,
          loading:false
        });
    });
  }

  onPressRegister = () => {
    // Actions.register();
      Actions.signup();
  }

  onPressForgotPassword = () => {
    Actions.forgot();
  }

  setValue(type, value) {
      this.setState({
          [type]: value
      });
  }

  render(){

        let error = null;
        if (this.state.errorDescription != '') {
            error = (<Text
                style={{color: 'red'}}>
                {this.state.errorDescription}
            </Text>);
        }

        return (
            <View style={[styles.container, AppStyles.container, styles.background]}>
                <Spinner visible={this.state.loading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                <Image
                    source={require('../images/logo.png')}
                    style={[styles.logo]}
                    />

                <CustomTextInput
                    label={"Username"}
                    placeholder={"E-mail or username"}
                    initial={this.state.email}
                    type="email"
                    secure={false}
                    icon={require('../images/icons/user.png')}
                    style={styles.icon_user}
                    setValue={this.setValue}
                />

                <CustomTextInput
                    label={"Password"}
                    placeholder={"Type password"}
                    initial={this.state.password}
                    secure={true}
                    type="password"
                    icon={require('../images/icons/password.png')}
                    style={styles.icon_pwd}
                    setValue={this.setValue}
                />

                    {error}
                <TouchableOpacity onPress={this.onPressLogin}>
                    <Text p style={[styles.loginButton, AppStyles.centerAligned]}>Log in</Text>
                </TouchableOpacity>
                <Button
                    color="#6162FF"
                    onPress={this.onPressForgotPassword}
                    title="Forgot password"
                    />
                <View style={styles.footerBottom}>
                    <Text p style={styles.label}>Don't have an account?</Text>
                    <TouchableOpacity onPress={this.onPressRegister}>
                        <Text p style={styles.outlineButton}>Get started</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
  }

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 10
    },
    label: {
      fontSize: 16
    },
    icon_user: {
        width: 22,
        height: 22,
        position: 'absolute',
        bottom: 20,
        left: 5
    },
    icon_pwd: {
        width: 17,
        height: 25,
        position: 'absolute',
        bottom: 20,
        left: 7
    },
    background: {
        backgroundColor: AppColors.background,
        height: AppSizes.screen.height,
        width: AppSizes.screen.width,
    },
    whiteText: {
        color: '#FFF',
    },
    logo: {
        width: AppSizes.screen.width * 0.4,
        resizeMode: 'contain',
    },
    control: {
      height: 40,
      width: AppSizes.screen.width * 0.85,
      marginBottom: 10,
      marginLeft:5,
      marginRight:5,
      borderWidth: 0,
      padding:5,
      paddingLeft: 25,
      borderBottomWidth: 1
    },
    loginButton: {
        width: AppSizes.screen.width * 0.85,
        backgroundColor: '#6162FF',
        color: '#FFF',
        fontSize: 18,
        padding: 10,
        margin: 20,
        textAlign: 'center',
        borderRadius: 10
    },
    footerBottom: {
        position: 'absolute',
        bottom: 30,
        flexDirection: 'row'
    },
    outlineButton: {
        color: '#6162FF',
        fontSize: 16,
        marginLeft: 5
    }
});
