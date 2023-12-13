import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Background from "../Background/Background";
import "./Form-login.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import * as ReactBootStrap from "react-bootstrap";
import BaseUrl from "../../utils/BaseUrl";
import emailIcon from "./emailIcon.svg"
import loginImg from "./loginImg.svg";
import lockIcon from "./lockIcon.svg"

const Formlogin = () => {

  const [userID, setuserID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loadBool, setLoadBool] = useState(false);
  const [routeToLogin, setRouteToLogin] = useState(false);
  const userIdFirstDigit = String(userID)[0];
  const [show, setShow] = useState(false);
  const [iscorrectid, setIsCorrectId] = useState(false);
  var isnum = /^\d+$/;

  function handleuserID(e) {
    setuserID(e.target.value);
  }

  function handlepass(e) {
    setPassword(e.target.value);
  }
 
  function showHide() {
    setShow(!show);
  }

  useEffect(() => {
    if (isnum.test(userID)) {
      document.getElementById("wrongid").style.display = "none";
      setIsCorrectId(true);
    } else if (userID) {
      document.getElementById("wrongid").style.display = "block";
      setIsCorrectId(false);
    }
  }, [userID]);

  async function postdata(e) {
    e.preventDefault();

    const data = { userID, password };
    if (iscorrectid) {
      setLoadBool(true)
      await BaseUrl.post("login/", data)
        .then((res) => {
          setLoadBool(false)
          toast.success("Login Succcessful", {
            position: "top-right",
            background: "none"
          })
          const accessToken = res.data.token.access;
          const refreshToken = res.data.token.refresh;
          if (accessToken && refreshToken) {
            storeTokenData(accessToken, refreshToken);
            setRouteToLogin(true);
            sessionStorage.setItem("Route_to_login", routeToLogin);
            sessionStorage.setItem("LoggedInUserId", userIdFirstDigit)
            sessionStorage.setItem("UserIdLogger", userID);
            sessionStorage.setItem("User_name", res.data.Username)
            {
              if (userIdFirstDigit == 1) {
                navigate("/facDashboard")
                sessionStorage.setItem("Faculty_access_token", accessToken);
              }
              if (userIdFirstDigit == 2) {
                navigate("/stu_dashboard")
                sessionStorage.setItem("Student_userId", userID)
                sessionStorage.setItem("access token", accessToken);
              }
              if (userIdFirstDigit == 9) {
                navigate("/admin_dashboard")
                sessionStorage.setItem("Admin_userId", userID)
                sessionStorage.setItem("Admin_access_token", accessToken)
              }
            };
          }
        })
        .catch((err) => {
          console.log(err)
          setLoadBool(false)
          toast.error("UserID or Password is not Valid", {
            position: "top-right",
          })
        });
    }
  }
  function storeTokenData(accessToken, refreshToken) {
    sessionStorage.setItem("access token", accessToken);
    sessionStorage.setItem("refresh token", refreshToken);
  }
  useEffect(() => {
    if (loadBool)
      document.body.style.opacity = "0.5"
    else
      document.body.style.opacity = "1"
  }, [loadBool])

  /*Reset Pwd to Login*/
  const pwdToLogin = sessionStorage.getItem("NavToLogin");

  useEffect(() => {
    if (pwdToLogin) {
      toast.success("Password has been changed Successfuly !!", {
        position: "top-center",
        background: "none"
      })
    }
  }, [pwdToLogin])

  return (
    <div className="AUTHENTICATION">
      <Background />
      <h1 id="heading">&emsp;Welcome to Edumate</h1>
      <form onSubmit={postdata}>
        <h5 id="user-id">User id</h5>
        <img src={emailIcon} id="emailImage" />
        <input
          type="text"
          id="input-box1"
          placeholder="Enter your username"
          onChange={handleuserID}
          value={userID}
          required
        />
        <span id="wrongid">Incorrect UserId</span>
        <Link to="/fgtEmail"><span id="fgtPwd">Forgot Password ?</span></Link>
        <h5 id="password">Password</h5>
        <img src={lockIcon} id="lockImg" />
        <input
          type={show ? "text" : "password"}
          id="input-box2"
          placeholder="Enter your password"
          onChange={handlepass}
          value={password}
          required
        />
        {show ? (
          <FontAwesomeIcon icon={faEye} id="eye" onClick={showHide} />
        ) : (
          <FontAwesomeIcon icon={faEyeSlash} id="eye" onClick={showHide} />
        )}
        <button id="btn-submit" type="submit">LOGIN</button>
      </form>
      <img src={loginImg} className="authImage" />
      {loadBool ? (<ReactBootStrap.Spinner animation="border" id="apiloader" />) : null}
      <ToastContainer />
    </div>
  );
};

export default Formlogin;
