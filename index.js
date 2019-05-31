// index.js
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
          createForm(trip.id) })


        })
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
      let titles = ["name", "continent", "about", "category", "weeks", "cost"]
      titles.forEach((title) => {
        tripDetails.append(`<li>${title}: ${response["data"][title]}</li>`);
      })
      tripDetails.prepend(`<h1>Trip Details</h1>`)

  })
  .catch((error) => {
    console.log(error);
  });
  
};


const createForm = (id) => {
  const form = $('#form');
  form.empty()
  const buildFormHtml = `<h1>Reserve a Spot</h1>
  <div>Name: <input type="text" name="name"></div>
  <div>Email: <input type="text" name="email"></div>
  <button id="reserve">Reserve</button>`

  form.html(buildFormHtml)

}


const createReservation = (event) => {
  event.preventDefault();

  const reservationData = readFormData();

  reportStatus('Sending reservation data...');

  axios.post(URL, reservationData)
    .then((response) => {
      console.log(response);
      reportStatus('Successfully added a reservation!');
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

  const ageFromForm = $(`#form input[name="age"]`).val();
  parsedFormData['email'] = emailFromForm ? ageFromForm : undefined;


  return parsedFormData;
};

const clearForm = () => {
  $(`#form input[name="name"]`).val('');
  $(`#form input[name="email"]`).val('');
}





$(document).ready(() => {
  $('#load').click(loadTrips);
  $('#form').submit(createReservation)
});

