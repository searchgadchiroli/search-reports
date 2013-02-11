describe("Reports", function () {

    describe("geographic distribution of patients", function (element) {
            var geoJson= {"type":"FeatureCollection","features":[
                { "type": "Feature", "id":"01","properties":{"name":"Raj Nandgaon"}, "geometry": { "type": "Polygon", "coordinates": [] },"data":{tehsil: 'Raj Nandgaon', male: '31', female: '57', total: '88'} },
                { "type": "Feature", "id":"03","properties":{"name":"Ambikapur", "density":10}, "geometry": { "type": "Polygon", "coordinates": [] },"data": {tehsil: 'Ambikapur', male: '36', female: '61', total: '97'} },
                { "type": "Feature", "id":"02","properties":{"name":"Jagdalpur"}, "geometry": { "type": "Polygon", "coordinates": [] },"data":{} }]};

        var result = JSSMaps.report.start();

     });
});
