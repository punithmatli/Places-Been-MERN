const uuid = require('uuid')

const HttpError = require('../models/http-error')

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

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId
    })

    if (!place) {
        throw new HttpError('Could not find a place for the provided id', 404);
    }

    res.json({ place });
}

const getPlaceByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(u => {
        return u.creator === userId;
    })

    if (!place) {
        return next(new HttpError('Could not find a place for the provided user id', 404));
    }

    res.json({ place });
}

const createPlace = (req, res, next) => {
    const { title, description, coordinates, address, creator } = req.body
    const createdPlace = {
        id: uuid.v4(),
        title,
        description,
        location: coordinates,
        address,
        creator
    }

    DUMMY_PLACES.push(createdPlace);

    res.status(201).json({ place: createdPlace });
}

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;