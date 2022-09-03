// import logo from './logo.svg';
import './App.css';
import React from "react";
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './components/adminDashboard/dashboard';
import UserDashboard from './components/userDashboard/userDashboeard'
import CreateUser from './components/Users/createUser';
import AllUser from './components/Users/AllUser';
import Login from './components/login/login';
import UpdateUser from './components/Users/updateUser'; 
import CreateContact from './components/Contact/createContact';
import CreateContactDetail from './components/Contact/createContactDetail';
import AllContacts from './components/Contact/allContacts';
import UpdateUser1 from './components/Users/updateuser1';
import AllContactDetail from './components/Contact/allContactDetail';
import UpdateContact from './components/Contact/updateContact';

function App() {
  return (

  <Routes>
    <Route exact path='/adminDashboard/:userName' element={<AdminDashboard/>} />
    <Route exact path='/CreateUser/:userName' element={<CreateUser />} />
    <Route exact path='/AllUser/:userName' element={<AllUser />} />
    <Route exact path='/updateUser/:userName' element={<UpdateUser />} />
    <Route exact path='/allContacts/updateContact/:userName/:contactID' element={<UpdateContact />} />
    <Route exact path='/AllUser/updateUser1/:userName/:user' element={<UpdateUser1 />} />
    <Route exact path='/userDashboard/:userName' element={<UserDashboard />} />
    <Route exact path='/createContact/:userName' element={<CreateContact />} />
    <Route exact path='/createContactDetails/:userName' element={<CreateContactDetail />} />
    <Route exact path='/allContacts/:userName' element={<AllContacts />} />
    <Route exact path='/allContacts/allContactDetail/:userName/:contactID' element={<AllContactDetail/>} />
    <Route exact path='/' element={<Login />} />
  </Routes>
  
  )
}

export default App;
