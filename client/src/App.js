import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Dentist from "./components/Dentist";
import Appointments from "./components/Appointments";
import Auth from "./components/Auth"
import EditAppointment from './components/EditAppointment'
import { useNavigate } from "react-router-dom";

const App = () => {
  const [dentists, setDentists] = useState([]);
  
  const [user, setUser] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {
      fetch("/me").then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user));
        }
      });
  }, []);

  useEffect(() => {
    fetch("/dentists").then((r) => {
      if (r.ok) {
        r.json().then((dentists) => setDentists(dentists));
      }
    });
  }, []);


  if (!user) {
    return (
      <>
      
      <h1 className="mainhead">FLATIRON DENTAL</h1>
      <Auth setUser={setUser} />
      <Login
        setUser={setUser}
      />
      </>
    );
  }

  return (
    <>
      <Navigation
        setUser={setUser}
        user={user}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home dentists={dentists} />}
        />
        <Route
          path='/dentists/:id'
          element={<Dentist user={user} />}
        />
        <Route path="/appointments" element={<Appointments appointments={user.appointments} />} />
        <Route path="edit-appointment/:id" element={<EditAppointment />} />
      </Routes>
    </>
  );
}

export default App;
