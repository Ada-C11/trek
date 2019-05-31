const ListURL = 'https://trektravel.herokuapp.com/trips';
const DetailURL = 'https://trektravel.herokuapp.com/trips';

const reserveHTML = $(`<h1>Reserve a spot on the Trip</h1>
<form id="reserve-form">
  <div>
    <label for="name">Name</label>
    <input type="text" name="name" />
  </div>

  <div>
    <label for="email">Email</label>
    <input type="text" name="email" />
  </div>

  <input type="submit" name="reserve" value="Reserve spot" />
</form>`);

const displayStatus = (message) => {
    $('#status-message').html(message);
};
const handleApiError = (message, errors) => {
    let content = `<p>${message}</p><ul>`;
    for (const field in errors) {
        for (const problem of errors[field]) {
            content += `<li>${field}: ${problem}</li>`;
        }
    }
    content += "</ul>";
    displayStatus(content);
};

const loadTrips = () => {
    displayStatus("loading trips...");

    const tripList = $('#trip-list');
    tripList.empty();
    const tripReserve = $('.reserve-trip')

    axios.get(ListURL)

        .then((response) => {
            displayStatus(`Successfully loaded ${response.data.length} trips`);
            response.data.forEach((trip) => {
                const tripHTML = $(`<li><a href="#">${trip.name}</a></li>`);
                tripList.append(tripHTML);

                tripHTML.click(() => {
                    showTripDetails(trip.id);
                    tripReserve.append(reserveHTML);
                    $('#reserve-form').submit(() => {
                        reserveTrip(trip.id);
                    });
                });
            });
        })
        .catch((error) => {
            displayStatus(`Encountered an error while loading trips: ${error.message}`);
            console.log(error);
        });
};

const loadDetail = (trip) => {

    const tripdetail = $('#trip-details');
    tripdetail.empty();
    tripdetail.append(`
    <h2>Trip Details</h2>
    <p>Trip Name: ${trip.name}</p>
    <p>Continent: ${trip.continent}</p>
    <p>Cost: ${trip.cost}</p>
    <p>Weeks: ${trip.weeks} week('s)</p>
    <p>About: ${trip.about}</p>
    `);
}

const showTripDetails = (id) => {
    axios.get(DetailURL + "/" + id)
        .then((response) => {
            const trip = response.data
            loadDetail(trip);
            displayStatus(`Successfully loaded ${response.data.name}`);

        })
        .catch((error) => {
            displayStatus(`Encountered an error while loading trips: ${error.message}`);
            console.log(error);
        });
}



const readFormData = () => {
    const parsedFormData = {};

    const nameFromForm = $(`#reserve-form input[name="name"]`).val();
    parsedFormData['name'] = nameFromForm ? nameFromForm : undefined;

    const emailFromForm = $(`#reserve-form input[name="email"]`).val();
    parsedFormData['email'] = emailFromForm ? emailFromForm : undefined;

    return parsedFormData;
};

const clearForm = () => {
    $(`#reserve-form input[name="name"]`).val('');
    $(`#reserve-form input[name="email"]`).val('');

};

const reserveTrip = (id) => {
    event.preventDefault();
    const userData = readFormData();
    displayStatus('Sending user data ...');
    axios.post((DetailURL + "/" + id + "/" + "reservations"), userData)
        .then((response) => {
            displayStatus(`Successfully reserve a spot with Name: ${response.data.name}!`);
            clearForm();
        })
        .catch((error) => {
            console.log(error.response);
            if (error.response.data && error.response.data.errors) {
                handleApiError(
                    `Encountered an error: ${error.message}`,
                    error.response.data.errors
                );
            } else {
                displayStatus(`Encountered an error: ${error.message}`);
            }
        });

}



$(document).ready(() => {
    $('#load').click(loadTrips);
    

});