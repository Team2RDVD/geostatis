/*----------------------Variables des limites maximales-----------------------*/

/*Limites maximales de la France métropolitaine*/
var MetropolitanFranceInitBounds = [
    [41.340624,-4.936423], // Southwest coordinates
    [51.248691, 9.651224]  // Northeast coordinates
  ];

  /*Limites maximales de la carte de la France métropolitaine qu'on autorise*/
var MetropolitanFranceMaxBounds = [
    [38.135,-8.481], // Southwest coordinates
    [52.456,11.909]  // Northeast coordinates
  ];

/*Limites maximales de la carte de la Guadeloupe*/
var GuadeloupeMaxBounds = [
    [15.7989,-61.8558],
    [16.5651,-60.9439]
  ];

/*Limites maximales de la carte de la Martinique*/
var MartiniqueMaxBounds = [
    [14.3589,-61.3161],
    [14.9249,-60.7544]
  ];

/*Limites maximales de la carte de la Guyane*/
var GuyaneMaxBounds = [
    [1.977,-54.921],
    [6.206,-50.977]
  ];

/*Limites maximales de la carte de la Réunion*/
var ReunionMaxBounds = [
    [-21.4262,55.1376],
    [-20.8254,55.8943]
  ];

/*Limites maximales de la carte de Mayotte*/
var MayotteMaxBounds = [
    [-13.0434,44.9945],
    [-12.6162,45.3255]
  ];

/*----------------------------Création des cartes-----------------------------*/

/*
Initialisation de la carte en centrant au centre de la France métropolitaine
Zoom est de 5, 5 est le niveau de zoom minimal
Il est possible de zoomer avec un pas de 0.25
On ne peut pas sortir de la France avec maxBounds
*/
var MetropolitanFranceMap = L.map('MetropolitanFranceMap', {
	center: [46.6033540, 1.8883335],
	zoom: 5,
	zoomSnap: 0.25,
	minZoom:5,
	maxZoom:15,
	attributionControl: false,
	maxBounds:MetropolitanFranceMaxBounds,
	renderer: L.canvas()
});

/*
Carte de la Guadeloupe
*/
var GuadeloupeMap = L.map('GuadeloupeMap', {
  center: [16.2490067,-61.5650444],
  zoom: 8,
  zoomSnap:0.25,
  zoomControl:false,
  attributionControl: false
});

/*
Carte de la Martinique
*/
var MartiniqueMap = L.map('MartiniqueMap', {
  center: [14.6553,-60.9906],
  zoom: 8,
  zoomSnap:0.25,
  zoomControl:false,
  attributionControl: false
});

/*
Carte de la Guyane
*/
var GuyaneMap = L.map('GuyaneMap', {
  center: [4.0039882, -52.9999980],
  zoom: 5,
  zoomSnap:0.25,
  zoomControl:false,
  attributionControl: false
});

/*
Carte de la Réunion
*/
var ReunionMap = L.map('ReunionMap', {
  center: [-21.1309332, 55.5265771],
  zoom: 8,
  zoomSnap:0.25,
  zoomControl:false,
  attributionControl: false
});

/*
Carte de Mayotte
*/
var MayotteMap = L.map('MayotteMap', {
  center: [-12.8230480, 45.1520755],
  zoom: 9,
  zoomSnap:0.25,
  zoomControl:false,
  attributionControl: false
});

function zoomWithBounds() {
  //Zoom sur la France métropolitaine
  MetropolitanFranceMap.fitBounds(MetropolitanFranceInitBounds);

  //Zoom sur la Guadeloupe
  GuadeloupeMap.fitBounds(GuadeloupeMaxBounds);

  //Zoom sur la Martinique
  MartiniqueMap.fitBounds(MartiniqueMaxBounds);

  //Zoom sur la Guyane
  GuyaneMap.fitBounds(GuyaneMaxBounds);

  //Zoom sur la Réunion
  ReunionMap.fitBounds(ReunionMaxBounds);

  //Zoom sur Mayotte
  MayotteMap.fitBounds(MayotteMaxBounds);
}

/*----------------------Propriétés des cartes Outre-Mer-----------------------*/

/*
Fonction pour bloquer la navigation dans dans une carte
*/
function disableMovingInMap(map) {
  map.dragging.disable();
  map.touchZoom.disable();
  map.doubleClickZoom.disable();
  map.scrollWheelZoom.disable();
  map.boxZoom.disable();
  map.keyboard.disable();
}

/*
Fonction pour bloquer la navigation dans les cartes des Outre-mer
*/
function disableMovingInOverseasMaps() {
  disableMovingInMap(GuadeloupeMap);
  disableMovingInMap(MartiniqueMap);
  disableMovingInMap(GuyaneMap);
  disableMovingInMap(ReunionMap);
  disableMovingInMap(MayotteMap);
}

