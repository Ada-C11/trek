const BASEURL = "https://trektravel.herokuapp.com/trips";

const reportStatus = (message) => {
    $('#status-message').html(message);
};

const handleApiError = (error, customMessage) => {
    // console.log(error);
    // *** need help with figuring out how to test this is working ***

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

const getTripDetails = (tripID) => {
    console.log('****** tripID in getTripDetails: ')
    console.log(tripID);

    axios.get(`${BASEURL}/${tripID}`)
    .then((response) => {
        // **** consider building the form once ****
        // **** hide on page load and unhide when a trip is clicked ****
        const trip = response.data;
        $("#trip-details").empty();
        $("#trip-details").append(`<h2>${trip.name}</h2>`);
        $("#trip-details").append(`<p><span class="bold">ID:</span> ${trip.id}</p>`);
        $("#trip-details").append(`<p><span class="bold">Continent:</span> ${trip.continent}</p>`);
        $("#trip-details").append(`<p><span class="bold">Category:</span> ${trip.category}</p>`);
        $("#trip-details").append(`<p><span class="bold">Weeks:</span> ${trip.weeks}</p>`);
        $("#trip-details").append(`<p><span class="bold">Summary:</span><br> ${trip.about}</p>`);
        $("#trip-details").append(`<p><span class="bold">Price:</span> $${trip.cost.toFixed(2)}</p>`);

        $('#reservation-form').empty();
        $('#reservation-form').unbind('submit');

        $('#reservation-form').prepend('<h2>Reserve your spot!</h2>')
        $('#reservation-form').append('<div> <label for="guestname">Name</label> <input type="text" name="guestname" required/> </div>');
        $('#reservation-form').append('<div> <label for="email">Email Address</label> <input type="text" name="email" required/> </div>');
        $('#reservation-form').append('<div> <label for="age">Age</label> <input type="number" name="age"/> </div>');
        $('#reservation-form').append('<input type="submit" class="btn btn-outline-info" name="make-reservation" value="Make Reservation"/>');
        $('#reservation-form').submit(reserveTrip);
    })
}

const loadTrips = () => {
    reportStatus('Loading trips ...');
    const listOfTrips = $('#list-of-trips');
    listOfTrips.empty;
    
    // clear details and form sections upon clicking Show Trips button
    $("#trip-details").empty();
    $('#reservation-form').empty();
    
    // not working, creating double calls and after X clicks, not clearing the area

    axios.get(BASEURL)
    .then((response) => {
        reportStatus(`There are ${response.data.length} trips available.`);
        allTrips = response.data;

        $('thead').html('<tr><td><h2>AVAILABLE TRIPS</h2></td></tr>')

        response.data.forEach((trip) => {
            listOfTrips.append(`<tr id=${trip.id}><td>${trip.name}</td></tr>`);
            $(`#${trip.id}`).unbind()
            $(`#${trip.id}`).bind('click', {thisTrip:trip}, function(event){
                // {thisTrip:trip} becomes available as event.data
                // console.log(event);
                // tripData = JSON.stringify(event.data)
                // console.log("******* trip is: ********");
                // console.log(tripData);
                // {"thisTrip":{"id":74,"name":"Best of New Zealand","continent":"Australasia","category":"everything","weeks":3,"cost":1952.77}}

                tripID = JSON.stringify(event.data)
                console.log("******* trip is: ********");
                console.log(tripID);
                // {"thisTrip":"id":74}

                const trip = event.data.thisTrip;
                //remove class='selected' from any other table row
                $(".selected").removeClass('selected');

                //set class='selected' on this table row
                $(`#${trip.id}`).addClass('selected');
                $('#status-message').empty();

                const testTrip = (`${trip.id}`);
                console.log('****** thisTripID in loadTrips: ');
                console.log(testTrip);
                getTripDetails(testTrip);

                

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
            const tripIdNum = $('.selected').attr('id'); 
            reportStatus(`Successfully reserved your trip. (Trip ID: ${tripIdNum}. Your name: ${response.data.name}  Email: ${response.data.email} age: ${reservationData.age})`); //shows age as undefined when using response.data.age; why????
            clearForm();
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
