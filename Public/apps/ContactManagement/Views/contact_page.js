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
        init: function () {
            var base = this;

            base.render();
            base.registerEvents();
        },
        render: function () {
            var base = this;

            var template = _.template(contact_page_tpl, {});
            base.$el.html(template);
        },
        registerEvents: function () {
            var base = this;
        }
    });

    return View;
});