/*----------------------Propriétés des cartes Outre-Mer-----------------------*/

/*
Fonction permettant l'ajout des couches sur les cartes
*/
function addLayers() {

  //Ajout de la couche France Métropolitaine
  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(MetropolitanFranceMap);

  //Ajout de la couche Guadeloupe
  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(GuadeloupeMap);

  //Ajout de la couche Martinique
  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(MartiniqueMap);

  //Ajout de la couche Guyane
  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(GuyaneMap);

  //Ajout de la couche Reunion
  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(ReunionMap);

  //Ajout de la couche Mayotte
  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(MayotteMap);
}

/*-------------------------------Variables globales---------------------------*/

//Ensemble des balises du fichier html
var choixRegion = document.getElementById("choixRegion");
var choixDepartement = document.getElementById("choixDepartement");
var choixCommune = document.getElementById("choixCommune");
var choixZone = document.getElementById("choixZone");
var region = document.getElementById("region");
var departement = document.getElementById("departement");
var commune = document.getElementById("commune");
var affichageStats = document.getElementById("affichageStats");
var choose_mode = document.getElementById("choose_mode");
var choose_color_palette = document.getElementById("choose_color_palette");
var statAffichee = document.getElementById("statAffichee");
var titreStat = document.getElementById("titreStat");
var metadonneesStat = document.getElementById("metadonneesStat");
var numberOfRange = document.getElementById("numberOfRange");
var showNumberOfRange = document.getElementById("showNumberOfRange");
showNumberOfRange.innerHTML = numberOfRange.value;
//Variables globales
var layerMetropole; //Objet layer GeoJSON affiché sur la carte
var layerGuadeloupe;
var layerMartinique;
var layerGuyane;
var layerReunion;
var layerMayotte;

var topoJSONByScale = {};

var legend = L.control({position: 'bottomleft'}); //Légende
var Geometry_JSON_scale = "regions"; //Nom de l'échelle pour les fichiers de zones JSON
var Stats_JSON; //Fichier JSON affichant les stats
var grades = [0, 1, 2, 4, 5, 10, 20, 50, 80];
var colors = ['#800026','#BD0026','#E31A1C','#FC4E2A','#FD8D3C','#FEB24C','#FED976','#FFEDA0'];
var info = L.control({position: 'topright'}); //Objet affichant les données de la zone de survol
var stats;
var places;
var valeurs;
var mode = choose_mode.value;
var color_palette = choose_color_palette.value;

/*------------------------Lecture d'un fichier JSON---------------------------*/


/*
Fonction permettant la lecture d'un fichier JSON pour l'afficher sur la carte
*/
function lire_fichier_JSON() {

  var json = topoJSONByScale[Geometry_JSON_scale];
  places = topojson.feature(json, json.objects[Geometry_JSON_scale]);
  placesDROM = topojson.feature(json, json.objects[Geometry_JSON_scale + "DROM"]);

  if (Stats_JSON && Stats_JSON != '') {
    getStats();
  } else {
    addGeojsonLayers();
  }
}

function load_fichier_topoJSON(scale = Geometry_JSON_scale) {

  var filename = "./fonds_carte/json/" + scale + ".json.txt";
  var promesse = d3.text(filename).then(function(data) {
    topoJSONByScale[scale] = JSON.parse(LZString.decompressFromUTF16(data));
  });
  return promesse;
}

/*
Fonction permettant de lire un fichier de statistiques de le traiter afin
de les représenter sur la cartes.
*/
function getStats() {

  valeurs = [];
  d3.json(Stats_JSON).then(function(stats) {
    if (stats.scale == choixZone.choixzone.value) {
      for (let i=0; i< places.features.length; i++) {
        let code_insee = places.features[i].properties.id;
        valeurs.push(stats.data[code_insee]);
        places.features[i].properties["stats"] = stats.data[code_insee];
      }
      for (let i=0; i< placesDROM.features.length; i++) {
        let code_insee = placesDROM.features[i].properties.id;
        valeurs.push(stats.data[code_insee]);
        placesDROM.features[i].properties["stats"] = stats.data[code_insee];
      }
    }
    addGeojsonLayers();
  });
}

function addGeojsonLayers() {

  if (layerMetropole) {
    MetropolitanFranceMap.removeLayer(layerMetropole);
    GuadeloupeMap.removeLayer(layerGuadeloupe);
    MartiniqueMap.removeLayer(layerMartinique);
    GuyaneMap.removeLayer(layerGuyane);
    ReunionMap.removeLayer(layerReunion);
    MayotteMap.removeLayer(layerMayotte);
  }

  layerMetropole = L.geoJSON(places,{style: style, onEachFeature: onEachFeature}).addTo(MetropolitanFranceMap);
  layerGuadeloupe = L.geoJSON(placesDROM,{style: style, onEachFeature: onEachFeature}).addTo(GuadeloupeMap);
  layerMartinique = L.geoJSON(placesDROM,{style: style, onEachFeature: onEachFeature}).addTo(MartiniqueMap);
  layerGuyane = L.geoJSON(placesDROM,{style: style, onEachFeature: onEachFeature}).addTo(GuyaneMap);
  layerReunion = L.geoJSON(placesDROM,{style: style, onEachFeature: onEachFeature}).addTo(ReunionMap);
  layerMayotte = L.geoJSON(placesDROM,{style: style, onEachFeature: onEachFeature}).addTo(MayotteMap);
}

