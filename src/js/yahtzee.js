$("#dice_form").change(function (event) {
  updateProbabilites();
});

function updateProbabilites() {
  //event.preventDefault();

  targetUrl = "https://handy-solutions.de/api/yahtzee/get_probabilities";
  //targetUrl = "http://localhost:5000/api/yahtzee/get_probabilities"; //debugging only

  var targetData = {
    dice: [
      $('input[name="dice1"]:checked').val(),
      $('input[name="dice2"]:checked').val(),
      $('input[name="dice3"]:checked').val(),
      $('input[name="dice4"]:checked').val(),
      $('input[name="dice5"]:checked').val(),
    ],
    tries_left: $('input[name="tries"]:checked').val(),
  };

  $.ajax({
    type: "post",
    url: targetUrl,
    contentType: "application/json", //necessary for triggering preflight for cors
    dataType: "json",
    data: JSON.stringify(targetData),
    crossDomain: true,
    statusCode: {
      200: function (data) {
        var title = "Your Probabilities:";
        var result = data.result;
        $("#threeOnes").html(result.three_ones_or_more + "%");
        $("#fourOnes").html(result.four_ones_or_more + "%");
        $("#fiveOnes").html(result.five_ones + "%");
        $("#threeTwos").html(result.three_twos_or_more + "%");
        $("#fourTwos").html(result.four_twos_or_more + "%");
        $("#fiveTwos").html(result.five_twos + "%");
        $("#threeThrees").html(result.three_threes_or_more + "%");
        $("#fourThrees").html(result.four_threes_or_more + "%");
        $("#fiveThrees").html(result.five_threes + "%");
        $("#threeFours").html(result.three_fours_or_more + "%");
        $("#fourFours").html(result.four_fours_or_more + "%");
        $("#fiveFours").html(result.five_fours + "%");
        $("#threeFives").html(result.three_fives_or_more + "%");
        $("#fourFives").html(result.four_fives_or_more + "%");
        $("#fiveFives").html(result.five_fives + "%");
        $("#threeSixes").html(result.three_sixes_or_more + "%");
        $("#fourSixes").html(result.four_sixes_or_more + "%");
        $("#fiveSixes").html(result.five_sixes + "%");
        $("#fullHouse").html(result.full_house + "%");
        $("#smallStraight").html(result.small_straight + "%");
        $("#largeStraight").html(result.large_straight + "%");
        $("#yahtzee").html(result.yahtzee + "%");

        // $("#myModal").modal("show");
        // $("#modal-title").html(title);
        // $("#modal-body").html(body);
      },
      400: function (data) {
        var title = "Error:";
        var body =
          "Sorry, it seems you used invalid parameter. Please try again.";

        $("#myModal").modal("show");
        $("#modal-title").html(title);
        $("#modal-body").html(body);
      },
    },
    error: function (response) {
      var title = "Error:";
      var body =
        "Sorry, there seems to be a problem with the internet connection. Please try again later.";

      $("#myModal").modal("show");
      $("#modal-title").html(title);
      $("#modal-body").html(body);
    },
  });
}
