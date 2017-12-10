import React, { Component } from 'react';

import {
    View,
    ScrollView,
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
import ApiUtils from '../../../helpers/ApiUtils.js';
import Spinner from 'react-native-loading-spinner-overlay';

import { AppStyles, AppSizes, AppColors } from '@theme/';

import Step1View from './Step1View';
import Step2View from './Step2View';
import Step3View from './Step3View';

export default class SignupView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showError:false,
            errorDescription: '',
            showNextBtn: true,
            step: 1,
            loading:false,
            sex: 1, //0: man, 1: woman
            status: '',
            birthDate: {
                day: '',
                month: '',
                year: ''
            },
            height: {
                ft: '',
                in: ''
            },
            weight: '',
            desire_weight: '',
            weight_goal: '',
            activity: '',
            exercise: '',
            weather: '',
            name: '',
            email: '',
            password: '',
            confirm_password: ''
        };
        this.next = this.next.bind(this);
        this.selectStep = this.selectStep.bind(this);
        this.changeProperty = this.changeProperty.bind(this);
    }

    changeProperty(type, value) {
        if (type == 'birthDate_day') {
            this.setState({
                birthDate: {
                    day: value,
                    month: this.state.birthDate.month,
                    year: this.state.birthDate.year
                }
            });
        }
        else if (type == 'birthDate_month') {
            this.setState({
                birthDate: {
                    day: this.state.birthDate.day,
                    month: value,
                    year: this.state.birthDate.year
                }
            });
        }
        else if (type == 'birthDate_year') {
            this.setState({
                birthDate: {
                    day: this.state.birthDate.day,
                    month: this.state.birthDate.month,
                    year: value
                }
            });
        }
        else if (type == 'height_ft') {
            this.setState({
                height: {
                    ft: value,
                    in: this.state.height.in
                }
            });
        }
        else if (type == 'height_in') {
            this.setState({
                height: {
                    ft: this.state.height.ft,
                    in: value
                }
            });
        }
        else {
            this.setState({
                [type]: value
            });
        }
    }

    next() {
        this.validation(this.state.step + 1)
    }

    validation(nextStep) {
        let validationFlag = false
        let errorDescription = ''
        if (nextStep > this.state.step)
        {
            if (this.state.step == 1) {
                if (this.state.status == '' && this.state.sex == 1) {
                    validationFlag = true
                    errorDescription = 'The Status is Blank.'
                }
                else if (this.state.birthDate.day == '') {
                    validationFlag = true
                    errorDescription = 'The Day of Brithdate is Blank.'
                }
                else if (this.state.birthDate.month == '') {
                    validationFlag = true
                    errorDescription = 'The Month of Brithdate is Blank.'
                }
                else if (this.state.birthDate.year == '') {
                    validationFlag = true
                    errorDescription = 'The Year of Brithdate is Blank.'
                }
                else if (this.state.height.ft == '') {
                    validationFlag = true
                    errorDescription = 'The ft of Height is Blank.'
                }
                else if (this.state.height.in == '') {
                    validationFlag = true
                    errorDescription = 'The in of Height is Blank.'
                }
                else if (this.state.weight == '') {
                    validationFlag = true
                    errorDescription = 'The Weight is Blank.'
                }
                else if (this.state.desire_weight == '') {
                    validationFlag = true
                    errorDescription = 'The Desire Weight is Blank.'
                }
                else {
                    validationFlag = false
                    errorDescription = ''
                }
            }
            else if (this.state.step == 2) {
                if (this.state.weight_goal == '') {
                    validationFlag = true
                    errorDescription = 'The Weight Goal is Blank.'
                }
                else if (this.state.activity == '') {
                    validationFlag = true
                    errorDescription = 'The activity is Blank.'
                }
                else if (this.state.exercise == '') {
                    validationFlag = true
                    errorDescription = 'The exercise is Blank.'
                }
                else if (this.state.weather == '') {
                    validationFlag = true
                    errorDescription = 'The weather is Blank.'
                }
                else {
                    validationFlag = false
                    errorDescription = ''
                }
            }
            else if (this.state.step == 3) {
                if (this.state.name == '') {
                    validationFlag = true
                    errorDescription = 'Name is Blank.'
                }
                else if (this.state.email == '') {
                    validationFlag = true
                    errorDescription = 'Email is Blank.'
                }
                else if (this.state.password == '') {
                    validationFlag = true
                    errorDescription = 'Password is Blank.'
                }
                else if (this.state.confirm_password == '') {
                    validationFlag = true
                    errorDescription = 'Confirm Password is Blank.'
                }
                else if (this.state.confirm_password != this.state.password) {
                    validationFlag = true
                    errorDescription = 'Password is not correct.'
                }
                else {
                    validationFlag = false
                    errorDescription = ''
                }
            }
        }
        this.setState({
            errorDescription: errorDescription
        })
        if (!validationFlag) {
            if (nextStep != 4) {
                this.setState({
                    step: nextStep
                })
            }
            else {
                this.setState({
                    loading:true
                })
                this.onPressSignUp()
            }
        }
    }

    onPressSignUp = () => {
        ApiUtils.signup(this.state.name, this.state.email, this.state.password)
            .then((responseJson) => {
                let responseBody = JSON.parse(responseJson._bodyInit)
                if ( responseBody.error ) {
                    let errorMessage = "A user for this mail already exists"
                    if (!responseBody.error.code)
                        errorMessage = "This email address doesn't exist"
                    this.setState({
                        errorDescription: errorMessage,
                        loading:false
                    });
                }
                else {
                    ApiUtils.login(this.state.email, this.state.password)   
                        .then((responseJson) => {
                            let token = responseJson.token
                            AsyncStorage.setItem("token", token)
                            AsyncStorage.setItem("id", responseJson._id)
                            responseBody.widgets.meassure = "imperial"
                            responseBody.gender = this.state.sex == 0 ? 'M' : 'F'
                            responseBody.height = {"value":this.state.height.ft * 30.48 + this.state.height.in * 2.54, "units":"cm"}
                            responseBody.weight = {"value":this.state.weight*0.453592, "units":"kg"}
                            responseBody.desired_weight = {"value":this.state.desire_weight*0.453592, "units":"kg"}
                            responseBody.goal = {"text":"","motivation":""}
                            responseBody.permissions = [".*:.*"]
                            responseBody.permissions_compiled = {}
                            responseBody.dob = new Date(this.state.birthDate.year, this.state.birthDate.month, this.state.birthDate.day)
                            responseBody.status = 0

                            responseBody.pregnant = "No"
                            responseBody.breastfeeding = "No"

                            if (this.state.status == "I'm pregnant.") {
                                responseBody.pregnant = "Yes"
                                responseBody.breastfeeding = "No"
                            }
                            else if (this.state.status == "I'm breastfeeding.") {
                                responseBody.pregnant = "No"
                                responseBody.breastfeeding = "Yes"
                            }
                            else if (this.state.status == "Pregnant and breastfeeding") {
                                responseBody.pregnant = "Yes"
                                responseBody.breastfeeding = "Yes"
                            }
                            ApiUtils.info(token, responseBody._id, responseBody)
                                .then((responseJson) => {
                                    let requestBody = {
                                        "_id":responseBody.patientPreferences._id,
                                        "created":responseBody.patientPreferences.created,
                                        "user":responseBody.patientPreferences.user,
                                        "__v":responseBody.patientPreferences.__v,
                                        "widgets_settings":responseBody.patientPreferences.widgets_settings,
                                        "fitness_goals":responseBody.patientPreferences.fitness_goals,
                                        "email_notifications":responseBody.patientPreferences.email_notifications,
                                        "vitamins":[],"medicines":[],"foods":[],"limitations":[],"diseases":[],
                                        "weather":this.state.weather,
                                        "activity":this.state.activity,
                                        "workout":this.state.exercise,
                                        "maintain":this.state.weight_goal
                                    }
                                    ApiUtils.patient(token, requestBody._id, requestBody)
                                        .then((responseJson) => {
                                            this.setState({
                                                loading:false
                                            }, function(){
                                                Actions.suggest();
                                            });
                                        })
                                })
                        });
                }
            }).catch((error) => {
                this.setState({
                    errorDescription: JSON.stringify(error),
                    loading:false
                });
            });
    }

    _scrollToInput() {
        const scrollResponder = this.refs.myScrollView.getScrollResponder();
        const inputHandle = React.findNodeHandle(this.refs.myInput)

        scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
            inputHandle, // The TextInput node handle
        0, // The scroll view's bottom "contentInset" (default 0)
        true // Prevent negative scrolling
    );
    }

    selectStep(value) {
        this.validation(value)
    }

    render() {
        let error = null;
        if (this.state.errorDescription != '') {
            error = (<Text
                style={{color: 'red'}}>
                {this.state.errorDescription}
            </Text>);
        }

        return (
            <ScrollView ref="signupScrollView">
                <View style={[styles.container, AppStyles.container, styles.background]}>
                <Spinner visible={this.state.loading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                <Image
                    source={require('../../images/logo.png')}
                    style={[styles.logo]}
                />
                <View style={{'flexDirection': 'row'}}>
                    <TouchableOpacity onPress={this.selectStep.bind(this, 1)}>
                        {
                            (this.state.step === 1)
                                ? <Image
                                    source={require('../../images/steps/step_1_select.png')}
                                    style={[styles.step1]}
                                    />
                                : <Image
                                    source={require('../../images/steps/step_1.png')}
                                    style={[styles.step1]}
                                    />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.selectStep.bind(this, 2)}>
                        {
                            (this.state.step === 2)
                                ? <Image
                                    source={require('../../images/steps/step_2_select.png')}
                                    style={[styles.step2]}
                                />
                                : <Image
                                    source={require('../../images/steps/step_2.png')}
                                    style={[styles.step2]}
                                />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.selectStep.bind(this, 3)}>
                        {
                            (this.state.step === 3)
                                ? <Image
                                    source={require('../../images/steps/step_3_select.png')}
                                    style={[styles.step3]}
                                />
                                : <Image
                                    source={require('../../images/steps/step_3.png')}
                                    style={[styles.step3]}
                                />
                        }
                    </TouchableOpacity>
                </View>
                
                {
                    (this.state.step === 1) ?
                        <Step1View
                            sex={this.state.sex}
                            status={this.state.status}
                            birthDate={this.state.birthDate}
                            height={this.state.height}
                            weight={this.state.weight}
                            desire_weight={this.state.desire_weight}
                            changeValue={this.changeProperty} />
                    : (this.state.step === 2) ?
                        <Step2View
                            weight_goal={this.state.weight_goal}
                            activity={this.state.activity}
                            exercise={this.state.exercise}
                            weather={this.state.weather}
                            changeValue={this.changeProperty}
                            />
                    :   <Step3View
                            name={this.state.name}
                            email={this.state.email}
                            password={this.state.password}
                            confirm_password={this.state.confirm_password}
                            changeValue={this.changeProperty}
                            />
                }
                {error}
                {
                    (this.state.showNextBtn) ?
                        <TouchableOpacity onPress={this.next} style={styles.nextActive}>
                            <Text p style={styles.nextActiveButton}>
                                {
                                    (this.state.step === 3) ? "Sign Up" : "Next"
                                }
                            </Text>
                        </TouchableOpacity>
                        :
                        <Text p style={styles.nextButton}>
                            {
                                (this.state.step === 3) ? "Sign Up" : "Next"
                            }
                        </Text>
                }

            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 10
    },
    logo: {
        width: AppSizes.screen.width * 0.28,
        height: AppSizes.screen.height * 0.2,
        resizeMode: 'contain',
    },
    background: {
        backgroundColor: AppColors.background,
        height: AppSizes.screen.height,
        width: AppSizes.screen.width,
    },
    step1: {
        width: AppSizes.screen.width * 0.15,
        resizeMode: 'contain',
        marginRight: -1
    },
    step2: {
        width: AppSizes.screen.width * 0.27,
        resizeMode: 'contain',
    },
    step3: {
        width: AppSizes.screen.width * 0.15,
        resizeMode: 'contain',
        marginLeft: -2
    },
    nextButton: {
        width: AppSizes.screen.width * 0.85,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        borderColor: '#C7D6DE',
        color: '#C7D6DE',
        borderWidth: 1,
        bottom: 20,
        position: 'absolute'
    },
    nextActiveButton: {
        width: AppSizes.screen.width * 0.85,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6162FF',
        textAlign: 'center',
        borderColor: '#6162FF',
        color: '#FFFFFF',
        borderWidth: 1,
    },
    nextActive: {
        bottom: 20,
        position: 'absolute'
    }
});