import React from "react";
import "./adminDashboard.css"
import {useParams } from "react-router-dom"
import Navigation from "../navigation/navigation";

function Dashboard() {
    const role = "admin"
    const user = useParams().userName
    return (
        <div>
            <Navigation userName={user} role={role} />
        </div>

    )
}

export default Dashboard;