import React from "react";
import "./Fattend2.css";
import FCard2 from "./FAttendCard2";
import FAttend2Array from "./FAttendArray2";
import * as ReactBootStrap from "react-bootstrap";
import { useState } from "react";
import ToggleAttend from "./ToggleAttend";
import { useEffect } from "react";
import axios from "axios";
import Navbar from '../../../utils/Navbar/Navbar'
import BaseUrl from "../../../utils/BaseUrl";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FAttendance2() {

    const time = sessionStorage.getItem("fac_attend_time")
    const id = sessionStorage.getItem("fac_attend_id")
    const date =  sessionStorage.getItem("fac_attend_date")
    const [attendFacArray, setAttendFacArray] = useState([])
    const [attendFacArrayid, setAttendFacArrayId] = useState([])
    var accessToken = sessionStorage.getItem("Faculty_access_token")
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }
    const [object,setObject] = useState({});
    const [putArray, setPutArray] = useState([])
    const [marked, setIsMarked] = useState(false)
    useEffect(() => {
        BaseUrl.get('teacher/TakeStudentsAttendance/'+date+'/'+id+'/'+time+'/', config)
            .then((res) => {
                console.warn(res);
                setLoadBool(false)
                setObject(res.data[0]);
                // setPutArray(oldARRAY=>[oldARRAY,res.data[0]])
                var x = res.data.splice(0,1)
                setIsMarked(x[0].marked)
                setAttendFacArray(res.data)
                setAttendFacArrayId(res.data)
            })
            .catch((err) => {
                setLoadBool(false)
            })
    }, [])
   
   
    function handleMarkPresent(Name,Id,Mark){
        console.log(Mark)
Mark=true;
var dataSend={
    name:Name,
    userID:Id,
    is_present:Mark
};
setPutArray([...putArray, dataSend])
    }

    function handleMarkAbsent(Id, Name,Mark){
        console.log(Mark)
Mark=false;
var dataSend={
    name:Name,
    userID:Id,
    is_present:Mark
};
setPutArray([...putArray, dataSend])
    }

    const [loadBool, setLoadBool] = useState(true)
    // console.warn(putArray)

   function handleAttendanceMark(){

    console.log(putArray)
    BaseUrl.put('teacher/TakeStudentsAttendance/'+date+'/'+id+'/'+time+'/', putArray, config)
    .then((res)=>{
        console.log(res)
        toast.success(res.data.msg, {
            position: "top-center",
            background: "none"
         })
    })
    .catch((err)=>{
        console.log(err)
    })
   }

    return <>
        <Navbar />
        <h1 className="dbAttend" id="DBAttend">Dashboard : Attendance </h1>
        <div className="FAttendanceOne">
            <h1 className="FAttendanceHead">Student : Attendance</h1>
            <div className="FRow1">
                <span id="FStNo">Student No.</span>
                <span id="FName">Name</span>
                <span id="FAttendMark">Attendance</span>
            </div>
            <p className="attendanceMarked" style={{color:"black"}} >marked</p>
            <div className="FAttendCardCall">
                {attendFacArray.map((attendFacArray, index)=>{
                    return <>
                    <FCard2 name={attendFacArray.name} index={index} id={attendFacArray.userID} present={attendFacArray.is_present} userid={attendFacArray.userID} presentFunc={()=>handleMarkPresent(attendFacArray.name,attendFacArray.userID,attendFacArray.is_present)}
                     absentFunc={()=>handleMarkAbsent(attendFacArray.userID,attendFacArray.name,attendFacArray.is_present)}  /> 
                    </>

                })}
            </div>
            <div className="facAttendanceButton" onClick={()=>{handleAttendanceMark()}} type="button">Done</div>
        </div>
        <ToastContainer />
        {loadBool ? (<ReactBootStrap.Spinner animation="border" id="apiloader" />) : null}
    </>
}
export default FAttendance2;
