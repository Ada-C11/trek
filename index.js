const TRIPSURL = 'https://trektravel.herokuapp.com/trips'
// const ONETRIP = 'https://trektravel.herokuapp.com/trips/' 
// TODO: need to concatenate id number at end of ONETRIP

const reportStatus = (message) => {
    const statusContainer = $('#status-message');
    statusContainer.empty();
    statusContainer.append(`<p>${message}</p>`);
  };

const loadTrips = () => {
    const tripsList = $('#trip-list')
    tripsList.empty();
    tripsList.append('<h1>All Trips</h1>');

    axios.get(TRIPSURL)
        .then((response) => {
            reportStatus(`Successfully loaded ${response.data.length} trips!`);
            response.data.forEach((trip) => {
                tripsList.append(`<li><button class='one-trip'>${trip.name}</button></li>`)
            })
        })
        .catch((error) => {
            reportStatus(`Encountered an error while loading trips: ${error.message}`);
            console.log(error)
        });
}

// How can we get ID from button clicked on?
const loadDetails = (id) => {
    const tripDetail = $('.trip-details');
    tripDetail.empty();
    tripDetail.append('<h1>Trip Details</h1>')

    axios.get(TRIPSURL + `/${id}`)
        .then((response) => {
            let tripInfo = response.data
            console.log(tripInfo)
            reportStatus(`Successfully loaded ${tripInfo.name} trips!`);
            tripDetail.append(`<h3>Name: ${tripInfo.name}</h3>`)
            tripDetail.append(`<h3>Continent: ${tripInfo.continent}</h3>`)
        })
        .catch((error) => {
            reportStatus(`Encountered an error while loading trips: ${error.message}`);
            console.log(error)
        })
}


  $(document).ready(() => {
    $('#load').on('click', loadTrips);
    $('ul').on('click', 'button.one-trip', function() {
        const tripId = $(this).html()
        loadDetails(tripId)
    });
  });