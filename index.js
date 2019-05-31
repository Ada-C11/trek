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
            $('.all-trips p').append('All Trips:');
            response.data.forEach((trip) => {
                tripList.append(`<li class='trip-name'>${trip.name}</li>`)
            })
        })
        .catch((error) => {
            reportStatus(`We're sorry, we encountered an error while loading all trips: ${error.message}`);
            console.log('there was an issue loading some or all of the trips');
        })
}

const loadIndividualTrip = () => {
    // reportStatus(`...Loading trip...`);

    // const tripInfo = $('.trip-details');
    // tripInfo.empty();

    // console.log(`${event.target}`);
    alert('this worked!');

}

$(document).ready(() => {
    $('#load-trips').click(loadTrips);
    $('body').on('click', 'li', loadIndividualTrip);
});