import axios from "axios"
import React, { useState } from "react";
import "./adminDashboard.css"
import { useNavigate,useParams } from "react-router-dom"

function AdminDashboard(){
    const navigation = new useNavigate();
    const [firstName,updateFirstName] = useState("");
    const [lastName,updateLastName] = useState("");
    const [userName,updateUserName] = useState("");
    const [password,updatePassword] = useState("");
    const [role,updateRole] = useState("");
    const [propertyToUpdate,updatepropertToUpdate] = useState("");
    const [value,updateValue] = useState("");
    const [loginStatus, updateloginStatus] = useState("")
    const user = useParams().userName;
    const onCreateUser = async (e) =>{
        e.preventDefault()
        const resp= await axios.post("http://localhost:8082/api/v1/createuser",{firstName,lastName,userName,password,role})
        if (resp.status==201){
            console.log(resp.data)
            updateloginStatus("User Created Succeddfully")
        }
        if (resp.status==403){
            updateloginStatus("Error occured")
        }
    }
    const onUpdateUser = async (e) =>{
        e.preventDefault()
        const resp= await axios.post(`http://localhost:8082/api/v1/updateUser/${userName}`,{propertyToUpdate,value})
        
        console.log(resp.data)
        if (resp.status==201){
            console.log(resp.data)
            if (resp.data.role=="admin"){
                navigation('/adminDashboard')
            }else{
                 navigation('/userDashboard')
            }
        }
        if (resp.status==403){
            updateloginStatus("Error occured")
        }
    }
    return(
        <>
        <div className="row">
        <>

        <>
        <form className="createUser" onSubmit = {onCreateUser}>
            <div className ="form-group" >
            <h1 className = "heading">CREATE USER</h1>
                <label>firstName :</label>
                <input type= "text" className="form-control" value = {firstName}
                onChange={(e) => updateFirstName(e.target.value)} ></input><br />
                <label>lastName :</label>
                <input type= "text" className="form-control" value = {lastName}
                onChange={(e) => updateLastName(e.target.value)} ></input><br />
                <label>userName :</label>
                <input type= "text" className="form-control" value = {userName}
                onChange={(e) => updateUserName(e.target.value)} ></input><br />
                <label>password :</label>
                <input type= "text" className="form-control" value = {password}
                onChange={(e) => updatePassword(e.target.value)} ></input><br />
                <label>role :</label>
                <input type= "text" className="form-control" value = {role}
                onChange={(e) => updateRole(e.target.value)} ></input><br />
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: "orange" }}>Create User</button><br />
            </div>
        </form>
        </>

        <form className="updateUser" onSubmit = {onUpdateUser}>
            <div className ="form-group" >
            <h1 className = "heading">UPDATE USER </h1>
                <label>userName:</label>
                <input type= "text" className="form-control" value = {userName}
                onChange={(e) => updateUserName(e.target.value)} ></input><br />
                <label>propertyToUpdate :</label>
                <input type= "text" className="form-control" value = {propertyToUpdate}
                onChange={(e) => updatepropertToUpdate(e.target.value)} ></input><br />
                <label>value :</label>
                <input type= "text" className="form-control" value = {value}
                onChange={(e) => updateValue(e.target.value)} ></input><br />
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: "orange" }}>Update User</button><br />
            </div>
        </form>

        <form className="deleteUser" onSubmit = {onCreateUser}>
            <div className ="form-group" >
            <h1 className = "heading">DELETE USER</h1>
                <label>userName :</label>
                <input type= "text" className="form-control" value = {userName}
                onChange={(e) => updateUserName(e.target.value)} ></input><br />
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: "orange" }}>Create User</button><br />
            </div>
        </form>

        <form className="deleteUser" onSubmit = {onCreateUser}>
            <div className ="form-group" >
            <h1 className = "heading">GET ALL USER:</h1>
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: "orange" }}>Create User</button><br />
            </div>
        </form>
       
        </>
        </div> 
        </>
    )
}

export default AdminDashboard