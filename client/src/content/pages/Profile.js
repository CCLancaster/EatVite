import React from "react";
import { BrowserRouter as Router, Link, Route, NavLink, Redirect } from "react-router-dom"
import Addevent from "./Addevent";

function Profile(props) {
    return (
        <div className="profile">
            <div className="friendlist">
                <div className="friendtitle">
                    <h2>Friends</h2>
                </div>
                <div className="profilecontent">
                    <h4>BACKEND CONTENT</h4>
                </div>
                <div className="popupcontainer">
                    <div>
	                    <button className="profilebtns"><a href="#popup1">Add A Friend</a></button>
                    </div>

                    <div id="popup1" className="overlay">
	                    <div className="popup">
		                    <h2>Add A Friend</h2>
		                    <a className="close" href="#">&times;</a>
		                    <div className="content">
			                    <form className="friendform" method="POST">
                                    <input type="text" name="name" placeholder="Name" />
                                    <input type="text" name="email" placeholder="Email" />
                                    <button type="submit">Submit</button>
                                </form>
		                    </div>
	                </div>
                </div>
                </div>


            </div>
            <div className="events">
                <div className="eventtitle">
                    <h2>Events</h2>
                </div>
                <div className="profilecontent">
                    <h4>BACKEND CONTENT</h4>
                </div>
                <div>


                    <button className="profilebtns"><NavLink to="/addevent">Add An Event</NavLink></button>
                </div>
            </div>
>>>>>>> 2ed4c2fde0fa085fc56af1f748ebf193bfaeed2c
        </div>
    )
}

export default Profile;