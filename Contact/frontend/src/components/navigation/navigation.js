import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { useNavigate} from "react-router-dom";
import axios from "axios";
import img from '../../unnamed.png'
import  './navigation.css'
function Navigation({ userName, role }) {
    let navigate = new useNavigate();
    const handleMyLogout = () => {
        axios.post('http://localhost:8082/api/v1/logout').then((resp)=> {
            navigate('/');
        });
    };

    if (role === "admin") {
        const createUserPath = "/CreateUser/" + userName
        const displayuserPath = "/AllUser/" + userName
        const UpdateUserPath = "/UpdateUser/" + userName

        return (

            <Navbar collapseOnSelect expand="lg" bg="dark" variant = "dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={img} className = "img" alt = "logo"></img> &nbsp;
                        {userName}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">

                            <NavDropdown title="Users" id="basic-nav-dropdown">
                                <NavDropdown.Item href={createUserPath}>Create</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href={displayuserPath}>AllUsers</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href={UpdateUserPath}>Update</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <div className='pull-right' >
                            <ul className="nav navbar-nav">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button className="btn btn-primary" onClick={handleMyLogout} style={{ backgroundColor: "orange" }}>Logout</button>
                                
                            </ul>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    } else {
        const createContactPath = "/createContact/" + userName
        const createContactDetailPath = "/createContactDetails/" + userName
        const displayContactPath = "/allContacts/" + userName
        return (

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={img} className = "img" alt = "logo"></img> &nbsp;
                        {userName}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Create" id="collasible-nav-dropdown">
                                <NavDropdown.Item href={createContactPath}>Contact</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href={createContactDetailPath}>Contact Detail</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href={displayContactPath}>AllContacts</NavDropdown.Item>
                                
                            </NavDropdown>

                        </Nav>
                        <div className='pull-right' >
                            <ul className="nav navbar-nav">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <button className="btn btn-primary" onClick={handleMyLogout} style={{ backgroundColor: "orange" }}>Logout</button>
                            </ul>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }

}
export default Navigation
