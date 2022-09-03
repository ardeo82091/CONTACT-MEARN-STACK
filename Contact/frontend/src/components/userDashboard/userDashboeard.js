import React from "react";
import {useParams } from "react-router-dom"
import Navigation from "../navigation/navigation";

function UserDashboard(){
    const role = "user"
    const user = useParams().userName
    console.log(user)
    return (
        <div>
            <Navigation userName={user} role={role} />
        </div>

    )
}

export default UserDashboard