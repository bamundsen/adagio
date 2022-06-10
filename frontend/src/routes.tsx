import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import FormLogin from "./routes/form-login/form_login.component";
import FormRegister from "./routes/form-register/form_register.component";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Home from "./routes/home/home.component";

const ApplicationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<FormLogin />} />
        <Route path="/register" element={<FormRegister />} />
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default ApplicationRoutes;
