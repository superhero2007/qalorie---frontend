import React, { Component } from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'

import InputText from '../../../components/InputText';

export default class MetricView extends Component {

  constructor(props) {
    super(props);
  }

  render(){
    console.log(this.props);
        return (
            <View style={styles.container}>

              <InputText
                style={styles.control}
                value={this.props.valueCms}
                placeholder={"cms"}
                keyboardType = {"numeric"}
                maxLength = {3}
                validationError={this.props.valueCmsError}
                onChange={(value) => {
                  this.props.onChange("cms", value);
                }}/>

              <InputText
                  style={styles.control}
                  value={this.props.valueWeightKg}
                  placeholder={"kg"}
                  keyboardType = {"numeric"}
                  maxLength = {3}
                  showError={this.props.valueWeightKgError}
                  onChange={(value) => {
                    this.props.onChange("weightKg", value);
                  }}/>

              <InputText
                  style={styles.control}
                  value={this.props.valueDesiredWeightKg}
                  placeholder={"kg"}
                  keyboardType = {"numeric"}
                  maxLength = {3}
                  showError={this.props.valueDesiredWeightKgError}
                  onChange={(value) => {
                    this.props.onChange("desiredWeightKg", value);
                  }}/>


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
