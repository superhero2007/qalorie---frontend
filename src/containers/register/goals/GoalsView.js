import React, { Component } from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'

import { Actions } from 'react-native-router-flux';
import Dropdown from '../../../components/Dropdown';
import Constants from '../../../utils/Constants';
import Steps from '../common/Steps';
import Convertions from '../../../utils/Convertions';

export default class GoalsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      goal:Constants.Goal.LOOSE_WEIGHT,
      levelActivity: Constants.Activity.SEDENTARY,
      weather: Constants.Weather.COLD,
      daylyExcercise: 15
    }
  }

  nextPreprocess = () => {
    //Save state.
    this.props.saveState(1,this.state);
    // Go to next step
    this.props.nextFn()
  }

  previousPreprocess = () => {
    this.props.prevFn()
  }

  onSelectStep = () => {

  }

  onGoalsSelectChange = (idx,value) => {
    this.setState({goal:Convertions.goalIndexToValue(idx)});
  }

  onLevelActivitySelectChange = (idx,value) => {
    this.setState({levelActivity:Convertions.levelActivityIndexToValue(idx)});
  }

  onDailyExcerciseSelectChange = (idx,value) => {
    this.setState({daylyExcercise: Convertions.dailyIndexToValue(idx)});
  }

  onWeatherSelectChange = (idx,value) => {
    this.setState({weather: Convertions.weatherIndexToValue(idx)});
  }

  render(){

        return (
            <View style={styles.container}>

              <Steps onSelectStep={this.onSelectStep}/>

              <Dropdown
                defaultValue={Constants.GoalDropdown.default}
                data={Constants.GoalDropdown.data}
                onChange={this.onGoalsSelectChange}/>

              <Dropdown
                defaultValue={Constants.ActivityDropdown.default}
                data={Constants.ActivityDropdown.data}
                onChange={this.onLevelActivitySelectChange}/>

              <Dropdown
                defaultValue={Constants.ExcerciseDropdown.default}
                data={Constants.ExcerciseDropdown.data}
                onChange={this.onDailyExcerciseSelectChange}/>

              <Dropdown
                defaultValue={Constants.WeatherDropdown.default}
                data={Constants.WeatherDropdown.data}
                onChange={this.onWeatherSelectChange}/>

              <Button
               onPress={this.nextPreprocess}
               title="NEXT"
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
