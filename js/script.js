let tripData = {};
let selectedTrip = null;

const displayStatus = (message) => {
    $('#status').html(message);
  }
  
const handleApiError = (error) => {
    displayStatus(error);
}

const loadTrips = () => {
displayStatus("loading trips...");
(async () => {
    const response = await axios.get('https://trektravel.herokuapp.com/trips');
    $("#trip-list")[0].innerHTML = getAlltrips(response.data);
    displayStatus("");
    $('#trip-list div').bind("click", showTripDetails);
    })().catch(function(error) {
        handleApiError("There is an issue while pulling the trip information");
    });
}

const showTripDetails = (trip) => {
const tripName = trip.currentTarget.textContent;
selectedTrip = tripData.filter(o => o.name === tripName);
    if (selectedTrip && selectedTrip.length > 0) {
        const tripId = selectedTrip[0].id;
        displayStatus("loading trips...");
        (async () => {
            const response = await axios.get('https://trektravel.herokuapp.com/trips/' + tripId);
            $("#trip-details")[0].innerHTML = getTripDetails(response.data);
            displayStatus("");
            $('#reserve-trip').show();
            })().catch(function(error) {
                handleApiError("There is an issue while pulling the trip's details");
            });
    }
}

const reserveTrip = () => {
    if (selectedTrip && selectedTrip.length > 0) {
        const name = $("#txtName");
        const email = $("#txtEmail");
        const tripId = selectedTrip[0].id;
        if (validateData(name.val()) && validateData(email.val())) {
            const newReservedData = {
                name: name.val(),
                email: email.val()
              }
            displayStatus("loading...");
            (async () => {
                await axios.post('https://trektravel.herokuapp.com/trips/'+ tripId +'/reservations', newReservedData);
                displayStatus("The trip is reserved");
                name.val('');
                email.val('');
                })().catch(function (error) {
                    handleApiError('There is an issue while creating a new reservation');
                });
        }
    }
}

const validateData = (data) => {
    if (!data || data === '') {
        handleApiError("Name or email is not correct");
        return false;
    }
    return true;
}

$(document).ready(() => {
    $('#load-trips').click(loadTrips);
    $('#reserve-trip-button').click(reserveTrip);
    $('#reserve-trip').hide();
});

const getAlltrips = (data) => {
    tripData = data;
    let output = '<h4>All Trips</h4>';
    data.forEach(function(trip){
        output += '<div>' + trip.name + '</div>';
    });
    return output;
}

const getTripDetails = (data) => {
    let output = '<h4>Trip Details</h4>' +
                '<div><label>Name: </label>' + data.name +'</div>' +
                '<div><label>Continent: </label>' + data.continent +'</div>' + 
                '<div><label>Category: </label>' + data.category +'</div>' + 
                '<div><label>Weeks: </label>' + data.weeks +'</div>' + 
                '<div><label>Cost: </label>' + data.cost +'</div>' + 
                '<div><label>About: </label><br>' + data.about + '</br></div>';
    
    return output;
}