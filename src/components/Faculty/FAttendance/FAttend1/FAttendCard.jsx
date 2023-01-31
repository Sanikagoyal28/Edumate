import React from "react";
import { Link } from "react-router-dom";
function FCard1(props){
    return <>
<div className="FCardRow">
<span id="FCdDate">{props.date}</span>
<span id="FCdTime">{props.time}</span>
<span id="FCdClass">{props.class}</span>
{/* <div id="FCdSubject1"> */}
<span id="FCdSubject" onClick={props.navigator}>{props.subject}</span>
{/* </div> */}
</div>

    </>
}
export default FCard1;