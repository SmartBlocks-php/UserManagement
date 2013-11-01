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
        },
        makeContact: function (user_a, user_b) {
            var contacts = SmartBlocks.Blocks.UserManagement.Data.contacts.filter(function (contact) {
                return contact.get("user_a").get('id') == user_a.get('id') &&
                    contact.get("user_b").get('id') == user_b.get('id') ||
                    contact.get("user_b").get('id') == user_a.get('id') &&
                        contact.get("user_a").get('id') == user_b.get('id');
            });
            if (contacts[0]) {
                return contacts[0];
            } else {
                var contact = new SmartBlocks.Blocks.UserManagement.Models.Contact({
                    user_a: user_a,
                    user_b: user_b
                });
                contact.save();
                SmartBlocks.Blocks.UserManagement.Data.contacts.add(contact);
                return contact;
            }
        }
    };

    return main;
});