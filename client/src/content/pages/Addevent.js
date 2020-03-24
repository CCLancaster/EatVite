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
     let [chosenRestaurants, setChosenRestaurants] = useState([])
     let [message, setMessage] = useState('')
     let [showForms, setShowForms] = useState(false)
     let [event, setEvent] = useState({})
         
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
             attendees: friend ? [friend, props.user._id] : [props.user._id]
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
            } else {
                response.json().then(result=>{
                    console.log(result)
                    setEvent(result)
                })
                setShowForms(true)
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
                
                setRestaurants(data.restaurant.map(resties=>{
                    return {
                        name: resties.name,
                        rating: resties.rating,
                        style: resties.categories[0].title,
                        address: resties.location.display_address.join('\n'),
                        price: resties.price,
                        url: resties.url,
                        phone: resties.phone,
                        image_url: resties.image_url
                    }
                }))
            })
        .catch(err=>{
            console.log(err)
        });
     }

     // select restaurants and push them into the restaurant array in Event schema
     const handleRestaurantSubmit = (e, newRestaurant) => {
        e.preventDefault()
        console.log(event)
        setChosenRestaurants([...chosenRestaurants, newRestaurant])
        fetch(`${process.env.REACT_APP_SERVER_URL}/eat/event/${event._id}`, {
            method: 'PUT',
            body:JSON.stringify({ restaurant: newRestaurant }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('mernToken')}`,
            }
        })
        .then(response => {
            if (!response.ok) {
                console.log(response);
                return;
            }
        })
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
                    <h5>{restaurant.style}</h5>
                    <h5>Rating: {restaurant.rating}</h5>
                    <h5>Price: {restaurant.price}</h5>
                
                    <p>{restaurant.address}</p>
                    <button disabled={chosenRestaurants.find(chosenRest=>chosenRest.name === restaurant.name) ? true : false} type="submit" onClick={(e) => {handleRestaurantSubmit(e, restaurant);}} >Add To List</button>
                </div>
            </div>
            <hr/>
        </div>
  ))

  if (!props.user) return <Redirect to="/" />

    return (
        <div className="addevent">
            <div className="add">
                <h1 className="headtitle">Create Your EatVite</h1>
                <form method="POST" className="eatform" onSubmit={handleDetailSubmit}>
                    <input type="text" name="title" placeholder="Title" onChange={e => setTitle(e.target.value)}/>
                    <input type="text" name="date" placeholder="mm/dd" onChange={e => setDate(e.target.value)}/>
                    <input type="text" name="time" placeholder="Time" onChange={e => setTime(e.target.value)}/>
                    <select name="friend" onChange={e => setFriend(e.target.value)} >
                        <option default value=''>Select A Friend</option>
                        {props.user.friends.map(friend=><option value={friend._id}>{friend.firstname}</option>)}
                    </select>
                    <button type="submit"> Next Step</button>
                </form>
            </div>
            <div className={`search ${showForms ? '' : 'hidden'}`}>
                <h1 className="headtitle">Where Do You Want To Eat?</h1>
                <form method="GET" className="searchform" onSubmit={handleSearchSubmit}>
                    <input type="text" name="search" id="search" onChange={e => setSearch(e.target.value)} placeholder="Enter City Name or Zipcode" />
                    <button type="submit">Search</button>
                </form>
            </div>
            <div className={`choose ${showForms ? '' : 'hidden'}`}>
                <h1 className="headtitle">Choose Your Restaurants</h1>
                <div className="apibox">

                    <div className="restaurantform" >
                        {restaurantList}
                    </div>
                </div>
                <button type="submit">Send EatVite!</button>
            </div>
        </div>

    )
}

export default Addevent;