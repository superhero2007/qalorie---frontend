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

export default class Step3View extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <NoIconTextInput
                    label={"Name"}
                    placeholder={"Type your name"}
                    initial={this.props.name}
                    type="name"
                    secure={false}
                    setValue={this.props.changeValue}
                />
                <NoIconTextInput
                    label={"Email"}
                    placeholder={"Type your e-mail"}
                    initial={this.props.email}
                    type="email"
                    secure={false}
                    setValue={this.props.changeValue}
                />
                <NoIconTextInput
                    label={"Password"}
                    placeholder={"Type your password"}
                    initial={this.props.password}
                    type="password"
                    secure={false}
                    setValue={this.props.changeValue}
                />
                <NoIconTextInput
                    label={"Confirm Password"}
                    placeholder={"Type your confirm password"}
                    initial={this.props.confirm_password}
                    type="confirm_password"
                    secure={false}
                    setValue={this.props.changeValue}
                />
            </View>
        )
    }
}