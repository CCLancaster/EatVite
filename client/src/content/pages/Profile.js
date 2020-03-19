import React from 'react';

function Profile(props) {
    return (
        <div className="profile">
            <div className='friendlist'>
                <div className='headtitle'>
                    <h2>Friends</h2>
                </div>

                <div className='popupcontainer'>
                    <div className="box">
	                    <a className="button" href="#popup1">Add A Friend</a>
                    </div>

                    <div id="popup1" className="overlay">
	                    <div className="popup">
		                    <h2>Add A Friend</h2>
		                    <a className="close" href="#">&times;</a>
		                    <div className="content">
			                    <form className='friendform' method='POST'>
                                    <input type='text' name='name' placeholder='Name' />
                                    <input type='text' name='email' placeholder='Email' />
                                    <button type='submit'>Submit</button>
                                </form>
		                    </div>
	                </div>
                </div>
                </div>


            </div>
            <div className='events'>
                <div className='headtitle'>
                    <h2>Events</h2>
                </div>
                <div>
    
                </div>
                <div>
    
                </div>
            </div>
        </div>
    )
}

export default Profile;