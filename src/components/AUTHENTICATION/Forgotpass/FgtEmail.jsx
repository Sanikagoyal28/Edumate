import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as ReactBootStrap from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Background from "../Background/Background";
import emailImg from "./email.svg";
import "./FgtEmail.css";
import emailIcon from "./emailIcon.svg";
import BaseUrl from "../../utils/BaseUrl";

function FgtEmail() {
  const [email, setEmail] = useState("");
  function handleemail(e) {
    setEmail(e.target.value);
  }
  const rightemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const [ckEmail, setCkEmail] = useState(false);
  useEffect(() => {
    if (rightemail.test(email)) {
      document.getElementById("wrongemail").style.display = "none";
      setCkEmail(true);
    } else if (email) {
      document.getElementById("wrongemail").style.display = "block";
      setCkEmail(false)
    }
  }, [email]);
  const [loadBool, setLoadBool] = useState(false);
  const [navigateOtp, setNavigateOtp] = useState(false);
  const navigate = useNavigate();

  function postemail(e) {
    e.preventDefault();
    if (ckEmail) {
      setLoadBool(true);
      BaseUrl.post("sendotp/", { email })
        .then((res) => {
          toast.success("OTP sent successfully", {
            position: "top-right",
            background: "none"
          })
          navigate("/otp")
          localStorage.setItem("email", email);
          setNavigateOtp(true);
          sessionStorage.setItem("NavigateOtp", navigateOtp)
          setLoadBool(false);
        })

        .catch((err) => {
          toast.error(err.response.data.msg + " " + email, {
            position: "top-right",
            background: "none"
          })
          setLoadBool(false);
        })
    }
  }
  useEffect(() => {
    if (loadBool)
      document.body.style.opacity = "0.5"
    else
      document.body.style.opacity = "1"
  }, [loadBool])

  return (
    <div className="AUTHENTICATION">
      <Background />
      <h1 className="BgHead" id="Forgot">Forgot your Password ?</h1>
      <h1 id="bghead" >Forgot Password ?</h1>
      <form onSubmit={postemail}>
        <p id="pwdHead">We’ll send you a One Time Password on this email.</p>
        <input
          type="text"
          id="inputBox"
          placeholder="Enter your email"
          value={email}
          onChange={handleemail}
          required
        />
        <img src={emailIcon} id="emailIcon" />
        <br />
        <span id="wrongemail">Please enter a valid email id</span>
        <button id="resend-otp"></button>
        <button id="btnContinue" type="submit">CONTINUE</button>
      </form>
      <img src={emailImg} className="authImage" />
      {loadBool ? (<ReactBootStrap.Spinner animation="border" id="apiloader" />) : null}
      <ToastContainer />
    </div>
  );
}
export default FgtEmail;

