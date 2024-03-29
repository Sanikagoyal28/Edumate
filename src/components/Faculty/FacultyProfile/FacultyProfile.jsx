import React from 'react'
import "../../Student/Student-profile/profile.css";
import avatar from "../../Assests/avatar.png";
import ProfileInputField from "../../utils/ProfileInputField"
import ProfileInputDisabled from '../../utils/ProfileInputDiabled'
import * as ReactBootStrap from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Navbar from '../../utils/Navbar/Navbar';
import BaseUrl from '../../utils/BaseUrl';
// import axiosInstance from '../utils/axiosInstance'

const FacultyProfile = () => {
    const [profileName,setProfileName] = useState(null);
    const [profileSex,setProfileSex] = useState(null);
    const [profileBG,setProfileBg] = useState(null);
    const [profileDOB,setProfileDOB] = useState(null);
    const [profileAddr,setProfileAddr] = useState(null);
    const [profileCity,setProfileCity] = useState(null);
    const [profileState,setProfileState] = useState(null);
    const [profileMobile,setProfileMobile] = useState(null);
    const [profilePin,setProfilePin] = useState(null);
    const [profileEmail,setProfileEmail] = useState(null);
const [profileImage,setProfileImage] = useState(avatar)
    const[loadBool,setLoadBool]=useState(false);
    
    const [editAble,setEditAble]=useState(false);
    const [show,setShow] = useState(false)
    function handleEditProfile(){
setEditAble(true);
console.log(editAble);
if (!show) {
   setShow(true);
   document.getElementById('saveButton').style.display = "block";
   document.getElementById('cancelButton').style.display = "block";
   document.getElementById('editButton').style.display = "none";
    }
   else {
       setShow(false)
       document.getElementById('saveButton').style.display = "none";
       document.getElementById('cancelButton').style.display = "none";
   }
}

const [show3,setShow3] = useState(false);
    function handleEditPName(e){
      if (profileName.length >= 10)
         return false;
      else
         setProfileName(e.target.value)
   }
   function handleEditPEmail(e){
    setProfileEmail(e.target.value);
   }
   function handleEditPName(e){
    setProfileName(e.target.value)
   }
   function handleEditPBG(e){
    setProfileBg(e.target.value);
   }
   function handleEditPSex(e){
      setProfileSex(e.target.value);
     }
   function handleEditPDOB(e){
    setProfileDOB(e.target.value);
   }
  
   function handleEditPAddr(e){
    setProfileAddr(e.target.value);
   }
   function handleEditPCity(e){
    setProfileCity(e.target.value);
   }
   function handleEditPState(e){
    setProfileState(e.target.value);
   }
   function handleEditPPin(e){
    setProfilePin(e.target.value);
   }
   function handleEditPMobile(e){
    setProfileMobile(e.target.value);
   }
    
   const FacAccessToken = sessionStorage.getItem("Faculty_access_token");
   console.log(FacAccessToken);
   const config = {
      headers:{
         Authorization: `Bearer ${FacAccessToken}`
      }
   }
   // const [loadBool, setLoadBool] = useState(false)
   useEffect(()=>{
      setLoadBool(true)
      BaseUrl.get("teacher/profiledetails/",config).then((res)=>{
         setLoadBool(false)
         console.log(res);
         setProfileName(res.data.name);
         setProfileSex(res.data.sex);
         setProfileBg(res.data.blood_group);
         // setProfileEmail(res.data.email);
         setProfileDOB(res.data.DOB);
         setProfileAddr(res.data.address);
         setProfileCity(res.data.city);
         setProfileState(res.data.state);
         setProfileMobile(res.data.teacher_phone);
         setProfilePin(res.data.pincode);
         setProfileImage(res.data.picture)
      }).catch(err=>{
         console.log(err);
         setLoadBool(false)
      })
   },[])

   const [show2,setShow2] = useState(false);
   function handleCancel(){
      setEditAble(false);
      setLoadBool(false)
      if (!show2) {
         setShow2(true);
         document.getElementById('saveButton').style.display = "none";
         document.getElementById('cancelButton').style.display = "none";
         document.getElementById('editButton').style.display = "block";
          }
         else {
             setShow2(false)
             document.getElementById('saveButton').style.display = "block";
             document.getElementById('cancelButton').style.display = "block";
             document.getElementById('editButton').style.display = "none";
         }
         if(isCorrect){
         BaseUrl.get("teacher/profiledetails/",config).then((res)=>{
            setLoadBool(true)
            console.log(res);
            setProfileName(res.data.name);
            setProfileSex(res.data.sex);
            setProfileBg(res.data.blood_group);
            // setProfile/Email(res.data.email);
            setProfileDOB(res.data.DOB);
            setProfileAddr(res.data.address);
            setProfileCity(res.data.city);
            setProfileState(res.data.state);
            setProfileMobile(res.data.teacher_phone);
            setProfilePin(res.data.pincode);
            setProfileImage(res.data.picture)
         }).catch(err=>{
            console.log(err);
         })
      }
   }

   function handleSaveProfile(){
      if (!show3) {
         setShow3(true);
         document.getElementById('saveButton').style.display = "none";
         document.getElementById('cancelButton').style.display = "none";
         document.getElementById('editButton').style.display = "block";
          }
         else {
             setShow3(false)
             document.getElementById('saveButton').style.display = "block";
             document.getElementById('cancelButton').style.display = "block";
             document.getElementById('editButton').style.display = "none";
         }
      setEditAble(false);
      setLoadBool(true)
      if(isCorrect){
      BaseUrl.put("teacher/profiledetails/",{
         name:profileName,
         sex:profileSex,
         blood_group:profileBG,
         DOB:profileDOB,
         email:profileEmail,
         address:profileAddr,
         city:profileCity,
         state:profileState,
         teacher_phone:profileMobile,
         pincode:profilePin,
         picture :profileImage
      },config).then((res)=>{
         toast.success("Profile edited successfully", {
            position: "top-center",
            background: "none"
         })
         setProfileName(res.data.name);
         setProfileSex(res.data.sex);
         setProfileBg(res.data.blood_group);
         setProfileDOB(res.data.DOB);
         setProfileAddr(res.data.address);
         setProfileCity(res.data.city);
         setProfileState(res.data.state);
         setProfileMobile(res.data.teacher_phone);
         setProfilePin(res.data.pincode);
         setProfileImage(res.data.piicture)
         setLoadBool(true)
      })
   }
  }
  sessionStorage.setItem("FacultyName",profileName)
  useEffect(()=>{
   if(loadBool)
   document.body.style.opacity="0.5"
   else
   document.body.style.opacity="1"
 },[loadBool])

 
   /*VALIDATION*/

   const rightName = /^[a-z ,.'-]+$/i;
const [isCorrect , setIsCorrect] = useState(false);
useEffect(() => {
   if (rightName.test(profileName)) {
     document.getElementById("wrongName").style.display = "none";
     setIsCorrect(true);
   } else if (profileName) {
     document.getElementById("wrongName").style.display = "block";
     setIsCorrect(false);
   }
 }, [profileName]);

 const rightBldGrp = /^(A|B|AB|O)[-+]$/g;
 useEffect(() => {
   if (rightBldGrp.test(profileBG)) {
     document.getElementById("wrongBG").style.display = "none";
     setIsCorrect(true);
   } else if (profileBG) {
     document.getElementById("wrongBG").style.display = "block";
     setIsCorrect(false);
   }
 }, [profileBG]);

 const rightemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 useEffect(()=>{
if(rightemail.test(profileEmail)){
   document.getElementById("wrongEmail").style.display="none";
   setIsCorrect(true)
}
else if(profileEmail){
   document.getElementById("wrongEmail").style.display="block";
   setIsCorrect(false)
}
 },[profileEmail])

 const rightCity = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
 useEffect(()=>{
   if(rightCity.test(profileCity)){
      document.getElementById("wrongCity").style.display="none";
      setIsCorrect(true)
   }
   else if(profileCity){
      document.getElementById("wrongCity").style.display="block";
      setIsCorrect(false)
   }
    },[profileCity])

    const rightState = /[A-Z][a-z]+(?: +[A-Z][a-z]+)*/;
 useEffect(()=>{
   if(rightState.test(profileState)){
      document.getElementById("wrongState").style.display="none";
      setIsCorrect(true)
   }
   else if(profileState){
      document.getElementById("wrongState").style.display="block";
      setIsCorrect(false)
   }
    },[profileState])
    
const isnum = /^\d+$/;
          useEffect(()=>{
            if(isnum.test(profileMobile)){
               document.getElementById("wrongNum").style.display="none";
               setIsCorrect(true)
            }
            else if(profileMobile){
               document.getElementById("wrongNum").style.display="block";
               setIsCorrect(false)
            }
             },[profileMobile])

             const pinCode = /^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$/;
             useEffect(()=>{
               if(pinCode.test(profilePin)){
                  document.getElementById("wrongPin").style.display="none";
                  setIsCorrect(true)
               }
               else if(profilePin){
                  document.getElementById("wrongPin").style.display="block";
                  setIsCorrect(false)
               }
                },[profilePin])
    return ( 
        <>
       <Navbar />
            <h1 className="dash">Dashboard : My Profile</h1>
            <div id="facultyBackground" >
                <div id="avatar">
                    <img src={profileImage} id="profileImage"/>
                    <span id='dis-name'>{profileName}</span><br />
                    <div className='avatarInfo'>
                    Mon 3 SEPT 2001 <br />
                    B.TECH 2ND YEAR <br />
                    </div>
                </div>
                <div id="heading1">Faculty Profile</div>
                <div id="personalinfo">Personal Info</div>
                <div id="stu-name">Faculty's Name</div>
                <div className='space1'>
                {editAble?(<ProfileInputField value={profileName} class="profileField" type="text" onChange={handleEditPName} />): 
                   (<ProfileInputDisabled  value={profileName} class="profileField" type="text"/>)}
                </div> 
                <p id="wrongName">Name must contain only alphabetic characters.</p>
                <div id="sex">Sex</div>
                <div className='space2'>
                {editAble?( <select className="dropdownGender" value={profileSex} onChange={handleEditPSex}>
               <option value="Male">Male</option>
               <option value="Female">Female</option>
            </select>): 
                   ( <select className="dropdownGender" value={profileSex} disabled>
               <option value="Male" disabled>Male</option>
               <option value="Female" disabled>Female</option>
            </select>)}
                </div>
                <div id="bl-gr">Blood Group</div>
                <div className='space3'>
                {editAble?(<ProfileInputField value={profileBG} class="profileField" type="text" onChange={handleEditPBG} />): 
                   (<ProfileInputDisabled  value={profileBG} class="profileField" type="text"/>)}
                </div>
                <p id="wrongBG">Please enter a valid Blood Group</p>
                <div id="dob">Date of Birth</div>
                <div className='space4'>
                {editAble?(<ProfileInputField value={profileDOB} class="profileField" type="text" onChange={handleEditPDOB} />): 
                   (<ProfileInputDisabled  value={profileDOB} class="profileField" type="text"/>)}
                </div>
                <div id="email">Email</div>
                <div className='space5'>
                {editAble?(<input value={profileEmail} class="profileField" type="date" onChange={handleEditPEmail} disabled/>): 
                   (<input  value={profileEmail} class="profileField" type="date" disabled/>)}
                </div>
                <p id="wrongEmail">Please enter a valid Email address</p>
                <div id="heading2">Contact Details</div>
                <div id="address">Address</div>
                <div className='space6'>
                {editAble?(<ProfileInputField value={profileAddr} class="profileField" type="text" onChange={handleEditPAddr} />): 
                   (<ProfileInputDisabled  value={profileAddr} class="profileField" type="text"/>)}
                </div>
                <div id="city">City</div>
                <div className='space7'>
                {editAble?(<ProfileInputField value={profileCity} class="profileField" type="text" onChange={handleEditPCity} />): 
                   (<ProfileInputDisabled  value={profileCity} class="profileField" type="text"/>)}
                </div>
                <p id="wrongCity">Please enter a valid City name</p>
                <div id="state">State</div>
                <div className='space8'>
                {editAble?(<ProfileInputField value={profileState} class="profileField" type="text" onChange={handleEditPState} />): 
                   (<ProfileInputDisabled  value={profileState} class="profileField" type="text"/>)}
                </div>
                <p id="wrongState">Please enter a valid State name</p>
                <div id="stu-phone">Mobile No.</div>
                <div className='space9'>
                {editAble?(<ProfileInputField value={profileMobile} class="profileField" type="text" onChange={handleEditPMobile} />): 
                   (<ProfileInputDisabled  value={profileMobile} class="profileField" type="text"/>)}
                </div>
                <p id="wrongNum">Number must contain only numeric characters.</p>
                <div id="pin">Pincode</div>
                <div className='space10'>
                {editAble?(<ProfileInputField value={profilePin} class="profileField" type="text" onChange={handleEditPPin} />): 
                   (<ProfileInputDisabled  value={profilePin} class="profileField" type="text"/>)}
                </div>
                <button id="editButton" onClick={handleEditProfile} >Edit Profile</button>
                <button id="saveButton" onClick={handleSaveProfile}>Save</button> 
                <button id="cancelButton" onClick={handleCancel}>Cancel</button> 
                <div className='CONTACT'>
            </div>
            </div>
            {loadBool? (<ReactBootStrap.Spinner animation="border" id="apiloader"/>) :null}
            <ToastContainer />
        </>
    )
}

export default FacultyProfile