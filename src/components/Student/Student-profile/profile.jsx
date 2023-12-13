import React from 'react'
import './profile.css'
import avatar from '../../Assests/avatar.png'
import Navbar from '../../utils/Navbar/Navbar'
import ProfileInputField from '../../utils/ProfileInputField'
import ProfileInputDisabled from '../../utils/ProfileInputDiabled'
import * as ReactBootStrap from "react-bootstrap";
import { useState } from 'react'
import { useEffect } from 'react'
import BaseUrl from '../../utils/BaseUrl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
   const [profileName, setProfileName] = useState(null);
   const [profileSex, setProfileSex] = useState(null);
   const [profileBG, setProfileBg] = useState(null);
   const [profileDOB, setProfileDOB] = useState(null);
   const [profileAddr, setProfileAddr] = useState(null);
   const [profileCity, setProfileCity] = useState(null);
   const [profileState, setProfileState] = useState(null);
   const [profileMobile, setProfileMobile] = useState(null);
   const [profilePin, setProfilePin] = useState(null);
   const [profileFather, setProfileFather] = useState(null);
   const [profileMother, setProfileMother] = useState(null);
   const [profileFatherName, setProfileFatherName] = useState(null);
   const [profileMotherName, setProfileMotherName] = useState(null);
   const [profileEmail, setProfileEmail] = useState(null);
   const [profileImage, setProfileImage] = useState(avatar);
   const [editAble, setEditAble] = useState(false);
   const [show, setShow] = useState(false)
   const [loadBool, setLoadBool] = useState(false);

   function handleEditProfile() {
      setEditAble(true);
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
         document.getElementsByClassName("dropdownGender")[0].style.border = "none";

      }
   }

   const [show3, setShow3] = useState(false);
   function handleEditPName(e) {
      // if (profileName.length >= 10)
      //    return false;
      // else
      setProfileName(e.target.value)
   }
   function handleEditPEmail(e) {
      setProfileEmail(e.target.value);
   }
   function handleEditPSex(e) {
      setProfileSex(e.target.value);
   }
   function handleEditPBG(e) {
      setProfileBg(e.target.value);
   }
   function handleEditPDOB(e) {
      setProfileDOB(e.target.value);
   }
   function handleEditPAddr(e) {
      setProfileAddr(e.target.value);
   }
   function handleEditPCity(e) {
      setProfileCity(e.target.value);
   }
   function handleEditPState(e) {
      setProfileState(e.target.value);
   }
   function handleEditPPin(e) {
      setProfilePin(e.target.value);
   }
   function handleEditPMobile(e) {
      setProfileMobile(e.target.value);
   }
   function handleEditPFather(e) {
      setProfileFather(e.target.value);
   }
   function handleEditPFatherName(e) {
      setProfileFatherName(e.target.value);
   }
   function handleEditPMother(e) {
      setProfileMother(e.target.value);
   }
   function handleEditPMotherName(e) {
      setProfileMotherName(e.target.value);
   }
   function handleProfileImage() {
      setProfileImage();
   }
   const [postData, setPostData] = useState(null);
   const accessToken = sessionStorage.getItem("access token");
   const config = {
      headers: {
         Authorization: `Bearer ${accessToken}`
      }
   }

   useEffect(() => {
      setLoadBool(true)
      BaseUrl.get("student/profiledetails/", config).then((res) => {
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
      }).catch(err => {
         setLoadBool(false)
      })
   }, [])

   const [show2, setShow2] = useState(false);
   function handleCancel() {
      setEditAble(false);
      if (!show2) {
         setShow2(true);
         document.getElementById('saveButton').style.display = "none";
         document.getElementById('cancelButton').style.display = "none";
         document.getElementById('editButton').style.display = "block";
         document.getElementsByClassName("profileField")[0].style.border = "none";
         document.getElementsByClassName("dropdownGender")[0].style.border = "none";
      }
      else {
         setShow2(false)
         document.getElementById('saveButton').style.display = "block";
         document.getElementById('cancelButton').style.display = "block";
         document.getElementById('editButton').style.display = "none";
         document.getElementsByClassName("profileField")[0].style.border = "solid";
         document.getElementsByClassName("dropdownGender")[0].style.border = "solid";

      }
      BaseUrl.get("student/profiledetails/", config).then((res) => {

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

      }).catch(err => {
      })
   }


   function handleSaveProfile() {
      if (!show3) {
         setShow3(true);
         document.getElementById('saveButton').style.display = "none";
         document.getElementById('cancelButton').style.display = "none";
         document.getElementById('editButton').style.display = "block";
         document.getElementsByClassName("profileField")[0].style.border = "none";
         document.getElementsByClassName("dropdownGender")[0].style.border = "none";

      }
      else {
         setShow3(false)
         document.getElementById('saveButton').style.display = "block";
         document.getElementById('cancelButton').style.display = "block";
         document.getElementById('editButton').style.display = "none";
         document.getElementsByClassName("profileField")[0].style.border = "solid";
         document.getElementsByClassName("dropdownGender")[0].style.border = "solid";

      }
      setEditAble(false);
      // if (isCorrect) {
      BaseUrl.put("student/profiledetails/", {
         name: profileName,
         sex: profileSex,
         blood_group: profileBG,
         DOB: profileDOB,
         address: profileAddr,
         city: profileCity,
         state: profileState,
         student_phone: profileMobile,
         pincode: profilePin,
         father_name: profileFatherName,
         mother_name: profileMotherName,
         father_phone: profileFather,
         mother_phone: profileMother,
         email: profileEmail,
         picture: profileImage
      }, config).then((res) => {
         setPostData(res.data);
         toast.success("Profile edited successfully", {
            position: "top-center",
            background: "none"
         })
         setProfileImage(res.data.picture)
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
   useEffect(() => {
      if (loadBool)
         document.body.style.opacity = "0.5"
      else
         document.body.style.opacity = "1"
   }, [loadBool])


   /*VALIDATION*/

   const rightName = /^[a-z ,.'-]+$/i;
   const [isCorrect, setIsCorrect] = useState(false);
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
         document.getElementById("wrongBG").style.display = "none";
         setIsCorrect(false);
      }
   }, [profileBG]);

   const rightemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   useEffect(() => {
      if (rightemail.test(profileEmail)) {
         document.getElementById("wrongEmail").style.display = "none";
         setIsCorrect(true)
      }
      else if (profileEmail) {
         document.getElementById("wrongEmail").style.display = "block";
         setIsCorrect(false)
      }
   }, [profileEmail])

   const rightCity = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
   useEffect(() => {
      if (rightCity.test(profileCity)) {
         document.getElementById("wrongCity").style.display = "none";
         setIsCorrect(true)
      }
      else if (profileCity) {
         document.getElementById("wrongCity").style.display = "block";
         setIsCorrect(false)
      }
   }, [profileCity])

   const rightState = /[A-Z][a-z]+(?: +[A-Z][a-z]+)*/;
   useEffect(() => {
      if (rightState.test(profileState)) {
         document.getElementById("wrongState").style.display = "none";
         setIsCorrect(true)
      }
      else if (profileState) {
         document.getElementById("wrongState").style.display = "block";
         setIsCorrect(false)
      }
   }, [profileState])

   const isnum = /^\d+$/;
   useEffect(() => {
      if (isnum.test(profileFather) && profileFather.toString().length == 10) {
         document.getElementById("wrongFNum").style.display = "none";
         setIsCorrect(true)
      }
      else if (profileFather) {
         document.getElementById("wrongFNum").style.display = "block";
         setIsCorrect(false)
      }
   }, [profileFather])

   useEffect(() => {
      if (isnum.test(profileMother) && profileMother.toString().length == 10) {
         document.getElementById("wrongMNum").style.display = "none";
         setIsCorrect(true)
      }
      else if (profileMother) {
         document.getElementById("wrongMNum").style.display = "block";
         setIsCorrect(false)
      }
   }, [profileMother])

   useEffect(() => {
      if (isnum.test(profileMobile) && profileMobile.toString().length == 10) {
         document.getElementById("wrongNum").style.display = "none";
         setIsCorrect(true)
      }
      else if (profileMobile) {
         document.getElementById("wrongNum").style.display = "block";
         setIsCorrect(false)
      }
   }, [profileMobile])

   const pinCode = /^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$/;
   useEffect(() => {
      if (pinCode.test(profilePin)) {
         document.getElementById("wrongPin").style.display = "none";
         setIsCorrect(true)
      }
      else if (profilePin) {
         document.getElementById("wrongPin").style.display = "block";
         setIsCorrect(false)
      }
   }, [profilePin])

   const MainName = sessionStorage.getItem("User_name");

   return (
      <>
         <Navbar />
         <h1 className="dash">Dashboard : My Profile</h1>
         <div id="background">
            <div id="avatar">
               {profileImage === null || profileImage === '' || profileImage === undefined ? <img src={avatar} id="profileImage" /> : <img src={profileImage} id="profileImage" />}
               <span id='dis-name'>{MainName}</span><br />
               <div className='avatarInfo'>
                  Mon 3 SEPT 2001 <br />
                  B.TECH 2ND YEAR <br />
               </div>
            </div>
            <div id="stuDetails">
               <p id="heading1">Student Profile</p>
               <p className="label1">Personal Info</p>
               <div className="profileInput">
                  <p className="label2">Student's Name</p>
                  <div className='space'>
                     {editAble ? (<ProfileInputField value={profileName} class="profileField" type="text" onChange={handleEditPName} />) :
                        (<ProfileInputDisabled value={profileName} class="profileField" type="text" />)}
                  </div>
               </div>
               <p id="wrongName">Name must contain only alphabetic characters.</p>
               <div className="profileInput">
                  <p className="label2">Sex</p>
                  <div className='space'>
                     {editAble ? (<select className="dropdownGender" value={profileSex} onChange={handleEditPSex}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                     </select>) :
                        (<select className="dropdownGender" value={profileSex} disabled>
                           <option value="Male" disabled>Male</option>
                           <option value="Female" disabled>Female</option>
                        </select>)}
                  </div>
               </div>
               <div className="profileInput">
                  <p className="label2">Blood Group</p>
                  <div className='space'>
                     {editAble ? (<ProfileInputField value={profileBG} class="profileField" type="text" onChange={handleEditPBG} />) :
                        (<ProfileInputDisabled value={profileBG} class="profileField" type="text" />)}
                  </div>
               </div>
               <p id="wrongBG">Please enter a valid Blood Group</p>
               <div className="profileInput">
                  <p className="label2">Date of Birth (MM/DD/YYYY)</p>
                  <div className='space'>
                     {editAble ? (<ProfileInputField value={profileDOB} class="profileField" type="date" data-date-format="DD MMMM YYYY" onChange={handleEditPDOB} />) :
                        (<ProfileInputDisabled value={profileDOB} class="profileField" data-date-format="DD MMMM YYYY" type="date" />)}
                  </div>
               </div>
               <div className="profileInput">
                  <p className="label2">Email</p>
                  <div className='space'>
                     {editAble ? (<input value={profileEmail} class="profileField" type="text" onChange={handleEditPEmail} disabled />) :
                        (<input value={profileEmail} class="profileField" type="text" disabled />)}
                  </div>
               </div>
               <p id="wrongEmail">Please enter a valid Email address</p>
               <div className='CONTACT'>
                  <p className="label1">Contact Details</p>
                  <div className="profileInput">
                     <p className="label2">Address</p>
                     <div className='space'>
                        {editAble ? (<ProfileInputField value={profileAddr} class="profileField" type="text" onChange={handleEditPAddr} />) :
                           (<ProfileInputDisabled value={profileAddr} class="profileField" type="text" />)}
                     </div>
                  </div>
                  <div className="profileInput">
                     <p className="label2">City</p>
                     <div className='space'>
                        {editAble ? (<ProfileInputField value={profileCity} class="profileField" type="text" onChange={handleEditPCity} />) :
                           (<ProfileInputDisabled value={profileCity} class="profileField" type="text" />)}
                     </div>
                  </div>
                  <p id="wrongCity">Please enter a valid City name</p>
                  <div className="profileInput">
                     <p className="label2">State</p>
                     <div className='space'>
                        {editAble ? (<ProfileInputField value={profileState} class="profileField" type="text" onChange={handleEditPState} />) :
                           (<ProfileInputDisabled value={profileState} class="profileField" type="text" />)}
                     </div>
                  </div>
                  <p id="wrongState">Please enter a valid State name</p>
                  <div className="profileInput">
                     <p className="label2">Student's Mobile No.</p>
                     <div className='space'>
                        {editAble ? (<ProfileInputField value={profileMobile} class="profileField" type="text" onChange={handleEditPMobile} />) :
                           (<ProfileInputDisabled value={profileMobile} class="profileField" type="text" />)}
                     </div>
                  </div>
                  <p id="wrongNum">Number must contain only numeric characters.</p>
                  <div className="profileInput">
                     <p className="label2">Pincode</p>
                     <div className='space'>
                        {editAble ? (<ProfileInputField value={profilePin} class="profileField" type="text" onChange={handleEditPPin} />) :
                           (<ProfileInputDisabled value={profilePin} class="profileField" type="text" />)}
                     </div>
                  </div>
               </div>
               <p className="label1">Parents</p>
               <div className="profileInput">
                  <p className="label2">Father's Name</p>
                  <div className='space'>
                     {editAble ? (<ProfileInputField value={profileFatherName} class="profileField" type="text" onChange={handleEditPFatherName} />) :
                        (<ProfileInputDisabled value={profileFatherName} class="profileField" type="text" />)}
                  </div>
               </div>
               <p id="wrongFName">Name must contain only alphabetic characters.</p>
               <div className="profileInput">
                  <div className="label2">Father's Mobile No.</div>
                  <div className='space'>
                     {editAble ? (<ProfileInputField value={profileFather} class="profileField" type="text" onChange={handleEditPFather} />) :
                        (<ProfileInputDisabled value={profileFather} class="profileField" type="text" />)}
                  </div>
               </div>
               <p id="wrongFNum">Number must contain only numeric characters.</p>
               <div className="profileInput">
                  <p className="label2">Mother's Name</p>
                  <div className='space'>
                     {editAble ? (<ProfileInputField value={profileMotherName} class="profileField" type="text" onChange={handleEditPMotherName} />) :
                        (<ProfileInputDisabled value={profileMotherName} class="profileField" type="text" />)}
                  </div>
               </div>
               <p id="wrongMName">Name must contain only alphabetic characters.</p>
               <div className="profileInput">
                  <p className="label2">Mother's Mobile No.</p>
                  <div className='space'>
                     {editAble ? (<ProfileInputField value={profileMother} class="profileField" type="text" onChange={handleEditPMother} />) :
                        (<ProfileInputDisabled value={profileMother} class="profileField" type="text" />)}
                  </div>
               </div>
               <p id="wrongMNum">Number must contain only numeric characters.</p>
            </div >
            <button id="editButton" onClick={handleEditProfile}>Edit Profile</button>
            <button id="saveButton" onClick={handleSaveProfile}>Save</button>
            <button id="cancelButton" onClick={handleCancel}>Cancel</button>

            {/* <select className="dropdownGender" onChange={handleEditPSex}> */}
            {/* <option value="male">Male</option> */}
            {/* <option value="female">Female</option> */}
            {/* </select> */}
         </div>
         {loadBool ? (<ReactBootStrap.Spinner animation="border" id="apiloader" />) : null}
         < ToastContainer />
      </>
   )
}

export default Profile;