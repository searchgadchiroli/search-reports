define(['app/util/csvToJson'], function (csvToJson) {
    describe("csvToJson", function () {

        it("converts a simple csv to Json", function () {
            var result = csvToJson('head1,head2' + '\n' + 'row1col1,row1col2' + '\n' + 'row2col1,row2col2');
            expect(result[0].head1).toBe('row1col1');
            expect(result[0].head2).toBe('row1col2');
            expect(result[1].head1).toBe('row2col1');
            expect(result[1].head2).toBe('row2col2');
        });

        it("should convert even if there are missing values", function () {
            var result = csvToJson('head1,head2' + '\n' + 'row1col1,' + '\n' + ',row2col2' + '\n' + ',');
            expect(result[0].head1).toBe('row1col1');
            expect(result[0].head2).toBe('');
            expect(result[1].head1).toBe('');
            expect(result[1].head2).toBe('row2col2');
            expect(result[2].head1).toBe('');
            expect(result[2].head2).toBe('');
        });

        it("should not fail for empty rows", function () {
            var result = csvToJson('head1,head2' + '\n\n' + 'row2col1,row2col2');
            expect(result[0].head1).toBe('row2col1');
            expect(result[0].head2).toBe('row2col2');
        });
    })
});
