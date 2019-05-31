const url = 'https://trektravel.herokuapp.com/trips';

const reportStatus = (message) => {
    $('#status-message').html(message);
};

const loadTrips = () => {
    reportStatus('...Loading all trips...');

    const tripList = $('#trip-list');
    tripList.empty();

    axios.get(url)
        .then((response) => {
            reportStatus(`Successfully loaded ${response.data.length} trips`);
            console.log('successfully loaded trips');
            response.data.forEach((trip) => {
                tripList.append(`<li>${trip.name}</li>`)
            })
        })
        .catch((error) => {
            reportStatus(`We're sorry, we encountered an error while loading all trips: ${error.message}`);
            console.log('there was an issue loading some or all of the trips');
        })
}

$(document).ready(() => {
    $('#load-trips').click(loadTrips);
});