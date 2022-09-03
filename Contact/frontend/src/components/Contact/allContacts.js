import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../navigation/navigation";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function AllContacts() {
    const User = useParams().userName
    const [allContacts, updateallContacts] = useState({});
    const [pageNumber, updatePageNumber] = useState(1);
    const [limit, updateLimit] = useState(5);
    const [loginStatus, updateloginStatus] = useState(false)
    const [allContactCount, updateallContactCount] = useState(0);
    let navigate = new useNavigate();
    const navToLogin = () => {
      navigate('/');
    };
    
    const toogleActiveFlag = (e) => {
      let contactId = e.target.id;
      axios
        .post(`http://localhost:8082/api/v1/deleteContact/${User}`, { contactId })
        .then((resp) => {
          updateallContacts(resp.data);
        })
        .catch((error) => {});
    };

    function getNumberOfContact() {
      axios
        .get(`http://localhost:8082/api/v1/numberOfContacts/${User}`)
        .then((resp) => {
          updateallContactCount(parseInt(resp.data));
        })
        .catch((error) => {});
    }

    useEffect(() => {
      axios.post(`http://localhost:8082/api/v1/isUserLogin/${User}`,{})
      .then((resp) => {
        updateloginStatus(true);
      })
      .catch((error) => {
        updateloginStatus(false);
      });
      axios
        .post(`http://localhost:8082/api/v1/getAllContacts/${User}`, { limit, pageNumber })
        .then((resp) => {
          updateallContacts(resp.data);
        })
        .catch((error) => {
        });
        getNumberOfContact();
    }, [pageNumber, limit, allContacts]);

    let rowOfContacts;

    if (allContacts != null) {
      let index=0;
        rowOfContacts = Object.values(allContacts).map((u) => {
          index+=1;
            return (
              
              <tr id={u._id} style ={{background : "grey"}}>
                <td>{index}</td>
                <td>{u.firstName}</td>
                <td>{u.lastName}</td>
                <td id={u._id}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={u.isContactActive}
                          onChange={toogleActiveFlag}
                          id={u._id}
                        />
                      }
                    />
                  </FormGroup>

                </td>
                <td>
                <a href={`allContactDetail/${User}/${u._id}`}>
                  <button className="btn btn-primary"  style={{ backgroundColor: "green" }}>ContactDetails</button>
                  </a>
                </td>

                <td>
                <a href={`updateContact/${User}/${u._id}`}>
                  <button className="btn btn-primary"  style={{ backgroundColor: "orange" }}>Update</button>
                  </a>
                </td>

              </tr>
            );
          });
        }
    if (!loginStatus) {
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
        );
      }
      else{
      return (
        <>
          <NavBar userName={User} role={"user"} />
          <div>
            <div className="pagination">
              <label class="fw-bold">limit:</label>
              <select
                id="role"
                name="role"
                onChange={(e) => {
                  updateLimit(e.target.value);
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
            </div>
            <div className="pagination">
              <Stack spacing={2}>
                <Pagination
                  count={Math.ceil(allContactCount/limit)}
                  color="primary"
                  onChange={(e, value) => updatePageNumber(value)}
                />
              </Stack>
            </div>
          </div>
          <div>
            <table class="table table-striped">
              <thead style ={{background : "orange"}}>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Firstname</th>
                  <th scope="col">Lastname</th>
                  <th scope="col">IsActive</th>
                  <th scope="col">All ContactDetails</th>
                  <th scope="col">Update</th>
                </tr>
              </thead>
              <tbody>{rowOfContacts}</tbody>
            </table>
          </div>
        </>
      );
              }
}
export default AllContacts