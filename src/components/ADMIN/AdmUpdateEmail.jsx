import axios from "axios";
import React from "react";
import { useState , useEffect} from "react";
import AdmBar from "./admin_bar/AdmBar";
import "./admUpdEmail.css";
import * as ReactBootStrap from "react-bootstrap";
import admUpdateEmail from "../Assests/Images/admUpdateEmail.svg"
import { Navigate, useNavigate } from "react-router-dom";
import BaseUrl from "../utils/BaseUrl";
function AdmUpdateEmail() {
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState('')
    const userLId = sessionStorage.getItem("LoggedInUserId")
    function handleotp(e) {
        setOtp(e.target.value)
    }
    function handleEmail(e) {
        setEmail(e.target.value);
    }
const [seconds , setSeconds] = useState(59);
    useEffect(() => {
        const timer=
         seconds>0 && setInterval(() => {
           setSeconds(seconds-1)
         }, 1000);
         return () => clearInterval(timer);  
       },[seconds]);

    const adminAccessToken = sessionStorage.getItem("Admin_access_token");
   
    console.log(adminAccessToken);
    const config = {
        headers:{
           Authorization: `Bearer ${adminAccessToken}`
        }
     }
    const [emailMsg, setEmailMsg] = useState("");
const [loadBool,setLoadBool] = useState(false)
    function handleUpdateEmail() {
        // setLoadBool(true)
        document.getElementsByClassName('sendOtpAdm')[0].style.display = "block"
        document.getElementById('adm_otp_input').style.display = "block"
        document.getElementsByClassName('resendOtpAdm')[0].style.display = "block"
        document.getElementById('adm_otp_btn').style.display = "block"
        document.getElementById('timerAdm').style.display = "block"
        console.log(email);
        BaseUrl.post("updateemail/", {
            email
        }, config).then((res) => {
            console.log(res);
            setEmailMsg(res.data);
            setLoadBool(false)
                document.getElementsByClassName('sendOtpAdm')[0].style.display = "block"
                document.getElementById('adm_otp_input').style.display = "block"
                document.getElementsByClassName('resendOtpAdm')[0].style.display = "block"
                document.getElementById('adm_otp_btn').style.display = "block"
                document.getElementById('timerAdm').style.display = "block"
        }).catch((err) => {
            console.log(err);
            setLoadBool(false)
        })
    }

    function handleResendOtp(){
        BaseUrl.post("updateemail/", {email})
    .then((res) => {
      console.log(res);
    //   toast.success("OTP sent successfully on "+email,{
    //     position: "top-center",
    // background:"none"
    //   })
    //   setLoadBool(false);
    })
    .catch((err) => {
      console.log(err);
    //   toast.error(err.response.data.msg+" "+email,{
    //     position: "top-center",
    // background:"none"
    //   })
    })
    }
    const navigate = useNavigate();
    function checkotp() {
        BaseUrl.put("updateemail/", { email,otp }, config)
            .then((res) => {
                console.log(res);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            })
    }
    useEffect(()=>{
        if(loadBool)
        document.body.style.opacity="0.5"
        else
        document.body.style.opacity="1"
      },[loadBool])
    return <>
       <AdmBar />
        <div className="CHNGEMAIL">
            <h1 className="updateEmailRow">Email Address</h1>
            <h1 className="updateEmail">Email Address</h1>
            <input type="text" className="emailInput" value={email} onChange={handleEmail}></input>
            {/* <img src={updateEmailImg} className="updateEmailImg" /> */}
            <button className="emailButton" onClick={handleUpdateEmail}>Done</button>
            {/* <p className="emailMsgShow">{emailMsg}</p> */}
            {/* <input type="text" id="fieldOtp" value={otp} onChange={handleOtp}></input> */}
            <div className="sendOtpAdm">Enter otp sent to example@gmail.com</div>
            <input type="text" id="adm_otp_input" onChange={handleotp}/>
            <button className="resendOtpAdm" onClick={handleResendOtp} disabled={(seconds!==0)?true:false}>Resend OTP in </button>
            <span id="timerAdm">00:{seconds}</span>
            <button id="adm_otp_btn" onClick={checkotp}>Continue</button>
            <img src={admUpdateEmail} id="admUpdEmailImage" />
        </div>
        {loadBool? (<ReactBootStrap.Spinner animation="border" id="apiloader"/>) :null}
    </>
}
export default AdmUpdateEmail;