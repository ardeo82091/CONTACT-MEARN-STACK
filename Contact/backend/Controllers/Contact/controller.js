const JWTPayload = require('../../view/authentication');
const User = require('../../view/User.js')
const Credentials = require('../../view/credential')
const Contact = require('../../view/contact')
async function createContact(req,resp)
{
    const userName = req.params.userName;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload == false)
    {
        resp.status(401).send("Login require");
        return;
    }
    if(newPayload.isActive == false)
    {
        resp.status(401).send("User not Found");
        return;
    }
    let [isCredExist,cred] = await Credentials.findCredId(newPayload.userName);
    if(cred.userName != userName){
        resp.status(401).send("please login with correct userName")
        return;
    }
    const {firstName,lastName} = req.body;

    if (typeof firstName != "string") {
        resp.status(406).send("Firstname is invalid");
        return;
    }

    if (typeof lastName != "string") {
        resp.status(406).send("LastName is invalid");
        return;
    }

    let [newContact,message] = await User.createNewContact(userName,firstName,lastName);
    if(newContact==null)
    {
        resp.status(403).send(message);
        return;
    }
    resp.status(201).send(newContact);
    return message;
}

async function getAllContacts(req,resp)
{
    const userName = req.params.userName;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload == false)
    {
        resp.status(401).send("Login require");
        return;
    }
    if(newPayload.isActive == false)
    {
        resp.status(401).send("User not Found");
        return;
    }
    let [isCredExist,cred] = await Credentials.findCredId(newPayload.userName);
    if(cred.userName != userName){
        resp.status(401).send("please login with correct userName")
        return;
    }
    const { limit, pageNumber } = req.body;
    let allContact = await Contact.allContacts(newPayload.userName);
    if (allContact.length == 0) {
        return resp.status(403).send("No Contact Exist");
    }
    let startIndex = (pageNumber - 1) * limit;
    let endIndex = pageNumber * limit;

    resp.status(201).send(allContact.slice(startIndex,endIndex))
    return;
}

async function noOfContacts(req,resp)
{
    const userName = req.params.userName;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload == false)
    {
        resp.status(401).send("Login require");
        return;
    }
    if(newPayload.isActive == false)
    {
        resp.status(401).send("User not Found");
        return;
    }
    let [isCredExist,cred] = await Credentials.findCredId(newPayload.userName);
    if(cred.userName != userName){
        resp.status(401).send("please login with correct userName")
        return;
    }
    let allContact = await Contact.allContacts(newPayload.userName);
    resp.status(201).send(allContact.length.toString());
    return;
}

async function deleteContact(req,resp)
{
    const userName = req.params.userName;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload == false)
    {
        resp.status(401).send("Login require");
        return;
    }
    if(newPayload.isActive == false)
    {
        resp.status(401).send("User not Found");
        return;
    }
    let [isCredExist,cred] = await Credentials.findCredId(newPayload.userName);
    if(cred.userName != userName){
        resp.status(401).send("please login with correct userName")
        return;
    }
    const contactId = req.body.contactId;
    let [contact,contacts] = await Contact.isContactIdExists(contactId);
    if(!contacts)
    {
        resp.status(403).send("Contact not found")
        return;
    }
    (contact.isContactActive== true)? (contact.isContactActive= false) : (contact.isContactActive = true);
    await Contact.updateContactActive(contact.isContactActive,contact._id);
    resp.status(201).send("Updated");
    return;
}

async function updateContact (req,resp)
{
    let userName = req.params.userName;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload == false)
    {
        resp.status(401).send("Login require");
        return;
    }
    let [isCredExist,cred] = await Credentials.findCredId(newPayload.userName);
    if(cred.userName != userName){
        resp.status(401).send("please login with correct userName")
        return;
    }
    if(newPayload.isActive == false){
        resp.status(401).send("User not Found");
        return;
    }
    let contactID = req.params.contactID;
    let {propertyToUpdate,value} = req.body;

    if (typeof propertyToUpdate != "string") {
        resp.status(406).send("popertyToUpdate is invalid");
        return;
    }

    if (typeof value != "string") {
        resp.status(406).send("value is invalid");
        return;
    }
    const [isUpdate,msz] = await Contact.update(contactID,propertyToUpdate,value);
    if(!isUpdate){
        resp.status(403).send(msz)
        return;
    }
    resp.status(201).send("Updated");
    return;
}

module.exports = {createContact,getAllContacts,noOfContacts,deleteContact,updateContact};