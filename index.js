const BASEURL = "https://trektravel.herokuapp.com/trips";

const reportStatus = (message) => {
    $('#status-message').html(message);
};

const handleApiError = (error) => {
    console.log(error);
    // TODO: politely report this error to the user
};

// send GET request
// data comes back, store in an object
// loop through the object and display each item on the page

let allTrips;

const loadTrips = () => {
    reportStatus('Loading trips ...');
    const listOfTrips = $('#list-of-trips');
    listOfTrips.empty();

    axios.get(BASEURL)
    .then((response) => {
        reportStatus(`There are ${response.data.length} trips available.`);
        allTrips = response.data;

        $('thead').html('<tr><td><h2>AVAILABLE TRIPS</h2></td></tr>')

        response.data.forEach((trip) => {
            listOfTrips.append(`<tr id=${trip.id}><td>${trip.name}</td></tr>`);

            $(`#${trip.id}`).bind('click', {thisTrip:trip}, function(event){
              // {trip:trip} becomes available as event.data
                // console.log(event);
                // console.log("******* trip is: ********");
                // console.log(event.data.trip);
                // console.log('***********trip***********');

                const trip = event.data.thisTrip;
                $("#trip-details").empty();
                $("#trip-details").append(`<h2>${trip.name}</h2>`);
                $("#trip-details").append(`<p>ID: ${trip.id}</p>`);
                $("#trip-details").append(`<p>Continent: ${trip.continent}</p>`);
                $("#trip-details").append(`<p>Category: ${trip.category}</p>`);
                $("#trip-details").append(`<p>${trip.weeks} weeks</p>`);
                $("#trip-details").append(`<p>Summary: ${trip.about} </p>`);
                $("#trip-details").append(`<p>Price: $${trip.cost} </p>`);
            });

        });//END Each loop

    })
    .catch((error) => {
        reportStatus(`Error loading trips: ${error.message}`);
        console.log(error);
    });
};


const reserveTrip = (trip) => {
    console.log("reserving trip", trip)

    // TODO: Wave 3
    // reserve a spot on the trip when the form is submitted
};


$(document).ready(() => {
    $('#btn-show-trips').click(loadTrips);
});
