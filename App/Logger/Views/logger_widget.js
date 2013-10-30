define([
    'jquery',
    'underscore',
    'backbone',
    'text!../Templates/logger_widget.html'
], function ($, _, Backbone, logger_widget_tpl) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "logger_widget",
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

            var template = _.template(logger_widget_tpl, {});
            base.$el.html(template);
        },
        registerEvents: function () {
            var base = this;
        }
    });

    return View;
});