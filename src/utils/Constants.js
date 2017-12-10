var Constants = {
 NAME:"Name",
 NAME_EMPTY:"Name can't be empty",
 EMAIL:"Email",
 EMAIL_INVALID:"Email is empty or invalid",
 PASSWORD:"Password",
 PASSWORD_EMPTY:"Password can't be empty",
 REPEAT_PASSWORD:"Repeat Password",
 EMPTY:"",
 IN:"in",
 FT:"ft",
 LBS:"lbs",
 CMS:"cms",
 DESIRED_LBS:"Desired Lbs",
 KG:"Kg",
 DESIRED_KG:"Desired Kg",
 Gender:{
   MALE:"M",
   FEMALE:"F"
 },
 Activity : {
   SEDENTARY:"sedentary",
   LIGHT_ACTIVE:"light",
   ACTIVE:"active",
   VERY_ACTIVE:"very_active"
 },
 Goal : {
   LOSE_WEIGHT:"lose_weight",
   MAINTAIN_WEIGHT:"maintain_weight",
   GAIN_WEIGHT:"gain_weight"
 },
 Weather : {
   COLD:"cold",
   TEMPERATE:"temperate",
   WARM:"warm",
   HOT:"hot"
 },
 PregnantDropdown: {
   default: "Are you Pregnant?",
   data: [
     "Yes","No"
   ]
 },
 BreastFeedingDropdown: {
   default: "Are you Breastfeeding?",
   data: [
     "Yes","No"
   ]
 },
 GoalDropdown: {
   default: "Loose Weight",
   data: [
     "Loose Weight","Maintain Weight","Gain Weight"
   ]
 },
 ActivityDropdown: {
   default: "Sedentary",
   data:[
     "Sedentary","Light Active","Active", "Very Active"
   ]
 },
 ExcerciseDropdown: {
   default: "15 Minutes",
   data: [
     "15 Minutes","30 Minutes","45 Minutes", "60 Minutes"
   ]
 },
 WeatherDropdown: {
   default: "Cold",
   data: [
     "Cold","Temperate","Warm", "Hot"
   ]
 },
 ValidationsMessages:{
   EMPTY:"EMPTY",
   EMAIL:"EMAIL"
 },
 Styles:{
   validationError: {
       height: 40,
       marginTop:10,
       marginLeft:5,
       marginRight:5,
       borderColor: 'gray',
       borderWidth: 1,
       padding:5,
       borderColor:'red',
       borderWidth:1
   },
   control: {
     height: 40,
     marginTop:10,
     marginLeft:5,
     marginRight:5,
     borderColor: 'gray',
     borderWidth: 1,
     padding:5
   }
 }
}



module.exports = Constants;
