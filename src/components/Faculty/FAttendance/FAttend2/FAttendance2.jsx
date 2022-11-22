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
// import { faLoveseat } from "@fortawesome/sharp-solid-svg-icons";
function FAttendance2() {
    // const time = sessionStorage.getItem("fac_attend_time")
    // const id = sessionStorage.getItem("fac_attend_id")
    // const date = sessionStorage.getItem("fac_attend_date")
    const time = '8:30 - 9:20'
    const id = 'S1'
    const date = '2022-11-08'
    const [attendFacArray, setAttendFacArray] = useState([])
    const [attendFacArrayid, setAttendFacArrayId] = useState([])
    var accessToken = sessionStorage.getItem("Faculty_access_token")
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }
    const [newArr,setNewArr] = useState([])
    const [object,setObject] = useState({});
    const [putArray, setPutArray] = useState([])
    useEffect(() => {
        axios.get('https://erp-edumate.herokuapp.com/api/user/teacher/TakeStudentsAttendance/'+date+'/'+id+'/'+time+'/', config)
            // axios.get('https://erp-edumate.herokuapp.com/api/user/teacher/StudentsinClassAttendance/2022-12-16/S1/11:00 - 11:50/',config)
            .then((res) => {
                console.log(res);
                setLoadBool(false)
                console.log(res.data[0])
                setObject(res.data[0]);
                setPutArray(oldARRAY=>[oldARRAY,res.data[0]])
                setAttendFacArray(res.data)
                setAttendFacArrayId(res.data)
            })
            .catch((err) => {
                console.log(err);
                setLoadBool(false)
            })
    }, [])
   
   
    function handleMarkPresent(Name,Id,Mark){
        console.log(Mark)
Mark=true;
console.log(Id)
console.log("present")
var dataSend={
    name:Name,
    userID:Id,
    is_present:Mark
};
console.log(dataSend)
setPutArray(oldARRAY=>[oldARRAY, dataSend])
    }

    function handleMarkAbsent(Name,Id,Mark){
        console.log(Mark)
Mark=false;
console.log(Id)
console.log("present")
var dataSend={
    name:Name,
    userID:Id,
    is_present:Mark
};
console.log(dataSend)
setPutArray(oldARRAY=>[oldARRAY, dataSend])
    }

    function CreateFAttendCard2(attendFacArray) {
        return (
            <>
            <FCard2 name={attendFacArray.name} id={attendFacArray.userID} present={attendFacArray.is_present} userid={attendFacArray.userID} presentFunc={()=>handleMarkPresent(attendFacArray.name,attendFacArray.userID,attendFacArray.is_present)} absentFunc={()=>handleMarkAbsent(attendFacArray.userID,attendFacArray.name,attendFacArray.is_present)}  />  </>
        )
    }
    // var test = 0
    // function toggleAttend2(attendFacArrayid) {
    //     test++;
    //     console.log(test);
    //     return (
    //         <>
    //             <ToggleAttend userid={attendFacArrayid.userID} />
    //         </>
    //     )
    // }
    const [loadBool, setLoadBool] = useState(true)
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
            <div className="FAttendCardCall">
                {attendFacArray.map(CreateFAttendCard2)}
                {/* {attendFacArray.map(toggleAttend2)} */}
            </div>
            <div className="attendButton5" type="button">Done</div>
        </div>
        {loadBool ? (<ReactBootStrap.Spinner animation="border" id="apiloader" />) : null}
    </>
}
export default FAttendance2;
// export {handleMarkAbsent} ;
// export handleMarkPresent ;