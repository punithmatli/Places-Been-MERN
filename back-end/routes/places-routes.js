const express = require('express');

const router = express.Router();

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world',
        imageUrl: 'https://untappedcities.com/wp-content/uploads/2015/07/Flatiron-Building-Secrets-Roof-Basement-Elevator-Sonny-Atis-GFP-NYC_5.jpg',
        address: '20 W 34th St, New York, NY 10001, United States',
        location: {
            lat: 40.7484405,
            lng: -73.9856644
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Charminar',
        description: 'One of the most famous monuments in India',
        imageUrl: 'https://i2.wp.com/natureconservation.in/wp-content/uploads/2018/03/95.jpg',
        address: 'Hyderabad, India',
        location: {
            lat: 17.3615636,
            lng: 78.4746645
        },
        creator: 'u1'
    }
]

router.get('/:pid', (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId
    })
    res.json({ place });
})

router.get('/user/:uid', (req, res, next) => {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(u => {
        return u.creator === userId;
    })
    res.json({place})
})

module.exports = router;