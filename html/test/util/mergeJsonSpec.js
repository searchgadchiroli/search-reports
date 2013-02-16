define(['app/util/mergeJson'], function (mergeJson) {
    describe("mergeJson", function () {

        var whereTehsilIs = function (val) {
            var value = val;
            return function (element) {
                return element.properties.tehsil == value
            }
        };

        it("merges random data to properties of a geojson", function () {
            var geoJson = {"type": "FeatureCollection", "features": [
                { "type": "Feature", "id": "01", "properties": {"tehsil": "Raj Nandgaon"}, "geometry": { "type": "Polygon", "coordinates": [] } },
                { "type": "Feature", "id": "03", "properties": {"tehsil": "Ambikapur", "density": 10}, "geometry": { "type": "Polygon", "coordinates": [] } },
                { "type": "Feature", "id": "02", "properties": {"tehsil": "Jagdalpur"}, "geometry": { "type": "Polygon", "coordinates": [] } }
            ]};
            var ourData = [
                {tehsil: 'Raj Nandgaon', male: '31', female: '57', total: '88'},
                {tehsil: 'Ambikapur', male: '36', female: '61', total: '97'}
            ];

            var result = mergeJson(geoJson, ourData);

            var rajNandgaon = result.features.filter(whereTehsilIs("Raj Nandgaon"))[0];
            expect(rajNandgaon).toBeDefined();
            expect(rajNandgaon.properties.data).toBeDefined();
            expect(rajNandgaon.properties.data.male).toBe('31');
        });

        it("will add a default object when mapping not found", function () {
            var geoJson = {"type": "FeatureCollection", "features": [
                { "type": "Feature", "id": "01", "properties": {"tehsil": "Raj Nandgaon"}, "geometry": { "type": "Polygon", "coordinates": [] } },
                { "type": "Feature", "id": "03", "properties": {"tehsil": "Ambikapur", "density": 10}, "geometry": { "type": "Polygon", "coordinates": [] } },
                { "type": "Feature", "id": "02", "properties": {"tehsil": "Jagdalpur"}, "geometry": { "type": "Polygon", "coordinates": [] } }
            ]};
            var ourData = [
                {tehsil: 'Raj Nandgaon', male: '31', female: '57', total: '88'},
                {tehsil: 'Ambikapur', male: '36', female: '61', total: '97'}
            ];

            var result = mergeJson(geoJson, ourData, {male: '0', female: '0', total: '0'});

            var jagdalpur = result.features.filter(whereTehsilIs("Jagdalpur"))[0];
            expect(jagdalpur).toBeDefined();
            expect(jagdalpur.properties.data).toBeDefined();
            expect(jagdalpur.properties.data.male).toBe('0');
        })
    })
});