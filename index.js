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


$(document).ready( function() {
  $('button').click( function() {
    loadTreks();
  })
});

