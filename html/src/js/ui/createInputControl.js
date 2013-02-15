define(
    function () {
        return (function (initObj) {
            var controls, callBack, container;

            var appendTextField = function (form, control) {
                form.append('<p>' + control.label + ': <input name="' + control.id + '" type="text" id="' + control.id + '"></input><br></p>');
            };

            var appendCalendar = function (form, control) {
                var input = jQuery('<p>' + control.label + ': <input name="' + control.id + '" type="text" id="' + control.id + '"></input><br></p>');
                form.append(input);
                jQuery('#' + control.id).datepicker({
                    changeMonth: true,
                    changeYear: true,
                    dateFormat: 'yy-mm-dd'
                });
            };

            var appendSubmitButton = function (form) {
                form.append('<input type="submit" value="Show Map"/>');
            };

            var createInputControl = function (form, jasperControl) {
                var typeName = jasperControl.type;
                var inputControl;
                switch (typeName) {
                    case 'singleValueDate' :
                        inputControl = appendCalendar(form, jasperControl);
                        break;
                    case 'text' :
                        inputControl = appendTextField(form, jasperControl);
                }
                return inputControl;
            };

            var showOnScreen = function () {
                container.empty();
                container.append('<form id="inputControlsForm"</form>');
                var form = jQuery('#inputControlsForm');

                controls.forEach(function (control) {
                    createInputControl(form, control);
                });

                appendSubmitButton(form);

                jQuery('#inputControlsForm').submit(callBack);

                return container;
            }

            controls = initObj.controls.inputControl;
            callBack = initObj.onSubmit;
            container = initObj.displayLocation;
            return showOnScreen();
        });
    });