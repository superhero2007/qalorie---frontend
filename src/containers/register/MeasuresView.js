import React, { Component } from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'

import { Actions } from 'react-native-router-flux';

export default class MeasuresView extends Component {

  constructor(props) {
    super(props);
  }

  nextPreprocess = () => {
    // Go to next step
    this.props.nextFn()
  }

  previousPreprocess = () => {
    this.props.prevFn()
  }

  render(){

        return (
            <View style={styles.container}>
              <Text>
                 Step 2
              </Text>
              <Button
               onPress={this.nextPreprocess}
               title="Finish"
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
