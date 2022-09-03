import React,{useState,useEffect} from "react";
import axios from "axios";
import { useNavigate,useParams} from "react-router-dom";
import Navigation from '../navigation/navigation'

function CreateContactDetail()
{
    const role = "user";
    const user = useParams().userName;
    const [firstName,updateFirstName] = useState("");
    const [lastName,updateLastName] = useState("");
    const [type,updateType] = useState("");
    const [value,updateValue] = useState("");
    const [loginStatus, updateloginStatus] = useState("");
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
        await axios.post(`http://localhost:8082/api/v1/createContactDetail/${user}`,{firstName,lastName,type,value})
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
                            <h5 style={{"textAlign": "center"}}>Create ContactDetail</h5>
                            </div>
                            <div className="card-body" style={{ backgroundColor: "grey" }}>
                                <form onSubmit={handleMySubmit}>
                                <label  className="form-group">FirstName:</label>
                                    <input type= "text" className="form-control" value = {firstName}
                                    onChange={(e) => updateFirstName(e.target.value)} ></input><br />
                                    <label  className="form-group">lastName :</label>
                                    <input type= "text" className="form-control" value = {lastName}
                                    onChange={(e) => updateLastName(e.target.value)} ></input><br />
                                    <label  className="form-group">type :</label>
                                    <input type= "text" className="form-control" value = {type}
                                    onChange={(e) => updateType(e.target.value)} ></input><br />
                                    <label  className="form-group">value :</label>
                                    <input type= "text" className="form-control" value = {value}
                                    onChange={(e) => updateValue(e.target.value)} ></input><br />
                                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: "orange" }}>Create ContactDetail</button><br />
                                </form>
                                {StatusOfUser}
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default CreateContactDetail;