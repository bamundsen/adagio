import { Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation/navigation.component";
import FormLogin from "./pages/form-login/form_login.component";
import FormRegister from "./pages/form-register/form_register.component";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Home from "./pages/home/home.component";
import CompleteCalendar from "./pages/complete-calendar/complete_calendar.component";

const ApplicationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<FormLogin />} />
        <Route path="/register" element={<FormRegister />} />
        <Route path="/home" element={<Home />} />
        <Route path="/calendario" element={<CompleteCalendar />} />
      </Route>
    </Routes>
  );
};

export default ApplicationRoutes;
