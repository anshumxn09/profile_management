const mongoose = require('mongoose');


const connection = async () => {
    return mongoose.connect("mongodb+srv://anshumaan:anshuman@cluster0.eusmm48.mongodb.net/profileManage?retryWrites=true&w=majority", {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    })
}

module.exports = connection;