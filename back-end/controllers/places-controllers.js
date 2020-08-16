const uuid = require('uuid')
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place')

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

const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid;
    let place;
    try {
        place = await Place.findById(placeId); //findBYId() does not return a promise but we can make it return one by writing it as findById().exec()
    } catch (err) {
        const error = new HttpError('Something went wrong, Could not find a place', 500);
        return next(error);
    }

    if (!place) {
        const error = new HttpError('Could not find a place for the provided id', 404);
        return next(error);
    }

    res.json({ place: place.toObject({ getters: true }) });
}

const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let places;
    try {
        places = await Place.find({ creator: userId });
    } catch (err) {
        const error = new HttpError(
            'Fetching places failed, Try again.',
            500
        )
        return next(error);
    }

    if (!places || places.length === 0) {
        return next(new HttpError('Could not find places for the provided user id', 404));
    }

    res.json({ places: places.map(place => place.toObject({ getters: true })) });
}

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed. Please check your data.', 422))
    }

    const { title, description, address, creator } = req.body

    let coordinates;
    try {
        coordinates = await getCoordsForAddress(address)
    } catch (error) {
        return next(error);
    }

    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: 'https://untappedcities.com/wp-content/uploads/2015/07/Flatiron-Building-Secrets-Roof-Basement-Elevator-Sonny-Atis-GFP-NYC_5.jpg',
        creator
    });

    try {
        await createdPlace.save()
    } catch (err) {
        const error = new HttpError('Creating Place failed. Please try again', 500);
        return next(error);
    }

    res.status(201).json({ place: createdPlace });
}

const updatePlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed. Please check your data.', 422)
        )
    }

    const placeId = req.params.pid;
    const { title, description } = req.body;

    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update place.',
            500
        )
        return next(error)
    }

    place.title = title;
    place.description = description;

    try {
        await place.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update place.', 500
        )
        return next(error);
    }

    res.status(200).json({ place: place.toObject({ getters: true }) });
}

const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete place.',
            500
        );
        return next(error);
    }

    try {
        await place.remove();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete place.',
            500
        );
        return next(error);
    }

    res.status(200).json({ message: "Deleted Place" })
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;