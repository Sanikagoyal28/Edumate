import React from 'react'
import './profile.css'
import avatar from '../../Assests/Images/avatar.png'
import Navbar from '../../utils/Navbar/Navbar'
import ProfileInputField from '../../utils/ProfileInputField'
import ProfileInputDisabled from '../../utils/ProfileInputDiabled'
import * as ReactBootStrap from "react-bootstrap";
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Instance from '../../utils/axiosInterceptors'
import axiosInstance from '../../utils/axiosInstance'
import BaseUrl from '../../utils/BaseUrl'

const Profile = () => {
    const [profileName,setProfileName] = useState(null);
    const [profileSex,setProfileSex] = useState(null);
    const [profileBG,setProfileBg] = useState(null);
    const [profileDOB,setProfileDOB] = useState(null);
    const [profileAddr,setProfileAddr] = useState(null);
    const [profileCity,setProfileCity] = useState(null);
    const [profileState,setProfileState] = useState(null);
    const [profileMobile,setProfileMobile] = useState(null);
    const [profilePin,setProfilePin] = useState(null);
    const [profileFather,setProfileFather] = useState(null);
    const [profileMother,setProfileMother] = useState(null);
    const [profileFatherName,setProfileFatherName] = useState(null);
    const [profileMotherName,setProfileMotherName] = useState(null);
    const [profileEmail,setProfileEmail] = useState(null);
const [profileImage,setProfileImage] = useState(avatar);
    const [editAble,setEditAble]=useState(false);
    const [show,setShow] = useState(false)
    const [loadBool,setLoadBool] = useState(false);

    function handleEditProfile(){
setEditAble(true);
console.log(editAble);

if (!show) {
   setShow(true);
   document.getElementById('saveButton').style.display = "block";
   document.getElementById('cancelButton').style.display = "block";
   document.getElementById('editButton').style.display = "none";
   document.getElementsByClassName("profileField")[0].style.border = "solid";
document.getElementsByClassName("dropdownGender")[0].style.border = "solid";

    }
   else {
       setShow(false)
       document.getElementById('saveButton').style.display = "none";
       document.getElementById('cancelButton').style.display = "none";
       document.getElementsByClassName("profileField")[0].style.border = "none";
document.getElementsByClassName("dropdownGender")[0].style.border="none";

   }
}

const [show3,setShow3] = useState(false);
    function handleEditPName(e){
      // if (profileName.length >= 10)
      //    return false;
      // else
         setProfileName(e.target.value)
   }
   function handleEditPEmail(e){
    setProfileEmail(e.target.value);
   }
   function handleEditPSex(e){
    setProfileSex(e.target.value);
   }
   console.log(profileSex)
   function handleEditPBG(e){
    setProfileBg(e.target.value);
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
   function handleEditPFather(e){
    setProfileFather(e.target.value);
   }
   function handleEditPFatherName(e){
      setProfileFatherName(e.target.value);
     }
   function handleEditPMother(e){
    setProfileMother(e.target.value);
   }
   function handleEditPMotherName(e){
      setProfileMotherName(e.target.value);
     }
    function handleProfileImage(){
      setProfileImage();
    }
   const [postData,setPostData] = useState(null);
   const accessToken = sessionStorage.getItem("access token");
   console.log(accessToken);
   const config = {
      headers:{
         Authorization: `Bearer ${accessToken}`
      }
   }

   useEffect(()=>{
      setLoadBool(true)
      BaseUrl.get("student/profiledetails/",config).then((res)=>{
         console.log(res);
         console.log(res.data)
         setLoadBool(false)
         setProfileName(res.data.name);
         setProfileSex(res.data.sex);
         setProfileBg(res.data.blood_group);
         setProfileDOB(res.data.DOB);
         setProfileAddr(res.data.address);
         setProfileCity(res.data.city);
         setProfileState(res.data.state);
         setProfileMobile(res.data.student_phone);
         setProfilePin(res.data.pincode);
         setProfileFather(res.data.father_phone);
         setProfileMother(res.data.mother_phone);
         setProfileMotherName(res.data.mother_name);
         setProfileFatherName(res.data.father_name);
         setProfileEmail(res.data.email);
         setProfileImage(res.data.picture)
         console.log(postData)
      }).catch(err=>{
         setLoadBool(false)
         console.log(err);
      })
   },[])

   const [show2,setShow2] = useState(false);
   function handleCancel(){
      setEditAble(false);
      if (!show2) {
         setShow2(true);
         document.getElementById('saveButton').style.display = "none";
         document.getElementById('cancelButton').style.display = "none";
         document.getElementById('editButton').style.display = "block";
         document.getElementsByClassName("profileField")[0].style.border="none";
document.getElementsByClassName("dropdownGender")[0].style.border="none";

          }
         else {
             setShow2(false)
             document.getElementById('saveButton').style.display = "block";
             document.getElementById('cancelButton').style.display = "block";
             document.getElementById('editButton').style.display = "none";
             document.getElementsByClassName("profileField")[0].style.border="solid";
document.getElementsByClassName("dropdownGender")[0].style.border="solid";

         }
         BaseUrl.get("student/profiledetails/",config).then((res)=>{
            console.log(res);
            console.log(res.data)
            setProfileName(res.data.name);
            setProfileSex(res.data.sex);
            setProfileBg(res.data.blood_group);
            setProfileEmail(res.data.email);
            setProfileDOB(res.data.DOB);
            setProfileAddr(res.data.address);
            setProfileCity(res.data.city);
            setProfileState(res.data.state);
            setProfileMobile(res.data.student_phone);
            setProfilePin(res.data.pincode);
            setProfileFather(res.data.father_phone);
            setProfileMother(res.data.mother_phone);
            setProfileMotherName(res.data.mother_name);
            setProfileFatherName(res.data.father_name);
            setProfileImage(res.data.picture)
            console.log(postData)
         }).catch(err=>{
            console.log(err);
         })
         window.location.reload();
   }
   

   function handleSaveProfile(){
      if (!show3) {
         setShow3(true);
         document.getElementById('saveButton').style.display = "none";
         document.getElementById('cancelButton').style.display = "none";
         document.getElementById('editButton').style.display = "block";
         document.getElementsByClassName("profileField")[0].style.border="none";
document.getElementsByClassName("dropdownGender")[0].style.border = "none";

          }
         else {
             setShow3(false)
             document.getElementById('saveButton').style.display = "block";
             document.getElementById('cancelButton').style.display = "block";
             document.getElementById('editButton').style.display = "none";
             document.getElementsByClassName("profileField")[0].style.border="solid";
document.getElementsByClassName("dropdownGender")[0].style.border = "solid";

         }
      setEditAble(false);
      if(isCorrect){
      BaseUrl.put("student/profiledetails/",{
         name:profileName,
         sex:profileSex,
         blood_group:profileBG,
         DOB:profileDOB,
         address:profileAddr,
         city:profileCity,
         state:profileState,
         student_phone:profileMobile,
         pincode:profilePin,
         father_name:profileFatherName,
         mother_name:profileMotherName,
         father_phone:profileFather,
         mother_phone:profileMother,
         email:profileEmail,
         picture:profileImage
      },config).then((res)=>{
         setPostData(res.data);
         console.log(res);
         setProfileImage(res.data.picture)
         console.log(res.data);
         setProfileName(res.data.name);
         setProfileEmail(res.data.email);
         setProfileSex(res.data.sex);
         setProfileBg(res.data.blood_group);
         setProfileDOB(res.data.DOB);
         setProfileAddr(res.data.address);
         setProfileCity(res.data.city);
         setProfileState(res.data.state);
         setProfileMobile(res.data.student_phone);
         setProfilePin(res.data.pincode);
         setProfileFather(res.data.father_phone);
         setProfileMother(res.data.mother_phone);
         setProfileFatherName(res.data.father_name);
         setProfileMotherName(res.data.mother_name);
      })
   }
      // window.location.reload();
  }
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

 useEffect(() => {
   if (rightName.test(profileFatherName)) {
     document.getElementById("wrongFName").style.display = "none";
     setIsCorrect(true);
   } else if (profileFatherName) {
     document.getElementById("wrongFName").style.display = "block";
     setIsCorrect(false);
   }
 }, [profileFatherName]);

 useEffect(() => {
   if (rightName.test(profileMotherName)) {
     document.getElementById("wrongMName").style.display = "none";
     setIsCorrect(true);
   } else if (profileMotherName) {
     document.getElementById("wrongMName").style.display = "block";
     setIsCorrect(false);
   }
 }, [profileMotherName]);

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
      if(isnum.test(profileFather)){
         document.getElementById("wrongFNum").style.display="none";
         setIsCorrect(true)
      }
      else if(profileFather){
         document.getElementById("wrongFNum").style.display="block";
         setIsCorrect(false)
      }
       },[profileFather])

       useEffect(()=>{
         if(isnum.test(profileMother)){
            document.getElementById("wrongMNum").style.display="none";
            setIsCorrect(true)
         }
         else if(profileMother){
            document.getElementById("wrongMNum").style.display="block";
            setIsCorrect(false)
         }
          },[profileMother])

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

            const MainName = sessionStorage.getItem("User_name");
             
   return (
        <>
            <Navbar/>
            <h1 className="dash">Dashboard : My Profile</h1>
            <div id="background">
                <div id="avatar">
                    <img src={profileImage} id="profileImage"/>
                    <span id='dis-name'>{MainName}</span><br />
                    <div className='avatarInfo'>
                    Mon 3 SEPT 2001 <br />
                    B.TECH 2ND YEAR <br />
                    </div>
                </div>
                <div id="heading1">Student Profile</div>
                <div id="personalinfo">Personal Info</div>
                <div id="stu-name">Student's Name</div>
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
                <div id="dob">Date of Birth (MM/DD/YYYY)</div>
                <div className='space4'>
                {editAble?(<ProfileInputField value={profileDOB} class="profileField" type="date"  data-date-format="DD MMMM YYYY" onChange={handleEditPDOB} />): 
                   (<ProfileInputDisabled  value={profileDOB} class="profileField" data-date-format="DD MMMM YYYY" type="date"/>)}
                </div>
                <div id="email">Email</div>
                <div className='space5'>
                {editAble?(<input value={profileEmail} class="profileField" type="text" onChange={handleEditPEmail} disabled />): 
                   (<input value={profileEmail} class="profileField" type="text" disabled/>)}
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
                <div id="stu-phone">Student's Mobile No.</div>
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
                <div id="heading3">Parents</div>
                <div id="fat-name">Father's Name</div>
                <div className='space11'>
                {editAble?(<ProfileInputField value={profileFatherName} class="profileField" type="text" onChange={handleEditPFatherName} />): 
                   (<ProfileInputDisabled  value={profileFatherName} class="profileField" type="text"/>)}
                </div>
                <p id="wrongFName">Name must contain only alphabetic characters.</p>
                <div id="fat-phone">Father's Mobile No.</div>
                <div className='space12'>
                {editAble?(<ProfileInputField value={profileFather} class="profileField" type="text" onChange={handleEditPFather} />): 
                   (<ProfileInputDisabled  value={profileFather} class="profileField" type="text"/>)}
                </div>
                <p id="wrongFNum">Number must contain only numeric characters.</p>
                <div id="mot-name">Mother's Name</div>
                <div className='space13'>
                {editAble?(<ProfileInputField value={profileMotherName} class="profileField" type="text" onChange={handleEditPMotherName} />): 
                   (<ProfileInputDisabled  value={profileMotherName} class="profileField" type="text"/>)}
                </div>
                <p id="wrongMName">Name must contain only alphabetic characters.</p>
                <div id="mot-phone">Mother's Mobile No.</div>
                <div className='space14'>
                {editAble?(<ProfileInputField value={profileMother} class="profileField" type="text" onChange={handleEditPMother} />): 
                   (<ProfileInputDisabled  value={profileMother} class="profileField" type="text"/>)}
                </div>
                <p id="wrongMNum">Number must contain only numeric characters.</p>
                <button id="editButton" onClick={handleEditProfile}>Edit Profile</button>
                <button id="saveButton" onClick={handleSaveProfile}>Save</button> 
                <button id="cancelButton" onClick={handleCancel}>Cancel</button> 
                <div className='CONTACT'>
            </div>
            <select className="dropdownGender" onChange={handleEditPSex}>
               <option value="male">Male</option>
               <option value="female">Female</option>
            </select>
            </div>
            {loadBool? (<ReactBootStrap.Spinner animation="border" id="apiloader"/>) :null}
        </>
    )
}

export default Profile;