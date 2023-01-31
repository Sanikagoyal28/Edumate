import React from 'react'

import './Feedback.css'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import * as ReactBootStrap from "react-bootstrap";
import Navbar from '../../../utils/Navbar/Navbar';
import FeedBackCard from '../feedbackCard'
import BaseUrl from '../../../utils/BaseUrl'
const FacFeedback = () => {
    const accessToken = sessionStorage.getItem("access token");
    console.log(accessToken);
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }
    const [details, SetDetails] = useState([])
    // const [faculty1, setFaculty1] = useState([])
    
    const id = "S1"
    const feed = 2
    const userID = 100000
    const [loadBool,setLoadBool] = useState(false)
    useEffect(() => {
        setLoadBool(true)
        BaseUrl.get('teacher/teachersofclass/'+`${id}`+'/', 
             config)
            .then((res) => {
                console.log(res);
                setLoadBool(false)
                console.log(res.data.classdetails);
                SetDetails(res.data.classdetails)
                // setFaculty1(res.data.teachers)
                
                console.log(details);
            })
            .catch((err) => {
                setLoadBool(false)
                console.log(err);
            })
    },[])

const faculty1 = ["Anurag Gupta", "Raman","Akhilesh"]
    // function CreateFeedCard(faculty1,index){

    // }
    useEffect(()=>{
        if(loadBool)
        document.body.style.opacity="0.5"
        else
        document.body.style.opacity="1"
      },[loadBool])
    return (
        <>
<Navbar />
            <h1 id='dash'>Dashboard &gt; Feedback</h1>
            <div id="background-feedback">
                <div id="ff">Faculty Feedback</div>
                <div id="heading-feedback">
                    <div className="heading-1">Faculty Name</div>
                    <div className="heading-2">Subject</div>
                    <div className="heading-3">Feedback</div>
                </div>
                <div className='feedBackCall'>
                    {/* {faculty1.map(CreateFeedCard)} */}
                    {faculty1.map((faculty,index)=>{
                        console.log(index)
                        console.log(faculty)
                        {/* <FeedbackCard key={index} /> can't use key as a props because key are 
                        used internally by react and not passed to components as props. Consider passing it as a prop such as 'id'. */}
                        return <FeedBackCard name={faculty} number={index} />
                    })}
                </div>
                </div>
                {loadBool? (<ReactBootStrap.Spinner animation="border" id="apiloader"/>) :null}
                </>
    )
}
export default FacFeedback;