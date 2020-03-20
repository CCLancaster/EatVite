import React, { useState, useEffect } from 'react'
import Redirect from 'react-router-dom'

function Addevent(props) {
     // Declare and initialize state variables
     let [title, setTitle] = useState('')
     let [date, setDate] = useState('')
     let [time, setTime] = useState('')
     let [friend, setFriend] = useState('')
     let [search, setSearch] = useState('')
     let [restaurants, setRestaurants] = useState([])
     let [message, setMessage] = useState('')
         
     useEffect(() => {
         setMessage("")
     }, [title, date, time, friend, search, restaurants] )
 
     //event for the first "submit" to add information in the top form to table/schema  
     const handleDetailSubmit = e => {
         e.preventDefault()
         // TODO: Send the user event detals to the server
         fetch(`${process.env.REACT_APP_SERVER_URL}/auth/addevent`, {
         method: 'POST',
         body: JSON.stringify({
             title,
             date,
             time,
             friend
         }),
         headers: {
             'Content-Type': 'application/json'
         }
         })
         .then(response => {
         if (!response.ok) {
             console.log(response);
             setMessage(`${response.status}: ${response.statusText}`);
             return;
         }
 
        //  // if user signed up successfully
        //  response.json().then(result => {
        //      props.updateUser(result.token);
        //  })
 
         })     
     }
 
     const handleSearchSubmit = e => {
        e.preventDefault()
        fetch(`${process.env.REACT_APP_SERVER_URL}/auth/chooser`, {
            method: 'GET',
            body: JSON.stringify({
                search
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                console.log(response);
                setMessage(`${response.status}: ${response.statusText}`);
                return;
            }


     }
    //  if (props.user) {
    //      return <Redirect to="/profile" />
    //  }

    return (
        <div className="addevent">
            <div className="add">
                <h1 className="headtitle">Create Your EatVite</h1>
                <form method="POST" className="eatform" onSubmit={handleDetailSubmit}>
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