const URL_ALL_TRIPS = "https://trektravel.herokuapp.com/trips"

$(document).ready(function(){
    $("#btnAllTrips").on("click",function(){
        GetAllTrips();
    });
});

function GetAllTrips(){
    axios.get(URL_ALL_TRIPS)
    .then(function(response){
        buildList(response.data);
    }).catch(function(error){
        console.log("El Error es: "+error.response);
    });
}

function buildList(trips){
    var list = $("#tripList tbody");
    $.each(trips,function(index,item){
        list.append($("<tr>")
             .append($("<td>")
                .append($("<span>")
                    .append("Trip "+item.id + " " +item.name))));
    });
}