/*--------------------Interactivité avec la carte, design---------------------*/

/*
Fonction permettant d'obtenir la couleur d'un polygone
en fonction d'une échelles de valeurs et de couleurs
 */
var getColor = d3.scaleThreshold()
                 .domain(grades)
                 .range(colors);
                 // .domain(d3.range(10, 70, 10))
                 // .range(d3.schemeYlOrRd[8]);

/*
Fonction permettant de créer le style des polygones
*/
function style(feature) {
  var color = ["#AAAAAA"];
  if (feature.properties.stats) {
    color = getColor(feature.properties.stats);
  }
  return {
    fillColor: color,
    weight: 1,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  };
}

/*
Surbrillance de la carte
*/
function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 3,
    color: '#000000',
    dashArray: '',
    fillOpacity: 0.8
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }

  info.update(layer.feature.properties);
}

/*
Fonction permettant de remettre l'objet à l'état initial lorsqu'on ne le survole plus
*/
function resetHighlight(e) {
  layerMetropole.resetStyle(e.target);
  layerGuadeloupe.resetStyle(e.target);
  layerMartinique.resetStyle(e.target);
  layerGuyane.resetStyle(e.target);
  layerReunion.resetStyle(e.target);
  layerMayotte.resetStyle(e.target);
  info.update();
}

/*
Fonction permettant de zoomer sur l'objet lorsqu'on clique dessus
*/
function zoomToFeature(e) {
  MetropolitanFranceMap.fitBounds(e.target.getBounds());
}

/*
Fonction gérant les événements liés à la carte (mouseout, mouseover...)
*/
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    //click: zoomToFeature
  });
}

/*
Fonction permettant d'éviter de sélectionner certaines données
en fonction du niveau de zoom
*/
function restreindre_donnees() {
  var zoomLevel = MetropolitanFranceMap.getZoom();

  //Interdiction de l'accès aux communes
  if (zoomLevel < 7) {
    /*
    On enlève la carte des communes si le niveau de zoom est inférieur à 7.
    On met celle des départements par défaut
    */
    if (choixZone.choixzone.value == "commune") {
      departement.checked = true;
      choisir_zone();
    }

    //On cache la case des communes
    choixCommune.style.display = "none";
    choixDepartement.style.display = "block";
    choixRegion.style.display = "block";

  } else if (zoomLevel < 8) {
    //On affiche toutes les possibilités
    choixCommune.style.display = "block";
    choixDepartement.style.display = "block";
    choixRegion.style.display = "block";
  } else {
    /*
    On enlève la carte des régions si le niveau de zoom est supérieur à 8.
    On met celle des départements par défaut
    */
    if (choixZone.choixzone.value == "region") {
      departement.checked = true;
      choisir_zone();
    }

    //On cache la case des régions
    choixCommune.style.display = "block";
    choixDepartement.style.display = "block";
    choixRegion.style.display = "none";
  }
}

/*
Fonction permettant d'arrondir un nombre avec un precision définie
*/
function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

//Fonction permettant de créer la syntaxe HTML pour la légende
function createLegend() {
  var div = L.DomUtil.create('div', 'info legend'),
      labels = [];

  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
        '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
        precisionRound(grades[i], 2) + (precisionRound(grades[i + 1], 2) ? '&ndash;' + precisionRound(grades[i + 1], 2) + '<br>' : '+');
  }

  return div;
}

/*
Fonction permettant d'afficher la légende
*/
function showLegend() {
  legend.onAdd = function (map) {
    return createLegend();
  };
  legend.addTo(MetropolitanFranceMap);
}

/*
Fonction permettant d'afficher la barre d'information qui affiche le nom de la
zone sélectionnée avec d'autres infos
*/
function showPopUp(mapObject) {

  var map = mapObject;

  /* Pop-up sur le côté avec les infos de la zone étudiée */
  info = L.control({position: 'topright'});

  info.onAdd = function (MetropolitanFranceMap) {
    this._div = L.DomUtil.create('div', 'info'); // Création d'une div de classe INFO
    this.update();
    return this._div;
  };

  // method that we will use to update the control based on feature properties passed
  info.update = function (properties) {
    this._div.innerHTML = '<h4>Informations</h4>' +  (properties ?
        '<b>' + properties.nom + '</b><br />' + properties.id + '</b><br />' + properties.stats
        : 'Survoler une région');
  };

  info.addTo(mapObject); //Ajout de l'objet sur la carte
}


