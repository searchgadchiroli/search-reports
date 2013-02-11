var JSSMaps = JSSMaps || {};
JSSMaps.report = JSSMaps.report || {};

JSSMaps.report.start = function () {
    var showOnMap = function(data) {
        $('#map').empty();
        $('#map').append('<div id="mapContainer"></div>');

        var map = L.map('mapContainer').setView([21.07963 , 82.53914], 7.2);

        // control that shows state info on hover
        var info = L.control();

        info.onAdd = function () {
            this._div = L.DomUtil.create('div', 'info');
            this.update();
            return this._div;
        };

        info.update = function (props) {
            this._div.innerHTML = (props ?
                '<b>' + props.name + '</b><br>' + props.data.total
                : 'Hover over a state');
        };

        info.addTo(map);

        var reportDataGeoJson = JSSMaps.util.mergeUserData(tehsilData, JSSMaps.util.convertToJson(data), {male: '0', female: '0', total: '0'});
        var fieldToBeCompared = function(element){return parseInt(element.properties.data.total, 10);};
        var palette = JSSMaps.util.colorPalette().init(reportDataGeoJson.features, fieldToBeCompared);


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

            if (!L.Browser.ie && !L.Browser.opera) {
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

        geojson = L.geoJson(reportDataGeoJson, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);


        var legend = L.control({position: 'bottomright'});

        legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend'),
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
        var inputControls = $('#controlDataContainer > form');
        var url = 'rest_v2/reports/Reports/GeographicDistributionOfPatients.csv?' + inputControls.serialize();
        $.ajax({
            url: url,
            success: showOnMap
        });
        //Avoid propagation of the event
        return false;
    };

    var showInputControls = function(inputControls) {
        JSSMaps.util.inputControl().init({
            controls: inputControls,
            onSubmit: getReport,
            displayLocation: $('#controlDataContainer')
        }).display();
    };

    var url = 'rest_v2/reports/Reports/GeographicDistributionOfPatients/inputControls';
    $.ajax({
        url     : url,
        headers : {'Accept' : 'application/json'},
        success : showInputControls
    });
}
