const Contact = require('./contact.js');
const Credentials = require('./credential');
const {DatabaseMongoose} = require('../repository/database')
const uuid = require('uuid');
const bcrypt = require('bcrypt');
class User
{
    constructor(firstName,lastName,credential,role)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.credential = credential;
        this.role = role;
        this.isActive = true;
        this.contacts = [];
    }

    static async createAdmin(username,passworD,firstname,lastname)
    {
        let userName = username;
        const password = passworD;
        const firstName = firstname;
        const lastName = lastname;
        const role = "admin";
        const [flag,message,newCredential] = await Credentials.createCredential(userName,password);
        if(flag === false)
        {
            return;
        }
        const db = new DatabaseMongoose();
        const admin = await db.insertOneUser(new User(firstName,lastName,newCredential, role));
        return;
    }

    static async createNewUser(firstname,lastName,userName, password, role)
    {
        const [flag,message,newCredential] = await Credentials.createCredential(userName,password);
        if(flag === false)
        {
            return [null,"UserName already Exists"]
        }
        const db = new DatabaseMongoose();
        const newUser = await db.insertOneUser(new User(firstname,lastName,newCredential, role));
        return [newUser,"New User created"];
    }

    async comparePassword(password){
        let isPassword = await bcrypt.compare(password, this.credential.password);
        return isPassword;
    }

    static async findUser(userName)
    {
        const db = new DatabaseMongoose();
        const findCred =await db.findOneCred({"userName":userName});
        if(!findCred)
        {
            return [null,false];
        }
        const findUser = await db.findOneUser({"credential":findCred._id})
        if(findUser && findUser.isActive == true)
        {
            return [findUser,true];
        }
        return [-2,false];
    }

    static async allUsers()
    {
        const db = new DatabaseMongoose();
        const allUser = await db.getUsers();
        return allUser;
    }

    static async updateUserActive(isactive,userId)
    {
        const db = new DatabaseMongoose();
        await db.updateOneUser({_id:userId},{$set:{isActive:isactive}})
        return ;
    }

    adminDeleteUser(userName)
    {
        if (this.isActive==false){
            return [false,"User not Exist"];
        }
        if(this.role != "admin") return[false,`Please specify the role to admin to delete ${fullName}`]
        let [indexOfUser, isUserExist] = User.findUser(userName);
        if(isUserExist == false)
        {
            return[false,"User not Exists, Please give the correct name."];
        }
        if(User.allUsers[indexOfUser].isActive == false) return[-1,"User already Deleted"];
        User.allUsers[indexOfUser].isActive = false;
        return [true,"successfully Deleted"];
    }

    static async isUserIdExists(userId)
    {
        const db = new DatabaseMongoose();
        const findUser =await db.findOneUser({_id:userId});
        if(findUser.length != 0 )
        {
            return [findUser,true];
        }
        return [-1,false];
    }



    static async createNewContact(userName,firstName,lastName)
    {
        let [dUser,isUserExist] = await User.findUser(userName);
        if(!isUserExist)
        {
           return[null,"User Not Exist"];
        }
        const db = new DatabaseMongoose();
        for(let index =0; index<dUser.contacts.length; index++)
        {
            let findContact = await db.findOneContact({"_id":dUser.contacts[index]})
            if(findContact.firstName == firstName && findContact.lastName == lastName)
            {
                return [null,"Name Already Existed, Please choose another Name "];
            }
        }
        let fullName = `${firstName} ${lastName}`
        let tempContact = new Contact(firstName,lastName,fullName);
        let newContact = await db.insertOneContact(tempContact);
        let update = await db.updateOneUser({_id:dUser._id},{$push:{contacts:newContact}})
        return [newContact,"Contact created Suceefully"];
    }

    static async indexOfContact(userName,fullName)
    {
        let [dUser,isUserExist] = await User.findUser(userName);
        if(!isUserExist)
        {
           return[null,"User Not Exist"];
        }
        if(dUser.contacts.length==0) return [-1,false]
        const db = new DatabaseMongoose();
        for(let indexofContact=0; indexofContact<dUser.contacts.length; indexofContact++)
        {
            let findContact = await db.findOneContact({"_id":dUser.contacts[indexofContact]})
            if(findContact.fullName == fullName && findContact.isContactActive == true)
            {
                return [findContact._id,true]
            }
        }
        return [-1,false];
    }

    static async deleteUserContact(fullName)
    {
        let [indexofContact,iscontactexist] = this.indexOfContact(fullName);
        if(iscontactexist == false) return [false, "User not found"];
        if(this.contacts[indexofContact].deleteContact()) 
        return[true,"Contact Deleted"];
        return [false,"Contact not exist"]
    }

    getContact(fullName)
    {
        let [indexofContact,iscontactexist] = this.indexOfContact(fullName);
        if(iscontactexist == false) 
        {
            return ([false, "User not found"]);
        }
        console.log(this.contacts[indexofContact].contactDetails);
    }

    static async update(userName, propertyToUpdate, value)
    {
        let [dUser,isUserExist] = await User.findUser(userName);
        if(!isUserExist)
        {
            return [false,"User Not Exist"];
        }
        const db = new DatabaseMongoose();
        switch (propertyToUpdate) 
        {
            case "FirstName": 
                await db.updateOneUser({_id:dUser._id},{$set:{firstName:value}})
                return [true,"Updated"];

            case "LastName": 
                await db.updateOneUser({_id:dUser._id},{$set:{lastName:value}}) 
                return [true,"Updated"];
            
            case "UserName":
                await db.updateOneCred({_id:dUser.credential},{$set:{userName:value}}) 
                console.log(dUser.credential)
                return [true,"Updated"];

            default: return [false,"Not Updated"];
        }
    }
}
module.exports = User;