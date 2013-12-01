define([
    'jquery',
    'underscore',
    'backbone',
    'text!../Templates/contact_page.html'
], function ($, _, Backbone, contact_page_tpl) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "contact_page",
        initialize: function () {
            var base = this;
        },
        init: function (contact_list) {
            var base = this;

            base.contact_list = contact_list;

            base.render();
            base.registerEvents();
        },
        render: function () {
            var base = this;

            if (base.user) {
                var template = _.template(contact_page_tpl, {
                    user: base.user
                });
                base.user.getImageUrl(200, function (url, error) {
                    if (!error) {
                        var image = $(document.createElement('img'));
                        image.attr("src", url);
                        base.$el.find(".image_container").html(image);
                    } else {
                        var image = $(document.createElement('img'));
                        image.attr("src", url);
                        base.$el.find(".image_container").html(image);
                    }
                });
                base.$el.html(template);
            }

        },
        registerEvents: function () {
            var base = this;

            base.contact_list.events.on("user_selected", function () {
                base.user = base.contact_list.selected_user;
                base.render();
            });
        }
    });

    return View;
});