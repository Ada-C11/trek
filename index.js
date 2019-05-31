const URL = "https://trektravel.herokuapp.com/trips";
const loadTrips = () => {

    const tripsList = $('#trip-list');
    tripsList.empty();

    axios.get(URL)
    .then(function (response) {
        const trips = response.data;
        for (let i = 0; i <= trips.length-1; i += 1) {
            tripsList.append(`<li>${response.data[i].name}</li>`)
        }
        // tripsList.append(`<li>${response.data[0]}</li>`);
    })
    .catch((error) => {
        console.log(error);
    });

};

$(document).ready(() => {
    $('#load').click(loadTrips);
})