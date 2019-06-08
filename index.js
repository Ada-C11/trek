const BASEURL = "https://trektravel.herokuapp.com/trips";

const reportStatus = (message) => {
    $('#status-message').html(message);
};

const handleApiError = (error, customMessage) => {
    // console.log(error);
    // TODO: politely report this error to the user

    console.log(error.response);
    if (error.response.data && error.response.data.errors) {
        reportStatus(`${customMessage} Details: ${error.message}, ${error.response.data.errors}`);
      } else {
        reportStatus(`${customMessage} Details: ${error.message}`);
      }
};

// send GET request
// data comes back, store in an object
// loop through the object and display each item on the page

let allTrips; // not sure this is needed

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
                //remove class='selected' from any other table row
                $(".selected").removeClass('selected');

                //set class='selected' on this table row
                $(`#${trip.id}`).addClass('selected');

                // **** consider building the form once ****
                // **** hide on page load and unhide when a trip is clicked ****

                $("#trip-details").empty();
                $("#trip-details").append(`<h2>${trip.name}</h2>`);
                $("#trip-details").append(`<p>ID: ${trip.id}</p>`);
                $("#trip-details").append(`<p>Continent: ${trip.continent}</p>`);
                $("#trip-details").append(`<p>Category: ${trip.category}</p>`);
                $("#trip-details").append(`<p>${trip.weeks} weeks</p>`);
                $("#trip-details").append(`<p>Summary: ${trip.about} </p>`);
                $("#trip-details").append(`<p>Price: $${trip.cost} </p>`);

                $('#reservation-form').empty();
                $('#reservation-form').unbind('submit');

                $('#reservation-form').prepend('<h2>Reserve your spot!</h2>')
                $('#reservation-form').append('<div> <label for="guestname">Name</label> <input type="text" name="guestname" required/> </div>');
                $('#reservation-form').append('<div> <label for="email">Email Address</label> <input type="text" name="email" required/> </div>');
                $('#reservation-form').append('<div> <label for="age">Age</label> <input type="text" name="age"/> </div>');
                $('#reservation-form').append('<input type="submit" class="btn btn-outline-info" name="make-reservation" value="Make Reservation"/>');
                // $('submit-btn').click(makeReservation);
                $('#reservation-form').submit(reserveTrip);

                // return trip // need this?????
            });



        });//END Each loop

    })
    .catch((error) => {
        // reportStatus(`Error loading trips: ${error.message}`);
        // console.log(error);
        handleApiError(error, "We encountered a problem loading the list of available trips.");

        
    });

};

const readFormData = () => {
    const formData = {};

    const nameFromForm = $(`#reservation-form input[name="guestname"]`).val();
    formData['name'] = nameFromForm ? nameFromForm : undefined;

    const emailFromForm = $(`#reservation-form input[name="email"]`).val();
    formData['email'] = emailFromForm ? emailFromForm : undefined;

    const ageFromForm = $(`#reservation-form input[name="age"]`).val();
    formData['age'] = ageFromForm ? ageFromForm : 'not provided';

    return formData;
};


const clearForm = () => {
    $(`#reservation-form input`).not('.btn').val('');
};

const reserveTrip = (event) => {
    event.preventDefault();

    // gets the HTML attribute called id (#id)
    const tripID = $(`.selected`).attr('id');

    let reservationData = readFormData();
    // reservation = JSON.stringify(reservationData);

    console.log(reservationData);

    reportStatus('Submitting reservation...');

    axios.post(`${BASEURL}/${tripID}/reservations`, reservationData)
        .then((response) => {
            const tripName = $('.selected').attr('name'); 
            reportStatus(`Successfully reserved your trip ${tripName}. (name: ${response.data.name}  email: ${response.data.email} age: ${response.data.age}`); //shows name and age as undefined
            clearForm();
            console.log("after clear form");
        })
        .catch((error) => {
            handleApiError(error, "We encountered a problem submitting a reservation.");
            clearForm();
        });

    // accepted params:
    // name (string) required
    // age (integer)
    // email (string) required
};


$(document).ready(() => {
    $('#btn-show-trips').click(loadTrips);
});
