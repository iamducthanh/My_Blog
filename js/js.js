$(document).ready(() => {
    $("#currPos").on("click", getLocation);
    
    function getLocation() {
      $.getJSON("https://ipinfo.io/", onLocationGot);
    }
   
    function onLocationGot(info) {
      let position = info.loc.split(",");
      $("#lat").text(position[0]);
      $("#lon").text(position[1]);
    }
  });