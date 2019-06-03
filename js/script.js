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
    $('#trip-list div').bind("click", showTripDetails);
    })();
}

const showTripDetails = (trip) => {
const tripName = trip.currentTarget.textContent;
const selectedTrip = tripData.filter(o => o.name === tripName);
if (selectedTrip && selectedTrip.length > 0) {
    const tripId = selectedTrip[0].id;
    displayStatus("loading trips...");
    (async () => {
        const response = await axios.get('https://trektravel.herokuapp.com/trips/' + tripId);
        $("#trip-details")[0].innerHTML = getTripDetails(response.data);
        displayStatus("");
        })();
}
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

function getTripDetails(data) {
    let output = '<h4>Trip Details</h4>' +
                '<div><label>Name: </label>' + data.name +'</div>' +
                '<div><label>Continent: </label>' + data.continent +'</div>' + 
                '<div><label>Category: </label>' + data.category +'</div>' + 
                '<div><label>Weeks: </label>' + data.weeks +'</div>' + 
                '<div><label>Cost: </label>' + data.cost +'</div>' + 
                '<div><label>About: </label><br>' + data.about + '</br></div>';
    
    return output;
}