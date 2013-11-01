define([
    'jquery',
    'underscore',
    'backbone',
    'text!../Templates/contact_management.html'
], function ($, _, Backbone, contact_management_tpl) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "a_class",
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

            var template = _.template(contact_management_tpl, {});
            base.$el.html(template);
        },
        registerEvents: function () {
            var base = this;
        }
    });

    return View;
});