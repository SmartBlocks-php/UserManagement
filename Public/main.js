define([
    'jquery',
    'underscore',
    'backbone',
    './apps/Logger/Views/logger_widget'
], function ($, _, Backbone, LoggerWidget) {

    var init_login = function () {
        var logger_widget = new LoggerWidget();
        $("body").append(logger_widget.$el);
        logger_widget.init();
    };


    var main = {
        init: function () {
            init_login();
        }
    };

    return main;
});