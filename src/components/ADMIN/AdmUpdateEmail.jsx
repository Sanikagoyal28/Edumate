import axios from "axios";
import React from "react";
import { useState , useEffect} from "react";
import AdmBar from "./admin_bar/AdmBar";
import "./admUpdEmail.css";
import * as ReactBootStrap from "react-bootstrap";
import admUpdateEmail from "../Assests/Images/admUpdateEmail.svg"
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
        setLoadBool(true)
        console.log(email);
        axios.post("https://erp-edumate.herokuapp.com/api/user/updateemail/", {
            email
        }, config).then((res) => {
            console.log(res);
            setEmailMsg(res.data);
            setLoadBool(false)
                document.getElementsByClassName('sendOtpAdm')[0].style.display = "block"
                document.getElementById('adm_otp_input').style.display = "block"
                document.getElementsByClassName('resendOtpAdm')[0].style.display = "block"
                document.getElementById('adm_otp_btn').style.display = "block"
        }).catch((err) => {
            console.log(err);
            setLoadBool(false)
        })
    }
    function checkotp() {
        axios.put("https://erp-edumate.herokuapp.com/api/user/updateemail/", { email,otp }, config)
            .then((res) => {
                console.log(res);
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
            <p className="resendOtpAdm">Resend OTP in </p>
            <button id="adm_otp_btn" onClick={checkotp}>Continue</button>
            <img src={admUpdateEmail} id="admUpdEmailImage" />
        </div>
        {loadBool? (<ReactBootStrap.Spinner animation="border" id="apiloader"/>) :null}
    </>
}
export default AdmUpdateEmail;