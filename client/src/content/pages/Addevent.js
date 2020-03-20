import React from 'react';

function Addevent(props) {
    return (
        <div className="addevent">
            <div className="add">
                <div className="circle">
                    <h1>1</h1>
                </div>
                <div className="eatviteform">
                    <h1>Create Your EatVite</h1>
                    <form method="POST" className="eatform">
                        <input type="text" name="title" placeholder="Title" />
                        <input type="text" name="date" placeholder="mm/dd" />
                        <input type="text" name="time" placeholder="Time" />
                        <input type="text" name="friend" placeholder="Friend" />
                        <button type="submit">Next</button>
                    </form>
                </div>
                <div className="emptyspace"></div>
            </div>
            <div className="search">
                <div className="circle">
                    <h1>2</h1>
                </div>
                <div>
                    <h1>Where Do You Want To Eat?</h1>
                    <div className="searchbar">
                        <form method="GET" className="searchform">
                            <input type="text" name="search" placeholder="Enter City Name or Zipcode" />
                            <button className="searchbtn" type="submit">Search</button>
                        </form>
                    </div>
                </div>
                <div className="emptyspace"></div>
            </div>
            <div className="choose">
                <div className="circle">
                    <h1>3</h1>
                </div>
                <div className="restaurants">
                    <h1>Choose Your Restaurants</h1>
                    <div className="apibox">
                        RESTAURANTS HERE
                    </div>
                    <button>Send EatVite!</button>
                </div>
                <div className="emptyspace"></div>
            </div>
        </div>

    )
}

export default Addevent;