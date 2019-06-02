const BASEURL = "https://trektravel.herokuapp.com/trips";

const reportStatus = (message) => {
    $('#status-message').html(message);
};

// send GET request
// data comes back, store in an object
// loop through the object and display each item on the page
// let allTrips;

const loadTrips = () => {
    reportStatus('Loading trips ...');
    const listOfTrips = $('#list-of-trips');
    listOfTrips.empty();
    axios.get(BASEURL)
    .then((response) => {
        reportStatus(`There are ${response.data.length} trips available.`);
        allTrips = response.data;
        
        // $('thead').append('<tr>AVAILABLE TRIPS</tr>')

        response.data.forEach((trip) => {
            listOfTrips.append(`<tr><td>${trip.name}</td></tr>`);
        });
    })
    .catch((error) => {
        reportStatus(`Error loading trips: ${error.message}`);
        console.log(error);
    });
};

const showTripDetails = function(event) {
    $(trip-details-area).append(`<p>A tr was clicked.</p>`)
}

$(document).ready(() => {
    $('#btn-show-trips').click(loadTrips);
    $('#list-of-trips').on('click', 'tr', showTripDetails)
});