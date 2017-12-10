import React, { Component } from 'react';

import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native'
import { AppStyles, AppSizes, AppColors } from '@theme/';

export default class UnitTextInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bottomMarginColor: '#C7D6DE'
        };
    }

    onFocus() {
        this.setState({
            bottomMarginColor: '#6162FF'
        })
    }

    onBlur() {
        this.setState({
            bottomMarginColor: '#C7D6DE'
        })
    }

    render(){
        return (
            <View style={[this.props.style, {width: this.props.width}]}>
                <Text p style={styles.labelFor}>{this.props.label}</Text>
                <View style={{'flexDirection': 'row'}}>
                    {(this.props.secure) ?
                        <TextInput
                            style={[styles.control, {borderBottomColor: this.state.bottomMarginColor, width: this.props.width}]}
                            placeholder={this.props.placeholder}
                            secureTextEntry
                            keyboardType="numeric"
                            value={this.props.initial}
                            onBlur={ () => this.onBlur() }
                            onFocus={ () => this.onFocus() }
                            onChangeText={(text) => {
                                this.props.setValue(this.props.type, text);
                            }}/>
                        : <TextInput
                            style={[styles.control, {borderBottomColor: this.state.bottomMarginColor, width: this.props.width}]}
                            placeholder={this.props.placeholder}
                            keyboardType="numeric"
                            value={this.props.initial}
                            onBlur={ () => this.onBlur() }
                            onFocus={ () => this.onFocus() }
                            onChangeText={(text) => {
                                this.props.setValue(this.props.type, text);
                            }}/>
                    }
                    <Text p style={styles.unit}>{this.props.unit}</Text>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    control: {
        height: 40,
        marginBottom: 10,
        borderWidth: 0,
        padding:5,
        borderBottomWidth: 1
    },
    labelFor: {
        fontSize: 16,
        textAlign: 'left',
        alignItems: 'flex-start',
        width: AppSizes.screen.width * 0.85,
        marginTop: 10
    },
    unit: {
        position: 'absolute',
        right: 5,
        bottom: 20,
        color: '#C7D6DE'
    }
});
