import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    TextInput,
    Alert,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import { Actions } from 'react-native-router-flux';
import ApiUtils from '../../helpers/ApiUtils.js';
import Spinner from 'react-native-loading-spinner-overlay';

import Helper from '../utils/Helper.js';

import { AppStyles, AppSizes, AppColors } from '@theme/';

export default class Suggest extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            step: 1,
            errorDescription: "",
            calories: 0,
            water: 0,
            exercise: 0,
            loading: true,
            id: null,
            token: null
        };

        AsyncStorage.getItem('id')
            .then((value) => {this.setState({id: value})} )

        AsyncStorage.getItem('token')
            .then((value) => {
                this.setState({token: value})

                ApiUtils.getUser(this.state.id, this.state.token)
                    .then((responseJson) => {
                        let responseBody = JSON.parse(responseJson._bodyInit)
                        const age = 29
                        const activity = responseBody.patientPreferences.activity
                        const workout = responseBody.patientPreferences.workout
                        const gender = responseBody.gender
                        const goal = responseBody.patientPreferences.maintain + "_weight"
                        const weight = responseBody.weight.value
                        const height = responseBody.height.value
                        const isImperial = false
                        const isPregnant = responseBody.pregnant == "Yes"
                        const isBreastfeeding = responseBody.breastfeeding == "Yes"
                        const weather = responseBody.patientPreferences.weather

                        let value = Helper.getCaloriesPerDay(age, activity, workout, gender, goal, weight, height, isImperial, isPregnant, isBreastfeeding)
                        this.setState({
                            calories: value
                        });

                        value = Helper.getWaterConsume(activity, weight, weather, gender, isPregnant, isBreastfeeding)
                        value = value.toFixed(1)
                        this.setState({
                            water: value
                        });

                        value = Helper.excerciseRecommendation(workout)
                        this.setState({
                            exercise: value
                        });
                        responseBody.profileFilled = true
                        responseBody.time_recomended = this.state.exercise
                        responseBody.water_recomended = this.state.water
                        responseBody.calories_recomended = this.state.calories
                        responseBody.goals = {"text":"","motivation":"..."}
                        responseBody.welcome = 1

                        ApiUtils.info(this.state.token, this.state.id, responseBody)
                            .then((responseJson) => {
                                this.setState({
                                    loading: false
                                })
                            })
                    })
            })
        
    }

    onBack = () => {
        this.setState({step: this.state.step - 1})
    }

    onNext = () => {
        if (this.state.step == 3) { 
            Actions.dashboard()
        }
        else {
            this.setState({step: this.state.step + 1})
        }
    }


    render(){
        let title=null
        let subtitle = null
        let logoImage = null
        let calValue = null
        let calUnit = null
        if (this.state.step == 1) {
            title = "Calories Intake"
            subtitle = "Recomendamos Consumir"
            logoImage = require('../images/caloriesImage.png')
            calValue = this.state.calories
            calUnit = 'Cals/dia'
        }
        else if (this.state.step == 2) {
            title = "Water Consumpton"
            subtitle = "Recomendamos Consumir"
            logoImage = require('../images/waterImage.png')
            calValue = this.state.water + ' Lt/'
            calUnit = '12 Glasses of Water'
        }
        else if (this.state.step == 3) {
            title = "Daily Exercise Time"
            subtitle = "Recomendamos Actividad"
            logoImage = require('../images/timeImage.png')
            calValue = this.state.exercise/60 + 'h/'
            calUnit = 'Exercise per day'
        }

        const state = this.state.errorDescription
        return (
            <View style={{flex: 1}}>
                <View style={[styles.container, AppStyles.container]}>
                    <Spinner visible={this.state.loading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                    <Text label style={styles.title}>
                        {title}
                    </Text>
                    <Text label style={styles.subtitle}>
                        {subtitle}
                    </Text>
             <Text>
                {state}
                </Text>
                    <Image
                        source={logoImage}
                        style={[styles.logo]}
                    />
                    <View style={{flexDirection: 'row'}}>
                        <Text label style={styles.calValue}>
                            {calValue}
                        </Text>
                        <Text label style={styles.calUnit}>
                            {calUnit}
                        </Text>
                    </View>
                </View>

                <View style={[{flexDirection: 'row'},{borderWidth: 1}]}>
                    {
                        this.state.step != 3 &&
                        <View style={[styles.Back, this.state.step ==1 && {opacity: 0.2}]}>
                            <TouchableOpacity onPress={this.onBack} disabled={this.state.step==1}>
                                <View style={{flexDirection: 'row'}}>
                                    <Image
                                        source={require('../images/back.png')}
                                        style={[styles.buttonIcon]}
                                    />
                                    <Text style={[styles.buttonText, AppStyles.centerAligned]}>
                                        Back
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                    <View style={styles.Next}>
                        <TouchableOpacity onPress={this.onNext}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={[styles.buttonText, AppStyles.centerAligned, this.state.step ==3 && {width: AppSizes.screen.width * 0.6}]}>
                                    {this.state.step == 3 ? "Go to Dashboard" : "Next" }
                                </Text>
                                <Image
                                    source={require('../images/next.png')}
                                    style={[styles.buttonIcon]}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 10,
        marginTop: 80
    },
    label: {
        fontSize: 18
    },
    title: {
        textAlign: 'center',
        fontWeight: "600",
        fontSize: 28,
        alignItems: 'flex-start',
        width: AppSizes.screen.width * 0.85,
        marginTop: 10
    },
    subtitle: {
        fontSize: 18,
        marginTop: 10
    },
    calValue: {
        fontWeight: "600",
        fontSize: 28
    },
    calUnit: {
        fontSize: 18,
        marginTop: 8,
        marginLeft: 5
    },
    logo: {
        height: AppSizes.screen.height * 0.25,
        resizeMode: 'contain',
        margin: 20,
        marginTop: 70
    },
    buttonIcon: {
        resizeMode: 'contain',
        width: AppSizes.screen.width * 0.1,
        margin: 15,
        marginTop: -60
    },
    Back: {
        position: 'absolute',
        left: 0,
        bottom: 20
    },
    Next: {
        position: 'absolute',
        right: 0,
        bottom: 20
    },
    buttonText: {
      width: AppSizes.screen.width * 0.3,
      color: '#6162FF',
      backgroundColor: 'transparent',
      fontWeight: "600",
      fontSize: 20,
      margin: -35,
      textAlign: 'center'
    }
});
