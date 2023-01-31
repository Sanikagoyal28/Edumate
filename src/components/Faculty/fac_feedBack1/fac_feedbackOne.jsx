import React, { useState , useEffect} from "react";
import axios from "axios";
import "./fac_FB.css";
import Navbar from "../../utils/Navbar/Navbar";
import BaseUrl from "../../utils/BaseUrl";

function FeedBackOne(){
    const accessToken = sessionStorage.getItem("Faculty_access_token");
    console.log(accessToken);
    const config = {
        headers:{
           Authorization: `Bearer ${accessToken}`
        }
     }

const [departId, setDepartId]= useState("");
    function handleDepartId(e){
        setDepartId(e.target.value);
    }

    const [deptList,setDeptList] = useState([]);
    useEffect(()=>{
        BaseUrl.get("admin/departments/"+"ALL/",config)
        .then((res)=>{
            console.log(res.data);
            setDeptList(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
    console.log(departId)

    function DropdownDeptList (deptList){
        return <>
            <option  id="dept-name" className="dept_head_input" value={deptList.id}>{deptList.name}</option>
        </>
             }

    return <>
  <Navbar />
<div className="feedBackBgOne">
    <h1 className="studentFeed">Student Feedback</h1>
    <div className="feedBck1Class">Class</div>
    <select className="departFeed" onChange={handleDepartId}>
    <option>Department</option>
        {deptList.map(DropdownDeptList)}
    </select>
</div>
    </>
}
export default FeedBackOne;