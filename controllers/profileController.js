
const Profile = require('../schema/profileSchema');
const emailValidation =  require('email-validator');

const profileController = {
    createMyProfile : async (req, res) => {
        const {name, email, address, sports, skilllevel}  = req.body;
        if(!name || !email || !address || !sports || !skilllevel){
            return res.json({
                message : "some fields are missing"
            })
        }
        if(!emailValidation.validate(email)){
            return res.json({
                message  : "email is incorrectly filled"
            })
        }
        
        const exists = await Profile.findOne({email});
        if(exists){
            return res.json({
                message  : "user already exists with this email address"
            })
        }

        const NewUser = new Profile({
            name, email, address, skilllevel, sports
        })
        const response = await NewUser.save();

        return res.json({
            message : response
        })
    },
    readMyProfile : async (req, res) => {
        try {
            const getProfiles = await Profile.find();
            return res.json({
                "data" : getProfiles
            })
            
        } catch (error) {
            return res.json({
                error : error
            })
        }
    },
    updateMyProfile : async(req, res) => {
        const {name, email, address, sports, skilllevel}  = req.body;
        if(!name || !email || !address || !sports || !skilllevel){
            return res.json({
                message : "some fields are missing"
            })
        }
        if(!emailValidation.validate(email)){
            return res.json({
                message  : "email is incorrectly filled"
            })
        }
        // id should be in double quotes.
        const updated = await Profile.findOneAndUpdate({"_id": req.params.id}, {
            email, name,address, sports, skilllevel
        })

        if(updated){
            return res.json({
                message  : updated
            })
        }
    },
    deleteMyProfile : async (req, res) => {
        try {
            await Profile.findOneAndDelete(req.params.id);
            return res.json({
                message : "deleted your profile"
            })
        } catch (error) {
            return res.json({
                error : error
            })
        }
    },
    getSearchProfile : async (req, res) => {
        try {
            // req.query will be in object form like {sports : football}
            const getProfiles = await Profile.find(req.query);
            return res.json({
                "data" : getProfiles
            })
            
        } catch (error) {
            return res.json({
                error : error
            })
        }
    }
};

module.exports = profileController;