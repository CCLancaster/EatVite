import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'

function Addevent(props) {
     // Declare and initialize state variables
     let [title, setTitle] = useState('')
     let [date, setDate] = useState('')
     let [time, setTime] = useState('')
     let [friend, setFriend] = useState('')
     let [search, setSearch] = useState('')
     let [restaurants, setRestaurants] = useState([{
        img: '',
        name: '',
        rating: '',
        style: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipcode: ''
        },
        price: '',
        url: ''
     }])
     let [message, setMessage] = useState('')
         
     useEffect(() => {
         setMessage("")
     }, [title, date, time, friend, search, restaurants] )
 
     //event for the first "submit" to add information in the top form to table/schema  
     const handleDetailSubmit = e => {
         e.preventDefault()
         // TODO: Send the user event detals to the server
         fetch(`${process.env.REACT_APP_SERVER_URL}/addevent`, {
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
 
         })     
     }
     // call to API to get our restaurant selections based on the search criteria 
     const handleSearchSubmit = e => {
        e.preventDefault()
        fetch(`${process.env.REACT_APP_SERVER_URL}/chooser`, {
            method: 'GET',
            // body: JSON.stringify({
            //     search
            // }),
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response) {
            console.log(`No response: ${response}`)
            } else {
            console.log(response)
            setRestaurants({
            img: response.restaurant.image_url,
            name: response.restaurant.name,
            rating: response.restaurant.rating,
            style: response.restaurant.categories.title,
            address: {
                street: response.restaurant.location.address1,
                city: response.restaurant.location.city,
                state: response.restaurant.location.state,
                zipcode: response.restaurant.location.zip_code
            },
            price: response.restaurant.price,
            url: response.restaurant.url
            })
            }
        }).catch(err=>{
            console.log(err)
        });
     }

     // select restaurants and push them into the restaurant array in Event schema
     const handleRestaurantSubmit = e => {
         e.preventDefault()
     }

     let restaurantList = restaurants.length < 1 ? 
        <h3>There are no restaurants to show! Try a different search criteria.</h3> : 
        restaurants.map((restaurant, i) => (
        <div key={`restaruantListItem-${i}`}>
        <img src={restaurant.img} />
        <h4><Link to={`${restaurant.url}`}>{restaurant.name}</Link></h4>
        <h5>{restaurant.rating}, {restaurant.price}</h5>
        <h5>{restaurant.style}</h5>
        <h5>{restaurant.address.street}</h5>
        <h5>{restaurant.address.city}, {restaurant.address.state} {restaurant.address.zipcode}</h5>
        </div>
  ))

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
                <form method="GET" className="searchform" onSubmit={handleSearchSubmit}>
                    <input type="text" name="search" placeholder="Enter City Name or Zipcode" />
                    <button type="submit">Search</button>
                </form>
            </div>
            <div className="choose">
                <h1 className="headtitle">Choose Your Restaurants</h1>
                <div className="apibox">
                    <form method="POST" className="restaurantform" onSubmit={handleRestaurantSubmit} >
                        {restaurantList}
                        <button type="submit">+</button>
                    </form>
                </div>
                <button type="submit">Send EatVite!</button>
            </div>
        </div>

    )
}

export default Addevent;