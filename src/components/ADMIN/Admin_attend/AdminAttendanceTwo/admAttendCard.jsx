import React from "react";

function AdmAttendCard (props){
    var progressBarWidth = props.attend;
    return <>
 <div id="admRow2">
            <span id="admSname">{props.name}</span>
            <span id="admSno">{props.Number}</span>
            <span id="admSPer">
            <div className="progressAdm">
        <div className="progressBarSA" style={{width:`${props.attend}%`}} >{props.attend}</div>
    </div>
    {/* <p style={{width:{props.attendPer}}} ></p> */}
{/* <p className="pBarWd" >{props.attendPer}</p> */}
            </span>
        </div>
    </>
}
export default AdmAttendCard;