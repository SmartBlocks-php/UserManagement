define([
    'jquery',
    'underscore',
    'backbone',
    'text!../Templates/contact_thumb.html'
], function ($, _, Backbone, contact_thumb_tpl) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "contact_thumb",
        initialize: function (obj) {
            var base = this;
            base.user = obj.model;
        },
        init: function () {
            var base = this;

            base.render();
            base.registerEvents();
        },
        render: function () {
            var base = this;

            var template = _.template(contact_thumb_tpl, {
                user: base.user
            });
            base.$el.html(template);
        },
        addAction: function (icon, callback) {
            var base = this;
            base.$el.find(".actions").add(icon);
            icon.click(function () {
                callback(base.user);
            });
        },
        registerEvents: function () {
            var base = this;
        }
    });

    return View;
});