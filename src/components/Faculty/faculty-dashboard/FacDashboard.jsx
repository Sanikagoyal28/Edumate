import React from 'react'

// import './fac-dashboard.css'
import * as ReactBootStrap from "react-bootstrap";
import UpdateDashCard from '../../Student/Dashboard/updateDashCard';
import profileimg from '../../Assests/Images/avatar.png'
// import updateimg from '../Assests/Images/updates-img-removebg-preview.png'
import Chart from '../../utils/Pie/Pie'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Classcard1 from './Classcard'
import Navbar from '../../utils/Navbar/Navbar'
import { Link,useNavigate } from 'react-router-dom';
import BaseUrl from '../../utils/BaseUrl';
const FacDashboard = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [dob, setDob] = useState('')
    const [email, setEmail] = useState('')
    const [Subject, setSubject] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')
    const accessToken = sessionStorage.getItem("access token");
    console.log(accessToken);
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }
    //updates
    function navigatetoupdates() {
        navigate('/Fupdate')
    }
    const [updateCdArr,setUpdateCdArr]=useState([]);
useEffect(()=>{
    setLoadBool(true)
    BaseUrl.get("updatesection/0/",config).
    then((res)=>{
        console.log(res.data[0]);
        setLoadBool(false)
        setUpdateCdArr(res.data[0]);
    })
    .catch((err)=>{
        setLoadBool(false)
        console.log(err);
    })
},[])

function CreateUpdateDbCard(updateCdArr){
    return (
    <UpdateDashCard title={updateCdArr.title} desc={updateCdArr.description} />
    )
}

 
    useEffect(() => {
        BaseUrl.get("student/profiledetails/", config)
            .then((res) => {
                console.log(res);
                setName(res.data.name)
                setDob(res.data.DOB)
                setEmail(res.data.email)
                setPhone(res.data.teacher_phone)
                setGender(res.data.sex)
            })
    }, [])
    
    useEffect(()=>{
      setLoadBool(true)
        BaseUrl.get("teacher/profiledetails/", config).then((res) => {
          setName(res.data.name)
                setDob(res.data.DOB)
      }).catch(err=>{
         console.log(err);
         setLoadBool(false)
      })
    }, [])
    const [temp, setTemp] = useState(false)
    const [at, setAt] = useState('0')
    const [att, setAtt] = useState('0')
    const [period, setPeriod] = useState([]);
    const [fperiod, setFperiod] = useState('')
    const [gperiod, setGperiod] = useState('')
    const [seriod, setSperiod] = useState('')
    const [tperiod, setTperiod] = useState('')
    const [foperiod, setFoperiod] = useState('')
    const [loadBool,setLoadBool] = useState(false)

    const dat = new Date()
    const date = dat.getDate();
    const monthNum = dat.getMonth();
    const year = dat.getFullYear();
    const dayNum = dat.getDay()

    const day =[
       "Sunday", "Monday", "Tuesday" , "Wednesday" , "Thursday" , "Friday", "Saturday"
    ]
    const month =[
        "January", "February", "March", "April", "May" ,"June", "July","August", "September","October", "November", "December"
    ]
    console.log(date, month ,year, dayNum)

     useEffect(() => {
        setLoadBool(true)
        BaseUrl.get("teacher/timetable/", config).
            then((res) => {
                console.log(res);
                setLoadBool(false)
                for (let i = 0; i < 30; ++i) {
                    
                    if (res.data[i].day === day[dayNum] && res.data[i].subject) {
                        setPeriod(res.data[i].period)
                        setTemp(true)
                        
                        if (res.data[i].period === "8:30 - 9:20") {
                            setFperiod(res.data[i].subject)
                        }
                        else if (res.data[i].period === "9:20 - 10:10") {
                            setSperiod(res.data[i].subject)
                        }
                        else if (res.data[i].period === "11:00 - 11:50") {
                            setTperiod(res.data[i].subject)
                        } else if (res.data[i].period === "1:30 - 2:20") {
                            setGperiod(res.data[i].subject)
                        }
                        else {
                            setFoperiod(res.data[i].subject)
                        }
                    }
                }
            }).
            catch((err) => {
                setLoadBool(false)
                console.log(err);
            })
    }, [])
    useEffect(()=>{
        if(loadBool)
        document.body.style.opacity="0.5"
        else
        document.body.style.opacity="1"
      },[loadBool])
     
      
            return (
                <>
                   <Navbar />
                  
                    <h1 id='dashHeading'>Dashboard</h1>
                    <div id="container">
                        <div id="container1">
                        </div>
                    </div>
                    <div id="background-dash1">
                        <div id="greeting1"><span className='bold'>Hello,</span> {name}<br /><span id="greeting2">Nice to have you back, what an exciting day!</span></div>
                        <div id="today_class">Today's Classes</div>
                        <div id="class_bg">
                            <div id="date">{date} {month[monthNum-1]}, {year} {day[dayNum]}</div>
                        </div>
                        <div id="right">
                            <div id="profile_details">Profile Details</div>
                            <div id="card1">
                                <img src={profileimg} alt="" id='img' />
                                <div id="student_details"><span className='bold_name'>{name}</span><br />{gender}<br />{dob}<br />{phone}<br />{email}</div>
                            </div>
                            <div id="class1" className='class'>
                        <span className="circle_name"></span>
                        <span className="class_name12">{fperiod}</span>
                        <span className="class_time4">8:30-9:20</span>
                    </div>
                    <div id="class2" className='class'>
                        <span className="circle_name"></span>
                        <span className="class_name12">{fperiod}</span>
                        <span className="class_time4">9:20-10:10</span>
                    </div>
                    <div id="class3" className='class'>
                        <span className="circle_name"></span>
                        <span className="class_name12">{fperiod}</span>
                        <span className="class_time4">11:00-11:50</span>
                    </div>
                    <div id="class4" className='class'>
                        <span className="circle_name"></span>
                        <span className="class_name12">{fperiod}</span>
                        <span className="class_time4">11:50-12:40</span>
                    </div>
                    <div id="classNew" className='class'>
                        <span className="circle_name"></span>
                        <span className="class_name12">{gperiod}</span>
                        <span className="class_time4">1:30-2:20</span>
                    </div>
                    <div id="updatesFac">Updates</div>
                            <div id="cardFacUpd">
                                {updateCdArr.slice(0, 1).map(CreateUpdateDbCard)}
                                <span id='read-more' onClick={navigatetoupdates}>Read more...</span>
                            </div>
                        </div>
                    </div> 
                    {loadBool? (<ReactBootStrap.Spinner animation="border" id="apiloader"/>) :null}
                </>
            )
        }

export default FacDashboard;
