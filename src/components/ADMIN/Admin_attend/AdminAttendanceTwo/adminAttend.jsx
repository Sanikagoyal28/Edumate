
import React from "react";
import AdmAttendCard from "./admAttendCard";
import "./admAttend.css"
import AdmBar from "../../admin_bar/AdmBar";
import { useEffect , useState} from "react";
import axios from "axios";
import SubjectAttend from "../../../Student/Attendace2/Attendance";
import { propTypes } from "react-bootstrap/esm/Image";
import * as ReactBootStrap from "react-bootstrap";
import BaseUrl from "../../../utils/BaseUrl";
function AdmAttend(){
    const adminAccessToken = sessionStorage.getItem("Admin_access_token");
console.log(adminAccessToken);
const config = {
    headers:{
       Authorization: `Bearer ${adminAccessToken}`
    }
 }
 const [departId, setDepartId] = useState("");
 function handleDepart(e){
 setDepartId(e.target.value);
 }

 console.log(departId)
 sessionStorage.setItem("Department_Id",departId)
const [deptBool,setDeptBool] = useState(false)
    const [deptList,setDeptList] = useState([]);
    useEffect(()=>{
        BaseUrl.get("admin/departments/"+"ALL/",config)
        .then((res)=>{
            console.log(res.data);
            setDeptList(res.data);
            setDeptBool(true)
        })
        .catch((err)=>{
            console.log(err);
            setDeptBool(false)
        })
    },[])
    console.log(departId)

    const [classList, setClassList] = useState([]);
function handleClassInDept(){
    if(deptBool){
    BaseUrl.get("admin/classesindepartment/"+departId+"/",config).
    then((res)=>{
        console.log(res.data);
        setClassList(res.data)
    }).catch((err)=>{
        console.log(err);
    })
}
}

console.log(classList);

 const [classId, setClassId] = useState("");
 const [subjectList,setSubjectList] = useState([]);
 function handleClass(e){
    setClassId(e.target.value);
 }
 const [loadBool , setLoadBool] = useState(false);
 function handleSubjectInClass(){
    setLoadBool(true)
    BaseUrl.get("admin/studentattendancelist/"+classId+"/",config)
    .then((res)=>{
        console.log(res);
        console.log(res.data);
        setLoadBool(false)
        setSubjectList(res.data);
    }).catch((err)=>{
        console.log(err);
        setLoadBool(false)
    })
 }
 
function DropDownClassList (classList){
    return <>
         <option  id="class-name" className="class_head_input" value={classList[0]}>{classList[0]}</option>
    </>
}
    function DropdownDeptList (deptList){
        return <>
            <option  id="dept-name" className="dept_head_input" value={deptList.id}>{deptList.name}</option>
        </>
             }
             function createSubject(subjectList){
                return <>
                    <AdmAttendCard name={subjectList.student_name} Number={subjectList.userID} attend={subjectList.attendance_percent} />
                </>
             }
             useEffect(()=>{
                if(loadBool)
                document.body.style.opacity="0.5"
                else
                document.body.style.opacity="1"
              },[loadBool])
    return <>
    <AdmBar />
    <div className="admAttendWhiteDiv">
        <h1 className="admGreyRow">
            <span id="admStN">Student Name</span>
            <span id="admStn">Student Number</span>
            <span id="admAttend">Attendance</span>
        </h1>
        <select id="admDeppt" onChange={handleDepart} onClick={handleClassInDept}>
        <option >Departments</option>
        {deptList.map(DropdownDeptList)}
        </select>
        <select id="admClass" onChange={handleClass} onClick={handleSubjectInClass}>
        <option >Classes</option>
        {classList.map(DropDownClassList) }
        </select>
        <div className="admAttendCall2">
            {subjectList.map(createSubject)}
        </div> 
    </div>
    {loadBool? (<ReactBootStrap.Spinner animation="border" id="apiloader"/>) :null}
    </>
}
export default AdmAttend;