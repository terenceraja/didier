import { useState } from "react";
import { Link } from "react-router-dom";
// import reactLogo from "./assets/react.svg";
import { Button } from "primereact/button";

function IndexPage() {
  return (
    <div
      id="mainContainer"
      className="flex justify-center items-center h-screen gap-5"
    >
      <Link to="/signIn">
        <Button
          label="Sign IN"
          className="p-button-help"
          style={{ minWidth: "10rem" }}
        />
      </Link>
      <Link to="/signUp">
        <Button
          label="Sign UP"
          className="p-button-help"
          style={{ minWidth: "10rem" }}
        />
      </Link>
    </div>
  );
}

export default IndexPage;
