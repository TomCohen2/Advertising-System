import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import Button from "@mui/material/Button";
import axios from "axios";

import Alert from "@mui/material/Alert";

function SignIn(props) {
  const [errorMessage, setErrorMessage] = useState("");

  const [password, setPassword] = useState("");

  const [userData, setUserData] = useState({
    _id: "",
    username: "admin",
    password: password,
  });

  const [adminCredentials, setAdminCredentials] = useState({
    username: "admin",
    password: "admin",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/admin")
      .then((res) => {
        setAdminCredentials(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [isChangePass, setIsChangePass] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(userData);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submitted" + userData.username + userData.password);
    console.log(localStorage.getItem("isAuthenticated"));
    if (userData.username === "" || userData.password === "") {
      setErrorMessage((prevState) => ({
        value: "Empty username/password field",
      }));
    } else if (
      userData.username.toLowerCase() === "admin" &&
      userData.password === adminCredentials.password
    ) {
      //Signin Success
      alert("Signin Successed");
      localStorage.setItem("isAuthenticated", true);
      window.location.pathname = "/screen=0";
      console.log(localStorage.getItem("isAuthenticated") + "SIGNIN PAGE");
      navigate("/screen=0");
    } else {
      //If credentials entered is invalid
      setErrorMessage((prevState) => ({ value: "Invalid username/password" }));
      alert("Invalid username/password");
      return;
    }
  }

  function handleChangeAdminPass(e) {
    console.log("Password changed to: " + userData.password);
    setPassword(userData.password);

    let newCredentials = {
      username: "admin",
      password: userData.password,
    };

    axios
      .put(
        `http://localhost:8000/api/admin/620ccd3da89176d1b9531d84`,
        newCredentials
      )
      .then((res) => {
        console.log(res);
        setUserData({
          username: "admin",
          password: password,
        });
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log("Error couldn't edit admin pass");
        console.log(err.message);
      });
    alert("Change password Successed");

    setTimeout(() => {
      navigate("/screen=0");
      setIsChangePass(false);
    }, 1000);
  }

  function handleChangePassword() {
    if (userData.username === "" || userData.password === "") {
      setErrorMessage((prevState) => ({
        value: "Empty username/password field",
      }));
      alert("To change the admin password, please enter username and password");
      console.log(errorMessage.value);
    } else if (
      userData.username.toLowerCase() === "admin" &&
      userData.password === adminCredentials.password
    ) {
      //Signin Success
      localStorage.setItem("isAuthenticated", true);
      // console.log(localStorage.getItem("isAuthenticated") + "SIGNIN PAGE");
      setIsChangePass(!isChangePass);
    } else {
      //If credentials entered is invalid
      setErrorMessage((prevState) => ({ value: "Invalid username/password" }));
      alert("Invalid username/password");
      return;
    }
  }
  return (
    <>
      {!isChangePass && (
        <div className="page__signin">
          <form className="form__signin">
            <h1>Sign-In</h1>
            <input
              name="username"
              placeholder="username"
              onChange={handleChange}
            ></input>
            <input
              name="password"
              type="password"
              placeholder="password"
              onChange={handleChange}
            ></input>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
            <Button
              sx={{
                backgroundColor: "primary",
                width: "fit-content",
                color: "primary",
                marginTop: "1rem",
                display: "flex",
                justifyContent: "center",
              }}
              variant="outlined"
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
          </form>
        </div>
      )}

      {isChangePass && (
        <div className="page__signin">
          <div className="page__signin">
            <form className="form__signin">
              {/* <Button onClick={handleChangePassword}>Change Password</Button> */}
              <h1>Change Admin Password</h1>
              <input
                name="username"
                value="admin"
                disabled={true}
                onChange={handleChange}
              ></input>
              <input
                name="password"
                placeholder="new password"
                onChange={handleChange}
              ></input>
              <Button variant="contained" onClick={handleChangeAdminPass}>
                Change
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default SignIn;
