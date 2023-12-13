import React, { useEffect, useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Background from "../Background/Background";
import otpImg from "./otpImg.svg";
import "./otp.css";
import BaseUrl from "../../utils/BaseUrl";

function OTP() {
  const [otp, setOtp] = useState("");
  function handleotp(e) {
    setOtp(e.target.value);
  }
  const isnum = /^\d+$/;
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    const timer =
      seconds > 0 && setInterval(() => {
        setSeconds(seconds - 1)
      }, 1000);
    return () => clearInterval(timer);

  }, [seconds]);

  let email = localStorage.getItem("email")
  const [loadBool, setLoadBool] = useState(false);
  const navigate = useNavigate();

  function postotp(e) {
    e.preventDefault()
    setLoadBool(true);
    var data = { email, otp }
    BaseUrl.post("verifyotp/", data)
      .then((res) => {
        localStorage.setItem("otp", otp)
        setNavigateOtpToPwd(true);
        sessionStorage.setItem("NavigatePassword", navigateOtpToPwd)
        navigate("/rstPwd");
        setLoadBool(false)
      })
      .catch((err) => {
        toast.error(err.response.data.msg, {
          position: "top-center",
          background: "none"
        })
        setLoadBool(false)
        setNavigateOtpToPwd(false);
      })
  }
  const [navigateOtpToPwd, setNavigateOtpToPwd] = useState(false);

  async function postResOtp(e) {
    e.preventDefault()
    setLoadBool(true);
    localStorage.removeItem("otp");
    var data = { email }
    setSeconds(59);
    await BaseUrl.post("sendotp/", data)
      .then((res) => {
        toast.success("OTP sent successfully on " + email, {
          position: "top-center",
          background: "none"
        })
        localStorage.setItem("otp", otp)
        setLoadBool(false);
        setNavigateOtpToPwd(true);
        sessionStorage.setItem("NavigatePassword", navigateOtpToPwd)
        // navigate("/rstPwd");
      })
      .catch((err) => {
        toast.error(err.response.data.msg + " " + email, {
          position: "top-center",
          background: "none"
        })
        setLoadBool(false);
        setNavigateOtpToPwd(false);
      })
  }
  useEffect(() => {
    if (loadBool)
      document.body.style.opacity = "0.5"
    else
      document.body.style.opacity = "1"
  }, [loadBool])

  useEffect(() => {
    toast.success("OTP sent successfully on " + email, {
      position: "top-center",
      background: "none"
    })
  }, [])
  return (
    <>
      <div className="AUTHENTICATION">
        <Background />
        <h1 className="BgHead" id="OTPHead">&emsp;&ensp;OTP Verification </h1>
        <form onSubmit={postotp}>
          <p id="OTPid">Enter OTP sent on {email}</p>
          <input
            type="text"
            id="input-box"
            placeholder="0 0 0 0"
            value={otp}
            onChange={handleotp}
            required
          />
          <br />
          <span id="no-otp-recieved">Don’t recieve an OTP?</span>
          <button id="resend-otp" onClick={postResOtp} disabled={(seconds !== 0) ? true : false}>Resend OTP</button>
          <span id="timer">00:{seconds}</span>
          <button id="btn-continue" type="submit">CONTINUE</button>
        </form>
        <img src={otpImg} className ="authImage" />
        {loadBool ? (<ReactBootStrap.Spinner animation="border" id="apiloader" />) : null}
      </div>
      <ToastContainer />
    </>
  );
}
export default OTP;