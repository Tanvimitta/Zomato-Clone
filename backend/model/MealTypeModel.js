const mongoose =  require('mongoose')

//create a schema

const MealTypeSchema = new mongoose.Schema({
    
        "name": {type:String},
        "content": {type:String},
        "image": {type:String},
        "meal_type": {type:Number}
      
});

//create a model

const MealTypeModel = mongoose.model("mealtype",MealTypeSchema,"mealtypes");// name, schema, collectionname

module.exports = MealTypeModel;