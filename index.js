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

const showTripDetails = (event, tripId) => {
    const tripDetails = $('#trip-details');
    tripDetails.empty();

    event.preventDefault();

    $('#trip-section').removeClass().addClass('show-reservation');

    // trip details
    axios.get(`${URL}/${tripId}`)
        .then((response) => {
            reportStatus(`Successfully loaded details for ${response.data.name} trip`);
            tripDetails.append(`<li>Trip ID: ${response.data.id}</li>`);
            tripDetails.append(`<li>Name: ${response.data.name}</li>`);
            tripDetails.append(`<li>Continent: ${response.data.continent}</li>`);
            tripDetails.append(`<li>About: ${response.data.about}</li>`);
            tripDetails.append(`<li>Category: ${response.data.category}</li>`);
            tripDetails.append(`<li>Duration: ${response.data.weeks} weeks</li>`);
            tripDetails.append(`<li>Cost: ${response.data.cost}</li>`);

            $('#new-reservation').removeClass().addClass('show-reservation');
        })
        .catch((error) => {
            reportStatus(`Encountered an error while loading trip: ${error.message}`);
            console.log(error);
        });

        // reservation form
        const readFormData = () => {
            const parsedFormData = {};
          
            const nameFromForm = $(`#reservation-form input[name="name"]`).val();
            parsedFormData.name = nameFromForm ? nameFromForm : undefined;
          
            const emailFromForm = $(`#reservation-form input[name="email"]`).val();
            parsedFormData.email = emailFromForm ? emailFromForm : undefined;
        
            return parsedFormData;
          };
          
          const clearForm = () => {
            $(`#reservation-form input[name="name"]`).val('');
            $(`#reservation-form input[name="email"]`).val('');
          }

          // create new reservation
          const createReservation = (event) => {
            event.preventDefault();
          
            const reservationData = readFormData();
            console.log(reservationData);
          
            reportStatus('Sending reservation data...');
          
            axios.post(`${URL}/${tripId}/reservations`, reservationData)
              .then((response) => {
                reportStatus(`Successfully added a reservation for ${response.data.name}!`);
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
          $('#reservation-form').submit(createReservation);
};

const listTrips = () => {
    reportStatus('Loading trips...');

    const tripList = $('#trip-list');
    tripList.empty();

    $('#load').removeClass().addClass('hide-reservation');

    // list all trips
    axios.get(URL)
        .then((response) => {
            reportStatus(`Successfully loaded ${response.data.length} trips`);
            response.data.forEach((trip) => {
                tripList.append(`<li><a href="#" onclick="return showTripDetails(event, ${trip.id});">${trip.name}</a></li>`);
            });
        })
        .catch((error) => {
            reportStatus(`Encountered an error while loading trips: ${error.message}`);
            console.log(error);
        });
};

$(document).ready(() => {
    $('#load').click(listTrips);
});
