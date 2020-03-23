import React, { useState, useEffect } from 'react';

function Event(props) {

    let [event, setEvent] = useState([])
    let [restaurants, setRestaurants] = useState([])

    //fetch the Event information from our Event schema
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/eat/event/:id`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('mernToken')}`,
            }
        })
    })
    .then(event => {
        console.log(event)
        if (!event) {
            console.log("Error fetching event!")
        } else {
            setEvent(event)
            setRestaurants(event.restaurants)
        }
    })
    .catch(err => {
        console.log(err)
    });

    let handleRestaurantSubmit = (e, restaurant) => {
        e.preventDefault()
        setRestaurants([restaurant])
        fetch(`${process.env.REACT_APP_SERVER_URL}/eat/event/:id`, {
            method: 'PUT',
            body:JSON.stringify({restaurants}),
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

    let restaurantList = restaurants.length < 1 ? 
        <h3>There are no restaurants to show!</h3> : 
        restaurants.map((restaurant, i) => (
        <div key={`restaruantListItem-${i}`}>
            <div className="something">
            <div className="leftbox">
                    <img src={restaurant.image_url} className="apiimg" />
            </div>
            <div className="rightbox">
            <h2><a href={restaurant.url}>{restaurant.name}</a></h2>
                    <h5>{restaurant.categories[0].title}</h5>
                    <h5>Rating: {restaurant.rating}</h5>
                    <h5>Price: {restaurant.price}</h5>
                    {restaurant.location.display_address.map(addressLine => <p>{addressLine}</p>)}
                <button type="submit">Let's Eat!</button>
            </div>
            </div>
        </div>
        ))

    return(
        <div className="event">
            <div className="invitation">
                <h1 className="headtitle">You've Got An EatVite!</h1>
                <h2>{event.title}</h2>
                <div className="inline">
                    <h3>Date: {event.date}</h3>
                    <h3>Time: {event.time}</h3>
                </div>
                <h3>Invitees: </h3>{event.friends.map(name => <p> {name} </p>)}
            </div>
    
            <form method="POST" className="restaurantform" onSubmit={(e) => {handleRestaurantSubmit(e, restaurant);}}>
                <div className="resoptions">
                    <h1 className="headtitle">Pick ONE restaurant from the list below!</h1>
                        <div>List of chosen restaurants:
                            {restaurantList}
                        </div>
                </div>
            </form>
        </div>
    )
}

export default Event;