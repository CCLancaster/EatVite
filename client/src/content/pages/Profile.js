import React, { useState, useReducer, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, NavLink, Redirect } from "react-router-dom"
import Addevent from "./Addevent";
import axios from 'axios';

function Profile(props) {
    let [friendName, setFriendName] = useState('')
     let [friendEmail, setFriendEmail] = useState('')
     let [friendPhone, setFriendPhone] = useState('')
     let [friendList, setFriendList] = useState([])
     let [error, setError] = useState(null)

     useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/eat/profile`, {
            methos: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('mernToken')}`,
            }
        })
        .then(response => {
          if (response.data.message) {
            setError(response.data.message)
            console.log(response.data.err)
          } else {
            setFriendList(response.data)
          }
        }).catch(err=>{
          setError(err.message)
          console.log(err)
        });
    }, [])
     

     const handleFriendSubmit = e => {
        e.preventDefault()
        fetch(`${process.env.REACT_APP_SERVER_URL}/eat/addfriend`, {
            method: 'POST',
            body: JSON.stringify({
                name: friendName,
                email: friendEmail,
                phone: friendPhone,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('mernToken')}`,
            }
        })
        .then(response => {
            console.log(`${response}`)
            return response.json()
            }).then((data) => {
            console.log(data)
            })
        .catch(err=>{
            console.log(err)
        });
     }

     if (!props.user) return <Redirect to='/' />

    return (
        <div className="profile">
            <div className="friendlist">
                <div>
                    <h1 className="headtitle">Friends</h1>
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
		                    <h1>Add A Friend</h1>
		                    <a className="close" href="#">&times;</a>
		                    <div className="content">
			                    <form className="friendform" method="POST" onSubmit={handleFriendSubmit}>
                                    <input type="text" name="name" onChange={e => setFriendName(e.target.value)} placeholder="Name" />
                                    <input type="text" name="email" onChange={e => setFriendEmail(e.target.value)} placeholder="Email" />
                                    <input type="text" name="phone" onChange={e => setFriendPhone(e.target.value)} placeholder="Phone Number" />
                                    <button type="submit">Submit</button>
                                </form>
		                    </div>
	                </div>
                </div>
                </div>


            </div>
            <div className="events">
                <div>
                    <h1 className="headtitle">Events</h1>
                </div>
                <div className="profilecontent">
                    <h4>BACKEND CONTENT</h4>
                </div>
                <div>


                    <button className="profilebtns"><NavLink to="/eat/addevent">Add An Event</NavLink></button>
                </div>
            </div>
        </div>
    )
}

export default Profile;