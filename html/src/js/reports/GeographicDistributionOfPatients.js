var JSSMaps = JSSMaps || {};
JSSMaps.report = JSSMaps.report || {};

JSSMaps.report.start = function () {
    var showOnMap = function(data) {
        var stateData = JSSMaps.util.mergeUserData(tehsilData, JSSMaps.util.convertToJson(data));
        L.geoJson(stateData, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);

    };

    var map = L.map('map').setView([22.07963 , 82.13914], 9);
    var url = 'http://localhost:8080/jasperserver/rest_v2/reports/Reports/GeographicDistributionOfPatients.csv?from_date=1999-02-17&to_date=2013-02-17';
    jQuery.get(url).done(showOnMap());

//    // control that shows state info on hover
//    var info = L.control();
//
//    info.onAdd = function (map) {
//        this._div = L.DomUtil.create('div', 'info');
//        this.update();
//        return this._div;
//    };
//
//    info.update = function (props) {
//        this._div.innerHTML = (props ?
//            '<b>' + props.data.tehsil + '</b>'
//            : 'Hover over a state');
//    };

}
