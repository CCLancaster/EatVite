import React from 'react';

function Addevent(props) {
    

    return (
        <div className="addevent">
            <div className="add">
                <h1 className="headtitle">Create Your EatVite</h1>
                <form method="POST" className="eatform">
                    <input type="text" name="title" placeholder="Title" />
                    <input type="text" name="date" placeholder="mm/dd" />
                    <input type="text" name="time" placeholder="Time" />
                    <input type="text" name="friend" placeholder="Friend" />
                    <button type="submit"> Next Step</button>
                </form>
            </div>
            <div className="search">
                <h1 className="headtitle">Where Do You Want To Eat?</h1>
                <form method="GET" className="searchform">
                    <input type="text" name="search" placeholder="Enter City Name or Zipcode" />
                    <button type="submit">Search</button>
                </form>
            </div>
            <div className="choose">
                <h1 className="headtitle">Choose Your Restaurants</h1>
                <div className="apibox">
                        RESTAURANTS HERE
                </div>
                <button type="submit">Send EatVite!</button>
            </div>
        </div>

    )
}

export default Addevent;