const BASEURL = "https://trektravel.herokuapp.com/trips";

const reportStatus = (message) => {
    $('#status-message').html(message);
};

const handleApiError = (error) => {
    console.log(error);
    // TODO: politely report this error to the user
  }

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
            listOfTrips.append(`<tr><td>${trip.name}</td></tr>`);
            // give an id

        });
    })
    .catch((error) => {
        reportStatus(`Error loading trips: ${error.message}`);
        console.log(error);
    });
};

// const showTripDetails = (thisTrip) => {
//     console.log('Trip info: ', thisTrip);
//     // let trip = {};
//     return(tripDetails) => {
//         thisTrip = listOfTrips[0];
//         $(tripDetails.target).html(`<p>${thisTrip.name}</p>`)
//         // $(trip-details-area).append(`<p>${}</p>`)

//     // ...how showTripDetails knows what trip was clicked
//     // ...either attach it to the HTML (simpler) or use a closure (preferred)

    
//     }
// // also display reservation form
// };

const tripDetailsTest = () => {
    thisTrip = listOfTrips[0];
    $('#trip-details-area').html(`<p>${thisTrip.name}</p>`)
};

const reserveTrip = (trip) => {
    console.log("reserving trip", trip)
  
    // TODO: Wave 3
    // reserve a spot on the trip when the form is submitted
};

$(document).ready(() => {
    $('#btn-show-trips').click(loadTrips);
    // let thisTrip = $('#list-of-trips tr td').each(function () {
    //     $(this).click(showTripDetails(thisTrip));
    // });
    $('#listOfTrips').on('click', 'td', tripDetailsTest);
    // $('#listOfTrips tr td').on('click-row.bs.table', function (e, row, $element) {
    //     window.location = $element.data('href');
    // });
    // $('*[data-href]').on('click', function() {
    //     window.location = $(this).data("href");
    // });
    
});

