import { useState } from "react";
import { Link } from "react-router-dom";
// import reactLogo from "./assets/react.svg";

function IndexPage() {
  return (
    <div
      id="mainContainer"
      className="flex justify-center items-center h-screen"
    >
      <Link to="/signIn">
        <button
          className="cursor-pointer hover:bg-green-400 h-10 font-bold bg-[#97f0cf]  "
          type="submit"
        >
          SIGN IN
        </button>
      </Link>
      <Link to="/signUp">
        <button
          className="cursor-pointer hover:bg-green-400 h-10 font-bold bg-[#97f0cf]  "
          type="submit"
        >
          SIGN UP
        </button>{" "}
      </Link>
    </div>
  );
}

export default IndexPage;
