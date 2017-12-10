import React, { Component } from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'

import NavigationBar from 'react-native-navbar';
import Tabs from 'react-native-tabs';
import { Actions } from 'react-native-router-flux';

export default class ProfileView extends Component {

  constructor(props) {
    super(props);
  }

  render(){

        return (
            <View style={styles.container}>
              <NavigationBar
                style={{color:'#5f6877'}}
                tintColor='#5f6877'
                statusBar={{tintColor:'#5f6877'}}
                title={{
                    title: 'Profile',
                    tintColor:'white'
                }}
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
