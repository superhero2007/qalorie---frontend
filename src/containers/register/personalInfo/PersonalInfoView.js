import React, { Component } from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Image,
  ScrollView
} from 'react-native'

import Dimensions from 'Dimensions';

import { Actions } from 'react-native-router-flux';
import Constants from '../../../utils/Constants';

import ImperialView from './ImperialView';
import MetricView from './MetricView';

import Dropdown from '../../../components/Dropdown';
import DatePickerControl from '../../../components/DatePickerControl';
import Convertions from '../../../utils/Convertions.js';

import Steps from '../common/Steps';
import InputText from '../../../components/InputText';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'


export default class PersonalInfoView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPregnant:false,
      isPregnantQuestion:false,
      isImperial:false,
      gender:Constants.Gender.MALE,
      birthDate:{
          value:new Date(),
          error:false
      },
      ft:{
        value:Constants.EMPTY,
        error:false
      },
      in:{
        value:Constants.EMPTY,
        error:false
      },
      cms:{
        value:Constants.EMPTY,
        error:false
      },
      lbs:{
        value:Constants.EMPTY,
        error:false
      },
      desiredLbs:{
        value:Constants.EMPTY,
        error:false
      },
      kg:{
        value:Constants.EMPTY,
        error:false
      },
      desiredKg:{
        value:Constants.EMPTY,
        error:false
      }
    }

  }

  onSelectStep = (idx, step) => {
    if (step != 1) {
      this.validateAndGoNext();
    }
  }

  nextPreprocess = () => {
    this.validateAndGoNext();
  }

  validateForm = () => {
    let birthDate = this.state.birthDate;
    let inObj = this.state.in;
    let ft = this.state.ft;
    let lbs = this.state.lbs;
    let desiredLbs = this.state.desiredLbs;
    let kg = this.state.kg;
    let desiredKg = this.state.desiredKg;
    let cms = this.state.cms;

    birthDate.error = birthDate.value === '';
    inObj.error = inObj.value === '';
    ft.error = ft.value === '';
    cms.error = cms.value === '';
    lbs.error = lbs.value === '';
    desiredLbs.error = desiredLbs.value === '';
    kg.error = kg.value === '';
    desiredKg.error = desiredKg.value === '';

    return {
      birthDate:birthDate,
      in:inObj,
      ft:ft,
      cms:cms,
      lbs:lbs,
      desiredLbs:desiredLbs,
      kg:kg,
      desiredKg:desiredKg
    }
  }

  validateAndGoNext = () => {
    this.setState(this.validateForm(), function(){

      if(!this.state.birthDate.error
        && !this.state.cms.error
        && !this.state.ft.error
        && !this.state.in.error
        && !this.state.lbs.error
        && !this.state.desiredLbs.error
        && !this.state.kg.error
        && !this.state.desiredKg.error){

        //Save state.
        this.props.saveState(0,this.state);
        this.props.nextFn();

      }
    });
  }

  onChooseGender = (id) => {
    switch(id){
      case 'male':
          this.setState({gender:Constants.Gender.MALE, isPregnantQuestion:false});
        break;
      case 'female':
          this.setState({gender:Constants.Gender.FEMALE, isPregnantQuestion:true});
        break;
    }
  }

  //We use the same fields, but just change the units.
  onChangeMeasureSystem = (id) => {
    switch(id){
      case 'imperial':
          this.setState({isImperial:true});
        break;
      case 'metric':
          this.setState({isImperial:false});
        break;
    }
  }

  render() {
        return (
          <View>

              <KeyboardAwareScrollView style={{
                height:Dimensions.get('window').height-70
              }}
              getTextInputRefs={() => { return [this._textInputRef];}}
              >

              <View style={styles.logo}>
                <Image
                  style={{width: 150, height: 150}}
                  source={require('../../../images/logo.png')}/>
              </View>

              <View style={styles.steps}>
                  <Steps onSelectStep={this.onSelectStep}/>
              </View>

              <View style={styles.genderContainer}>
                 <Button
                  id="male"
                  onPress={this.onChooseGender.bind(null,"male")}
                  title="MALE"/>
                 <Button
                  id="female"
                  onPress={this.onChooseGender.bind(null,"female")}
                  title="FEMALE"/>
              </View>

              <View style={styles.form}>

                  {this.state.isPregnantQuestion ?
                    (
                      <View style={styles.formElement}>
                        <Dropdown
                          data={Constants.PregnantDropdown.data}
                          defaultValue={Constants.PregnantDropdown.default}
                          onChange={(idx,value)=>{
                            this.setState({isPregnant: idx === "0" ? true : false});
                          }}/>
                      </View>

                    )
                    :
                    (null)
                  }

                  {this.state.isPregnant ?
                    (
                      <View style={styles.formElement}>
                        <Dropdown
                          data={Constants.BreastFeedingDropdown.data}
                          defaultValue={Constants.BreastFeedingDropdown.default}
                          onChange={(idx, value) => {
                            this.setState({isBreastFeeding: idx === "0" ? true : false});
                        }}/>
                      </View>

                    )
                    :
                    (null)
                  }


                  <View style={styles.formElement}>
                    <DatePickerControl
                      placeholder={"Select your birthdate"}
                      onChange={(date)=>{
                        this.setState({
                          birthDate:{
                            value:date,
                            error:false
                          }
                        });
                      }}
                      validationError={this.state.birthDate.error}
                      date={this.state.birthDate.value}/>
                  </View>

              </View>





              <View style={styles.genderContainer}>
                 <Button
                  onPress={this.onChangeMeasureSystem.bind(null,"imperial")}
                  title="Imperial"/>
                 <Button
                  onPress={this.onChangeMeasureSystem.bind(null,"metric")}
                  title="Metric"/>
              </View>


              {this.state.isImperial ?
                (
                  <View>
                  <TextInput
                      ref={(r) => { this._textInputRef = r; }}
                      style={this.state.ft.error ? Constants.Styles.validationError : Constants.Styles.control}
                      placeholder={Constants.FT}
                      value={this.state.ft.value}
                      keyboardType = {"numeric"}
                      maxLength = {1}
                      onChange={(text) => {
                          this.setState({
                            ft:{
                              value:text.nativeEvent.text,
                              error:false
                            },
                            cms: {
                              error:false,
                              value:Convertions.imperialToCms(text.nativeEvent.text,this.state.in.value)
                            }
                          });
                  }}/>

                  <TextInput
                      ref={(r) => { this._textInputRef = r; }}
                      style={this.state.in.error ? Constants.Styles.validationError : Constants.Styles.control}
                      placeholder={Constants.IN}
                      value={this.state.in.value}
                      keyboardType = {"numeric"}
                      maxLength = {1}
                      onChange={(text) => {
                          this.setState({
                            in:{
                              value:text.nativeEvent.text,
                              error:false
                            },
                            cms: {
                              error:false,
                              value:Convertions.imperialToCms(this.state.ft.value, text.nativeEvent.text)
                            }
                          });
                  }}/>

                  <TextInput
                      ref={(r) => { this._textInputRef = r; }}
                      style={this.state.lbs.error ? Constants.Styles.validationError : Constants.Styles.control}
                      placeholder={Constants.LBS}
                      value={this.state.lbs.value}
                      keyboardType = {"numeric"}
                      maxLength = {3}
                      onChange={(text) => {
                          this.setState({
                            lbs:{
                              value:text.nativeEvent.text,
                              error:false
                            },
                            kg: {
                              error:false,
                              value:Convertions.poundsToKg(text.nativeEvent.text)
                            }
                          });
                  }}/>

                  <TextInput
                      ref={(r) => { this._textInputRef = r; }}
                      style={this.state.desiredLbs.error ? Constants.Styles.validationError : Constants.Styles.control}
                      placeholder={Constants.LBS}
                      value={this.state.desiredLbs.value}
                      keyboardType = {"numeric"}
                      maxLength = {3}
                      onChange={(text) => {
                          this.setState({
                            desiredLbs:{
                              value:text.nativeEvent.text,
                              error:false
                            },
                            desiredKg: {
                              error:false,
                              value:Convertions.poundsToKg(text.nativeEvent.text)
                            }
                          });
                  }}/>

                  </View>
                )
                :
                (
                  <View>

                    <TextInput
                        ref={(r) => { this._textInputRef = r; }}
                        style={this.state.cms.error ? Constants.Styles.validationError : Constants.Styles.control}
                        placeholder={Constants.CMS}
                        value={this.state.cms.value}
                        keyboardType = {"numeric"}
                        maxLength = {3}
                        onChange={(text) => {
                            this.setState({
                              cms:{
                                value:text.nativeEvent.text,
                                error:false
                              },
                              ft: {
                                error:false,
                                value:Convertions.cmsToFtPart(text.nativeEvent.text)
                              },
                              in: {
                                error:false,
                                value:Convertions.cmsToFtIn(text.nativeEvent.text)
                              }
                            });
                    }}/>

                    <TextInput
                        ref={(r) => { this._textInputRef = r; }}
                        style={this.state.kg.error ? Constants.Styles.validationError : Constants.Styles.control}
                        placeholder={Constants.KG}
                        value={this.state.kg.value}
                        keyboardType = {"numeric"}
                        maxLength = {3}
                        onChange={(text) => {
                            this.setState({
                              kg:{
                                value:text.nativeEvent.text,
                                error:false
                              },
                              lbs: {
                                error:false,
                                value:Convertions.kgToPounds(text.nativeEvent.text)
                              }
                            });
                    }}/>

                    <TextInput
                        ref={(r) => { this._textInputRef = r; }}
                        style={this.state.desiredKg.error ? Constants.Styles.validationError : Constants.Styles.control}
                        placeholder={Constants.DESIRED_KG}
                        value={this.state.desiredKg.value}
                        keyboardType = {"numeric"}
                        maxLength = {3}
                        onChange={(text) => {
                            this.setState({
                              desiredKg:{
                                value:text.nativeEvent.text,
                                error:false
                              },
                              desiredLbs: {
                                error:false,
                                value:Convertions.kgToPounds(text.nativeEvent.text)
                              }
                            });
                    }}/>

                  </View>
                )
              }


              <View style={styles.next}>
                <Button
                 onPress={this.nextPreprocess}
                 title="CONTINUE"/>
              </View>




              </KeyboardAwareScrollView>
            </View>
        );
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logo: {
       flex:1,
       alignItems:'center',
       borderWidth:1,
       borderColor:'black'
    },
    steps: {
       flex:1,
       alignItems:'center',
       borderWidth:1,
       borderColor:'black'
    },
    genderContainer: {
       flex:1,
       flexDirection:'row',
       borderWidth:1,
       borderColor:'black',
       justifyContent:'space-around'
    },
    form: {
       flex:1,
       padding:5,
       borderWidth:1,
       borderColor:'black'
    },
    formElement: {
      marginTop:4,
      marginBottom:4
    }

    /*dateControl: {
      width:'99%',
      marginRight:10,
      marginTop:10
    },
    dropdownStyle: {
        width:'99%',
        height:'auto'
    },
    heightGroup:{
      flex:1,
      padding: 10,
      margin: 5
    },
    labelContainer:{
      flex:1,
      flexDirection:'row',
      justifyContent: 'space-between',
    },
    height:{
      flex:1,
      flexDirection:'row',
      justifyContent: 'space-between'
    },
    control: {
      width:'45%',
      height:40,
      backgroundColor: '#F5FCFF',
      borderColor: 'gray',
      borderWidth: 1
    },
    genderContainer:{
      flex:1,
      flexDirection:"row",
      justifyContent: 'space-between'
    }*/
});
