$('document').ready(()=>{

    const handleReserveTrip = (tripID, continent)=>{
        const endpoint = `https://trektravel.herokuapp.com/trips/${tripID}/reservations`;
        const name = $('#name-field').val();
        const email = $('#email-field').val();
        axios.post(endpoint,{
                name: name,
                email: email
            })
        .then((response)=>{
            const name = $('#name-field').val();
            $('#reserve-form')[0].reset();
            console.log('name');
            const messageHTML = `<h4>Congrats, ${name}! You're going to ${continent}!</h4><p>Your reservation ID is ${response.data.id}.</p>`
            $('#reserve-message').html(messageHTML)
            $('#reserve-message').removeClass('hidden');
        })
        .catch((error)=>{

        });
    };

    const buildTripClickHandler = (trip) => {
        const tripDetails = (
            `<h2>${trip.name}</h2>` +
            `<h3>Continent: ${trip.continent}</h3>` +
            `<h3>Category: ${trip.category}</h3>` +
            `<h3>Weeks: ${trip.weeks}</h3>` +
            `<h3>Cost: $${trip.cost}</h3>`
        );

        const changeSelected = () => {
            $('.selected').removeClass('selected');
            $(`#trip-${trip.id}`).addClass('selected');
        }

        const handler = () => {
            changeSelected();
            $(`#trip-details`).html(tripDetails);
            $('#reserve-heading').text(`Reserve a Spot on ${trip.name}`);
            $('#reserve-message').empty();
            $('#reserve-trip').removeClass('hidden');
            $('#reserve-button').off();
            $('#reserve-button').click((event)=>{
                handleReserveTrip(trip.id, trip.continent);
                event.preventDefault();
            });
        };
        return handler;
    }


    const loadTrips= (tripData) => {
        $('button').removeClass('centered');
        $('.selected').removeClass('selected');
        $('#reserve-trip').addClass('hidden');
        $('#trip-details').empty();
        $('button').text('Reload Trips');
        $('#trips-list').empty();
        for (let trip of tripData){
            $('#trips-list').append(`<div id=trip-${trip.id}><h3>${trip.name}</h3></div>`);
            const handleTripClick = buildTripClickHandler(trip);
            $(`#trip-${trip.id}`).click(()=>{handleTripClick()});
        }
    }

    $('#reserve-button').click(()=>{handleReserveTrip()})

    const handleButtonClick = () =>{
        axios.get('https://trektravel.herokuapp.com/trips')
        .then((response) => { 
            loadTrips(response.data);
        })
        .catch((error)=> {
            console.log(error.message);
        })
    };
    $('button').click(()=>{handleButtonClick()});
});
