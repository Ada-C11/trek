const URL = "https://trektravel.herokuapp.com/trips"
//
// Status Management
//
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


const loadTrekTrips = () => {
    reportStatus("Loading all trips...");
    const tripsList = $('#trips-list')
    tripsList.empty();
    // tripsList.append('<th>All Trips</th>)')
    axios.get(URL)
    .then((response) => {
      reportStatus(`Successfully loaded ${response.data.length} trips`);
        console.log(response)
        response.data.forEach((trip) => {
            tripsList.append(`<li class='list-group-item text-center'>${trip.name}</li>`);
        });
    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading wonders: ${error.message}`);
      console.log(error);
    });
};

const loadTripDetails = (index) => {
    const tripDetails = $('#trip-details')
    tripDetails.empty();
    console.log(URL+"/"+(parseInt(index)+70).toString())
    axios.get(URL+"/"+(parseInt(index)+70).toString())
    .then((response) => {
      console.log(response)
      tripDetails.append(`<li><span>Name: </span> ${response.data.name}</li>`);
      tripDetails.append(`<li><span>Continent: </span> ${response.data.continent}</li>`);
      tripDetails.append(`<li><span>Category: </span> ${response.data.category}</li>`);
      tripDetails.append(`<li><span>Weeks: </span>${response.data.weeks}</li>`);
      tripDetails.append(`<li><span>Cost: </span>${response.data.cost}</li>`);
      tripDetails.append(`<li><span>About: </span>${response.data.about}</li>`);
    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading wonders: ${error.message}`);
      console.log(error);
    });
};

const clearForm = () => {
    $(`#reservation input[id='resId']`).val('');
    $(`#reservation input[id='name']`).val('');
    $(`#reservation input[id='email']`).val('');
  }

const createReservation = (event) => {
    event.preventDefault();
    let reservationData = {};
    const idFromForm = $(`#reservation input[id*='resId']`).val();
    const nameFromForm = $(`#reservation input[id*='name']`).val();
    reservationData['name'] = nameFromForm ? nameFromForm : undefined;
    const emailFromForm = $(`#reservation input[id*='email']`).val();
    reservationData['email'] = emailFromForm ? emailFromForm : undefined;

    reportStatus('Sending reservation data...');

    axios.post(URL+"/"+idFromForm+"/reservations",reservationData)
      .then((response) => {
          reportStatus(`Successfully added a reservation with ID ${response.data.id}`);
          clearForm();
      })
      .catch((error) => {
        console.log(error.response.data.errors)
        if (error.response.data && error.response.data.errors) {
            reportError("Encountered an error while creating reservation: ",error.response.data.errors)
        } else {
            reportStatus(`Encountered an error while creating reservation: ${error.message}`)
        }   
      });
}   
$(document).ready(() => {
    $('#load-all').on('click', function() {
        loadTrekTrips()
        $("#all-trips .card-title").addClass('card-title-display')
        });

    $('#trips-list').on('click', 'li', function() { 
        loadTripDetails($(this).index())
        $("#reserve").addClass('none');
        $(".card-title").addClass('card-title-display')
        $("#resId").val((parseInt(`${$(this).index()}`)+70).toString())
    });
    $('#reservation').submit(createReservation);

  });