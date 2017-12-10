import React, { Component } from 'react';

import {
  View,
  TextInput,
  StyleSheet,
  Button
} from 'react-native'

export default class Steps extends Component {

  constructor(props) {
    super(props);
  }

  render(){
        return (
            <View style={styles.container}>
              <Button
               onPress={this.props.onSelectStep.bind(null,1)}
               title="1"/>
              <Button
               onPress={this.props.onSelectStep.bind(null,2)}
               title="2"/>
              <Button
               onPress={this.props.onSelectStep.bind(null,3)}
               title="3"/>
            </View>
        );
  }

}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection:"row"
  }
});
