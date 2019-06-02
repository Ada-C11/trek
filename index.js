const URL_ALL_TRIPS = "https://trektravel.herokuapp.com/trips"
var urlDynamic=URL_ALL_TRIPS;

$(document).ready(function(){
    $("#btnAllTrips").on("click",function(){
        getAllTrips();
    });
});

function getAllTrips(){
    axios.get(URL_ALL_TRIPS)
    .then(function(response){
        $("#detailTrip").addClass("invisible");
        $("#reserveTrip").addClass("invisible");
        buildList(response.data);
    }).catch(function(error){
        alert("Sorry an error ocurred, please try again.");
    });
}

function buildList(trips){
    var list = $("#tripList tbody");
    list.empty();
    $.each(trips,function(index,item){
        list.append($("<tr>")
                .append($("<td>")
                    .append($("<button>")
                        .addClass("btn btn-default viewDetail")
                        .data("idTrip",item.id)
                        .append("Trip "+item.id + " " +item.name)
                    )
                )
            );
    });

    $(".viewDetail").bind("click",function(){
        var tripid = $(this).data("idTrip");
        getTrip(tripid);
    });
}


