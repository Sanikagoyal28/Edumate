import React from "react";
import "./dashboard.css";
function UpdateDashCard (props){
    return <>
<div className="updateDashCardRow">
    <div className="updateDashCdTitle">{props.title}</div>
    <div className="updateDashCdDesc">{props.desc}</div>
</div>
    </>
}
export default UpdateDashCard;