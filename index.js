const axios = require('axios');
const tripAPI = "https://trektravel.herokuapp.com/trips";

// Display code - you can think of this as the "view"
const displayTripList = (tripList) => {
    const target = $('#trip-list');
    target.empty();
    let i = 1;
    tripList.forEach(trip => {
        target.append(`<li id="trip-${i}">${trip.name}</li>`);
        i += 1;
    });
}

// Loading students is an action the user can take
// We can think of this as a "controller"
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

// const tripDetailsClickHandler = (tripId) => {
//     return () => {
//         callCount += 1;
//         console.log(`This is call number ${callCount} from ${buttonId}`);
//         $(".trip-details").html(`Click count: ${callCount}`);
//     };
// };
const displayOneTripList = (trip) => {
    const target = $('#trip-details');
    target.empty();
    target.append(`<section id="trip-name">Name: ${trip.name}</section> <section id="trip-continent">Continent: ${trip.continent}</section> <section id="trip-category"> </section> `);
    });
}

const loadOneTrip = () => {
    axios.get(`${tripAPI} + ${tripId}`)
        .then((response) => {
            const trip = response.data;
            displayOneTripList(trip);
        })
        .catch((error) => {
            // Display something to the user
        })
}

// Wait for the HTML to finish loading
$(document).ready(() => {
    // Register our event handler
    $('#trip-list-button').on('click', loadTrips);
    const liList = $("#trip-list").getElementsByTagName("li");
    const numberofTrips = liList.length
    for (let i = 1; i <= numberofTrips; i += 1) {
        const tripId = `#trip-${i}`;
        $(tripId).click(tripDetailsClickHandler(tripId));
    }
});