const URL = 'https://trektravel.herokuapp.com/trips';

const reportStatus = (message) => {
    $('#status-message').html(message);
};

const showTripDetails = (event, tripId) => {
    const tripDetails = $('#trip-details');
    tripDetails.empty();

    event.preventDefault();

    // eslint-disable-next-line no-undef
    axios.get(`${URL}/${tripId}`)
        .then((response) => {
            reportStatus(`Successfully loaded details for ${response.data.name} trip`);
            tripDetails.append(`<li>Trip Name: ${response.data.name}</li>`);
            tripDetails.append(`<li>Continent: ${response.data.continent}</li>`);
            tripDetails.append(`<li>About: ${response.data.about}</li>`);
            tripDetails.append(`<li>Category: ${response.data.category}</li>`);
            tripDetails.append(`<li>Duration: ${response.data.weeks} weeks</li>`);
            tripDetails.append(`<li>Cost: ${response.data.cost}</li>`);
        })
        .catch((error) => {
            reportStatus(`Encountered an error while loading trip: ${error.message}`);
            console.log(error);
        });
};

const listTrips = () => {
    reportStatus('Loading trips...');

    const tripList = $('#trip-list');
    tripList.empty();

    // eslint-disable-next-line no-undef
    axios.get(URL)
        .then((response) => {
            reportStatus(`Successfully loaded ${response.data.length} trips`);
            response.data.forEach((trip) => {
                tripList.append(`<li><a href="#" onclick="return showTripDetails(event, ${trip.id});">${trip.name}</a></li>`);
            });
        })
        .catch((error) => {
            reportStatus(`Encountered an error while loading pets: ${error.message}`);
            console.log(error);
        });
};

// START HERE
const readFormData = () => {
    const parsedFormData = {};
  
    const nameFromForm = $(`#reservation-form input[name="name"]`).val();
    parsedFormData['name'] = nameFromForm ? nameFromForm : undefined;
  
    const emailFromForm = $(`#reservation-form input[name="email"]`).val();
    parsedFormData['email'] = emailFromForm ? emailFromForm : undefined;

    return parsedFormData;
  };
  
  const clearForm = () => {
    $(`#reservation-form input[name="name"]`).val('');
    $(`#reservation-form input[name="email"]`).val('');
  }
  
  const createReservation = (event, tripId) => {
    event.preventDefault();
  
    const reservationData = readFormData();
    console.log(reservationData);
  
    reportStatus('Sending reservation data...');
  
    axios.post(`${URL}/${tripId}/reservations`, reservationData)
      .then((response) => {
        reportStatus(`Successfully added a reservation with ID ${response.data.id}!`);
        clearForm();
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.data && error.response.data.errors) {
          reportError(
            `Encountered an error: ${error.message}`,
            error.response.data.errors
          );
        } else {
          reportStatus(`Encountered an error: ${error.message}`);
        }
      });
  };

$(document).ready(() => {
    $('#load').click(listTrips);
    $('#reservation-form').submit(createReservation);
});
