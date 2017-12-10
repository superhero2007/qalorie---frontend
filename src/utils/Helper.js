import Constants from "./Constants"

var Helper = {

  getCaloriesPerDay : function(age, activity, workout, gender, goal, weight, height, isImperial, isPregnant, isBreastfeeding) {
    let factors = {
      sedentary_15: 1.2,
      sedentary_30: 1.2,
      sedentary_45: 1.2,
      sedentary_60: 1.2,
      light_15: 1.2,
      light_30: 1.2,
      light_45: 1.2,
      light_60: 1.2,
      active_15: 1.2,
      active_30: 1.2,
      active_45: 1.3,
      active_60: 1.3,
      very_active_15: 1.3,
      very_active_30: 1.3,
      very_active_45: 1.5,
      very_active_60: 1.7
    };

    //Get activity coeficient.
    activityCoeficient = factors[activity + '_' + workout];

    if(isImperial){
      weight = weight * parseFloat(0.45359237) ;
      height = height * parseFloat(2.54);
    }

    //Get gender and age coeficient.
    let genderCoeficient = 0;
    let ageCoeficient = 0;
    let goalCoeficient = 0;

    let recommendedCalories = 0;
    if (gender === Constants.Gender.MALE) {
      genderCoeficient = 66.5;
      ageCoeficient = 6.7;

      if(goal === Constants.Goal.LOSE_WEIGHT){
        goalCoeficient = -300;
      } else if (goal === Constants.Goal.GAIN_WEIGHT) {
        goalCoeficient = 700;
      }

      recommendedCalories = ((genderCoeficient + (12.7 * weight) + (5 * height) - (ageCoeficient * age)) * activityCoeficient) + goalCoeficient

    } else {
      genderCoeficient = 665;
      ageCoeficient = 4.6;

      if(isPregnant){
        goalCoeficient = 300;
        if(isBreastfeeding){
          goalCoeficient = goalCoeficient + 300;
        }
      }

      recommendedCalories = ((genderCoeficient + (9.5 * weight) + (1.8 * height) - (ageCoeficient * age)) * activityCoeficient) + goalCoeficient

    }
    return parseFloat(recommendedCalories).toFixed(0);
  },

  getWaterConsume : function(activity, weight, weather, gender, isPregnant, isBreastfeeding) {

    if(gender === Constants.Gender.FEMALE){
      if(isPregnant){
        if(isBreastfeeding){
          return 3.5;
        } else {
          return 3;
        }
      }
    }

    if(activity === Constants.Activity.SEDENTARY || activity === Constants.Activity.LIGHT_ACTIVE || activity === Constants.Activity.ACTIVE){
      if(weather === Constants.Weather.COLD || weather === Constants.Weather.TEMPERATE){
        return (parseFloat(30 * weight))/1000;
      } else {
        return (parseFloat(35 * weight))/1000;
      }
    } else {
      if(weather === Constants.Weather.COLD || weather === Constants.Weather.TEMPERATE){
        return (50 + parseFloat(35 * weight))/1000;
      } else {
        return (50 + parseFloat(35 * weight))/1000;
      }
    }
  },
  excerciseRecommendation: function(workout){
    switch (workout) {
      case 15:
          return 30;
        break;
      case 30:
          return 45;
        break;
      case 45:
          return 60;
        break;
      case 60:
          return 60;
        break;
      default:

    }
  }
};

module.exports = Helper;
