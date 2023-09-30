const mongoose =  require('mongoose')

//create a schema

const LocationSchema = new mongoose.Schema({

        "name": {type:String},
        "city_id": {type: Number},
        "location_id": {type: Number},
        "city": {type:String},
        "country_name": {type:String}

});

//create a model

const LocationModel = mongoose.model("location",LocationSchema,"locations");// name, schema, collectionname

module.exports = LocationModel;