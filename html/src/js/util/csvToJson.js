define(function () {
    return (function (csv) {
        var separator = ',';
        var rows = csv.split('\n');
        var headerRow = rows.shift();
        var headers = headerRow.split(separator);
        var isNotNull = function (ele) {
            return ele !== null;
        };

        var singleRowObject = function (rawRow) {
            var rowObject = {};
            var row = rawRow.split(separator);
            if (row.length === 1) return null;
            headers.forEach(function (ele, index) {
                rowObject[ele] = row[index]
            });
            return rowObject;
        };

        return rows.map(function (ele) {
            return singleRowObject(ele)
        }).filter(isNotNull);
    });
});