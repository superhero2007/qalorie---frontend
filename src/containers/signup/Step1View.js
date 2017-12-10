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

import ToggleButton from '@components/ToggleButton';
import NoIconTextInput from '@components/NoIconTextInput';
import UnitTextInput from '@components/UnitTextInput';

import { Dropdown } from 'react-native-material-dropdown';

export default class Step1View extends Component {
    constructor(props) {
        super(props);
        this.changeDate = this.changeDate.bind(this)
        this.changeStatus = this.changeStatus.bind(this)
    }

    changeDate(value, index, data) {
        if(data.length == 31) {
            this.props.changeValue('birthDate_day', value)
        }
        else if(data.length == 12) {
            this.props.changeValue('birthDate_month', value)
        }
        else {
            this.props.changeValue('birthDate_year', value)
        }
    }
    changeStatus(value, index, data) {
        this.props.changeValue('status', value)
    }

    render() {
        var days=[
            { value: '01' },
            { value: '02' },
            { value: '03' },
            { value: '04' },
            { value: '05' },
            { value: '06' },
            { value: '07' },
            { value: '08' },
            { value: '09' },
            { value: '10' },
            { value: '11' },
            { value: '12' },
            { value: '13' },
            { value: '14' },
            { value: '15' },
            { value: '16' },
            { value: '17' },
            { value: '18' },
            { value: '19' },
            { value: '20' },
            { value: '21' },
            { value: '22' },
            { value: '23' },
            { value: '24' },
            { value: '25' },
            { value: '26' },
            { value: '27' },
            { value: '28' },
            { value: '29' },
            { value: '30' },
            { value: '31' }
        ]

        var months=[
            { value: '01' },
            { value: '02' },
            { value: '03' },
            { value: '04' },
            { value: '05' },
            { value: '06' },
            { value: '07' },
            { value: '08' },
            { value: '09' },
            { value: '10' },
            { value: '11' },
            { value: '12' }
        ]


        var status = [
            { value: "I'm pregnant." },
            { value: "I'm breastfeeding." },
            { value: "Pregnant and breastfeeding" },
            { value: "None"}
        ]

        var years=[]

        for (const i=1947;i<2018;i++)
            years.push({value:i.toString()})
        return (
            <View>
                <View style={{'flexDirection': 'row', 'alignItems': 'center', 'justifyContent': 'center'}}>
                    <TouchableOpacity onPress={this.props.changeValue.bind(this, 'sex', 0)}>
                        <ToggleButton
                            label={"Male"}
                            active={(this.props.sex===0) ? true : false}
                            icon={require('../../images/icons/man.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.changeValue.bind(this, 'sex', 1)}>
                        <ToggleButton
                            label={"Female"}
                            active={(this.props.sex===1) ? true : false}
                            icon={require('../../images/icons/woman.png')}
                        />
                    </TouchableOpacity>
                </View>
                {
                    this.props.sex===1 &&
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
                        }> Status </Text>
                        <Dropdown label={this.props.status == "" ? "I'm pregnant" : ""}
                            onChangeText={this.changeStatus}
                            data={status}
                            value={this.props.status}
                            pickerStyle = {{width: AppSizes.screen.width * 0.85}}
                            containerStyle = {{width: AppSizes.screen.width * 0.85}}
                        />
                    </View>
                }
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
                }> Date of Birth </Text>
                <View style={{'flexDirection': 'row', 'alignItems': 'center', 'justifyContent': 'space-between'}}>
                    <Dropdown label={this.props.birthDate.day == "" ? "00" : ""}
                        onChangeText={this.changeDate}
                        data={days}
                        value={this.props.birthDate.day}
                        pickerStyle = {{width: AppSizes.screen.width * 0.22}}
                        containerStyle = {{width: AppSizes.screen.width * 0.22}}
                    />
                    <Dropdown label={this.props.birthDate.month == "" ? "00" : ""}
                        onChangeText={this.changeDate}
                        data={months}
                        value={this.props.birthDate.month}
                        pickerStyle = {{width: AppSizes.screen.width * 0.22}}
                        containerStyle = {{width: AppSizes.screen.width * 0.22}}
                    />
                    <Dropdown label={this.props.birthDate.year == "" ? "0000" : ""}
                        onChangeText={this.changeDate}
                        data={years}
                        value={this.props.birthDate.year}
                        pickerStyle = {{width: AppSizes.screen.width * 0.22}}
                        containerStyle = {{width: AppSizes.screen.width * 0.22}}
                    />
                </View>
                <View style={{'flexDirection': 'row', 'alignItems': 'center', 'justifyContent': 'space-between'}}>
                    <UnitTextInput
                        width={AppSizes.screen.width * 0.4}
                        unit={"ft"}
                        label={"Height"}
                        placeholder={"00"}
                        initial={this.props.height.ft}
                        type="height_ft"
                        secure={false}
                        setValue={this.props.changeValue}
                    />
                    <UnitTextInput
                        width={AppSizes.screen.width * 0.4}
                        unit={"in"}
                        label={" "}
                        placeholder={"00"}
                        initial={this.props.height.in}
                        type="height_in"
                        secure={false}
                        setValue={this.props.changeValue}
                    />
                </View>
                <View style={{'flexDirection': 'row', 'alignItems': 'center', 'justifyContent': 'space-between'}}>
                    <UnitTextInput
                        width={AppSizes.screen.width * 0.4}
                        unit={"lb"}
                        label={"Weight"}
                        placeholder={"00"}
                        initial={this.props.weight}
                        type="weight"
                        secure={false}
                        setValue={this.props.changeValue}
                    />
                    <UnitTextInput
                        width={AppSizes.screen.width * 0.4}
                        unit={"lb"}
                        label={"Desire Weight"}
                        placeholder={"00"}
                        initial={this.props.desire_weight}
                        type="desire_weight"
                        secure={false}
                        setValue={this.props.changeValue}
                    />
                </View>
            </View>
        )
    }
}