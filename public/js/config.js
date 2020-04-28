///////////////////////////////////////
// Customization!
///////////////////////////////////////

var has_backend = true; // When true use standard back API calls
var BACKEND_ROOT = ""; // Specify Backend ROOT if API endpoints not hosted on same domain
var logo = "/img/logo.png"; // Enter a logo for backend
var logo_text = "/img/logo_secondary.png"; // Enter name or second graphic
var logo_destination_url = "https://saluddigital.ssch.gob.mx/covid/";
// show modal dialogue if no MAPS_API_KEY specified

// Comment out line if MAP_API_KEY hardcoded
var MAP_API_KEY = localStorage.getItem("MAP_API_KEY");
// const MAP_API_KEY = "<MAP_API_KEY";
