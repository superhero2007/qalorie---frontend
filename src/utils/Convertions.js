import Constants from "./Constants"

var kgEquivalentPound = 0.45359237;
var ftEquivalentCms = 0.0328084;

var Convertions = {
    poundsToKg : function(value){
      value = value === '' ? 0 : parseFloat(value);
      return String((value * kgEquivalentPound).toFixed(1));
    },
    kgToPounds : function(value){
      console.log("kgToPounds",value);
      value = value === '' ? 0 : parseFloat(value);
      return String((value / kgEquivalentPound).toFixed(1));
    },
    ftToCms : function(value){
      value = value === '' ? 0 : parseFloat(value);
      return parseFloat((value * 30.48).toFixed(0));
    },
    inToCms : function(value){
      value = value === '' ? 0 : parseFloat(value);
      return parseFloat((value * 2.54).toFixed(0));
    },
    imperialToCms:function(ft, inches){
      ft = ft === '' ? 0 : parseFloat(ft);
      inches = inches === '' ? 0 : parseFloat(inches);
      return String((this.ftToCms(ft) + this.inToCms(inches)).toFixed(0));
    },
    cmsToFtPart: function(cms){
      cms = cms === '' ? 0 : parseFloat(cms);
      return String((cms * ftEquivalentCms).toFixed(1)).split('.')[0];
    },
    cmsToFtIn: function(cms){
      cms = cms === '' ? 0 : parseFloat(cms);
      return String((cms * ftEquivalentCms).toFixed(1)).split('.')[1];
    },
    getAgeByDate: function(date){
      //TODO:Calculate the age.
      return 29;
    },
    goalIndexToValue: function(index){
      switch(index){
        case 1:
            return Constants.Goal.LOOSE_WEIGHT;
          break;
        case 2:
            return Constants.Goal.MAINTAIN_WEIGHT;
          break;
        case 3:
            return Constants.Goal.GAIN_WEIGHT;
          break;
        default:
            return Constants.Goal.LOOSE_WEIGHT;
          break;
      }
    },
    levelActivityIndexToValue: function(index){
      switch(index){
        case 1:
            return Constants.Activity.SEDENTARY;
          break;
        case 2:
            return Constants.Activity.LIGHT_ACTIVE;
          break;
        case 3:
            return Constants.Activity.ACTIVE;
          break;
        case 4:
            return Constants.Activity.ACTIVE;
          break;
        default:
            return Constants.Activity.SEDENTARY;
          break;
      }
    },
    weatherIndexToValue: function(index){
      switch(index){
        case 1:
            return Constants.Weather.COLD;
          break;
        case 2:
            return Constants.Weather.TEMPERATE;
          break;
        case 3:
            return Constants.Weather.WARM;
          break;
        case 4:
            return Constants.Weather.HOT;
          break;
        default:
            return Constants.Weather.COLD;
          break;
      }
    },
    dailyIndexToValue: function(index){
      switch(index){
        case 1:
            return 15;
          break;
        case 2:
            return 30;
          break;
        case 3:
            return 45;
          break;
        case 4:
            return 60;
          break;
        default:
            return 15;
          break;
      }
    }

}

module.exports = Convertions;
