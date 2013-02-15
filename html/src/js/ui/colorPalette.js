define(
    function () {
        var minData, maxData, step;

        var init = function (dataSet, fieldToBeCompared) {
            var numberComparer = function (a, b) {
                return a - b;
            };
            var map = dataSet.map(fieldToBeCompared);
            var totalData = map.sort(numberComparer);
            minData = totalData[0];
            maxData = totalData[totalData.length - 1];
            step = (maxData - minData) / 8;
            return this;
        }

        var getColor = function (d) {
            switch (Math.abs(Math.floor((d - minData) / step))) {
                case 0:
                    return "#DEEBF7";
                    break;
                case 1:
                    return "#C6DBEF";
                    break;
                case 2:
                    return "#9ECAE1";
                    break;
                case 3:
                    return "#6BAED6";
                    break;
                case 4:
                    return "#4292C6";
                    break;
                case 5:
                    return "#2171B5";
                    break;
                case 6:
                    return "#08519C";
                    break;
                default:
                    return "#08306B";
            }
        }

        var getGrades = function () {
            var value = minData, steps = [];
            while (value < maxData) {
                steps.push({'min': Math.floor(value), 'max': Math.floor(value + step), 'color': getColor(value)});
                value = value + step;
            }
            return steps;
        }

        return {
            init: init,
            getColor: getColor,
            getGrades: getGrades
        }
    });
