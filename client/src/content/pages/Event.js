import React from 'react';

function Event(props) {
    return(
        <div className="event">
            <div className="invitation">
                <h1>You've Got An EatVite!</h1>
                <h3>Title: 'Ex. Girl's Night Out!'
                </h3>
                <div className="inline">
                <h3>Date: </h3>
                <h3>Time: </h3>
                </div>
                <h3>From:</h3>
            </div>
      
            <div className="resoptions">
            <h1>Pick ONE restaurant from the list below!</h1>
                <div>
                    (List of chosen restaurants)</div>
                <button type="submit">Let's Eat!</button>
            </div>
        </div>
    )
}

export default Event;