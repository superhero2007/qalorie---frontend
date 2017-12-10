import React, { Component } from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'

import InputText from '../../../components/InputText';

export default class ImperialView extends Component {

  constructor(props) {
    super(props);
  }

  render(){
        return (
            <View style={styles.container}>

              <InputText
                style={styles.control}
                value={this.props.valueFt}
                placeholder={"ft"}
                keyboardType = "numeric"
                maxLength = {1}
                showError={this.props.valueFtError}
                onChange={(value) => {
                  this.props.onChange("ft", value);
                }}/>

              <InputText
                  style={styles.control}
                  value={this.props.valueIn}
                  placeholder={"in"}
                  keyboardType = "numeric"
                  maxLength = {1}
                  showError={this.props.valueInError}
                  onChange={(value) => {
                    this.props.onChange("in", value);
                  }}/>

              <InputText
                  style={styles.control}
                  value={this.props.valueWeightLbs}
                  placeholder={"lbs"}
                  keyboardType = "numeric"
                  maxLength = {3}
                  showError={this.props.valueWeightLbsError}
                  onChange={(value) => {
                    this.props.onChange("weightLbs", value);
                  }}/>

              <InputText
                  style={styles.control}
                  value={this.props.valueDesiredWeightLbs}
                  placeholder={"lbs"}
                  keyboardType = "numeric"
                  maxLength = {3}
                  showError={this.props.valueDesiredWeightLbsError}
                  onChange={(value) => {
                    this.props.onChange("desiredWeightLbs", value);
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
