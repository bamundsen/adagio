import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/navigation/navigation.component";
import FormLogin from "./pages/form-login/form_login.component";
import FormRegister from "./pages/form-register/form_register.component";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Home from "./pages/home/home.component";
import CompleteCalendar from "./pages/complete-calendar/complete_calendar.component";
import NotFound from "./components/not-found/not_found.component";
import PrivateRoute from "./components/private-route/private_route.component";
import { AuthContext } from "./contexts/auth.context";

const ApplicationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<FormLogin />} />
        <Route path="/register" element={<FormRegister />} />

        <Route path="/adagio" element={<PrivateRoute />}>
          <Route index element={<Navigate to="/adagio/home" />} />
          <Route path="calendario" element={<CompleteCalendar />} />
          <Route path="home" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="*" element={<FormLogin />} />
      </Route>
    </Routes>
  );
};

export default ApplicationRoutes;
