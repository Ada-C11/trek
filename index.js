const URL = 'https://trektravel.herokuapp.com/trips';


const reportStatus = (message, alertClass) => {
    $('#status-message').removeClass();
    $('#status-message').addClass(alertClass);
    $('#status-message').html(message);
};

const reportError = (message, errors) => {
    let content = `<p>${message}</p>`
    content += "<ul>";
    for (const field in errors) {
      for (const problem of errors[field]) {
        content += `<li>${field}: ${problem}</li>`;
      }
    }
    content += "</ul>";
    reportStatus(content, "alert alert-warning");
  };

const clearForm = () => {
    $('#trip-form').get(0).reset();
};



const loadTrips = () => {
    reportStatus('Loading trips...');

    const tripList = $('#trips-list');
    tripList.empty();

    axios.get(URL)
        .then((response) => {
            reportStatus(`Successfully loaded ${response.data.length} trips`, "alert alert-success");
            response.data.forEach((trip) => {
                tripList.append(`<li id='${trip.id}'><a href=#>${trip.name}</a></li><hr />`);
                $(`#${trip.id}`).click(function () {
                    showTrip(trip.id);
                });
            });
        })
        .catch((error) => {
            reportStatus(`Encountered an error while loading trips: ${error.message}`);
            console.log(error);
        });
};

const showTrip = (index) => {
    $('#status-message').removeClass();
    $('#status-message').html('');
    
    axios.get(URL + `/${index}`)
        .then((response) => {
            $('#form-section').removeClass('hidden');
            $('#trip-form').submit(function (event) {
                $('#tripID').val(response.data.id);
                event.preventDefault();
                makeReservation();
            });

            $('#trip-details').removeClass('hidden');
            $('#form-section h2').html(`Make a Reservation: ${response.data.name}`);
            $('#name').html(`Trip ${response.data.id}: ${response.data.name}`);
            $('#continent').html(`<strong>Continent:</strong> ${response.data.continent}`)
            $('#category').html(`<strong>Category:</strong> ${response.data.category}`)

            let weeksString = 'week';
            if (response.data.weeks !== 1) {
                weeksString += 's';
            }
            $('#weeks').html(`<strong>Duration:</strong> ${response.data.weeks} ${weeksString}`)
            $('#cost').html(`<strong>Cost:</strong> $${response.data.cost}`)
            $('#about').html(`<strong>Description:</strong> ${response.data.about}`)
        })
        .catch((error) => {
            reportStatus(`Encountered an error while loading trip: ${error.message}`);
            console.log(error);
        });
};

const makeReservation = () => {   
    $('#status-message').html('');
    const tripID = $('#tripID').val();

    const tripData = {
        name: $('#customer-name').val(),
        email: $('#email').val(),
        age: $('#age').val(),
    }

    axios.post(URL+`/${tripID}/reservations`, tripData)
    .then((response) => {
        clearForm();
      console.log(response);
      reportStatus('Successfully made reservation!', "alert alert-success");
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response.data && error.response.data.errors) {
        reportError(
            `Encountered an error: ${error.message}`,
            error.response.data.errors
        );
    } else {
        reportStatus(`Encountered an error: ${error.message}`, "alert alert-warning");
    }
    });

}

$(document).ready(() => {
    $('#load').click(loadTrips);    
});