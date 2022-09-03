const ContactDetail = require("./contactDetail")
const {DatabaseMongoose} = require('../repository/database')
class Contact
{
    constructor(firstName,lastName,fullName)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = fullName;
        this.isContactActive = true;
        this.contactDetails = [];
    }

    static async createContactDetails(contactId,type,value)
    {
        const db = new DatabaseMongoose();
        let findContact = await db.findOneContact({"_id":contactId});
        console.log(findContact)
        for(let index=0; index<findContact.contactDetails.length; index++)
        {
            let indii = findContact.contactDetails[index];
            let findContactDetail = await db.findOneContactDetail({"_id":indii});
            if(findContactDetail.type == type && findContactDetail.value == value)
            {
                return [false,"type with value exists, Please choose another type value"];
            }
        }
        let tempContactDetails = new ContactDetail(type, value);
        let newContactDetails = await db.insertOneContactDetail(tempContactDetails);
        await db.updateOneContact({"_id":findContact._id},{$push:{"contactDetails":newContactDetails}})
        return [true,"Contact created Suceefully"];
    }

    static async allContacts(iD)
    {
        const db = new DatabaseMongoose();
        const findCOntact = await db.getUserContacts(iD);
        const allContacts = [];
        for(let index = 0; index<findCOntact[0].contacts.length; index++)
        {
            let findContact = await db.findOneContact({"_id":findCOntact[0].contacts[index]})
            allContacts.push(findContact)
        }
        return allContacts;
    }

    static async getallContactDetails(ID)
    {
        const db = new DatabaseMongoose();
        let allContactDetails = await db.getContactCOntactDetails(ID);
        console.log(allContactDetails)
        const allContactDetail = [];
        for(let index = 0; index<allContactDetails[0].contactDetails.length; index++)
        {
            let findContactDet = await db.findOneContactDetail({"_id":allContactDetails[0].contactDetails[index]})
            allContactDetail.push(findContactDet)
        }
        return allContactDetail;
    }

    static async isContactIdExists(contactId)
    {
        const db = new DatabaseMongoose();
        const findContact =await db.findOneContact({"_id":contactId});
        if(findContact)
        {
            return [findContact,true];
        }
        return [-1,false];
    }

    static async updateContactActive(isactive,contactId)
    {
        const db = new DatabaseMongoose();
        await db.updateOneContact({"_id":contactId},{$set:{"isContactActive":isactive}})
        return;
    }

    static async update(contactId, propertyToUpdate, value)
    {
        const db = new DatabaseMongoose();
        let dContact = await db.findOneContact({"_id":contactId});
        if(!dContact || dContact.isContactActive== false)
        {
            return [false,"Contact Not Exist"];
        }
        
        switch (propertyToUpdate) 
        {
            case "FirstName": 
                await db.updateOneContact({_id:dContact._id},{$set:{firstName:value}})
                return [true,"Updated"];

            case "LastName": 
                await db.updateOneContact({_id:dContact._id},{$set:{lastName:value}}) 
                return [true,"Updated"];

            default: return [false,"Not Updated"];
        }
    }
}

module.exports = Contact;