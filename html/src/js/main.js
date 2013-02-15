requirejs.config({
    baseUrl: 'maps/lib',
    shim: {
        'leaflet': {
            exports: 'L'
        }
    },
    paths: {
        app: '../js',
        'jquery-ui': '../../scripts/jquery/js/jquery-ui-1.8.20.custom.min',
        datepicker: '../../scripts/jquery/js/jquery.ui.datepicker-en'
    }
});


requirejs(['require'],
    function (require) {
        var showMaps = function (path) {
            require([path], function (map) {
                map.start();
            });

            jQuery("#mapList").hide();
            jQuery("#container").show();
        }

        var backToList = function () {
            jQuery("#mapList").show();
            jQuery("#container").hide();
        };

        jQuery('#back').click(function () {
            backToList();
        });

        jQuery('#jssPatientStatistics').click(function () {
            showMaps('app/reports/GeographicDistributionOfPatients');
        });

        backToList();
    });