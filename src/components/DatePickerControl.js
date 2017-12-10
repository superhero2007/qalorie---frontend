import React, { Component } from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'

import DatePicker from 'react-native-datepicker';

export default class DatePickerControl extends Component {

  constructor(props) {
    super(props);
  }

  render(){
        return (
          <DatePicker
              style={this.props.validationError ? styles.validationError : styles.componentStyle}
              date={this.props.date}
              mode="date"
              placeholder={this.props.placeholder}
              format="YYYY-MM-DD"
              minDate="1900-01-01"
              maxDate="2226-12-12"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(text) => {
                this.props.onChange(text);
              }}
          />
        );
  }

}

const styles = StyleSheet.create({
  componentStyle: {
      width:'auto',
      height:'auto'
  },
  validationError:{
    borderWidth:1,
    borderColor:'red',
    width:'auto',
    height:'auto'
  }
});
