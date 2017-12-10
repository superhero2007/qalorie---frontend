import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { AppStyles, AppSizes, AppColors } from '@theme/';

import NoIconTextInput from '@components/NoIconTextInput';
import { Dropdown } from 'react-native-material-dropdown';

function capital(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export default class Step2View extends Component {
    constructor(props) {
        super(props);
        this.changeWeight = this.changeWeight.bind(this)
        this.changeLevel = this.changeLevel.bind(this)
        this.changeExercise = this.changeExercise.bind(this)
        this.changeWeather = this.changeWeather.bind(this)
    }

    changeWeight(value, index, data) {
        this.props.changeValue("weight_goal", value.toLowerCase())
    }

    changeLevel(value, index, data) {
        this.props.changeValue("activity", value.toLowerCase())
    }

    changeExercise(value, index, data) {
        this.props.changeValue("exercise", value)
    }

    changeWeather(value, index, data) {
        this.props.changeValue("weather", value.toLowerCase())
    }

    render() {
        const weight_goal=[
            { value: 'Lose' },
            { value: 'Maintain' },
            { value: 'Gain' }
        ]
        const level_activity=[
            { value: 'Sedentary' },
            { value: 'Light' },
            { value: 'Active' },
            { value: 'Very_active' }
        ]
        const exercise_time=[
            { value: '15' },
            { value: '30' },
            { value: '45' },
            { value: '60' }
        ]
        const type_weather=[
            { value: 'Cold' },
            { value: 'Temperate' },
            { value: 'Warm' },
            { value: 'Hot' }
        ]
        return (
            <View>
                <Text style={
                    {
                        fontSize: 16,
                        textAlign: 'left',
                        alignItems: 'flex-start',
                        width: AppSizes.screen.width * 0.85,
                        marginTop: 10,
                        marginBottom: -20,
                        marginLeft: -5
                    }
                }> Your Weight Goal </Text>
                <Dropdown label={this.props.weight_goal == '' ? "Select your goal" : ""}
                    onChangeText={this.changeWeight}
                    data={weight_goal}
                    value={capital(this.props.weight_goal)}
                    pickerStyle = {{width: AppSizes.screen.width * 0.9}}
                    containerStyle = {{width: AppSizes.screen.width * 0.9}}
                />
                <Text style={
                    {
                        fontSize: 16,
                        textAlign: 'left',
                        alignItems: 'flex-start',
                        width: AppSizes.screen.width * 0.85,
                        marginTop: 10,
                        marginBottom: -20,
                        marginLeft: -5
                    }
                }> Level of Activity </Text>
                <Dropdown label={this.props.activity == '' ? "Select your activity" : ""}
                    onChangeText={this.changeLevel}
                    data={level_activity}
                    value={capital(this.props.activity)}
                    pickerStyle = {{width: AppSizes.screen.width * 0.9}}
                    containerStyle = {{width: AppSizes.screen.width * 0.9}}
                />
                <Text style={
                    {
                        fontSize: 16,
                        textAlign: 'left',
                        alignItems: 'flex-start',
                        width: AppSizes.screen.width * 0.85,
                        marginTop: 10,
                        marginBottom: -20,
                        marginLeft: -5
                    }
                }> Daily Exercise Time </Text>
                <Dropdown label={this.props.exercise == '' ? "15 minutes" : ""}
                    onChangeText={this.changeExercise}
                    data={exercise_time}
                    value={this.props.exercise}
                    pickerStyle = {{width: AppSizes.screen.width * 0.9}}
                    containerStyle = {{width: AppSizes.screen.width * 0.9}}
                />
                <Text style={
                    {
                        fontSize: 16,
                        textAlign: 'left',
                        alignItems: 'flex-start',
                        width: AppSizes.screen.width * 0.85,
                        marginTop: 10,
                        marginBottom: -20,
                        marginLeft: -5
                    }
                }> Type of Weather </Text>
                <Dropdown label={this.props.weather == '' ? "Warm weather" : ""}
                    onChangeText={this.changeWeather}
                    data={type_weather}
                    value={capital(this.props.weather)}
                    pickerStyle = {{width: AppSizes.screen.width * 0.9}}
                    containerStyle = {{width: AppSizes.screen.width * 0.9}}
                />
            </View>
        )
    }
}