const axios = require('axios');
const tripAPI = "https://trektravel.herokuapp.com/trips";

const displayTripList = (tripList) => {
    const target = $('#trip-list');
    target.empty();
    let i = 1;
    tripList.forEach(trip => {
        target.append(`<button id="trip-${trip.id}">${trip.name}</button>`);
        i += 1;
    });
}

const loadTrips = () => {
    axios.get(tripAPI)
        .then((response) => {
            const trips = response.data;
            displayTripList(trips);
        })
        .catch((error) => {
            // Display something to the user
        })
}

const displayOneTripList = (trip) => {
    const target = $('#trip-details');
    target.empty();
    target.append(`<section id="trip-name">Name: ${trip.name}</section> <section id="trip-continent">Continent: ${trip.continent}</section> <section id="trip-category">Category: ${trip.category}</section> <section id="trip-weeks">Category: ${trip.weeks}</section><section id="trip-category">Category: ${trip.cost}</section>`);
};


const loadOneTrip = (tripID) => {
    axios.get(`${tripAPI}/${tripID}`)
        .then((response) => {
            const trip = response.data;
            displayOneTripList(trip);
        })
        .catch((error) => {
            // Display something to the user
        })
}

// As a user on the home page, after I've selected a specific trip, I want to see a form I can use to fill out details, so that I can submit a reservation to this trip
// As a user on the home page, after I've selected a specific trip, I want to use the form to fill out the following details, so that I can submit my information with this reservation:
// name
// email

const reservationForm = (tripID) => {

}

const createReservation = (event) => {

}

const displayTripReservation = (tripID) => {
    const target = $('#trip-reservation-form');
    target.empty();
    target.append(``);
};


$(document).ready(() => {
    $('#trip-list-button').on('click', loadTrips);
    const liList = $("#trip-list").getElementsByTagName("button");
    const numberofTrips = liList.length
    for (let i = 70; i <= numberofTrips; i += 1) {
        const tripElement = `#trip-${i}`;
        const tripID = `${i}`
        $(tripElement).click(loadOneTrip(tripID));
    }
    for (let i = 70; i <= numberofTrips; i += 1) {
        const tripElement = `#trip-${i}`;
        const tripID = `${i}`
        $(tripElement).click(displayTripReservation(tripID));
    }
    $('#trip-reservation-form').submit(createReservation);
});