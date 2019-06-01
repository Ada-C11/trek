$('document').ready(()=>{
    const buildTripClickHandler = (trip) => {
        const tripDetails = (
            `<h3>Name: ${trip.name}</h3>` +
            `<h3>Continent: ${trip.continent}</h3>` +
            `<h3>Category: ${trip.category}</h3>` +
            `<h3>Weeks: ${trip.weeks}</h3>` +
            `<h3>Cost: $${trip.cost}</h3>`
        );
        const handler = () => {
            $('.selected').removeClass('selected');
            $(`#trip-${trip.id}`).addClass('selected');
            $(`#trip-details`).html(tripDetails);
            $('#reserve-heading').text(`Reserve a Spot on ${trip.name}`);
            $('#reserve-trip').removeClass('hidden');
        };
        return handler;
    }
    const loadTrips= (tripData) => {
        $('button').removeClass('centered');
        $('.selected').removeClass('selected');
        $('#reserve-trip').addClass('hidden');
        $('#trip-details').empty();
        $('button').text('Reload Trips');
        for (let trip of tripData){
            $('#trips-list').append(`<div id=trip-${trip.id}><h2>${trip.name}</h2></div>`);
            const handleTripClick = buildTripClickHandler(trip);
            $(`#trip-${trip.id}`).click(()=>{handleTripClick()});
        }
    }
    const handleClick = () =>{
        axios.get('https://trektravel.herokuapp.com/trips')
        .then((response) => { 
            loadTrips(response.data);
        })
        .catch((error)=> {
            console.log(error.message);
        })
    };
    $('button').click(()=>{handleClick()});
});
