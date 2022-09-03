const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    firstName : {type:String},
    lastName : {type:String},
    fullName : {type:String},
    isContactActive : {type:Boolean},
    contactDetails :{type:[mongoose.SchemaTypes.ObjectId],ref:"ContactDetails"}
},{
    timestamps:true
})

let contactModel = new mongoose.model('Contact', ContactSchema)
module.exports = contactModel;