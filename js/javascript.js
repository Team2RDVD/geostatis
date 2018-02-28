/*-----------------------------Variables globales-----------------------------*/


var mapid = L.map('mapid').setView([46.6033540, 1.8883335], 5); // Carte

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapid);


var geojson; //Objet GeoJSON affiché sur la carte
var legend = L.control({position: 'bottomleft'}); //Légende


/*-------------Lecture d'un fichier JSON-----------*/

/*
Fonction permettant la lecture d'un fichier JSON pour l'afficher sur la Carte
*/
function lire_fichier_JSON(JSON_filename){

  var JSONFile = JSON_filename;

  var request = new XMLHttpRequest();
  request.open('GET', JSONFile);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    var places = request.response;
    if (geojson){
      mapid.removeLayer(geojson);
    }
    geojson = L.geoJSON(places,{style: style, onEachFeature: onEachFeature}).addTo(mapid);
  }
}

/*-------------Interactivité avec la carte, design-----------*/


/*
Fonction permettant de créer le style des polygones
*/
function style(feature) {
    return {
        fillColor: getColor(parseInt(feature.properties.code_insee)),
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

/*
Fonction permettant d'obtenir la couleur d'un polygone
en fonction d'une échelles de valeurs et de couleurs
 */
function getColor(d) {

    for (var i = 0; i < grades.length-1; i++) {
      if (d >= grades[i] && d < grades[i+1]){
        return colors[i];
      }
    }
    return colors[colors.length-1];
}

/* Surbrillance de la carte */

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    mapid.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}


//Fonction permettant de créer la syntaxe HTML pour la légende
function createLegend(){
  var div = L.DomUtil.create('div', 'info legend'),
      labels = [];

  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
          '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }

  return div;
}

//Fonction permettant d'afficher la légende
function showLegend(){
  legend.onAdd = function (map){
    return createLegend();
  };
  legend.addTo(mapid);
}

/* Pop-up sur le côté avec les infos de la zone étudiée */

var info = L.control({position: 'topright'});

info.onAdd = function (mapid) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (properties) {
    this._div.innerHTML = '<h4>Region information</h4>' +  (properties ?
        '<b>' + properties.nom + '</b><br />' + properties.code_insee
        : 'Survoler une région');
};

info.addTo(mapid);

/*---------------Sélection de la couche---------------*/

var choixZone = document.getElementById("choixZone");

var JSONFile;
var grades = [10, 20, 30, 40, 50, 60, 70];
var colors = ['#800026','#BD0026','#E31A1C','#FC4E2A','#FD8D3C','#FEB24C','#FED976','#FFEDA0'];

function choisir_zone(event) {
  if (choixZone.choixzone.value == "region"){
    JSONFile = "./Fichiers_Geojson/Regions2016.json";
    grades = [10, 20, 30, 40, 50, 60, 70];
    colors = ['#800026','#BD0026','#E31A1C','#FC4E2A','#FD8D3C','#FEB24C','#FED976','#FFEDA0'];
}
  else if (choixZone.choixzone.value == "departement") {
    JSONFile = "./Fichiers_Geojson/Departements2016.json";
    grades = [10, 20, 30, 40, 50, 60, 70, 80, 90];
    colors = ['#800026','#BD0026','#E31A1C','#FC4E2A','#FD8D3C','#FEB24C','#FED976','#FFEDA0'];
  }
  else if (choixZone.choixzone.value == "commune") {
    JSONFile = "./Fichiers_Geojson/comm_carto_wgs84.json";
    grades = [10000, 20000, 30000];
    colors = ['#800026','#BD0026','#E31A1C','#FC4E2A','#FD8D3C','#FEB24C','#FED976','#FFEDA0'];
  }
  else {
    JSONFile = "./Fichiers_Geojson/Regions2016.json";
    grades = [10, 20, 30, 40, 50, 60, 70];
    colors = ['#800026','#BD0026','#E31A1C','#FC4E2A','#FD8D3C','#FEB24C','#FED976','#FFEDA0'];
  }

  showLegend(grades);
  lire_fichier_JSON(JSONFile);

}

/*----------------------*/

function onLoad(){
  lire_fichier_JSON("./Fichiers_Geojson/Regions2016.json");
  showLegend(grades);
}

window.onload = onLoad;
choixZone.addEventListener('click',choisir_zone);
