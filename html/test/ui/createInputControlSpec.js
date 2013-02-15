define(['app/ui/createInputControl'], function (createInputControl) {
    describe("createInputControl", function () {

        var sampleInputControl = function () {
            return {
                "inputControl": [
                    {
                        "id": "from_date",
                        "type": "singleValueDate",
                        "label": "Enter the start date",
                        "mandatory": true
                    },
                    {
                        "id": "to_date",
                        "type": "singleValueDate",
                        "label": "Enter the end date",
                        "mandatory": true
                    }
                ]
            }
        };


        it("creates input controls in a div out of a specification", function () {
            var submitCalled = false;
            var onSubmit = function (event) {
                submitCalled = true;
                return false;
            };

            var inputControl = sampleInputControl();
            jQuery('body').append("<div id='inputControlSpecDiv' style='display: none'></div>");

            createInputControl({
                controls: inputControl,
                onSubmit: onSubmit,
                displayLocation: jQuery('#inputControlSpecDiv')
            });

            var inputs = jQuery('#inputControlSpecDiv form  input');
            expect(inputs.length).toBe(3);
            expect(jQuery("#from_date").length).toBe(1);
            expect(jQuery("#to_date").length).toBe(1);

            var form = jQuery('#inputControlSpecDiv form');
            form.trigger('submit');
            expect(submitCalled).toBe(true);
        });
    })
});

