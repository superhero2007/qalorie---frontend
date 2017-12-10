import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet
} from 'react-native'
import { AppStyles, AppSizes, AppColors } from '@theme/';

export default class CustomTextInput extends Component {

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
                <View style={{'flexDirection': 'row'}}>
                    <Image
                        source={this.props.icon}
                        style={this.props.style}
                    />
                    {(this.props.secure) ?
                        <TextInput
                            style={[styles.control, {borderBottomColor: this.state.bottomMarginColor}]}
                            placeholder={this.props.placeholder}
                            secureTextEntry
                            autoCapitalize='none'
                            value={this.props.initial}
                            onBlur={ () => this.onBlur() }
                            onFocus={ () => this.onFocus() }
                            onChangeText={(text) => {
                                this.props.setValue(this.props.type, text);
                            }}/>
                        : <TextInput
                            style={[styles.control, {borderBottomColor: this.state.bottomMarginColor}]}
                            placeholder={this.props.placeholder}
                            autoCapitalize='none'
                            value={this.props.initial}
                            onBlur={ () => this.onBlur() }
                            onFocus={ () => this.onFocus() }
                            onChangeText={(text) => {
                                this.props.setValue(this.props.type, text);
                            }}/>
                        }
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    control: {
        fontSize: 16,
        height: 40,
        width: AppSizes.screen.width * 0.85,
        marginBottom: 10,
        marginLeft:5,
        marginRight:5,
        borderWidth: 0,
        padding:5,
        paddingBottom: 7,
        paddingLeft: 40,
        borderBottomWidth: 1
    },
    labelFor: {
        fontSize: 16,
        textAlign: 'left',
        alignItems: 'flex-start',
        width: AppSizes.screen.width * 0.85,
        marginTop: 10,
        marginBottom: 13,
        marginLeft: 5
    }
});
