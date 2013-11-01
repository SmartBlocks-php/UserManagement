define([
    'jquery',
    'underscore',
    'backbone',
    './apps/Logger/Views/logger_widget',
    './apps/ContactManagement/Views/contact_management'
], function ($, _, Backbone, LoggerWidget, ContactManagementView) {

    var init_login = function () {
        var logger_widget = new LoggerWidget();
        logger_widget.init();
        SmartBlocks.Blocks.Widgets.Main.addWidget('<i class="fa fa-user fa-2x"></i>', logger_widget.$el);

    };


    var main = {
        init: function () {
            init_login();
        },
        launch_user_management: function () {
            var contact_management = new ContactManagementView();
            SmartBlocks.Methods.render(contact_management.$el);
            contact_management.init();
        }
    };

    return main;
});