function getLocation() {
    $.getJSON("https://ipinfo.io/", onLocationGot);
   
}
getLocation();
function onLocationGot(info) {
    let position = info.loc.split(",");
    console.log(position);
}