import React from "react";
import Logo from "../assets/Logo/logo192.png";
const LogoPage = () => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <img src={Logo} alt="" />
      <p>Loading...</p>
    </div>
  );
};

export default LogoPage;
