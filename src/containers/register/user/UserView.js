import React, { Component } from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput
} from 'react-native'

import { Actions } from 'react-native-router-flux';
import Constants from '../../../utils/Constants';
import Validations from '../../../utils/Validations';
import InputText from '../../../components/InputText';


export default class UserView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dirtyForm:false,
      differentPassword: false,
      name:{
        value:"",
        error:false
      },
      email:{
        value:"",
        error:false
      },
      password:{
        value:"",
        error:false
      },
      repeatPassword:{
        value:"",
        error:false
      }
    }
  }

  nextPreprocess = () => {

    this.validateAndTransition();
    //this.props.nextFn()
  }

  previousPreprocess = () => {

    //this.props.prevFn()
  }

  validateAndTransition = () => {
    this.setState({
      dirtyForm:true,
      differentPassword: this.state.password.value !== this.state.repeatPassword.value,
      name:{
        value:this.state.name.value,
        error:Validations.isEmpty(this.state.name.value)
      },
      email:{
        value:this.state.email.value,
        error:Validations.isEmpty(this.state.email.value)
      },
      password:{
        value:this.state.password.value,
        error:Validations.isEmpty(this.state.password.value)
      },
      repeatPassword:{
        value:this.state.repeatPassword.value,
        error:Validations.isEmpty(this.state.repeatPassword.value)
      }
    },function(){
      if(!this.state.name.error && !this.state.email.error && !this.state.password.error && !this.state.repeatPassword.error){
            this.props.saveState(2,this.state);
            this.props.nextFn();
      }
    })
  }



  render(){

        return (
            <View style={styles.container}>

            {this.state.differentPassword && this.state.dirtyForm ?
              (<Text>Password is not the same</Text>):(null)
            }

              <TextInput
                  ref={(r) => { this._textInputRef = r; }}
                  style={this.state.name.error ? Constants.Styles.validationError : Constants.Styles.control}
                  value={this.state.name.value}
                  placeholder={Constants.NAME}
                  maxLength = {30}
                  keyboardType = {"numeric"}
                  onChange={(text) => {
                    this.setState({
                      name:{
                        value:text,
                        error:Validations.isEmpty(text) && this.state.dirtyForm
                      }
                    });
              }}/>

              <TextInput
                  ref={(r) => { this._textInputRef = r; }}
                  style={this.state.email.error ? Constants.Styles.validationError : Constants.Styles.control}
                  value={this.state.email.value}
                  placeholder={Constants.EMAIL}
                  maxLength = {30}
                  keyboardType = {"numeric"}
                  onChange={(text) => {
                    this.setState({
                      email:{
                        value:text,
                        error:Validations.isEmpty(text) && this.state.dirtyForm
                      }
                    });
              }}/>

              <TextInput
                  ref={(r) => { this._textInputRef = r; }}
                  style={this.state.password.error ? Constants.Styles.validationError : Constants.Styles.control}
                  value={this.state.password.value}
                  placeholder={Constants.PASSWORD}
                  maxLength = {30}
                  keyboardType = {"numeric"}
                  onChange={(text) => {
                    this.setState({
                      differentPassword: this.state.password.value !== this.state.repeatPassword.value,
                      password:{
                        value:text,
                        error:Validations.isEmpty(text) && this.state.dirtyForm
                      }
                    });
              }}/>

              <TextInput
                  ref={(r) => { this._textInputRef = r; }}
                  style={this.state.repeatPassword.error ? Constants.Styles.validationError : Constants.Styles.control}
                  value={this.state.repeatPassword.value}
                  placeholder={Constants.REPEAT_PASSWORD}
                  maxLength = {30}
                  keyboardType = {"numeric"}
                  onChange={(text) => {
                    this.setState({
                      differentPassword: this.state.password.value !== this.state.repeatPassword.value,
                      repeatPassword:{
                        value:text,
                        error:Validations.isEmpty(text) && this.state.dirtyForm
                      }
                    });
              }}/>



              <Button
               onPress={this.nextPreprocess}
               title="Sing Up"
             />

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
