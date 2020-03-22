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
         fetch(`${process.env.REACT_APP_SERVER_URL}/eat/addevent`, {
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
        fetch(`${process.env.REACT_APP_SERVER_URL}/eat/chooser`, {
            method: 'POST',
            body: JSON.stringify({
                search
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            console.log(`${response}`)
            return response.json()
            }).then((data) => {
            console.log(data)
            setRestaurants(data)
            // {
            // img: data.restaurant.image_url,
            // name: data.restaurant.name,
            // rating: data.restaurant.rating,
            // style: data.restaurant.categories.title,
            // address: {
            //     street: data.restaurant.location.address1,
            //     city: data.restaurant.location.city,
            //     state: data.restaurant.location.state,
            //     zipcode: data.restaurant.location.zip_code
            // },
            // price: data.restaurant.price,
            // url: data.restaurant.url
            // })
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
                    <input type="text" name="search" id="search" onChange={e => setSearch(e.target.value)} placeholder="Enter City Name or Zipcode" />
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