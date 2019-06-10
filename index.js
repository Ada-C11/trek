const TRIPS = 'https://trektravel.herokuapp.com/trips';

const reportStatus = (message) => {
    $('#status-message').html(message);
  };

const reportError = (message, errors) => {
    let content = `<p>${message}</p><ul>`;
        for (const field in errors) {
            for (const problem of errors[field]) {
                content += `<li>${field}: ${problem}</li>`;
                }
        }
    content += "</ul>";
    reportStatus(content);
  };

const loadTrips = () => {
    reportStatus('Loading all trips...');
  
    const tripList = $('#trip-list');
        tripList.empty();
  
        axios.get(TRIPS)
            .then((response) => {
            reportStatus(`Loaded ${response.data.length} trips.`);
            response.data.forEach((trip) => {
            console.log(response);
            tripList.append(`<li>${trip.name}</li>`);
            });
            })

        .catch((error) => {
            reportStatus(`Error while loading: ${error.message}`);
            console.log(error);
        });
  };
  
  const getTripData = (trip_id) => {
    const tripDetails = $(`#trip-details`).removeClass("hide");
    tripDetails.empty();
    let trip = TRIPS + trip_id;
  
    axios.get(trip)
    .then((response) => {
      console.log(response);
      reportStatus(`Loaded details for trip: ${response.data.name}`);
      tripDetails.append(
        `<li><strong>Trip Name: ${response.data.name}</strong></li>
        <li>Type: ${response.data.category}</li>
        <li>Destination: ${response.data.continent}</li>
        <li>Cost: $${response.data.cost}</li>
        <li>Travel Time: ${response.data.weeks} weeks </li>`);
      })
    .catch((error) => {
        reportStatus(`Error while loading: ${error.message}`);
        console.log(error);
    });
    }
  
const FORM = ['name', 'email'];
const inputField = name => $(`#reservation-form input[name="${name}"]`);
  
const readFormData = () => {
    const getInput = name => {
        const input = inputField(name).val();
        return input ? input : undefined;
      };
    const formData = {};
      FORM.forEach((field) => {
        formData[field] = getInput(field);
      });
  
    return formData;
};
    
const clearForm = () => {
      FORM.forEach((field) => {
        inputField(field).val('');
      });
    }
  
const createRes = (event, trip_id) => {
    event.preventDefault();
    
    const resData = readFormData();
    console.log(resData);
    reportStatus('Sending reservation data...');
    
    let trip_res = URL + trip_id + '/reservations';
    console.log(trip_res)
    axios.post(resURL, resData)
    .then((response) => {
        reportStatus(`Added a new reservation for ${response.data.name}.`);
        clearForm();
    })
    .catch((error) => {
        console.log(error.response);
          if (error.response.data && error.response.data.errors) {
            reportError(
              `Error: ${error.message}`,
              error.response.data.errors
            );
          } else {
            reportStatus(`Error: ${error.message}`);
          }
        });
    };
  
$(document).ready(() => {
    $('#load').click(loadTrips);
  });