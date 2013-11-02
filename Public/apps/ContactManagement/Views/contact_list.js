define([
    'jquery',
    'underscore',
    'backbone',
    'text!../Templates/contact_list.html',
    './contact_thumbnail'
], function ($, _, Backbone, contact_list_tpl, ContactThumb) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "contact_list",
        initialize: function () {
            var base = this;
        },
        init: function () {
            var base = this;

            base.render();
            base.registerEvents();
        },
        render: function () {
            var base = this;

            var template = _.template(contact_list_tpl, {});
            base.$el.html(template);
            base.renderContactsList();
        },
        renderContactsList: function () {
            var base = this;

            var contacts = SmartBlocks.Blocks.UserManagement.Data.contacts.filter(function (contact) {
                return contact.get("user_a").get('id') == SmartBlocks.current_user.get('id') ||
                    contact.get("user_b").get('id') == SmartBlocks.current_user.get('id');
            });

            console.log("CONTACTS", contacts);
            base.$el.find(".contact_list_").html('');
            for (var k in contacts) {
                var contact = contacts[k];
                (function (contact) {
                    if (contact.get("user_a").get('id') != SmartBlocks.current_user.get("id")) {
                        var thumb = new ContactThumb({ model: contact.get("user_a")});
                        base.$el.find(".contact_list_").append(thumb.$el);
                        thumb.init();
                        if (contact.get("pending")) {
                            thumb.setInfo(" added you ");
                            thumb.addAction('<a class="fa fa-check clickable-icon"  title="Accept contact" href="javascript:void(0);"></a>',
                                function (user) {
                                    contact.set("pending", false);
                                    contact.save();
                                }
                            );
                            thumb.addAction('<a class="fa fa-minus clickable-icon" title="Refuse contact" href="javascript:void(0);"></a>',
                                function (user) {
                                    contact.destroy();
                                }
                            );
                        }
                    } else {
                        var thumb = new ContactThumb({ model: contact.get("user_b")});
                        base.$el.find(".contact_list_").append(thumb.$el);
                        thumb.init();
                        if (contact.get("pending")) {
                            thumb.setInfo("(waiting)");
                            thumb.addAction('<a class="fa fa-minus clickable-icon" title="Cancel contact"  href="javascript:void(0);"></a>',
                                function (user) {
                                    contact.destroy();
                                }
                            );
                        }

                    }

                    if (!contact.get("pending")) {
                        thumb.addAction('<a class="fa fa-minus clickable-icon" title="Remove contact" href="javascript:void(0);"></a>',
                            function (user) {
                                if (confirm("Are you sure you want do remove this contact")) {
                                    contact.destroy();
                                }
                            }
                        );
                    }
                })(contact);


            }


        },
        registerEvents: function () {
            var base = this;

            SmartBlocks.Blocks.UserManagement.Data.contacts.on("change", function () {
                base.renderContactsList();
            });

            SmartBlocks.Blocks.UserManagement.Data.contacts.on("add", function () {
                base.renderContactsList();
            });

            SmartBlocks.Blocks.UserManagement.Data.contacts.on("remove", function () {
                base.renderContactsList();
            });
        }
    });

    return View;
});