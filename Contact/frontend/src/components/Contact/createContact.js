import React,{useState,useEffect} from "react";
import axios from "axios";
import {useParams,useNavigate} from "react-router-dom";
import Navigation from '../navigation/navigation'

function CreateContact()
{
    const role = "user";
    const user = useParams().userName;
    const [firstName,updateFirstName] = useState("");
    const [lastName,updateLastName] = useState("");
    const [loginStatus, updateloginStatus] = useState("")
    const [StatusOfUser,updateStatusOfUser] = useState("");

    let navigate = new useNavigate();
    const navToLogin = () => {
        navigate('/');
      };

    useEffect(() => {
        axios.post(`http://localhost:8082/api/v1/isUserLogin/${user}`,{})
          .then((resp) => {
            updateloginStatus(true);
          })
          .catch((error) => {
            updateloginStatus(false);
          });
    }, [user]);

    const handleMySubmit = async (e)=>{
        e.preventDefault();
        await axios.post(`http://localhost:8082/api/v1/createContact/${user}`,{firstName,lastName})
        .then((resp)=>{
            alert("Successfully Created");
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
    else
    {
        return (
            <div>
                <div >
                    <Navigation userName={user} role={role} />
                </div> 
                    <div className="container">
                        <div className="card">
                            <div className="card-header" style={{ backgroundColor: "cyan" }}>
                            <h5 style={{"textAlign": "center"}}>Create Contact</h5>
                            </div>
                            <div className="card-body" style={{ backgroundColor: "grey" }}>
                                <form onSubmit={handleMySubmit}>
                                    <label  className="form-group">firstName :</label>
                                    <input type= "text" className="form-control" value = {firstName}
                                    onChange={(e) => updateFirstName(e.target.value)} ></input><br />
                                    <label  className="form-group">lastName :</label>
                                    <input type= "text" className="form-control" value = {lastName}
                                    onChange={(e) => updateLastName(e.target.value)} ></input><br />
                                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: "orange" }}>Create Contact</button><br />
                                    {StatusOfUser}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default CreateContact;