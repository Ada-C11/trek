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
      })

    .catch((error) => {
      reportStatus(`Encountered an error while loading treks: ${error.message}`);
      console.log(error);
    });
};

$(document).ready( function() {
  $('#load').click( function() {
    loadTreks();
  })

  $('#trek-list').on('click', 'li', function() {
    const id = this.getAttribute("id")
    alert(`Got a click on an <li> element containing ${id}!`);
    loadTrekDetails(id);
  })
});

