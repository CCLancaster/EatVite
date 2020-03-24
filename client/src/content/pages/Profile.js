import React, { useState, useReducer, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, NavLink, Redirect } from "react-router-dom"
import Addevent from "./Addevent";

function Profile(props) {
    let [friendName, setFriendName] = useState('')
     let [friendEmail, setFriendEmail] = useState('')
     let [friendPhone, setFriendPhone] = useState('')
     let [friendList, setFriendList] = useState([])
     let [eventList, setEventList] = useState([])
     let [error, setError] = useState(null)

     useEffect(() => {
         console.log(props.user)
        // fetch(`${process.env.REACT_APP_SERVER_URL}/eat/profile`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${localStorage.getItem('mernToken')}`,
        //     }
        // })
        // .then(response => {
        //     console.log(response)
        //   if (response.data) {
        //       console.log('--------------------------farts---------------------')
        //     setError(response.data.message)
        //     console.log(response.data.err)
        //   } else {
        //     setFriendList(response.data)
        //     setEventList(response.data)
        //     console.log(response.data)
        //   }
        // }).catch(err=>{
        //   setError(err.message)
        //   console.log(err)
        // });
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

    let friendsNamesList = props.user.friends.length < 1 ?
    <h3>you have no friends!</h3> :
    props.user.friends.map((friend, i) => {
        console.log(friend)

        return (
        <div className="itemlist" key={`friendListitem-${i}`}>
            <h3>{friend.firstname}</h3>
        </div>)
    })

    let myEventsList = props.user.events.length < 1 ?
    <h3>you have no events!</h3> :
    props.user.events.map((event, i) => {
        console.log(event._id)

        return (
        <div className="itemlist" key={`eventListitem-${i}`}>
            <button className="itemsbtn" type="submit"><Link to={`/eat/event/${event._id}`} >
                <h3>{event.title}</h3>
             <h5>Time: {event.time}</h5>
             <h5>Date: {event.date}</h5>
             <h5>{event.attendees[0].firstname}, {event.attendees[1].firstname}</h5>
             {event.restauants && event.restauants.length === 1 ? <h5>{event.restaurants[0]}</h5> : <h5>Choose your Restaurant</h5>}
             </Link></button>
             
        </div>)
    })
            

    return (
        <div className="profile">
            <div className="friendlist">
                <div>
                    <h1 className="headtitle">Friends</h1>
                </div>
                <div className="profilecontent">
                    {friendsNamesList}
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
                    {myEventsList}
                </div>
                <div>


                    <button className="profilebtns"><NavLink to="/eat/addevent">Add An Event</NavLink></button>
                </div>
            </div>
        </div>
    )
}

export default Profile;