const BASE_URL = 'https://trektravel.herokuapp.com/trips'
const loadTrips = () => {
    axios.get(BASE_URL)
    .then((response) => {
        response.data.forEach((trek) => {
            $('#trek-list').append(`<li>${trek.name}</li>`);        });
    })
    .catch((error) => {
        console.log(error);
    });
};

$(document).ready(() => {
    $('.trips__button').click(loadTrips);
});