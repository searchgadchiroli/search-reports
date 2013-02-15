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

        var onSubmit = function (event) {
            return false;
        };

        it("creates input controls in a div out of a specification", function () {
            var inputControl = sampleInputControl();
            jQuery('body').append("<div id='inputControlSpecDiv' style='display: none'></div>");

            createInputControl({
                controls: inputControl,
                onSubmit: onSubmit,
                displayLocation: jQuery('#inputControlSpecDiv')
            });
        });
    })
});

