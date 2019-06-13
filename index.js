const TREK_API = "https://trektravel.herokuapp.com/trips";

const reportStatus = (message) => {
  $('#status-message').html(message);
};

const displayTreks = (trekInfo) => {

  const trekList = $('#trek-list');
  trekList.empty();

  trekInfo.forEach((trek) => {
    trekList.append(`<li class="trek" id=${trek.id}>${trek.name}</li>`);
  });
};

const displayTrek = (trekInfo) => {
  const trekDetails = $('.trek-details');
  trekDetails.empty();

  trekDetails.append(
    `<h2 class="details">Name: ${trekInfo.name}</h2>`,
    `<p class="details">Continent: ${trekInfo.continent}</p>`,
    `<p class="details">Category: ${trekInfo.category}</p>`,
    `<p class="details">Weeks: ${trekInfo.weeks}</p>`,
    `<p class="details">Cost: $${trekInfo.cost}</p>`);
  $("#trip-form").append(`<h2>Reserve a trip!</h2>`);
  $("#trip-form").append(
    `<form name=${trekInfo.id}>
      <label for='name'>Name:</label> 
      <input type='text' id='name' name='name'>
      <label for='email'>Email address:</label> 
      <input type='text' id='email' name='email'>
      <button type='submit'>Submit!</button>
    </form>`
  )
}

const loadFromAPI = (url, displayFunction) => {
  reportStatus('Calling Travel API...');

  axios.get(url)
    .then((response) => {
      const trekInfo = response.data;
      displayFunction(trekInfo)
      reportStatus(`Information successfully loaded!`)
    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading treks: ${error.message}`);
      console.log(error);
    })
}

const submitReservation = (event) => {
  event.preventDefault();

  let reservationInfo = { 
    name: $("input[name=name]").val(),
    email: $("input[name=email]").val(),
    };

    axios.post(TREK_API + `/${$(event.target).attr("name")}` + `/reservations`, reservationInfo)
    .then(() => {
      reportStatus(`You've successfully submitted a reservation!`);
    })
    .catch((error) => {
      reportStatus(`Reservation was unsuccessful: ${error.message}`);
      console.log(error);
    });
}

$(document).ready( function() {
  $('#load').click( function() {
    loadFromAPI(TREK_API, displayTreks);
  })

  $('#trek-list').on('click', 'li', function() {
    const id = this.getAttribute("id")
    loadFromAPI((TREK_API + '/' + id), displayTrek)
  })

  $(document).on("submit", "form", submitReservation);
});

