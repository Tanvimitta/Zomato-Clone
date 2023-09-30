const mongoose =  require('mongoose')

//create a schema

const MenuItemSchema = new mongoose.Schema({
    
    
        "name": {type: String},
        "description": {type: String},
        "ingridients": {type: Array},
        "restaurantId": {type: mongoose.Schema.Types.ObjectId},
        "image": {type: String},
        "qty": {type: Number},
        "price": {type: Number}
          
});

//create a model

const MenuItemModel = mongoose.model("menuitem",MenuItemSchema,"menuitems");// name, schema, collectionname

module.exports = MenuItemModel;