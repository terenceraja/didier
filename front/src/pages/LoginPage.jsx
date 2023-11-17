import { useState } from "react";
// import reactLogo from "./assets/react.svg";

function LoginPage() {
  const [formInfo, setFormInfo] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  console.log(error);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("click");
    fetch("http://localhost:3000/users/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formInfo),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          setError(response.message);
        } else {
          console.log(response);
        }
      });
  };

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div
      id="mainContainer"
      className="flex justify-center items-center h-screen"
    >
      <div
        id="formCard"
        className=" w-[500px] h-[800px] bg-white rounded-3xl p-20"
      >
        <form
          className="flex flex-col justify-center gap-10 h-full w-full"
          onSubmit={handleSubmit}
        >
          <div id="inputContainer" className="flex flex-col gap-1">
            <label>Name</label>
            <input
              className="h-10 p-5"
              name="name"
              onChange={handleOnChange}
              required
            />
          </div>

          <div id="inputContainer" className="flex flex-col gap-1">
            <label>Surname</label>
            <input
              className="h-10 p-5"
              name="surname"
              onChange={handleOnChange}
              required
            />
          </div>

          <div id="inputContainer" className="flex flex-col gap-1">
            <label>Email</label>
            <input
              className="h-10 p-5"
              name="email"
              onChange={handleOnChange}
              required
            />
          </div>

          <div id="inputContainer" className="flex flex-col gap-1">
            <label>Password</label>
            <input
              className="h-10 p-5"
              type="password"
              name="password"
              onChange={handleOnChange}
              required
            />
          </div>

          <button className="h-10 font-bold bg-[#97f0cf]  " type="submit">
            Submit
          </button>
        </form>
        {error && <span className="text-red-400">{error}</span>}
      </div>
    </div>
  );
}

export default LoginPage;
