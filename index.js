const TRIPS = 'https://trektravel.herokuapp.com/trips/';

const reportStatus = (message) => {
    $('#status-message').html(message).removeClass("hide");
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
  
    const tripList = $('#trip-list').removeClass("hide");
        tripList.empty();
  
        axios.get(TRIPS)
            .then((response) => {
            reportStatus(`Loaded ${response.data.length} trips.`);
            response.data.forEach((trip) => {
                let item = $(`<li>${trip.name}</li>`);
                item.click(function() {
                  $("section").removeClass("hide")
                  getTripData(trip);
                  $('#submit-button').off('click');
                  $('#submit-button').click(function(event) {
                    createRes(event, trip.id);
                  });
                });
                tripList.append(item);
              });
            })
        .catch((error) => {
            reportStatus(`Error while loading: ${error.message}`);
            console.log(error);
        });
    };

const getTripData = (trip) => {
    const tripDetails = $(`#trip-details`).removeClass("hide");
    tripDetails.empty();
  
    axios.get(TRIPS + trip.id)
    .then((response) => {
      console.log(response);
      reportStatus(`Loaded details for trip: ${response.data.name}`);
      tripDetails.append(
        `<li><u><strong>Trip Name: ${response.data.name}</strong></u></li>
        <li>ID: ${response.data.id}</li>
        <li>Type: ${response.data.category}</li>
        <li>Destination: ${response.data.continent}</li>
        <li>Cost: $${response.data.cost}</li>
        <li>Travel Time: ${response.data.weeks} weeks </li>
        <li>Description: ${response.data.about}</li>`);
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
  
const createRes = (event, trip) => {
    reportStatus('Sending reservation data...');
    
        event.preventDefault();
    
        const resData = readFormData();
    
        axios.post(TRIPS + trip + "/reservations", resData)
        .then((response) => {
            reportStatus(`Added a new reservation for ${response.data.name}.`);
            clearForm();
        })
        .catch((error) => {
            reportStatus(`Error: ${error.message}`);
          }
        )
    };
  
$(document).ready(() => {
    $('#load').click(loadTrips);
  });