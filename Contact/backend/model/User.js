const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName : {type:String},
    lastName : {type:String},
    credential: { type: mongoose.SchemaTypes.ObjectId,ref:"Credentials"},
    role : {type:String},
    isActive:{type:Boolean},
    contacts :{type:[mongoose.SchemaTypes.ObjectId],ref:"Contact"}
},{
    timestamps:true
})

let userModel = new mongoose.model('Users', UserSchema)
module.exports = userModel;