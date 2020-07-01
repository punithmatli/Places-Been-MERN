import React from 'react';

import PlaceList from '../components/PlaceList'

const DUMMY_PLACES = [
    {
        id:'p1',
        title:'Empire State Building',
        description:'One of the most famous sky scrapers in the world',
        imageUrl:'https://untappedcities.com/wp-content/uploads/2015/07/Flatiron-Building-Secrets-Roof-Basement-Elevator-Sonny-Atis-GFP-NYC_5.jpg',
        address:'20 W 34th St, New York, NY 10001, United States',
        location:{
           lat: 40.7484405,
           lng: -73.9856644
        },
        creator:'u1'
    },
    {
        id:'p2',
        title:'Empire State Building',
        description:'One of the most famous sky scrapers in the world',
        imageUrl:'https://untappedcities.com/wp-content/uploads/2015/07/Flatiron-Building-Secrets-Roof-Basement-Elevator-Sonny-Atis-GFP-NYC_5.jpg',
        address:'20 W 34th St, New York, NY 10001, United States',
        location:{
           lat: 40.7484405,
           lng: -73.9856644
        },
        creator:'u2'
    }
]

const UserPlaces = () => {
    return <PlaceList items={DUMMY_PLACES} />
}

export default UserPlaces