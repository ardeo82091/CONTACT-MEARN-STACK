const mongoose = require('mongoose');

const ContactDetailSchema = mongoose.Schema({
    type : {type:String},
    value : {type:String}
},{
    timestamps:true
})

let contactDetailModel = new mongoose.model('ContactDetails', ContactDetailSchema)
module.exports = contactDetailModel;