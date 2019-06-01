
const URL = "https://trektravel.herokuapp.com/trips"


const loadTrips = () => {

  tripList = $('#trip-list');
  tripList.empty();


  axios.get(URL)
    .then((response) => {
      response.data.forEach((trip) => {
        tripList.append(`<li id="${trip.id}"><a href="#">${trip.name}</a></li>`);
        $("#" + trip.id).click( () => {
          loadDetails(trip.id);
          createForm(trip.id, trip.name) })


        })
        tripList.prepend("<h2>All Trips</h2>")
        $(".current-trips").css("border-style", "solid");
    })
    .catch((error) => {
      console.log(error);
    });

};


const loadDetails = (id) => {
  const tripDetails = $('#detail-list');
  tripDetails.empty()

  axios.get(URL+"/"+ id)
  .then((response) => {
      let titles = ["name", "continent", "category", "weeks", "cost", "about"]
      titles.forEach((title) => {
        tripDetails.append(`<li><b>${title}:</b> ${response["data"][title]}</li>`);
      })
      tripDetails.prepend(`<h2>Trip Details</h2>`)
      $(".details").css("border-style", "solid");

  })
  .catch((error) => {
    console.log(error);
  });
  
};


const createForm = (id, name) => {
  const form = $('#form');
  form.empty()
  const buildFormHtml = `<h2>Reserve a Spot on ${name} </h2>
  <div >Name: <input type="text" name="name"></div>
  <div>Email: <input type="text" name="email"></div>
  <input type="submit" name="reserve" value="Reserve" />`

  form.html(buildFormHtml)
  $(".reservation-form").css("border-style", "solid");

  $('#form').submit( (event) => {
    event.preventDefault();
    createReservation(id, name)
})
}


const createReservation = (id, name) => {

  const reservationData = readFormData();

  reportStatus('Sending reservation data...');

  axios.post(URL+"/"+ id + "/reservations", reservationData)
    .then((response) => {
      console.log(response);
      reportStatus(`Successfully added a reservation for ${name} !`);
      clearForm();
    })
    .catch((error) => {
      console.log(error.response);
      reportStatus(`Encountered an error: ${error.message}`);
    });
};


const readFormData = () => {
  const parsedFormData = {};

  const nameFromForm = $(`#form input[name="name"]`).val();
  parsedFormData['name'] = nameFromForm ? nameFromForm : undefined;

  const emailFromForm = $(`#form input[name="email"]`).val();
  parsedFormData['email'] = emailFromForm ? emailFromForm : undefined;


  return parsedFormData;
};



const clearForm = () => {
  $(`#form input[name="name"]`).val('');
  $(`#form input[name="email"]`).val('');
}

const reportStatus = (message) => {
  $('#status-message').html(message);
  $("#status-message").css("background-color", "lightgray");

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



$(document).ready(() => {
  $('#load').click(loadTrips);
});