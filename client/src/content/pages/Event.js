import React, { useState } from 'react';

function Event(props) {

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

    const handleRestaurantSubmit = e => {
        e.preventDefault()
    }

    let restaurantList = restaurants.length < 1 ? 
        <h3>There are no restaurants to show!</h3> : 
        restaurants.map((restaurant, i) => (
        <div key={`restaruantListItem-${i}`}>
        <img src={restaurant.img} />
        <h4><Link to={`${restaurant.url}`}>{restaurant.name}</Link></h4>
        <h5>{restaurant.rating}, {restaurant.price}</h5>
        <h5>{restaurant.style}</h5>
        <h5>{restaurant.address.street}</h5>
        <h5>{restaurant.address.city}, {restaurant.address.state} {restaurant.address.zipcode}</h5>
        <button type="submit">Let's Eat!</button>
        </div>
        ))

    return(
        <div className="event">
            <div className="invitation">
                <h1 className="headtitle">You've Got An EatVite!</h1>
                <h3>Title: 'Ex. Girl's Night Out!'
                </h3>
                <div className="inline">
                <h3>Date: {event.date}</h3>
                <h3>Time: {event.time}</h3>
                </div>
                <h3>From:</h3>
            </div>
    
            <form method="POST" className="eventrestaurants" onSubmit={handleRestaurantSubmit}>
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