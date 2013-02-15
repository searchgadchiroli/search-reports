define(function () {
    return (function (geoJson, ourData, defaultObject) {

        var matchingData = function (element) {
            var newDefaultObject = jQuery.extend({}, defaultObject);
            newDefaultObject.tehsil = element.properties.tehsil;
            newDefaultObject.district = element.properties.district;

            var data = ourData.filter(function (ele) {
                return ele.tehsil == element.properties.tehsil;
            });
            element.properties.data = data[0] || newDefaultObject;
            return element;
        };

        geoJson.features = geoJson.features.map(matchingData);
        return geoJson;
    });
});
