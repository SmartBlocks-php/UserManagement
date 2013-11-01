define([
    'jquery',
    'underscore',
    'backbone',
    './apps/Logger/Views/logger_widget'
], function ($, _, Backbone, LoggerWidget) {

    var init_login = function () {
        var logger_widget = new LoggerWidget();
        logger_widget.init();
        SmartBlocks.Blocks.Widgets.Main.addWidget('<i class="fa fa-user fa-2x"></i>', logger_widget.$el);

    };


    var main = {
        init: function () {
            init_login();
        }
    };

    return main;
});