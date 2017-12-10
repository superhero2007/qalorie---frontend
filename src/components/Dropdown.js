import React, { Component } from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'

import ModalDropdown from 'react-native-modal-dropdown';

export default class Dropdown extends Component {

  constructor(props) {
    super(props);
  }

  render(){
        return (
          <ModalDropdown
              defaultIndex={1}
              defaultValue={this.props.defaultValue}
              style={styles.dropdown_2}
              textStyle={styles.dropdown_2_text}
              dropdownStyle={styles.dropdown_2_dropdown}
              options={this.props.data}
              onSelect={(idx, value) => {
                this.props.onChange(idx, value);
              }}/>
        );
  }

}

const styles = StyleSheet.create({
  style:{
    borderWidth:1,
    borderColor:'grey',
    height: 40,
    marginTop:10,
    marginLeft:5,
    marginRight:5,
    borderWidth: 1
  },
  dropdownStyle: {
      width:'100%',
      height:'auto',
      fontSize:40
  },
  cell: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
  },
  dropdown_2: {
    borderWidth: 0,
    backgroundColor: 'cornflowerblue',
  },
  dropdown_2_text: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dropdown_2_dropdown: {
    width: '100%',
    height: 300,
    borderColor: 'cornflowerblue',
    borderWidth: 1,
    marginRight:5
  }
});
