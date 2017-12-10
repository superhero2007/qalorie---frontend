import React, { Component } from 'react';

import {
  View,
  TextInput,
  StyleSheet,
  Text
} from 'react-native'

import Constants from '../utils/Constants';
import Validations from '../utils/Validations';

export default class InputText extends Component {

  constructor(props) {
    super(props);
  }

  render(){

        return (
          <View>
            <TextInput
                style={this.props.showError ? styles.validationError : styles.control}
                placeholder={this.props.placeholder}
                value={this.props.value}
                keyboardType = {this.props.keyboardType}
                maxLength = {this.props.maxLength}
                secureTextEntry={this.props.secureTextEntry}
                onChange={(text) => {
                    this.props.onChange(text.nativeEvent.text);
                }}/>

              {this.props.showError ?
                (<Text>{this.props.message}</Text>)
                :
                (null)
              }


          </View>


        );
  }

}

const styles = StyleSheet.create({
  componentStyle: {
      borderColor:'grey',
      borderWidth:1,
      width:'auto',
      height:'auto'
  },
  validationError: {
      height: 40,
      marginTop:10,
      marginLeft:5,
      marginRight:5,
      borderColor: '#C7D6DE',
      borderWidth: 1,
      padding:5,
      borderColor:'red',
      borderWidth:1
  },
  control: {
    height: 40,
    marginTop:10,
    marginLeft:5,
    marginRight:5,
    borderColor: '#C7D6DE',
    borderWidth: 1,
    padding:5
  }
});
