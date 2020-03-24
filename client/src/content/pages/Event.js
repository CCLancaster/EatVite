import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

function Event(props) {
    let {id} = useParams()
    let [event, setEvent] = useState({})
    let [restaurants, setRestaurants] = useState([])
    let [error, setError] = useState(null)

    //fetch the Event information from our Event schema
    useEffect(() => {
        console.log(id)
        fetch(`${process.env.REACT_APP_SERVER_URL}/eat/event/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('mernToken')}`,
            }
        })
        .then(response => {
            if (!response.ok) {
                console.log(response);
                return
            } else {
                response.json().then(result=>{
                    console.log(result)
                    setEvent(result)
                // setEvent(response.map(event => {
                //     return {
                //         title: event.title,
                //         date: event.date,
                //         time: event.time,
                //         attendees: event.attendees.join(', ')
                //     }
                // }))
                // setRestaurants(event.restaurants.map(resties=>{
                //     return {
                //         name: resties.name,
                //         rating: resties.rating,
                //         style: resties.categories[0].title,
                //         address: resties.location.display_address.join('\n'),
                //         price: resties.price,
                //         url: resties.url,
                //         phone: resties.phone,
                //         image_url: resties.image_url
                //     }
                // }))
                console.log(`this is the event: ${event}`)
                console.log(event)
                console.log(`these are the restaurants: ${event.restaurants}`)
            })
            }
        })
        .catch(err => {
            console.log(err)
        })
    }, []);

    const handleRestaurantSubmit = (e, finalRestaurant) => {
        e.preventDefault()
        setRestaurants([finalRestaurant])
        console.log("**********BUTTS**************")
        console.log(event) 
        fetch(`${process.env.REACT_APP_SERVER_URL}/eat/event/one/${event._id}`, {
            method: 'PUT',
            body:JSON.stringify({ restaurant: finalRestaurant }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('mernToken')}`,
            }
        })
        .then(response => {
            if (!response.ok) {
                console.log(response);
                return;
            } else {
                return <Redirect to='/' />
            }
        })
        
    }

    let restaurantList = !event.restaurants || event.restaurants.length < 1 ? 
        <h3>There are no restaurants to show!</h3> : 
        event.restaurants.map((restaurant, i) => (
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
                <button type="submit" onClick={(e) => {handleRestaurantSubmit(e, restaurant);}}>Let's Eat!</button>
            </div>
            </div>
        </div>
        ))
        if (!props.user) return <Redirect to='/' />

    return(
        <div className="event">
            <div className="invitation">
                <h1 className="headtitle">You've Got An EatVite!</h1>
                <h2>{event.title}</h2>
                <div className="inline">
                    <h3>Date: {event.date}</h3>
                    <h3>Time: {event.time}</h3>
                </div>
                <h3>Attendees: </h3><p> {event.attendees} </p>)}
            </div>
    
            <div className="restaurantform" >
                <div className="resoptions">
                    <h1 className="headtitle">Pick ONE restaurant from the list below!</h1>
                        <div>
                            {restaurantList}
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Event;