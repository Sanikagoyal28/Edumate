import React from "react";
import AdmBar from "../admin_bar/AdmBar";

function FacultyClass(){

    const department = sessionStorage.getItem("faculty-department");
    const className = sessionStorage.getItem("faculty-class");

    return <>
    <AdmBar />
<div className="facultyBackground">
    <div className="departName">Department</div><br />
    <input type="text" value={department} className="departInput" /><br />
    <div className="classsname">Class</div><br />
    <input type="text" value={className} className="classInput" /><br />
    <div className="facultyName">Faculty</div><br />
    <input type="text" value={department} className="facultyInput" /><br />
    <div className="subjectName">Subject Code</div><br />
    <input type="text" value={className} className="subjectInput" /><br />
    <div className="timeSlot">Time Slot</div><br />
    <select className="timeInput">
        <option value="08:00-09:20">08:00-09:20</option>
        <option value="09:20-10:10">09:20-10:10</option>
        <option value="11:00-11:50">11:00-11:50</option>
        <option value="11:50-12:40">11:50-12:40</option>
        <option value="12:40-01:30">12:40-01:30</option>
        <option value="01:30-02:20">01:30-02:20</option>
    </select><br />
    <div className="daySlot">Day</div><br />
    <select className="dayInput">
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
    </select>
    <div className="assignSaveButton" type="button">Done</div>
    <div className="assignCancelButton" type="button">Cancel</div>
</div>
    </>
}

export default FacultyClass;