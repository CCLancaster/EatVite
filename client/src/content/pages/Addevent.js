import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'

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
         fetch(`${process.env.REACT_APP_SERVER_URL}/eat/addevent`, {
         method: 'POST',
         body: JSON.stringify({
             title,
             date,
             time,
             friend
         }),
         headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${localStorage.getItem('mernToken')}`,
         }
         })
         .then(response => {
         if (!response.ok) {
             console.log(response);
             setMessage(`${response.status}: ${response.statusText}`);
             return;
         }
 
         })     
     }
     // call to API to get our restaurant selections based on the search criteria 
     const handleSearchSubmit = e => {
        e.preventDefault()
        fetch(`${process.env.REACT_APP_SERVER_URL}/eat/chooser`, {
            method: 'POST',
            body: JSON.stringify({
                search
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
            // map through data.restaurant for the deets
            setRestaurants(data.restaurant)
            })
        .catch(err=>{
            console.log(err)
        });
     }

     // select restaurants and push them into the restaurant array in Event schema
     const handleRestaurantSubmit = e => {
         e.preventDefault()
     }
     
     
     console.log(restaurants);
     let restaurantList = restaurants.length < 1 ? 
        <h3>There are no restaurants to show! Try a different search criteria.</h3> : 
        restaurants.map((restaurant, i) => (
        <div key={`restaruantListItem-${i}`}>
            <div className="apideetcontainer">
                <div className="boxes">
                    <img src={restaurant.image_url} className="apiimg" />
                </div>
                <div className="boxes">
                    <h2><a href={restaurant.url}>{restaurant.name}</a></h2>
                    <h5>{restaurant.categories[0].title}</h5>
                    <h5>Rating: {restaurant.rating}</h5>
                    <h5>Price: {restaurant.price}</h5>
                
                    {restaurant.location.display_address.map(addressLine => <p>{addressLine}</p>)}
                    <button type="submit">Add To List</button>
                </div>
            </div>
            <hr></hr>
        </div>
  ))

  if (!props.user) return <Redirect to='/' />

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
                <form method="GET" className="searchform" onSubmit={handleSearchSubmit}>
                    <input type="text" name="search" id="search" onChange={e => setSearch(e.target.value)} placeholder="Enter City Name or Zipcode" />
                    <button type="submit">Search</button>
                </form>
            </div>
            <div className="choose">
                <h1 className="headtitle">Choose Your Restaurants</h1>
                <div className="apibox">

                    <form method="POST" className="restaurantform" onSubmit={handleRestaurantSubmit} >
                        {restaurantList}
                    </form>
                </div>
                <button type="submit">Send EatVite!</button>
            </div>
        </div>

    )
}

export default Addevent;