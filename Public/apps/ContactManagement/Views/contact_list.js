define([
    'jquery',
    'underscore',
    'backbone',
    'text!../Templates/contact_list.html'
], function ($, _, Backbone, contact_list_tpl) {
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
        },
        registerEvents: function () {
            var base = this;
        }
    });

    return View;
});