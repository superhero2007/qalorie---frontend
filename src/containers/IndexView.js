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

export default class IndexView extends Component {

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

  onPressLogin = () => {
      Actions.login();
  }

  onPressSignup = () => {
      Actions.signup();
  }

  onPressFacebook = () => {
  }


  setValue(type, value) {
      this.setState({
          [type]: value
      });
  }

  render(){


        return (
            <View style={[styles.container, AppStyles.container, styles.background]}>
              <Spinner visible={this.state.loading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
              <Image
                source={require('../images/logo.png')}
                style={[styles.logo]}
              />

              <View style={styles.footerBottom}>

                <TouchableOpacity onPress={this.onPressSignup}>
                  <Text p style={[styles.singupButton, AppStyles.centerAligned]}>Sign Up Free</Text>
                </TouchableOpacity>

                <View style={styles.lineText}>
                  <View style={styles.line} />
                  <Text style={styles.middleText}>OR</Text>
                  <View style={styles.line} />
                </View>

                <TouchableOpacity onPress={this.onPressFacebook}>
                  <View style={styles.facebookDiv}>
                    <Text p style={[styles.facebookButton, AppStyles.centerAligned]}>
                      <Image
                        source={require('../images/icons/facebook.png')}
                        style={[styles.icon_facebook]}
                        />
                      Sign Up with Facebook
                    </Text>
                  </View>
                </TouchableOpacity>

                <View style={{flexDirection: 'row'}}>
                  <Text p style={styles.label}>Already a user?</Text>
                  <TouchableOpacity onPress={this.onPressLogin}>
                    <Text p style={styles.outlineButton}>Log in</Text>
                  </TouchableOpacity>
                </View>

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
    background: {
      backgroundColor: AppColors.background,
      height: AppSizes.screen.height,
      width: AppSizes.screen.width,
    },
    logo: {
      width: AppSizes.screen.width * 0.4,
      resizeMode: 'contain',
    },
    icon_facebook: {
      width: 30,
      height: 30,
      margin: 3,
      position: 'absolute',
      left: 0
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
    singupButton: {
      width: AppSizes.screen.width * 0.85,
      backgroundColor: '#6162FF',
      color: '#FFF',
      fontSize: 16,
      padding: 14,
      margin: 10,
      textAlign: 'center',
      borderRadius: 10
    },
    lineText: {
      width: AppSizes.screen.width * 0.85,
      flexDirection: 'row', 
      flexWrap: 'wrap',
      height: 40
    },
    line: {
      borderBottomColor: '#AAAAAA',
      borderBottomWidth: 1,
      flex: 1,
      height: 10,
      marginTop: 17
    },
    facebookDiv: {
      width: AppSizes.screen.width * 0.85,
      backgroundColor: '#427DC2',
      padding: 10,
      marginBottom: 30,
      marginTop: 20
    },
    facebookButton: {
      color: '#FFF',
      fontSize: 16,
      textAlign: 'center'
    },
    middleText: {
      color: '#AAAAAA',
      fontSize: 18,
      padding: 15,
      height: 50
    },
    footerBottom: {
      alignItems: 'center',
      position: 'absolute',
      bottom: 40
    },
    outlineButton: {
      color: '#6162FF',
      fontSize: 16,
      marginLeft: 5
    }
});
