const userSchema = require("../schema/userSchema")
const emailValidation = require('email-validator');
const crypto = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userController = {
    register : async (req, res) => {
        try {
            const {email, password, name, isTeam} = req.body;
            if(!emailValidation.validate(email)){
                return res.json({
                    message : "invalid email is provided"
                })
            }

            const userExist = await userSchema.findOne({
                email
            })

            if(userExist){
                return res.json({
                    message : "user already exists"
                })
            }

            const makeUser =  new userSchema({
                email, password, name, isTeam
            })

            const getResponse  = await makeUser.save();
            if(getResponse){
                return res.json({
                    message : "successfully inserted the user"
                })
            }
        } catch (error) {
            console.log(error)
        }
    },
    login : async (req, res) => {
        try{
            const {email, password} = req.body;
            if(!emailValidation.validate(email)){
                return res.json({
                    message : "invalid email is provided"
                })
            }

            const userExist = await userSchema.findOne({
                email
            })

            if(!userExist){
                return res.json({
                    message : "user do not exists"
                })
            }

            const isMatch = await crypto.compare(password, userExist.password);

            if(!isMatch){
                return res.json({
                    message : "invalid credentials"
                })
            }
            const {_id} = userExist;
            const token = await jwt.sign({_id, email : userExist.email,}, "ANYTHINGFORNOWJHFVBYSDFHVKJFDHVLBJFVLBSHFJVDJKBDFVLNAJDLKVJADFLUOVHADFJLVBAFVHLAH");
            // 32 letter secret key
            return res.json({
                token
            })
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = userController;