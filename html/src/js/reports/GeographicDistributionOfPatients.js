define(['leaflet', 'app/util/mergeJson', 'app/util/csvToJson', 'app/ui/colorPalette', 'app/ui/createInputControl', 'app/JSSGeoJSON'],
    function (l, mergeJson, csvToJson, colorPalette, createInputControl, tehsilData) {
        return {start: function () {
            var resetMap = function () {
                jQuery('#map').empty();
                jQuery('#map').append('<div id="mapContainer"></div>');
            }

            var init = function () {
                resetMap();
                var url = 'rest_v2/reports/Reports/GeographicDistributionOfPatients/inputControls';
                jQuery.ajax({
                    url: url,
                    headers: {'Accept': 'application/json'},
                    success: showInputControls
                });
            };

            var showOnMap = function (data) {
                resetMap();
                var map = l.map('mapContainer').setView([21.07963 , 82.53914], 7.2);

                // control that shows state info on hover
                var info = l.control();

                info.onAdd = function () {
                    this._div = l.DomUtil.create('div', 'info');
                    this.update();
                    return this._div;
                };

                info.update = function (props) {
                    this._div.innerHTML = (props ?
                        '<b>District: </b>' + props.district + '<br>' +
                        '<b>Tehsil: </b>' + props.name + '<br>' +
                        props.data.total + ' (Female-' + props.data.female + ', Male-' + props.data.male + ')<br>'
                        : 'Hover over a state');
                };

                info.addTo(map);

                var reportDataGeoJson = mergeJson(tehsilData, csvToJson(data), {male: '0', female: '0', total: '0'});
                var fieldToBeCompared = function (element) {
                    return parseInt(element.properties.data.total, 10);
                };
                var palette = colorPalette.init(reportDataGeoJson.features, fieldToBeCompared);


                function style(feature) {
                    return {
                        weight: 2,
                        opacity: 1,
                        color: 'white',
                        dashArray: '3',
                        fillOpacity: 0.7,
                        fillColor: palette.getColor(feature.properties.data.total)
                    };
                }

                function highlightFeature(e) {
                    var layer = e.target;

                    layer.setStyle({
                        weight: 5,
                        color: '#666',
                        dashArray: '',
                        fillOpacity: 0.7
                    });

                    if (!l.Browser.ie && !l.Browser.opera) {
                        layer.bringToFront();
                    }

                    info.update(layer.feature.properties);
                }

                var geojson;

                function resetHighlight(e) {
                    geojson.resetStyle(e.target);
                    info.update();
                }

                function zoomToFeature(e) {
                    map.fitBounds(e.target.getBounds());
                }

                function onEachFeature(feature, layer) {
                    layer.on({
                        mouseover: highlightFeature,
                        mouseout: resetHighlight,
                        click: zoomToFeature
                    });
                }

                geojson = l.geoJson(reportDataGeoJson, {
                    style: style,
                    onEachFeature: onEachFeature
                }).addTo(map);


                var legend = l.control({position: 'bottomright'});

                legend.onAdd = function (map) {

                    var div = l.DomUtil.create('div', 'info legend'),
                        grades = palette.getGrades(),
                        labels = [],
                        from, to;

                    for (var i = 0; i < grades.length; i++) {
                        from = grades[i].min;
                        to = grades[i].max;

                        labels.push(
                            '<i style="background:' + grades[i].color + '"></i> ' +
                                from + (to ? '&ndash;' + to : '+'));
                    }

                    div.innerHTML = labels.join('<br>');
                    return div;
                };

                legend.addTo(map);

            };

            var getReport = function () {
                var inputControls = jQuery('#controlDataContainer > form');
                var url = 'rest_v2/reports/Reports/GeographicDistributionOfPatients.csv?' + inputControls.serialize();
                jQuery.ajax({
                    url: url,
                    success: showOnMap
                });
                //Avoid propagation of the event
                return false;
            };

            var showInputControls = function (inputControls) {
                createInputControl({
                    controls: inputControls,
                    onSubmit: getReport,
                    displayLocation: jQuery('#controlDataContainer')
                });
            };

            init();
        }}
    });
