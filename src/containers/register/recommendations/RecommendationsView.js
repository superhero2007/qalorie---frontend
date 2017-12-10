import React, { Component } from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'

import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux';

import Convertions from '../../../utils/Convertions';
import Helper from '../../../utils/Helper';

export default class RecommendationsView extends Component {

  constructor(props) {
    super(props);

    //Get information needed for calculate the Recommendations
    /*this.state = {
      age: Convertions.getAgeByDate(this.props.getState()[0].birthDate),
      activity:this.props.getState()[1].levelActivity,
      workout:this.props.getState()[1].daylyExcercise,
      gender:this.props.getState()[0].gender,
      goal:this.props.getState()[1].goal,
      weight:this.props.getState()[0].valueWeightKg,
      height:this.props.getState()[0].cms.value,
      isImperial:false,
      isPregnant:this.props.getState()[0].isPregnant,
      isBreastfeeding:true,
      weather:this.props.getState()[1].weather
    }*/

    this.state = {
    }

  }

  nextPreprocess = () => {
    this.props.nextFn()
  }

  renderCalorieRecommendation = () => {

    let calories = Helper.getCaloriesPerDay(
      this.state.age,
      this.state.activity,
      this.state.workout,
      this.state.gender,
      this.state.goal,
      this.state.weight,
      this.state.height,
      this.state.isImperial,
      this.state.isPregnant,
      this.state.isBreastfeeding
    );

    return (<Text style={styles.text}>{calories} qalories per day</Text>);

  }

  renderWaterConsumRecommendation = () => {

    let waterConsum = Helper.getWaterConsume(
      this.state.activity,
      this.state.weight,
      this.state.height,
      this.state.gender,
      this.state.isPregnant,
      this.state.isBreastfeeding
    );

    return (<Text style={styles.text}>{waterConsum} lt per day</Text>);

  }

  renderDailyExcerciseRecommendation = () => {
    let workout = Helper.excerciseRecommendation(this.state.workout);
    return (<Text style={styles.text}>{workout} mins per day</Text>);
  }


  render(){

        let calories = this.renderCalorieRecommendation();
        let water = this.renderWaterConsumRecommendation();
        let workout = this.renderDailyExcerciseRecommendation();

        return (
          <View style={{flex:1,width:'80%',
                marginLeft:'10%',
                marginRight:'10%'}}>
            <Swiper showsButtons={true} index={0} loop={false}>
              <View style={styles.slide1}>
                {calories}
              </View>
              <View style={styles.slide2}>
                {water}
              </View>
              <View style={styles.slide3}>
                  {workout}
                  <Button
                   onPress={this.nextPreprocess}
                   title="Go Dashboard"
                 />
              </View>
            </Swiper>
          </View>
        );
  }

}

const styles = StyleSheet.create({
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB',
      borderRadius:3
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5',
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9',
    }
});
