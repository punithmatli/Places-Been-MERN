const uuid = require('uuid')

const HttpError = require('../models/http-error')

let DUMMY_PLACES = [
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

const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const places = DUMMY_PLACES.filter(u => {
        return u.creator === userId;
    })

    if (!places || places.length === 0) {
        return next(new HttpError('Could not find places for the provided user id', 404));
    }

    res.json({ places });
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

const updatePlace = (req, res, next) => {
    const placeId = req.params.pid;
    const { title, description } = req.body;

    const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) }
    const placeIndex = DUMMY_PLACES.find(p => p.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({ place: updatedPlace });
}

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
    res.status(200).json({ message: "Deleted Place" })
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;