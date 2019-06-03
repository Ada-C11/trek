const TREK_API = "https://trektravel.herokuapp.com/trips";

const reportStatus = (message) => {
  $('#status-message').html(message);
};

const loadTreks = () => {
  reportStatus('Loading treks...');

  const trekList = $('#trek-list');
  trekList.empty();

  axios.get(TREK_API)
    .then((response) => {
      reportStatus(`Successfully loaded ${response.data.length} treks`);
      response.data.forEach((trek) => {
        trekList.append(`<li class="trek" id=${trek.id}>${trek.name}</li>`);
      });
    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading treks: ${error.message}`);
      console.log(error);
    });
};

const loadTrekDetails = (id) => {
  reportStatus('Loading treks...');

  const trekDetails = $('.trek-details');
  trekDetails.empty();

  axios.get(TREK_API + '/' + id)
    .then((response) => {
      reportStatus(`Successfully loaded ${response.data.name}`);
      trekDetails.append(
        `<h2 class="details">Name: ${response.data.name}</h2>`,
        `<p class="details">Continent: ${response.data.continent}</p>`,
        `<p class="details">Category: ${response.data.category}</p>`,
        `<p class="details">Weeks: ${response.data.weeks}</p>`,
        `<p class="details">Cost: ${response.data.cost}</p>`);
      $("#trip-form").append(`<h2>Register</h2>`);
      $("#trip-form").append(
        `<form name=${id}>
          <label for='name'>Name:</label> 
          <input type='text' id='name' name='name'>
          <label for='email'>Email address:</label> 
          <input type='text' id='email' name='email'>
          <button type='submit'>Submit Registration</button>
        </form>`
      )
    })

    .catch((error) => {
      reportStatus(`Encountered an error while loading treks: ${error.message}`);
      console.log(error);
    });
};

const submitReservation = (event) => {
  event.preventDefault();

  let reservationInfo = { 
    name: $("input[name=name]").val(),
    email: $("input[name=email]").val(),
    };

    axios.post(TREK_API + `/${$(event.target).attr("name")}` + `/reservations`, reservationInfo)
    .then(() => {
      reportStatus(`You've successfully submitted reservation for the trip!`);
    })
    .catch((error) => {
      reportStatus(`Reservation was unsuccessful: ${error.message}`);
      console.log(error);
    });

}

$(document).ready( function() {
  $('#load').click( function() {
    loadTreks();
  })

  $('#trek-list').on('click', 'li', function() {
    const id = this.getAttribute("id")
    alert(`Got a click on an <li> element containing ${id}!`);
    loadTrekDetails(id);
  })

  $(document).on("submit", "form", submitReservation);
});

