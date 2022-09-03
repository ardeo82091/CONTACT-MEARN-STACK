const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const uuid = require('uuid')
const app = express();
const cookieParser = require('cookie-parser')
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())


const {login,validAdmin,validUser} = require('./Controllers/Login/controller');
const logout = require('./Controllers/Logout/controller.js');
const {createContactDetail,getAllContactDetails,noOfContactDetails} = require('./Controllers/ContactDetail/controller.js');
const {createUser,getAllUser,updateUser,createAdmin, deleteUser, noOfUsers} = require('./Controllers/User/controller.js');
const {createContact,getAllContacts,noOfContacts,deleteContact,updateContact} = require('./Controllers/Contact/controller.js')


app.post("/api/v1/login", async (req,resp)=> login(req,resp));

app.post("/api/v1/createuser",async(req,resp) =>  createUser(req,resp));

app.post("/api/v1/createContact/:userName",async (req,resp)=>createContact(req,resp));

app.post("/api/v1/createContactDetail/:userName",async (req,resp)=>createContactDetail(req,resp));

app.post("/api/v1/getAllContacts/:userName",async (req,resp)=> getAllContacts(req,resp));

app.post("/api/v1/getAllContactDetails/:userName/:contactID",async (req,resp)=> getAllContactDetails(req,resp));

app.get("/api/v1/numberOfContactDetail/:userName/:contactID",async (req,resp)=> noOfContactDetails(req,resp));

app.put("/api/v1/updateUser",async (req,resp)=>updateUser(req,resp));

app.put("/api/v1/updateContact/:userName/:contactID",async (req,resp)=>updateContact(req,resp));

app.post("/api/v1/getUser",async (req,resp)=>getAllUser(req,resp));

app.get("/api/v1/numberOfUsers",async (req,resp)=>noOfUsers(req,resp));

app.get("/api/v1/numberOfContacts/:userName",async (req,resp)=>noOfContacts(req,resp));

app.post("/api/v1/deleteUser",async  (req, resp) => deleteUser(req, resp));

app.post("/api/v1/deleteContact/:userName",async  (req, resp) => deleteContact(req, resp));

app.post("/api/v1/isAdminLogin",(req,resp)=>validAdmin(req,resp));

app.post("/api/v1/isUserLogin/:userName",async (req,resp)=>validUser(req,resp));

app.post("/api/v1/logout",(req,resp)=>logout(req,resp));

app.listen(8082,async ()=>{
    await createAdmin();
    console.log("app is started at port 8082");
})