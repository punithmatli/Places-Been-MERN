const axios = require('axios');

const HttpError = require('../models/http-error')

const API_KEY = '4a95aafdca8d46c09e7bcd8a7c161ec3'

async function getCoordsForAddress(address) {
    const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${API_KEY}`)

    const data = response.data;

    if (!data || data.total_results === 0) {
        throw new HttpError('Could not find location for the specified address.', 422)
    }

    const coordinates = data.results[0].geometry;

    return coordinates;
}

module.exports = getCoordsForAddress;