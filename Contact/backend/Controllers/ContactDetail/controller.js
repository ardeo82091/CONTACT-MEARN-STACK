const User = require('../../view/User.js');
const JWTPayload = require('../../view/authentication.js')
const Credentials = require('../../view/credential')
const Contact = require('../../view/contact')
async function createContactDetail(req,resp)
{
    const userName = req.params.userName;
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
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let fullName = `${firstName} ${lastName}`;
    let [indexOfContact,isContactExist] = await User.indexOfContact(userName,fullName);
    if(!isContactExist)
    {
        resp.status(403).send("Contact doesnt Exist")
        return;
    }
    const {type,value} = req.body;

    if (typeof type != "string") {
        resp.status(406).send("type is invalid");
        return;
    }

    if (typeof value != "string" && typeof value != "number") {
        resp.status(406).send("value is invalid");
        return;
    }

    let [isContactDetailsAdded,message] = await Contact.createContactDetails(indexOfContact,type,value);
    if(!isContactDetailsAdded){
        resp.status(403).send(message)
        return;
    }
    resp.status(201).send(message);
    return message;
}

async function getAllContactDetails(req,resp)
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
    const { limit, pageNumber } = req.body;
    
    let allContactDetails = await Contact.getallContactDetails(contactID);
    let startIndex = (pageNumber - 1) * limit;
    let endIndex = pageNumber * limit;

    resp.status(201).send(allContactDetails.slice(startIndex,endIndex))
    return;
}

async function noOfContactDetails(req,resp)
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
    let allContactDetails = await Contact.getallContactDetails(contactID);
    resp.status(201).send(allContactDetails.length.toString());
    return;
}

module.exports = {createContactDetail,getAllContactDetails,noOfContactDetails};