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

import { AppStyles, AppSizes, AppColors } from '@theme/';
import CustomTextInput from '@components/CustomTextInput';

const leftButtonConfig = {
    title: 'Back',
    handler: () => Actions.pop()
};

export default class ForgotPasswordView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showError:false,
            errorDescription:"",
            email:"espoz6@gmail.com",
            loading:false
        };
        this.setValue = this.setValue.bind(this);
    }

    onPressSendMe = () => {
        this.setState({
            loading:true
        });

        ApiUtils.resetpassword(this.state.email)
        .then((responseJson) => {
            let responseBody = JSON.parse(responseJson._bodyInit)
            const errorMessage = responseBody.message ? "This email address doesn't exist" : ("Please verify your email " + this.state.email)
            this.setState({
                errorDescription: errorMessage,
                loading: false
            });
            if (responseBody.msg)
                Actions.login();
        });
    }

    setValue(type, value) {
        this.setState({
            [type]: value
        });
    }

    render(){

        let error = null;
        if (this.state.errorDescription != '') {
            error = (<Text
                style={{color: 'red'}}>
                {this.state.errorDescription}
            </Text>);
        }

        return (
            <View style={{flex: 1}}>
                <View style={[styles.container, AppStyles.container, styles.background]}>
                    <Spinner visible={this.state.loading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                    {error}
                    <Image
                        source={require('../images/logo.png')}
                        style={[styles.logo]}
                    />

                    <Text label style={styles.title}>
                        Recover password
                    </Text>
                    <Text label style={styles.desc}>
                        Enter your register email id. we will send a
                        link to reset your password.
                    </Text>
                    <CustomTextInput
                        label={"E-mail"}
                        placeholder={"Type your email address"}
                        initial={this.state.email}
                        type="email"
                        secure={false}
                        icon={require('../images/icons/email.png')}
                        style={styles.icon_email}
                        setValue={this.setValue}
                    />

                    <TouchableOpacity onPress={this.onPressSendMe}>
                        <Text p style={[styles.fillButton, AppStyles.centerAligned]}>Send me link</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 10
    },
    label: {
        fontSize: 18
    },
    title: {
        textAlign: 'left',
        fontSize: 23,
        alignItems: 'flex-start',
        width: AppSizes.screen.width * 0.85,
        marginBottom: 10
    },
    desc: {
        textAlign: 'left',
        fontSize: 16,
        color: '#7F8091',
        alignItems: 'flex-start',
        width: AppSizes.screen.width * 0.85,
        marginBottom: 20
    },
    icon_email: {
        width: 20,
        height: 15,
        position: 'absolute',
        bottom: 20,
        left: 5
    },
    logo: {
        width: AppSizes.screen.width * 0.4,
        resizeMode: 'contain',
    },
    fillButton: {
        width: AppSizes.screen.width * 0.85,
        backgroundColor: '#6162FF',
        color: '#FFF',
        fontSize: 20,
        padding: 10,
        margin: 20,
        textAlign: 'center',
        borderRadius: 10
    },
});
