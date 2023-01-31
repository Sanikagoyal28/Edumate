import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import AdmBar from '../admin_bar/AdmBar'
import * as ReactBootStrap from "react-bootstrap";
import './add_stu.css'
import addStudent from "../../Assests/Images/addStudent.svg";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import BaseUrl from '../../utils/BaseUrl';
const Add_stu = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [DOB, setDob] = useState('')
  const [email, setEmail] = useState('')
  // const [class_id, setClassId] = useState('')
  const rightemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  function handlename(e) {
    // if (name.length >= 6)
    //   return false;
    // else
      setName(e.target.value)
  }
  function handledob(e) {
    setDob(e.target.value)
  }
  function handleemail(e) {
    setEmail(e.target.value)
    if (rightemail.test(email)) {
      document.getElementById('add_stu_input_email').style.outlineColor = 'green'
    }
    else
      document.getElementById('add_stu_input_email').style.outlineColor = 'red'
  }
  // function handleclass(e) {
  //   setClassId(e.target.value)
  // }
  const adminAccessToken = sessionStorage.getItem("Admin_access_token");
  console.log(adminAccessToken);
  const config = {
      headers:{
         Authorization: `Bearer ${adminAccessToken}`
      }
   }

  const [classList,setClassList] = useState([]);

  useEffect(()=>{
    BaseUrl.get("admin/classesindepartment/"+"ALL/",config).
    then((res)=>{
        console.log(res.data);
        setClassList(res.data)
    }).catch((err)=>{
        console.log(err);
    })
  },[])
  
   const [classId, setClassId] = useState("");
  
   function handleClass(e){
      setClassId(e.target.value);
   }
  const [loadBool, setLoadBool] = useState(false);
  var data = { name, classId, email, DOB }
  function senddata() {
    setLoadBool(true)
    BaseUrl.post('admin/addstudent/', data, config)
      .then((res) => {
        console.log(res);
        toast.success(res.data.msg,{
          position: "top-center",
        })
        setLoadBool(false)
        if (res.status == 200) {
          navigate('/admin_dashboard')
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.DOB[0],{
          position: "top-center",
        })
      console.log(err.response.data.DOB[0])
        setLoadBool(false)
      })
  }

  function DropDownClassList (classList){
    return <>
         <option  id="class-name" className="class_head_input" value={classList[0]}>{classList[0]}</option>
    </>
}

  useEffect(() => {
    if (loadBool)
      document.body.style.opacity = "0.5"
    else
      document.body.style.opacity = "1"
  }, [loadBool])
  return (
    <>
     <AdmBar />
     <div className="ADDSTUD">
      <div id="add_stu_bg">
        <div id="add_stu_head"><span id="add_stu_heading">Add New Student</span></div>
        <div id="add_stu_name">Name</div>
        <input type="text" id='add_stu_input_name' onChange={handlename} />
        <div id="add_stu_dob">D.O.B</div>
        <input type="date" id='add_stu_input_dob' max="2002-12-23" onChange={handledob} />
        <div id="add_stu_email">Email</div>
        <input type="email" id='add_stu_input_email' onChange={handleemail} />
        <div id="add_stu_class_id">Class Id</div>
        <select id='add_stu_input_id' onChange={handleClass}>
        <option>Classes</option>
        {classList.map(DropDownClassList)}
        </select>
        <button onClick={senddata} id='add_stu_btn'>Done</button>
        <img src={addStudent} id="addStudentImage" />
      </div>
      {loadBool? (<ReactBootStrap.Spinner animation="border" id="apiloader"/>) :null}
      </div>
      <ToastContainer />
    </>
  )
}

export default Add_stu
