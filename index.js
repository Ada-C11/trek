const url = 'https://trektravel.herokuapp.com/trips';

const loadTrips = () => {
    const tripList = $('#trip-list');
    tripList.empty();

    axios.get(url)
        .then((response) => {
            console.log('successfully loaded trips');
            response.data.forEach((trip) => {
                tripList.append(`<li>${trip.name}</li>`)
            })
        })
}

$(document).ready(() => {
    $('#load-trips').click(loadTrips);
});