const url = 'https://trektravel.herokuapp.com/trips';

const loadTrips = () => {
    const tripList = $('#trip-list');
    tripList.empty();

    axios.get(url)
}

$(document).ready(() => {
    $('#load-trips').click(loadTrips);
  });