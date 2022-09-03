import React, { useState,useEffect} from "react";
import axios from "axios";
import {useParams,useNavigate } from "react-router-dom";
import './createUser.css'
import Navigation from '../navigation/navigation.js'
function CreateUser() 
{
    const roleofadmin = "admin"
    const usernameofadmin = useParams().userName;
    const [firstName,updateFirstName] = useState("");
    const [lastName,updateLastName] = useState("");
    const [userName,updateUserName] = useState("");
    const [password,updatePassword] = useState("");
    const [role,updateRole] = useState("");
    const [loginStatus, updateloginStatus] = useState("")
    const [StatusOfUser,updateStatusOfUser] = useState("");
    
    let navigate = new useNavigate();
    const navToLogin = () => {
        navigate('/');
      };

    useEffect(() => {
        axios.post("http://localhost:8082/api/v1/isAdminLogin",{})
          .then((resp) => {
            updateloginStatus(true);
          })
          .catch((error) => {
            updateloginStatus(false);
          });
    }, []);

    const handleMySubmit = async (e) => {
            e.preventDefault();
            
            await axios.post("http://localhost:8082/api/v1/createuser",{firstName,lastName,userName,password,role})
            .then((resp)=>{
                alert("Successfully Created");
                console.log(resp)
                updateStatusOfUser("Created");
            })
            .catch((error)=>{
                alert(`Error ${error.response.data}`);
                updateStatusOfUser(error.response.message);
            })            
    }
    if (loginStatus === false) {
        console.log(loginStatus)
        return (
            <>
            <div
              style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                flexDirection: "column",
              }}
            >
              <p style={{ color: "white", fontSize: "30px" , background : "red"}}>
                User not logged in, Click Below to login :
              </p>
              <button onClick={navToLogin} type="submit" className="btn btn-primary" style={{ backgroundColor: "green" ,fontSize : "30px"}}>Login</button><br />
            </div>
          </>
        )
    }
    else {
        return (
            <div>
                <div >
                    <Navigation userName={usernameofadmin} role={roleofadmin} />
                </div> 
                    <div className="container">
                        <div className="card">
                            <div className="card-header" style={{ backgroundColor: "cyan" }}>
                            <h5 style={{"textAlign": "center"}}>CreateUser</h5>
                            </div>
                            <div className="card-body" style={{ backgroundColor: "grey" }}>
                                <form onSubmit={handleMySubmit}>
                                    <label  className="form-group">firstName :</label>
                                    <input type= "text" className="form-control" value = {firstName}
                                    onChange={(e) => updateFirstName(e.target.value)} ></input><br />
                                    <label  className="form-group">lastName :</label>
                                    <input type= "text" className="form-control" value = {lastName}
                                    onChange={(e) => updateLastName(e.target.value)} ></input><br />
                                    <label  className="form-group">userName :</label>
                                    <input type= "text" className="form-control" value = {userName}
                                    onChange={(e) => updateUserName(e.target.value)} ></input><br />
                                    <label  className="form-group">password :</label>
                                    <input type= "text" className="form-control" value = {password}
                                    onChange={(e) => updatePassword(e.target.value)} ></input><br />
                                    <label  className="form-group">role :</label>
                                    <input type= "text" className="form-control" value = {role}
                                    onChange={(e) => updateRole(e.target.value)} ></input><br />
                                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: "orange" }}>Create User</button><br />
                                    {StatusOfUser}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }

}
export default CreateUser