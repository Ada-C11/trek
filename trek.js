$('document').ready(()=>{
    const displayTrips= (tripData) => {
        $('button').removeClass('centered');
        
        for (let trip of tripData){
            $('#trips-list').append(`<div id=trip-${trip.id}'><h2>${trip.name}</h2></div>`);
        }
    }
    const handleClick = () =>{
        axios.get('https://trektravel.herokuapp.com/trips')
        .then((response) => { 
            displayTrips(response.data);
        })
        .catch((error)=> {
            console.log(error.message);
        })
    };
    $('button').click(()=>{handleClick()});
});
