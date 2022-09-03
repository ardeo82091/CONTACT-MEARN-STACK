import axios from "axios"
import React, { useState } from "react";
import "./login.css"
import { useNavigate } from "react-router-dom";
function Login() {
    const navigation = new useNavigate();
    const [password, updatePassword] = useState("");
    const [userName, updateUsername] = useState("");
    const [loginStatus, updateloginStatus] = useState("");
    const handleMyLogin = async (e) => {
        if (userName !== "" && password !== "") {
        e.preventDefault();
        await axios.post("http://localhost:8082/api/v1/login",{userName,password})
        .then((resp)=>{
            if (resp.data.role==="admin"){
                navigation(`/adminDashboard/${userName}`)
            }
            else{
                navigation(`/userDashboard/${userName}`)
            }
        })
        .catch((error)=>{
            alert(`Error ${error.response.data}`);
            updateloginStatus('Invalid Credentials')
        })  
    }

}
    
    return (
        <>
            <form className = "login" onSubmit={handleMyLogin}>
                <div className ="form-group"style={{ width: "50%" }} >

                    <label >Username:</label>
                    <input type="text" className="form-control" value={userName}
                        onChange={(e) => updateUsername(e.target.value)} ></input><br />

                    <label>Password:</label>
                    <input type="text" value={password} className="form-control"
                        onChange={(e) => updatePassword(e.target.value)}></input><br />

                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: "orange" }}>Login</button><br />
                    {loginStatus}

                </div>
            </form>
        </>
    )
}

export default Login;

