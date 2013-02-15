define(['app/ui/colorPalette'], function (colorPalette) {
    describe("colorPalette", function () {

        describe("getColor", function () {
            it("shouldCreateAColorPalette", function () {
                var data = [
                    {"val": 0},
                    {"val": 12},
                    {"val": 20},
                    {"val": 21},
                    {"val": 30},
                    {"val": 45},
                    {"val": 32},
                    {"val": 1},
                    {"val": 80}
                ];
                var fieldToBeCompared = function (ele) {
                    return ele.val
                };
                var palette = colorPalette.init(data, fieldToBeCompared);
                expect(palette.getColor(0)).toBeTruthy();
                expect(palette.getColor(21)).toBeTruthy();
                expect(palette.getColor(40)).toBeTruthy();
                expect(palette.getColor(79)).toBeTruthy();
                expect(palette.getColor(80)).toBeTruthy();
                expect(palette.getColor(81)).toBeTruthy();
            });

            it("shouldMatchTheGradesthatItProvides", function () {
                var data = [
                    {"val": 0},
                    {"val": 12},
                    {"val": 20},
                    {"val": 21},
                    {"val": 30},
                    {"val": 45},
                    {"val": 32},
                    {"val": 1},
                    {"val": 80}
                ];
                var fieldToBeCompared = function (ele) {
                    return ele.val
                };
                var palette = colorPalette.init(data, fieldToBeCompared);
                var grades = {};
                grades.grades = palette.getGrades();
                grades.find = function (value) {
                    return this.grades.filter(function (grade) {
                        return grade.min <= value && grade.max > value
                    })[0]
                };

                expect(palette.getColor(0)).toBe(grades.find(0).color);
                expect(palette.getColor(1)).toBe(grades.find(1).color);
                expect(palette.getColor(10)).toBe(grades.find(10).color);
                expect(palette.getColor(79)).toBe(grades.find(79).color);
                expect(palette.getColor(80)).toBe(grades.find(79).color);
            });
        });
    })
});
