let iconObject = L.icon({
    iconUrl: './src/images/marker-icon.png',
    shadowSize: [50, 64],
    shadowAnchor: [4, 62],
    iconAnchor: [12, 40]
});

$(document).ready(function (e) {
    jQuery.support.cors = true;

    let host;// = "http://localhost:9000/api/1";
    let key = "372ef590-cf07-4aff-8c56-ef34bcb0ead3";

    // create a routing client to fetch real routes, elevation.true is only supported for vehicle bike or foot
    let ghRouting = new GraphHopper.Routing({key: key, host: host}, {elevation: false});

    let routingMap = createMap('routing-map');
    setupRoutingAPI(routingMap, ghRouting);
    
});

function setupRoutingAPI(map, ghRouting) {
    map.setView([14.6002559, 120.9942253],14);

    let points = []
    let instructionsDiv = $("#instructions");        

    points.push([120.9942253, 14.6002559]);
    points.push([121.0769986, 14.5731479]);
    if (points.length > 1) {
        // ******************
        //  Calculate route! 
        // ******************
        ghRouting.doRequest({points: points})
            .then(function (json) {
                let path = json.paths[0];
                routingLayer.addData({
                    "type": "Feature",
                    "geometry": path.points
                });
                let outHtml = "Distance in meter:" + path.distance;
                outHtml += "<br/>Times in seconds:" + path.time / 1000;
                $("#routing-response").html(outHtml);

                if (path.bbox) {
                    let minLon = path.bbox[0];
                    let minLat = path.bbox[1];
                    let maxLon = path.bbox[2];
                    let maxLat = path.bbox[3];
                    let tmpB = new L.LatLngBounds(new L.LatLng(minLat, minLon), new L.LatLng(maxLat, maxLon));
                    map.fitBounds(tmpB);
                }

                instructionsDiv.empty();
                if (path.instructions) {
                    let allPoints = path.points.coordinates;
                    let listUL = $("<ol>");
                    instructionsDiv.append(listUL);
                    for (let idx in path.instructions) {
                        let instr = path.instructions[idx];

                        // use 'interval' to find the geometry (list of points) until the next instruction
                        let instruction_points = allPoints.slice(instr.interval[0], instr.interval[1]);

                        // use 'sign' to display e.g. equally named images

                        $("<li>" + instr.text + " <small>(" + ghRouting.getTurnText(instr.sign) + ")</small>"
                            + " for " + instr.distance + "m and " + Math.round(instr.time / 1000) + "sec"
                            + ", geometry points:" + instruction_points.length + "</li>").appendTo(listUL);
                    }
                }

            })
            .catch(function (err) {
                let str = "An error occured: " + err.message;
                $("#routing-response").text(str);
            });
    }
    
    
    


    let instructionsHeader = $("#instructions-header");
    instructionsHeader.click(function () {
        instructionsDiv.toggle();
    });

    let routingLayer = L.geoJson().addTo(map);
    routingLayer.options = {
        style: {color: "#00cc33", "weight": 5, "opacity": 0.6}
    };

    L.marker(L.latLng(14.6002559, 120.9942253), {icon: iconObject}).addTo(routingLayer);
    L.marker(L.latLng(14.5731479, 121.0769986), {icon: iconObject}).addTo(routingLayer);
}

function createMap(divId) {
    let osmAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    let omniscale = L.tileLayer.wms('https://maps.omniscale.net/v1/ghexamples-3646a190/tile', {
        layers: 'osm',
        attribution: osmAttr + ', &copy; <a href="http://maps.omniscale.com/">Omniscale</a>'
    });

    let osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: osmAttr
    });

    let map = L.map(divId, {layers: [omniscale]});
    L.control.layers({
        "Omniscale": omniscale,
        "OpenStreetMap": osm
    }).addTo(map);
    return map;
}

