import React from "react";

function FeedBackCard(props){
    var key = props.number;
    var index1 = 5*key;
    var index2 = 5*key + 4;

    let circles = document.getElementsByClassName("circleF");
console.log(circles);

    // function handleFeedback(data){
    //     var first = index1 + data;
    //     for(var i=index1;i<first;i++)
    //     {
    //         circles[i].style.backgroundColor="#6C63FF";
    //         circles[i].style.color="white";
    //     }
    //     for(var i=first;i<=index2;i++)
    //     {
    //         circles[i].style.backgroundColor="white";
    //         circles[i].style.color="black";
    //     }
    // }
    function handleFeedback(){
        var data=1;
        var first = index1 + data;
        for(var i=index1;i<first;i++)
        {
            circles[i].style.backgroundColor="#6C63FF";
            circles[i].style.color="white";
        }
        for(var i=first;i<=index2;i++)
        {
            circles[i].style.backgroundColor="white";
            circles[i].style.color="black";
        }
    }
 
    return <>
        <div className="feedCard">
        <span id="feedName">{props.name}</span>
        <span id="feedSubj">Computer science</span>
        <div id="feedBackCircles">
        {/* <span className="circleF" onClick={(event)=>handleFeedback(1)}>1</span>
        <span className="circleF" onClick={(event)=>handleFeedback(2)}>2</span>
        <span className="circleF" onClick={(event)=>handleFeedback(3)}>3</span>
        <span className="circleF" onClick={(event)=>handleFeedback(4)}>4</span>
        <span className="circleF" onClick={(event)=>handleFeedback(5)}>5</span> */}
        <span className="circleF" onClick={handleFeedback()}>1</span>
        <span className="circleF" onClick={handleFeedback()}>2</span>
        <span className="circleF" onClick={handleFeedback()}>3</span>
        <span className="circleF" onClick={handleFeedback()}>4</span>
        <span className="circleF" onClick={handleFeedback()}>5</span>
        </div>
        </div>
    </>
}
export default FeedBackCard;