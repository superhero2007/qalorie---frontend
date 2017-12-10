import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native'
import { AppStyles, AppSizes, AppColors } from '@theme/';

export default class ToggleButton extends Component {

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
        {
            return (!this.props.active) ?
                (<View style={[styles.container, {'flexDirection': 'row'}]}>
                    <Image
                        source={this.props.icon}
                        style={styles.icon}
                    />
                    <Text p style={styles.label}>{this.props.label}</Text>
                </View>)
            : (<View style={[styles.active_container, {'flexDirection': 'row'}]}>
                    <Image
                        source={this.props.icon}
                        style={styles.active_icon}
                    />
                    <Text p style={styles.active_label}>{this.props.label}</Text>
                </View>)
        }
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: '#C7D6DE',
        borderWidth: 1,
        marginLeft: 5,
        marginRight: 5
    },
    label: {
        width: 60,
        textAlign: 'center',
        color: '#C7D6DE',
        justifyContent:'center',
        lineHeight:14,
        fontSize:14,
        alignSelf: "center"
    },
    icon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        tintColor: '#C7D6DE'
    },
    active_container: {
        backgroundColor: '#6162FF',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: '#C7D6DE',
        borderWidth: 1,
        marginLeft: 5,
        marginRight: 5
    },
    active_label: {
        width: 60,
        textAlign: 'center',
        color: '#ffffff',
        justifyContent:'center',
        lineHeight:14,
        fontSize:14,
        alignSelf: "center"
    },
    active_icon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        tintColor: '#ffffff'
    }
});
