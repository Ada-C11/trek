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
                let tripListItem = $(`<li>${trip.name}</li>`);
                tripListItem.addClass(`${trip.id}`);
                
                tripList.append(tripListItem);
            })
        })
        .catch((error) => {
            reportStatus(`We're sorry, we encountered an error while loading all trips: ${error.message}`);
            console.log('there was an issue loading some or all of the trips');
        })
}

const loadIndividualTrip = (event) => {

    let tripId = event.target.className;

    // reportStatus(`...Loading trip...`);

    // const tripInfo = $('.trip-details');
    // tripInfo.empty();
    console.log(tripId);
    // console.log(`${event.target}`);
    

}

$(document).ready(() => {
    $('#load-trips').click(loadTrips);
    $('body').on('click', 'li', loadIndividualTrip);
});