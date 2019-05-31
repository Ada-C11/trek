const URL = "https://trektravel.herokuapp.com/trips";

const reportStatus = (message) => {
    $('#status-message').html(message);
};

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
        reportStatus(`Whoops!  Something went wrong while loading trips: ${error.message}`);
        console.log(error);
    });

};

$(document).ready(() => {
    $('#load').click(loadTrips);
    $('#trip-list').on('click', 'li', function(event) {
        $('.details').empty();
        const detailsWindow = '<ul class="details-list">' + `<li>${$(this).html()}</li>` + '</ul>'
        $('.details').append(detailsWindow);
        alert(`Woohoo!  That sure is a ${$(this).html()}`);
    });
})