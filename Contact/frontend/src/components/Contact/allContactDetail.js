import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../navigation/navigation";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function AllContactDetails() {
    const User = useParams().userName
    const id = useParams().contactID;
    const [allContactDetails, updateallContactDetails] = useState({});
    const [pageNumber, updatePageNumber] = useState(1);
    const [limit, updateLimit] = useState(5);
    const [loginStatus, updateloginStatus] = useState(false)
    const [allCdetailsCount, updateallCdetailsCount] = useState(0);
    let navigate = new useNavigate();
    const navToLogin = () => {
      navigate('/');
    };

    function getContactDetails(){
      axios
        .post(`http://localhost:8082/api/v1/getAllContactDetails/${User}/${id}`, { limit, pageNumber })
        .then((resp) => {
          updateallContactDetails(resp.data);
          updateloginStatus(true);
        })
        .catch((error) => {
        });
      }
    useEffect(() => {
      getContactDetails();
      getNumberOfContactDetails();
    }, [pageNumber, limit, allContactDetails]);
    
    function getNumberOfContactDetails() {
      axios
        .get(`http://localhost:8082/api/v1/numberOfContactDetail/${User}/${id}`)
        .then((resp) => {
          updateallCdetailsCount(parseInt(resp.data));
        })
        .catch((error) => {
        });
    }

    let rowOfContacts;

    if (allContactDetails != null) {
      let index=0;
        rowOfContacts = Object.values(allContactDetails).map((u) => {
          index+=1;
            return (
              
              <tr id={u._id} style ={{background : "grey"}}>
                <td>{index}</td>
                <td>{u.type}</td>
                <td>{u.value}</td>
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
                <option value="15">15</option>
              </select>
            </div>
            <div className="pagination">
              <Stack spacing={2}>
                <Pagination
                  count={Math.ceil(allCdetailsCount / limit)}
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
                  <th scope="col">type</th>
                  <th scope="col">value</th>
                </tr>
              </thead>
              <tbody>{rowOfContacts}</tbody>
            </table>
          </div>
        </>
      );
              }
}
export default AllContactDetails