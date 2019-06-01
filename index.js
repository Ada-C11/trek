const URL = 'https://trektravel.herokuapp.com/trips';

const reportStatus = (message) => {
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
    reportStatus(content);
  };

const jsonifyFormData = (tripArray) => {
    let returnObj = {}
    for (let i = 0; i < tripArray.length; i += 1) {
        console.log("got to method");
        returnObj[tripArray[i]['name']] = tripArray[i]['value'];
    }
    return returnObj;
};

const clearForm = () => {
    $('#trip-form').get(0).reset();
};

const loadTrips = () => {
    reportStatus('Loading trips...');

    const tripList = $('#trips-list');
    tripList.empty();

    $('#load').addClass('hidden');

    axios.get(URL)
        .then((response) => {
            reportStatus(`Successfully loaded ${response.data.length} trips`);
            response.data.forEach((trip) => {
                tripList.append(`<li id='${trip.id}'>${trip.name}</li>`);
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
    // const tripArray = $('#trip-form').serializeArray();
    // const tripData = jsonifyFormData(tripArray);
    // console.log(tripData);
    const name = $('#name').val();
    const email = $('#email').val();
    const age = $('#age').val();
    const tripID = $('#tripID').val();

    const tripData = {
        name: name,
        email: email,
        age: age,
    }

    axios.post(URL+`/${tripID}/reservations`, tripData)
    .then((response) => {
        clearForm();
      console.log(response);
      reportStatus('Successfully made reservation!');
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response.data && error.response.data.errors) {
        // User our new helper method
        reportError(
            `Encountered an error: ${error.message}`,
            error.response.data.errors
        );
    } else {
        // This is what we had before
        reportStatus(`Encountered an error: ${error.message}`);
    }
    });

}

$(document).ready(() => {
    $('#load').click(loadTrips);    
});