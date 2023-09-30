
// const { request, response } = require("express");
const UserModel = require("../model/UserModel");

const UserController = {

    userHome : (request,response) =>{
        response.send({
            status: true,
            message: "welcome to home page",
        });
    },

    getUserList: async (request,response) =>{
        let { gender } = request.params;
        let result = await UserModel.find({gender: {$regex:gender, $options:"i"}},{first_name: 1,last_name: 1, gender: 1});
        response.send({
            status: true,
            list: result,
        });
    },

    saveUserData : async (request,response) => {
        // client(postmon) to server
        let user = request.body; //request.params


        let saveData = {
            "first_name":user.f_name,
            "address": user.address,
            "email": user.email,
            "mobile":user.mobile,
            "password":user.password,
        };

        let result =await UserModel.findOne({mobile: user.mobile})
        if(result){
            response.send({
                call: false,
                message: "given mobile no. exist"
            });
        }else{
            let newUser = new UserModel(saveData)
            await newUser.save();
            response.send({
                call: true,
            });
        }
        
    },

    userLogin : async (request,response) => {

        let { username,password } = request.body
        let isUserValid = await UserModel.findOne({mobile: username, password: password},{password: 0})

        if(isUserValid){
        response.send({
            call: true,
            user: isUserValid,
        });
    }else{
        response.send({
            call : false,
        })
    }
    },

};

module.exports = UserController;