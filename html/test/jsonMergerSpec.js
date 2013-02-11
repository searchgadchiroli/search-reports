describe("dataMerge", function() {

    var whereTehsilIs = function(val){var value = val; return function(element){return element.properties.name == value}};

    it("merges random data to properties of a geojson", function() {
        var geoJson= {"type":"FeatureCollection","features":[
            { "type": "Feature", "id":"01","properties":{"name":"Raj Nandgaon"}, "geometry": { "type": "Polygon", "coordinates": [] } },
            { "type": "Feature", "id":"03","properties":{"name":"Ambikapur", "density":10}, "geometry": { "type": "Polygon", "coordinates": [] } },
            { "type": "Feature", "id":"02","properties":{"name":"Jagdalpur"}, "geometry": { "type": "Polygon", "coordinates": [] } }]};
        var ourData = [{tehsil: 'Raj Nandgaon', male: '31', female: '57', total: '88'}, {tehsil: 'Ambikapur', male: '36', female: '61', total: '97'}];

        var result = JSSMaps.util.mergeUserData(geoJson, ourData);

        var rajNandgaon = result.features.filter(whereTehsilIs("Raj Nandgaon"))[0];
        expect(rajNandgaon).toBeDefined();
        expect(rajNandgaon.properties.data).toBeDefined();
        expect(rajNandgaon.properties.data.male).toBe('31');
    });
});