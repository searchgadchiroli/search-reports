var JSSMaps = JSSMaps || {};
JSSMaps.util = JSSMaps.util || {};

JSSMaps.util.mergeUserData = function(geoJson, ourData) {

    var matchingData = function (element) {
        var data = ourData.filter(function(ele) {
            return ele.tehsil == element.properties.name;
        });
        element.properties.data = data[0] || {};
        return element;
    };

    geoJson.features = geoJson.features.map(matchingData);
    return geoJson;
}
