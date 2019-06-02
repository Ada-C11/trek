const URL = 'https://trektravel.herokuapp.com/trips';

const reportStatus = (message) => {
    $('#status-message').html(message);
};

const showTripDetails = (event, tripId) => {
    const tripDetails = $('#trip-details');
    tripDetails.empty();

    event.preventDefault();

    // eslint-disable-next-line no-undef
    axios.get(`${URL}/${tripId}`)
        .then((response) => {
            reportStatus(`Successfully loaded details for ${response.data.name} trip`);
            tripDetails.append(`<li>Trip Name: ${response.data.name}</li>`);
            tripDetails.append(`<li>Continent: ${response.data.continent}</li>`);
            tripDetails.append(`<li>About: ${response.data.about}</li>`);
            tripDetails.append(`<li>Category: ${response.data.category}</li>`);
            tripDetails.append(`<li>Duration: ${response.data.weeks} weeks</li>`);
            tripDetails.append(`<li>Cost: ${response.data.cost}</li>`);
        })
        .catch((error) => {
            reportStatus(`Encountered an error while loading trip: ${error.message}`);
            console.log(error);
        });
};

const listTrips = () => {
    reportStatus('Loading trips...');

    const tripList = $('#trip-list');
    tripList.empty();

    // eslint-disable-next-line no-undef
    axios.get(URL)
        .then((response) => {
            reportStatus(`Successfully loaded ${response.data.length} trips`);
            response.data.forEach((trip) => {
                tripList.append(`<li><a href="#" onclick="return showTripDetails(event, ${trip.id});">${trip.name}</a></li>`);
            });
        })
        .catch((error) => {
            reportStatus(`Encountered an error while loading pets: ${error.message}`);
            console.log(error);
        });
};

$(document).ready(() => {
    $('#load').click(listTrips);
});
