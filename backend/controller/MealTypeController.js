const MealTypeModel = require("../model/MealTypeModel")

const MealTypeController={
    getMealTypeList: async (request,response) =>{
        let result = await MealTypeModel.find()
        response.send({
            result
        })
    }
}

module.exports = MealTypeController