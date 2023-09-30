const MenuItemModel = require("../model/MenuItemModel");
const RestaurantModel = require("../model/RestaurantModel")

const RestaurantController={
    getRestaurantListByLocation: async (request,response) =>{
        let { loc_id } = request.params;
        let result = await RestaurantModel.find({location_id:loc_id },{name: 1,locality: 1, image: 1,city:1});
        
        response.send({
            result
        })
    },
    getSingleRestaurantList: async (request,response) =>{
        let { rest_id } = request.params;
        let result = await RestaurantModel.findOne({_id:rest_id });
        
        response.send({
            result
        })
    },

    getMenuItems: async (request,response) => {
        let {r_id} =request.params;
        let result = await MenuItemModel.find({restaurantId: r_id});

        response.send({
            result
        })
    },

    getFilter: async (request,response) =>{
        let {meal_type, sort,location,cuisine,lCost,hCost,page} = request.body;
        let filterData = {}
        page = page ? page : 1;
        let perPage = 2;
        let startIndex = page * perPage - perPage;
        let endIndex = (page * perPage);

        if(meal_type !== undefined) filterData['mealtype_id'] = meal_type;
        if(location !== undefined) filterData['location_id'] = location;
        if(cuisine.length !== 0) filterData['cuisine_id'] = {$in : cuisine};
        if (lCost !== undefined && hCost !== undefined) {
            filterData["min_price"] = { $lt: hCost, $gt: lCost };
          }
        
        let result = await RestaurantModel.find(filterData).sort({
            min_price: sort,
            
        });
        let pageCount = Math.round(result.length / perPage);
        result = result.slice(startIndex, endIndex);
        response.send({
          status: true,
          result,
          pageCount,
          page,
        });
    }
}

module.exports = RestaurantController