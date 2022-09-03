const JWTPayload = require('../../view/authentication');
const User = require('../../view/User.js')


async function createAdmin()
{
    await User.createAdmin("ankit","ankit@123","Ankit","Raj");
    return;
}

async function createUser(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin"){
        resp.status(401).send("please specify this role to admin")
        return;
    }
    if (newPayload.isActive == false){
        resp.status(401).send(`${newPayload.firstName} is Inactive`)
        return;
    }
    let {firstName,lastName,userName ,password,role} = req.body;

    if (typeof firstName != "string") {
        resp.status(406).send("First Name is invalid");
        return;
    }

    if (typeof lastName != "string") {
        resp.status(406).send("Last Name is invalid");
        return;
    }

    if (typeof userName != "string" || userName == null) {
        resp.status(406).send("UserName is invalid");
        return;
    }

    if (typeof password != "string") {
        resp.status(406).send("First Name is invalid");
        return;
    }

    if (role != "user" ) {
        resp.status(406).send("Role is invalid");
        return;
    }
    let [newUser,message]=await User.createNewUser(firstName,lastName,userName,password,role);
    if(newUser == null )
    {
        resp.status(403).send(message);
        return;
    }
    resp.status(201).send(newUser);
    return message;
}

async function getAllUser(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin"){
        resp.status(401).send("please specify this role to admin")
        return;
    }
    if (newPayload.isActive == false){
        resp.status(401).send(`${newPayload.firstName} is Inactive`)
        return;
    }
    const { limit, pageNumber } = req.body;
    let allUser = await User.allUsers();
    if (allUser.length == 0) {
        return resp.status(403).send("No user Exist");
    }
    let startIndex = (pageNumber - 1) * limit;
    let endIndex = pageNumber * limit;
    resp.status(201).send(allUser.slice(startIndex,endIndex));
    return;
}

async function noOfUsers(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin"){
        resp.status(401).send("please specify this role to admin")
        return;
    }
    if (newPayload.isActive == false){
        resp.status(401).send(`${newPayload.firstName} is Inactive`)
        return;
    }
    let allUser = await User.allUsers();
    resp.status(201).send(allUser.length.toString());
    return;
}

async function updateUser(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin"){
        resp.status(401).send("please specify this role to admin")
        return;
    }
    if (newPayload.isActive == false){
        resp.status(401).send(`${newPayload.firstName} is Inactive`)
        return;
    }
    let userName = req.body.userName;
    let {propertyToUpdate,value} = req.body;

    if (typeof propertyToUpdate != "string") {
        resp.status(406).send("popertyToUpdate is invalid");
        return;
    }

    if (typeof value != "string") {
        resp.status(406).send("value is invalid");
        return;
    }

    const [isUpdate,msz] =await User.update(userName,propertyToUpdate,value);
    if(!isUpdate){
        resp.status(403).send(msz)
        return;
    }
    resp.status(201).send(msz);
    return;
}

async function deleteUser (req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin"){
        resp.status(401).send("please specify this role to admin")
        return;
    }
    const userId = req.body.userId;
    let [findUser, isUserExists] =await  User.isUserIdExists(userId);
    if(!isUserExists)
    {
        resp.status(403).send("User not Found");
        return;
    }
    (findUser.isActive== true)? (findUser.isActive = false) : (findUser.isActive = true);
    await User.updateUserActive(findUser.isActive,findUser._id);
    resp.status(201).send("Updated");
    return;
}

module.exports = {createUser,getAllUser,updateUser,createAdmin,deleteUser,noOfUsers};