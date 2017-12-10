import React, { Component } from 'react';

import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native'
import { AppStyles, AppSizes, AppColors } from '@theme/';

export default class NoIconTextInput extends Component {

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
            <View>
                <Text p style={styles.labelFor}>{this.props.label}</Text>
                {(this.props.secure) ?
                    <TextInput
                        style={[styles.control, {borderBottomColor: this.state.bottomMarginColor}]}
                        placeholder={this.props.placeholder}
                        secureTextEntry
                        value={this.props.initial}
                        onBlur={ () => this.onBlur() }
                        onFocus={ () => this.onFocus() }
                        onChangeText={(text) => {
                            this.props.setValue(this.props.type, text);
                        }}/>
                    : <TextInput
                        style={[styles.control, {borderBottomColor: this.state.bottomMarginColor}]}
                        placeholder={this.props.placeholder}
                        value={this.props.initial}
                        onBlur={ () => this.onBlur() }
                        onFocus={ () => this.onFocus() }
                        onChangeText={(text) => {
                            this.props.setValue(this.props.type, text);
                        }}/>
                }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    control: {
        height: 40,
        width: AppSizes.screen.width * 0.85,
        marginBottom: 10,
        borderWidth: 0,
        borderBottomWidth: 1
    },
    labelFor: {
        fontSize: 16,
        textAlign: 'left',
        alignItems: 'flex-start',
        width: AppSizes.screen.width * 0.85,
        marginTop: 10
    }
});
