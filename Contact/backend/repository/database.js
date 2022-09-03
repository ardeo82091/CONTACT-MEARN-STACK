const mongoose = require('mongoose');
const userModel = require('../model/User')
const credModel = require('../model/credential')
const contactModel = require('../model/contact')
const contactDetailModel = require('../model/contactDetail')
class DatabaseMongoose {
    constructor() {
        this._connect()
    }
    _connect() {
        mongoose.connect("mongodb://127.0.0.1:27017/Contact")
            .then(() => {
                console.log()
            })
            .catch(err => {
                console.error(err)
            })
    }
    async insertOneUser(user) {
        try {
            let newRecord = await userModel.create(user)
            return newRecord
        }
        catch (e) {
            console.log(e.message)
        }
    }
    async insertOneCred(cred) {
        try {
            let newRecord = await credModel.create(cred)
            return newRecord
        }
        catch (e) {
            console.log(e.message)
        }
    }
    async insertOneContact(contact) {
        try {
            let newRecord = await contactModel.create(contact)
            return newRecord
        }
        catch (e) {
            console.log(e.message)
        }
    }
    async insertOneContactDetail(contactDetails) {
        try {
            let newRecord = await contactDetailModel.create(contactDetails)
            return newRecord
        }
        catch (e) {
            console.log(e.message)
        }
    }
    async findOneUser(user){
        try {
            let newRecord = await userModel.findOne(user)
            return newRecord
        }
        catch (e) {
            console.log(e.message)
        }
    }
    async findManyUser(user){
        try {
            let newRecord = await userModel.find(user)
            return newRecord
        }
        catch (e) {
            console.log(e.message)
        }
    }
    async findOneCred(cred){
        try {
            let newRecord = await credModel.findOne(cred)
            return newRecord
        }
        catch (e) {
            console.log(e.message)
        }
    }

    async findOneContact(contact){
        try {
            let newRecord = await contactModel.findOne(contact)
            return newRecord
        }
        catch (e) {
            console.log(e.message)
        }
    }
    async findOneContactDetail(contact){
        try {
            let newRecord = await contactDetailModel.findOne(contact)
            return newRecord
        }
        catch (e) {
            console.log(e.message)
        }
    }


    async updateOneContact(contact,update){
        try {
            let newRecord = await contactModel.updateOne(contact,update)
            return newRecord
        }
        catch (e) {
            console.log(e.message)
        }
    }
    async updateOneUser(user,update){
        try {
            let newRecord = await userModel.updateOne(user,update)
            return newRecord
        }
        catch (e) {
            console.log(e.message)
        }
    }
    async updateOneCred(cred,update){
        try {
            let newRecord = await credModel.updateOne(cred,update)
            return newRecord
        }
        catch (e) {
            console.log(e.message)
        }
    }

    async updateUser(user,update){
        try {
            let newRecord = await userModel.updateMany(user,update)
            return newRecord
        }
        catch (e) {
            console.log(e.message)
        }
    }
    async updateBook(book,update){
        try {
            let newRecord = await bookModel.updateMany(book,update)
            return newRecord
        }
        catch (e) {
            console.log(e.message)
        }
    }

    async DeletOneUser(user){
        try {
            let newRecord = await userModel.deleteOne(user)
            return newRecord
        }
        catch (e) {
            console.log(e.message)
        }
    }

    async DeletBook(book){
        try {
            let newRecord = await bookModel.deleteOne(book)
            return newRecord
        }
        catch (e) {
            console.log(e.message)
        }
    }
    

    async insertManyBook(listOfbooks) {
        let newRecords = await bookModel.insertMany(listOfbooks).then(function () {
            console.log("Data inserted")  
        }).catch(function (error) {
            console.log(error)      
        });
        return newRecords
    }
    async insertManyUser(listOfUser) {
        let newRecords = await userModel.insertMany(listOfUser).then(function () {
            console.log("Data inserted")  
        }).catch(function (error) {
            console.log(error)      
        });
        return newRecords
    }

    async getBooks() {
        let record = await contactModel.where("bookname").equals(bookname).limit(5).populate("author")
        return record;
    }

    async getUserContacts(iD) {
        try{
            let record = await userModel.where("credential").equals(iD).populate("contacts.Object");
            return record;
        }
        catch (e) {
            console.log(e.message)
        }
    }

    async getContactCOntactDetails(iD) {
        try{
            let record = await contactModel.where("_id").equals(iD).populate("contactDetails.Object");
            return record;
        }
        catch (e) {
            console.log(e.message)
        }
    }

    async getUsers() {
        try{
            let record = await userModel.find().populate("credential");
            return record;
        }
        catch (e) {
            console.log(e.message)
        }
        
    }
}







module.exports = {  DatabaseMongoose }
