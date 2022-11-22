import React from "react";
 function AddComponentField (props){
    return <>
    <div className="editDeptMain">
    {/* <p onClick={props.toggle} className="editted"><span id="threeDot">...</span></p> */}
    <div className="dltAdminDept" onClick={props.dltDept} id="minusDept">-</div>
    <div className="editAdminDept" onClick={props.editDept} id="plusDept">+</div>
<div className="editWhiteCompField"><p id="departName">{props.value}</p></div>
</div>
    </>
 }
 export default AddComponentField;