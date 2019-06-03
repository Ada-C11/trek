const URL_ALL_TRIPS = "https://trektravel.herokuapp.com/trips"
var urlDynamic = URL_ALL_TRIPS; //so its easier to modify for different calls

$(document).ready(function(){
    $("#btnAllTrips").on("click",function(){
        getAllTrips();
    });

      $("#frmReservation").submit(function(event){
        reserveSpot();
        $("#inputName").val("");
        $("#inputEmail").val("");
        event.preventDefault();
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

function getTrip(id){
    urlDynamic = urlDynamic+"/"+id;
    axios.get(urlDynamic)
    .then(function(response){
        $("#detailTrip").removeClass("invisible");
        $("#reserveTrip").removeClass("invisible");
        buildDetail(response.data);
    }).catch(function(error){
        alert("Sorry an error ocurred, please try again.");
    });
}

function buildDetail(trip){
    $("#tripId").html(trip.id);
    $("#tripName").html(trip.name);
    $("#tripContient").html(trip.continent);
    $("#tripDetails").html(trip.about);
    $("#tripCategory").html(trip.category);
    $("#tripWeekDuration").html(trip.weeks);
    $("#tripCost").html("$"+trip.cost);
}

function reserveSpot(){
    var _name = $("#inputName").val();
    var _email = $("#inputEmail").val();
    urlDynamic = urlDynamic+"/reservations";
    axios.post(urlDynamic,{
        name : _name,
        email: _email,
        //age : 18
    })
    .then(function(response){
        if(response.data.id>0)
        {
            alert("Your reservation was successful!!.");
        }
    }).catch(function(error){
        alert("Sorry an error ocurred, please try again.");
    });
}