/*------------------------Sélection de la couche------------------------------*/

/*
Fonction permettant d'autoriser à l'utilisateur de choisir telle ou telle échelle en fonction du niveau de zoom (Région, département, EPCI, commune)
*/
function choisir_zone() {
  if (choixZone.choixzone.value == "departement") {
    Geometry_JSON_scale = "departements";
    grades = [0, 1, 2, 4, 5, 10, 20, 50, 80];
    colors = ['#800026','#BD0026','#E31A1C','#FC4E2A','#FD8D3C','#FEB24C','#FED976','#FFEDA0'];
  }
  else if (choixZone.choixzone.value == "commune") {
    Geometry_JSON_scale = "communes";
    grades = [10000, 20000, 30000, 40000, 50000, 60000, 70000];
    colors = ['#800026','#BD0026','#E31A1C','#FC4E2A','#FD8D3C','#FEB24C','#FED976','#FFEDA0'];
  }
  else {
    Geometry_JSON_scale = "regions";
    grades = [10, 20, 30, 40, 50, 60, 70];
    colors = ['#800026','#BD0026','#E31A1C','#FC4E2A','#FD8D3C','#FEB24C','#FED976','#FFEDA0'];
  }

  showLegend(grades);
  lire_fichier_JSON();
}

/*
Fonction qui s'effectue au chargement de la page pour afficher des données
*/
function onLoad() {
  load_fichier_topoJSON().then(lire_fichier_JSON);
  showLegend(grades);
  load_fichier_topoJSON("departements").then(load_fichier_topoJSON("communes"));
}


/*
Fonction pour permettre de mettre à jour le mode d'intervalle sélectionné
*/
function updateMode(){
  mode = choose_mode.value;
}

/*
Fonction pour permettre de mettre à jour le palette de couleur sélectionnée
*/
function updateColorPalette(){
  color_palette = choose_color_palette.value;
}

function getStatTitle(){
  titreStat.innerHTML = stats.title;
}

var valueNumberOfRange;
function getNumberOfRange(){
  var tempNumberOfRange = parseInt(numberOfRange.value);
  if (isNaN(tempNumberOfRange)) {
    tempNumberOfRange = 5;
  }
  showNumberOfRange.innerHTML = tempNumberOfRange;
  valueNumberOfRange = tempNumberOfRange;
}

function updateLegend(){
  getNumberOfRange();
  getGrades();
  showLegend();
}

function getGrades(){
  grades = [];
  var minStats = Math.min.apply(Math, valeurs);
  var maxStats = Math.max.apply(Math, valeurs);
  var size = (maxStats-minStats)/valueNumberOfRange;
  var tempGrades = minStats;

  for (var i=0;i<valueNumberOfRange;i++){

    grades.push(tempGrades);
    tempGrades += size;
  }

  console.log(grades);
}

/*
Fonction permettant d'obtenir le centroide d'un array de pojnts
*/
function getCentroid(polygone){
    var arr= polygone.toGeoJSON();

    var twoTimesSignedArea = 0;
    var cxTimes6SignedArea = 0;
    var cyTimes6SignedArea = 0;

    var length = arr.length

    var x = function (i) { return arr[i % length][0] };
    var y = function (i) { return arr[i % length][1] };

    for ( var i = 0; i < arr.length; i++) {
        var twoSA = x(i)*y(i+1) - x(i+1)*y(i);
        twoTimesSignedArea += twoSA;
        cxTimes6SignedArea += (x(i) + x(i+1)) * twoSA;
        cyTimes6SignedArea += (y(i) + y(i+1)) * twoSA;
    }
    var sixSignedArea = 3 * twoTimesSignedArea;
    return [ cxTimes6SignedArea / sixSignedArea, cyTimes6SignedArea / sixSignedArea];
}

/*
Fonction permettant de déterminer la valeur statistique la plus forte parmi tous les polygones
*/
function getMaxStatValue(){
  for (let i=0; i< places.features.length; i++) {}
}

/*------------------------Appel aux différentes fonctions---------------------*/

window.onload = onLoad;
choixZone.addEventListener('click',choisir_zone);
MetropolitanFranceMap.on('zoom',restreindre_donnees);

zoomWithBounds();
disableMovingInOverseasMaps();
addLayers();
showPopUp(MetropolitanFranceMap);

choose_mode.addEventListener("change",updateMode);
choose_color_palette.addEventListener("change",updateColorPalette);
numberOfRange.addEventListener("change",updateLegend);

Stats_JSON = './Fichiers_Stats/Stat_A1202/Stat_A1202__Scale_Reg.json';
