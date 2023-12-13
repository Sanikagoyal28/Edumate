import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Background from "../Background/Background";
import rstImg from "./rstImg.svg";
import { Link, useNavigate } from "react-router-dom";
import "./resetPwd.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import * as ReactBootStrap from "react-bootstrap";
import BaseUrl from "../../utils/BaseUrl";

function ResetPwd() {
  const [pass, setPass] = useState("");
  const [Cpass, setCPass] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [isPass, setIsPass] = useState(false);
  const [isCPass, setIsCPass] = useState(false);
  const rightpass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  const navigate = useNavigate();
  const [loadBool, setLoadBool] = useState(false);
  const [navRstToLogin, setNavRstToLogin] = useState(false)

  function handlepass(e) {
    setPass(e.target.value);
  }
 
  function handleCfmPass(e) {
    setCPass(e.target.value);
  }

  function showHide1() {
    setShow1(!show1);
  }
 
  function showHide2() {
    setShow2(!show2);
  }

  useEffect(() => {
    if (rightpass.test(pass)) {
      document.getElementById("wrongpass1").style.display = "none";
      setIsPass(true)
    } else if (pass) {
      document.getElementById("wrongpass1").style.display = "block";
      setIsPass(false)
    }
  }, [pass]);

  useEffect(() => {
    if (rightpass.test(pass)) {
      document.getElementById("passMatch").style.display = "none";
      setIsCPass(true);
    } else if (pass) {
      document.getElementById("passMatch").style.display = "block";
      setIsCPass(false)
    }
  }, [Cpass]);

  function rstPassword(e) {
    e.preventDefault();
    var email = localStorage.getItem("email")
    var otp = localStorage.getItem("otp");
    var data = { email, otp, password: pass, confirmpassword: Cpass };
    if (isPass && isCPass && pass === Cpass) {
      setLoadBool(true)
      BaseUrl.post("changepassword/", data)
        .then((res) => {
          toast.success(res.data.msg, {
            position: "top-right",
            background: "none"
          })
          setNavRstToLogin(true)
          sessionStorage.setItem("Nav_rst_Login", navRstToLogin)
          setLoadBool(false)
          sessionStorage.setItem("previous_password", Cpass)
          navigate("/");
          localStorage.clear();
        })
        .catch((err) => {
          toast.error(err.response.data.msg, {
            position: "top-right",
            background: "none"
          })
          setLoadBool(false)
        });
    }
  }
  useEffect(() => {
    if (loadBool)
      document.body.style.opacity = "0.5"
    else
      document.body.style.opacity = "1"
  }, [loadBool])

  return (
    <>
      <div className="AUTHENTICATION">
        <Background />
        <h1 className="BgHead" id="RESET">&emsp;&emsp;Reset Password</h1>
        <form onSubmit={rstPassword}>
          <p id="new-pass">New Password</p>
          <input
            type={show1 ? "text" : "password"}
            id="new-pass-input"
            placeholder="New Password"
            onChange={handlepass}
            value={pass}
            required
          />
          <span id="wrongpass1">Password must be 1 uppercase 1 lowercase 1 number 1 special digit character and 8 or more characters </span>
          <p id="confirm-pass">Confirm Password</p>
          <input
            type={show2 ? "text" : "password"}
            id="confirm-pass-input"
            placeholder="Confirm Password"
            onChange={handleCfmPass}
            required
          />
          {show1 ? (
            <FontAwesomeIcon icon={faEye} id="pEye1" onClick={showHide1} />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} id="pEye1" onClick={showHide1} />
          )}
          {show2 ? (
            <FontAwesomeIcon icon={faEye} id="pEye2" onClick={showHide2} />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} id="pEye2" onClick={showHide2} />
          )}
          <span id="passMatch">Passwords do not match</span>
          <button id="btn-reset">RESET PASSWORD</button>
        </form>
        < img src={rstImg} className="authentication" />
        {loadBool ? (<ReactBootStrap.Spinner animation="border" id="apiloader" />) : null}
        <ToastContainer />
      </div>
    </>
  );
}
export default ResetPwd;
