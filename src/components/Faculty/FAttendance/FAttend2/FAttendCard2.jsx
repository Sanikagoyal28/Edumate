import React from "react";
import { useEffect } from "react";

function FCard2(props) {
  
    function handleAbsent(id) {
        document.getElementsByClassName("present1")[id].style.backgroundColor = "white";
        document.getElementsByClassName("absent1")[id].style.backgroundColor = "#FF939E";
props.absentFunc()
    }
    function handlePresent(id) {
        document.getElementsByClassName("present1")[id].style.backgroundColor = "#62DDB0";
        document.getElementsByClassName("absent1")[id].style.backgroundColor = "white";
        // handleMarkPresent();
        props.presentFunc()
    }
    var a = props.present
   
    useEffect(()=>{
        if(a){
            document.getElementsByClassName("present1")[props.index].style.backgroundColor = "#62DDB0";
            document.getElementsByClassName("absent1")[props.index].style.backgroundColor = "white";
        }
        else{
            document.getElementsByClassName("present1")[props.index].style.backgroundColor = "white";
            document.getElementsByClassName("absent1")[props.index].style.backgroundColor = "#FF939E";
        }
    },[a])
    
    return <>
        <div className="FCardRow">
            {/* <span id="FCdRoll">{props.roll}</span> */}
            <span id="FCdStudent">{props.id}</span>
            <span id="FCdName">{props.name}</span>
            {/* <div id="present">P</div>
            <div id="absent">A</div> */}
            {/* {a?(document.getElementById("present1").style.backgroundColor = "#62DDB0"):(document.getElementById("absent1").style.backgroundColor = "#FF939E")} */}
            <div className="present1" onClick={()=>{handlePresent(props.index)}}>P</div>
            <div className="absent1" onClick={()=>{handleAbsent(props.index)}}>A</div>
        </div>
    </>
}
export default FCard2;