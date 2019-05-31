const URL = "https://trektravel.herokuapp.com/trips";

const reportStatus = (message) => {
    $('#status-message').html(message);
};



const loadDetails = (id) => {
    const detailsList = $('#details-list');
    const tripUrl = URL + `/${id}`;

    axios.get(tripUrl)
    .then(function (response) {
      const details = response.data;
      detailsList.append(`<li>${details.name}</li>`);
      detailsList.append(`<li>${details.continent}</li>`);
      detailsList.append(`<li>${details.category}</li>`);
      detailsList.append(`<li>${details.weeks}</li>`);
      detailsList.append(`<li>${details.cost}</li>`);
    })
    .catch((error) => {
      reportStatus(`Whoops!  Something went wrong while loading trip details: ${error.message}`);
      console.log(error);
    });
    }

const loadTrips = () => {

    const tripsList = $('#trip-list');
    tripsList.empty();

    axios.get(URL)
    .then(function (response) {
        const trips = response.data;
        for (let i = 0; i <= trips.length-1; i += 1) {
            const idNum = response.data[i].id;
            const tripId = `${idNum}`;
            const element = `<li id="${tripId}">${response.data[i].name}</li>`;
            tripsList.append(element);
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
    $('#trip-list').on('click', 'li', function() {
        $('.details').empty();
        const tripId = parseInt($(this).attr("id"));
        $('section.details').append('<h2>Details</h2>');
        const detailsWindow = '<ul id="details-list"></ul>';

        // const detailsWindow = '<ul class="details-list">' + `<li>${$(this).html()} number ${tripId}</li>` + '</ul>'
        $('section.details').append(detailsWindow);
        loadDetails(tripId);
        alert(`Woohoo!  That sure is a ${$(this).html()}`);
    });
})