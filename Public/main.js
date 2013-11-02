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

    SmartBlocks.events.on("ws_notification", function (notif) {
        if (notif.block == "UserManagement") {
            if (notif.message == "contact_saved") {
                var contact = SmartBlocks.Blocks.UserManagement.Data.contacts.get(notif.contact.id);
                console.log('before-update', contact);
                if (contact) {

                    contact.fetch({
                        success: function () {
                            console.log(contact);
                            if (contact.get("pending")) {
                                console.log("is pending");
                                if (SmartBlocks.Blocks.Notifications) {
                                    SmartBlocks.Blocks.Notifications.Main.notify("New contact request",
                                        contact.get("user_a").get("name") + " wants to be your contact.",
                                        "contact_req" + contact.get("id"),
                                        {

                                        });
                                }
                            }
                        }
                    });
                } else {
                    var contact = new SmartBlocks.Blocks.UserManagement.Models.Contact(notif.contact);
                    contact.fetch({
                        success: function () {
                            SmartBlocks.Blocks.UserManagement.Data.contacts.add(contact);
                            if (contact.get("pending") && contact.get("user_a").get("id") != SmartBlocks.current_user.get('id')) {
                                console.log("is pending");
                                if (SmartBlocks.Blocks.Notifications) {
                                    SmartBlocks.Blocks.Notifications.Main.notify("New contact request",
                                        contact.get("user_a").get("name") + " wants to be your contact.",
                                        "contact_req" + contact.get("id"),
                                        {

                                        });
                                }
                            }
                        }
                    });

                }

                console.log('after-update', contact);
            }

            if (notif.message == "contact_deleted") {
                console.log('before-remove', SmartBlocks.Blocks.UserManagement.Data.contacts.get(notif.contact.id));
                SmartBlocks.Blocks.UserManagement.Data.contacts.remove(notif.contact.id);
                console.log('after-remove', SmartBlocks.Blocks.UserManagement.Data.contacts.get(notif.contact.id));
            }
        }
    });


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
                SmartBlocks.Blocks.UserManagement.Data.contacts.add(contact);
                contact.save();
                return contact;
            }
        }
    };

    return main;
});