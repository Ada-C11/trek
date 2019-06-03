let tripData = {};

const displayStatus = (message) => {
    $('#status').html(message);
  }
  
const handleApiError = (error) => {
console.log(error);
// TODO: politely report this error to the user
}

const loadTrips = () => {
displayStatus("loading trips...");
(async () => {
    const response = await axios.get('https://trektravel.herokuapp.com/trips');
    $("#trip-list")[0].innerHTML = getAlltrips(response.data);
    displayStatus("");
    })();
}

const showTripDetails = (trip) => {
console.log("showing details for trip", trip);

// TODO: Wave 2
// display trip details and the trip reservation form
}

const reserveTrip = (trip) => {
console.log("reserving trip", trip)

// TODO: Wave 2
// reserve a spot on the trip when the form is submitted
}

$(document).ready(() => {
    $('#load-trips').click(loadTrips);
});

function getAlltrips(data) {
    tripData = data;
    let output = '<h4>All Trips</h4>';
    data.forEach(function(trip){
        output += '<div>' + trip.name + '</div>';
    });
    return output;
}