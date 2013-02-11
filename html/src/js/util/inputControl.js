var JSSMaps = JSSMaps || {};
JSSMaps.util = JSSMaps.util || {};

JSSMaps.util.inputControls = JSSMaps.util.inputControls || {};

    (function (controls) {
        controls.appendTextField = function (form, control) {
            form.append('<p>' + control.label + ': <input name="' + control.id + '" type="text" id="' + control.id + '"></input><br></p>');
        };

        controls.appendCalendar = function (form, control) {
            var input = $('<p>' + control.label + ': <input name="' + control.id + '" type="text" id="' + control.id + '"></input><br></p>');
            form.append(input);
            $('#' + control.id).datepicker({
                changeMonth: true,
                changeYear: true,
                dateFormat: 'yy-mm-dd'
            });
        };

        controls.appendSubmitButton = function (form) {
            form.append('<input type="submit" value="Show Map"></input>');
        };

        controls.createInputControl = function (form, jasperControl) {
            var typeName = jasperControl.type;
            var inputControl;
            switch (typeName) {
                case 'singleValueDate' :
                    inputControl = controls.appendCalendar(form, jasperControl); break;
                case 'text' :
                    inputControl = controls.appendTextField(form, jasperControl);
            }
            return inputControl;
        };
    }(JSSMaps.util.inputControls));


JSSMaps.util.inputControl = function () {
    var controls, callBack, container;

    var init = function (initObj) {
        controls = initObj.controls.inputControl;
        callBack = initObj.onSubmit;
        container = initObj.displayLocation;
        return this;
    };

    var display = function () {
        container.empty();
        container.append('<form id="inputControlsForm"</form>');
        var form = $('#inputControlsForm');
        var append = JSSMaps.util.inputControls.createInputControl;

        controls.forEach(function (control) {
            append(form, control);
        });

        JSSMaps.util.inputControls.appendSubmitButton(form);

        $('#inputControlsForm').submit(callBack);

        return container;
    }

    return {
        init: init,
        display: display
    };
};